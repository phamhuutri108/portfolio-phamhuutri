import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const INVITATION_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(INVITATION_DIR, "../../..");
const CSV_PATH = path.join(INVITATION_DIR, "guest-list.csv");
const INDEX_TEMPLATE_PATH = path.join(INVITATION_DIR, "index.html");
const GUESTS_OUTPUT_PATH = path.join(INVITATION_DIR, "invitation-guests.js");
const GUEST_HTML_DIR = path.join(INVITATION_DIR, "khach-moi");
const CLEAN_GUEST_HTML_DIR = INVITATION_DIR;
const REDIRECTS_PATH = path.join(ROOT_DIR, "_redirects");
const CUSTOM_HTML_SLUGS = new Set(["cha-bong"]);

const PUBLIC_INVITATION_BASE = "/short-films/dad-dont-lie/invitation";
const SITE_INVITATION_BASE = "https://phamhuutri.com/short-films/dad-dont-lie/invitation";
const SHARE_IMAGE_URL = "https://assets.phamhuutri.com/assets/short-films/BODND/BODND_Still.jpeg?v=2";
const SHARE_IMAGE_WIDTH = "1920";
const SHARE_IMAGE_HEIGHT = "1038";
const SHARE_IMAGE_ALT = "Canh phim Ba Oi, Dung Noi Doi";
const SHARE_DESCRIPTION = "Ba Ơi, Đừng Nói Dối";
const VIDEO_BASE_URL = "https://assets.phamhuutri.com/assets/short-films/BODND/invitation/intro/";

function parseCsv(source) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < source.length; i += 1) {
        const char = source[i];
        const next = source[i + 1];

        if (char === '"') {
            if (inQuotes && next === '"') {
                field += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            row.push(field);
            field = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") i += 1;
            row.push(field);
            if (row.some((value) => value.trim())) rows.push(row);
            row = [];
            field = "";
            continue;
        }

        field += char;
    }

    row.push(field);
    if (row.some((value) => value.trim())) rows.push(row);

    const headers = rows.shift().map((header) => header.trim());
    return rows.map((values) => {
        const record = {};
        headers.forEach((header, index) => {
            record[header] = (values[index] || "").trim();
        });
        return record;
    });
}

function slugify(value) {
    return value
        .trim()
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
}

