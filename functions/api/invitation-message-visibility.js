const DEFAULT_SAMPLE_MESSAGE = "Đây là lời nhắn. ".repeat(20).trim();
const DEFAULT_PASSWORD_HASH = "1e72293938c5f5a7d5b20fccbd9e59ab0c5c82b0db3bbd2a95a635e4a74e5fa3";

const jsonHeaders = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
};

function jsonResponse(body, init = {}) {
    return new Response(JSON.stringify(body), {
        ...init,
        headers: {
            ...jsonHeaders,
            ...(init.headers || {})
        }
    });
}

function normalizeState(input) {
    const source = input && typeof input === "object" ? input : {};
    const showRealMessageFor = {};

    Object.entries(source.showRealMessageFor || {}).forEach(([slug, value]) => {
        if (/^[a-z0-9-]+$/.test(slug)) showRealMessageFor[slug] = Boolean(value);
    });

    return {
        defaultShowRealMessage: Boolean(source.defaultShowRealMessage),
        sampleMessage: String(source.sampleMessage || DEFAULT_SAMPLE_MESSAGE),
        showRealMessageFor
    };
}

async function hashValue(value) {
    const encoded = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function timingSafeEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string") return false;
    if (a.length !== b.length) return false;

    let diff = 0;
    for (let i = 0; i < a.length; i += 1) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

async function requireDashboardPassword(request, env) {
    const expectedHash = env.DASHBOARD_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;
    const password = (request.headers.get("x-dashboard-password") || "").trim().toUpperCase();
    if (!password) return false;
    return timingSafeEqual(await hashValue(password), expectedHash);
}

async function initializeDb(db) {
    await db.batch([
        db.prepare(`CREATE TABLE IF NOT EXISTS invitation_message_settings (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            default_show_real_message INTEGER NOT NULL DEFAULT 0,
            sample_message TEXT NOT NULL,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS invitation_message_overrides (
            slug TEXT PRIMARY KEY,
            show_real_message INTEGER NOT NULL CHECK (show_real_message IN (0, 1)),
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`)
    ]);

    await db.prepare(`INSERT OR IGNORE INTO invitation_message_settings
        (id, default_show_real_message, sample_message)
        VALUES (1, 0, ?)`).bind(DEFAULT_SAMPLE_MESSAGE).run();
}

async function readState(db) {
    await initializeDb(db);

    const settings = await db.prepare(`SELECT default_show_real_message, sample_message
        FROM invitation_message_settings
        WHERE id = 1`).first();
    const overrides = await db.prepare(`SELECT slug, show_real_message
        FROM invitation_message_overrides
        ORDER BY slug`).all();

    const showRealMessageFor = {};
    (overrides.results || []).forEach((row) => {
        showRealMessageFor[row.slug] = Boolean(row.show_real_message);
    });

    return {
        defaultShowRealMessage: Boolean(settings && settings.default_show_real_message),
        sampleMessage: (settings && settings.sample_message) || DEFAULT_SAMPLE_MESSAGE,
        showRealMessageFor
    };
}

async function writeState(db, input) {
    await initializeDb(db);

    const state = normalizeState(input);
    const statements = [
        db.prepare(`UPDATE invitation_message_settings
            SET default_show_real_message = ?,
                sample_message = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = 1`).bind(state.defaultShowRealMessage ? 1 : 0, state.sampleMessage),
        db.prepare("DELETE FROM invitation_message_overrides")
    ];

    Object.entries(state.showRealMessageFor).forEach(([slug, value]) => {
        statements.push(
            db.prepare(`INSERT INTO invitation_message_overrides
                (slug, show_real_message, updated_at)
                VALUES (?, ?, CURRENT_TIMESTAMP)`).bind(slug, value ? 1 : 0)
        );
    });

    await db.batch(statements);
    return state;
}

export async function onRequestGet({ env }) {
    if (!env.DB) {
        return jsonResponse({ error: "D1 binding DB is not configured." }, { status: 503 });
    }

    return jsonResponse(await readState(env.DB));
}

export async function onRequestPost({ request, env }) {
    if (!env.DB) {
        return jsonResponse({ error: "D1 binding DB is not configured." }, { status: 503 });
    }

    if (!(await requireDashboardPassword(request, env))) {
        return jsonResponse({ error: "Unauthorized." }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch (error) {
        return jsonResponse({ error: "Invalid JSON." }, { status: 400 });
    }

    return jsonResponse(await writeState(env.DB, body));
}