function uniqueSlug(baseSlug, usedSlugs) {
    let slug = baseSlug || "khach-moi";
    let index = 2;
    while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${index}`;
        index += 1;
    }
    usedSlugs.add(slug);
    return slug;
}

function resolveAssetUrl(value, baseUrl) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) return trimmed;
    return `${baseUrl}${trimmed}`;
}

function compactJoin(values) {
    return values
        .map((value) => (value || "").trim())
        .filter(Boolean)
        .join(" ");
}

function isChecked(value) {
    const normalized = (value || "").trim().toLowerCase();
    return ["1", "true", "yes", "y", "x", "✓", "✔", "checked", "tick"].includes(normalized);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
}

function replaceTag(html, tagName, value) {
    return html.replace(new RegExp(`<${tagName}>[\\s\\S]*?<\\/${tagName}>`, "i"), `<${tagName}>${escapeHtml(value)}</${tagName}>`);
}

function replaceMeta(html, attribute, name, value) {
    const pattern = new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(">)`, "i");
    return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function replaceLink(html, rel, value) {
    const pattern = new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(">)`, "i");
    return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function buildGuest(record, slug) {
    const displayName = record.displayName;
    const pronoun = record.introPronoun || "bạn";
    const namePrefix = record.namePrefix || "";
    const displayNameWithPrefix = compactJoin([namePrefix, displayName]);
    const ticketName = record.ticketName || displayName;
    const ticketRole = record.ticketRole || "";
    const ticketDisplayName = compactJoin([ticketRole, ticketName]);
    const shareTitle = `Lời mời đến ${displayName}`;
    const videoFile = record.videoFile || record.introVideoFile || record.storyVideoFile;
    const introVideoUrl = resolveAssetUrl(videoFile, VIDEO_BASE_URL);
    const storyVideoUrl = resolveAssetUrl(videoFile, VIDEO_BASE_URL);
    const showLetter = isChecked(record.showLetter);
    const storyLine = record.storyLine || `Trân quý mời ${pronoun} đến buổi chiếu phim thân mật`;
    const introSalutation = record.introSalutation || "";

    const guest = {
        slug,
        displayName,
        namePrefix,
        dearName: displayNameWithPrefix || displayName,
        showLetter,
        letterTitle: showLetter ? record.letterTitle || `Gửi ${displayNameWithPrefix || displayName},` : "",
        message: showLetter ? record.message : "",
        ticketName,
        ticketRole,
        ticketDisplayName: ticketDisplayName || ticketName,
        role: ticketRole,
        storyLine,
        introVideoUrl,
        storyVideoUrl,
        shareTitle,
        shareDescription: SHARE_DESCRIPTION,
        shareImageUrl: SHARE_IMAGE_URL
    };
    if (introSalutation) guest.introSalutation = introSalutation;
    return guest;
}

function guestToData(guest) {
    const { slug, ...data } = guest;
    return data;
}

function writeGuestsFile(guests) {
    const guestMap = {};
    guests.forEach((guest) => {
        guestMap[guest.slug] = guestToData(guest);
    });

    const output = [
        "window.dadDontLieInvitationGuests = ",
        JSON.stringify(guestMap, null, 4),
        ";\n",
        "if (window.dadDontLieInvitationConfig) {\n",
        "    window.dadDontLieInvitationConfig.guests = window.dadDontLieInvitationGuests;\n",
        "}\n"
    ].join("");

    fs.writeFileSync(GUESTS_OUTPUT_PATH, output);
}

function buildHtml(template, guest) {
    const publicUrl = `${SITE_INVITATION_BASE}/${guest.slug}/`;
    let html = template;
    html = replaceTag(html, "title", `${guest.shareTitle} - ${SHARE_DESCRIPTION} | Phạm Hữu Trí`);
    html = replaceMeta(html, "name", "description", SHARE_DESCRIPTION);
    html = replaceLink(html, "canonical", publicUrl);
    html = replaceMeta(html, "property", "og:url", publicUrl);
    html = replaceMeta(html, "property", "og:title", guest.shareTitle);
    html = replaceMeta(html, "property", "og:description", SHARE_DESCRIPTION);
    html = replaceMeta(html, "property", "og:image", SHARE_IMAGE_URL);
    html = replaceMeta(html, "property", "og:image:secure_url", SHARE_IMAGE_URL);
    html = replaceMeta(html, "property", "og:image:type", "image/jpeg");
    html = replaceMeta(html, "property", "og:image:width", SHARE_IMAGE_WIDTH);
    html = replaceMeta(html, "property", "og:image:height", SHARE_IMAGE_HEIGHT);
    html = replaceMeta(html, "property", "og:image:alt", SHARE_IMAGE_ALT);
    html = replaceMeta(html, "name", "twitter:title", guest.shareTitle);
    html = replaceMeta(html, "name", "twitter:description", SHARE_DESCRIPTION);
    html = replaceMeta(html, "name", "twitter:image", SHARE_IMAGE_URL);
    html = replaceMeta(html, "name", "twitter:image:alt", SHARE_IMAGE_ALT);
    return html;
}

function writeGuestHtml(guests) {
    const template = fs.readFileSync(INDEX_TEMPLATE_PATH, "utf8");
    guests.forEach((guest) => {
        if (CUSTOM_HTML_SLUGS.has(guest.slug)) return;

        const html = buildHtml(template, guest);
        const guestDirs = [
            path.join(CLEAN_GUEST_HTML_DIR, guest.slug),
            path.join(GUEST_HTML_DIR, guest.slug)
        ];

        guestDirs.forEach((guestDir) => {
            fs.mkdirSync(guestDir, { recursive: true });
            fs.writeFileSync(path.join(guestDir, "index.html"), html);
        });
    });
}

function updateRedirects(guests) {
    const startMarker = "# dad-dont-lie invitations:start";
    const endMarker = "# dad-dont-lie invitations:end";
    const redirectLines = guests.flatMap((guest) => [
        `${PUBLIC_INVITATION_BASE}/khach-moi/${guest.slug}   ${PUBLIC_INVITATION_BASE}/${guest.slug}/   301`,
        `${PUBLIC_INVITATION_BASE}/khach-moi/${guest.slug}/  ${PUBLIC_INVITATION_BASE}/${guest.slug}/   301`
    ]);
    const block = [startMarker, ...redirectLines, endMarker].join("\n");
    let redirects = fs.readFileSync(REDIRECTS_PATH, "utf8");

    if (redirects.includes(startMarker) && redirects.includes(endMarker)) {
        redirects = redirects.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), block);
    } else {
        redirects = redirects
            .split("\n")
            .filter((line) => !line.startsWith(`${PUBLIC_INVITATION_BASE}/nguyen-tung-lam`))
            .join("\n");
        const wildcard = `${PUBLIC_INVITATION_BASE}/*`;
        const wildcardIndex = redirects.indexOf(wildcard);
        if (wildcardIndex === -1) {
            redirects = `${redirects.trimEnd()}\n${block}\n`;
        } else {
            redirects = `${redirects.slice(0, wildcardIndex)}${block}\n${redirects.slice(wildcardIndex)}`;
        }
    }

    fs.writeFileSync(REDIRECTS_PATH, `${redirects.trimEnd()}\n`);
}

function main() {
    const records = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
    const usedSlugs = new Set();
    const guests = records
        .filter((record) => record.displayName)
        .map((record) => {
            const slug = uniqueSlug(slugify(record.slug || record.displayName), usedSlugs);
            return buildGuest(record, slug);
        });

    writeGuestsFile(guests);
    writeGuestHtml(guests);
    updateRedirects(guests);

    console.log(`Generated ${guests.length} invitation(s):`);
    guests.forEach((guest) => {
        console.log(`${SITE_INVITATION_BASE}/${guest.slug}/`);
    });
}

main();
