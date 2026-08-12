(function () {
    const PUBLIC_INVITATION_BASE = "https://phamhuutri.com/short-films/dad-dont-lie/invitation";
    const MESSAGE_VISIBILITY_API_URL = "/api/invitation-message-visibility";
    const PASSWORD_HASH = "1e72293938c5f5a7d5b20fccbd9e59ab0c5c82b0db3bbd2a95a635e4a74e5fa3";
    const SESSION_KEY = "dad-dont-lie-dashboard-unlocked";
    const SESSION_PASSWORD_KEY = "dad-dont-lie-dashboard-password";
    const DEFAULT_SAMPLE_MESSAGE = "Đây là lời nhắn. ".repeat(20).trim();

    const lockScreen = document.querySelector("[data-lock-screen]");
    const dashboardView = document.querySelector("[data-dashboard-view]");
    const passwordForm = document.querySelector("[data-password-form]");
    const passwordInput = document.querySelector("[data-password-input]");
    const formMessage = document.querySelector("[data-form-message]");
    const searchInput = document.querySelector("[data-search-input]");
    const guestList = document.querySelector("[data-guest-list]");
    const emptyState = document.querySelector("[data-empty-state]");
    const summary = document.querySelector("[data-summary]");
    const copyAllButton = document.querySelector("[data-copy-all]");
    const copyVisibilityButton = document.querySelector("[data-copy-visibility]");
    const downloadVisibilityButton = document.querySelector("[data-download-visibility]");
    const hideAllButton = document.querySelector("[data-hide-all]");
    const showAllButton = document.querySelector("[data-show-all]");
    const lockButton = document.querySelector("[data-lock-button]");
    const privacyStatus = document.querySelector("[data-privacy-status]");

    const guests = Object.entries(window.dadDontLieInvitationGuests || {}).map(([slug, guest], index) => ({
        index: index + 1,
        slug,
        ...guest,
        invitationUrl: `${PUBLIC_INVITATION_BASE}/${slug}/`
    }));

    let adminPassword = sessionStorage.getItem(SESSION_PASSWORD_KEY) || "";
    let visibilityState = normalizeVisibility(window.dadDontLieMessageVisibility || {});
    let isSavingVisibility = false;

    function toHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    async function hashValue(value) {
        if (!crypto.subtle) return sha256Fallback(value);
        const encoded = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest("SHA-256", encoded);
        return toHex(digest);
    }

    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }

    function sha256Fallback(value) {
        const maxWord = 2 ** 32;
        const words = [];
        const ascii = unescape(encodeURIComponent(value));
        const hash = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        const k = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        for (let i = 0; i < ascii.length; i += 1) {
            words[i >> 2] |= ascii.charCodeAt(i) << ((3 - i) % 4 * 8);
        }
        words[ascii.length >> 2] |= 0x80 << ((3 - ascii.length) % 4 * 8);
        words[((ascii.length + 8) >> 6 << 4) + 15] = ascii.length * 8;

        for (let chunk = 0; chunk < words.length; chunk += 16) {
            const w = words.slice(chunk, chunk + 16);
            let a = hash[0];
            let b = hash[1];
            let c = hash[2];
            let d = hash[3];
            let e = hash[4];
            let f = hash[5];
            let g = hash[6];
            let h = hash[7];

            for (let i = 0; i < 64; i += 1) {
                w[i] = w[i] || 0;
                if (i >= 16) {
                    const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                    const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
                }

                const ch = (e & f) ^ (~e & g);
                const maj = (a & b) ^ (a & c) ^ (b & c);
                const sigma0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                const sigma1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                const temp1 = (h + sigma1 + ch + k[i] + w[i]) >>> 0;
                const temp2 = (sigma0 + maj) >>> 0;

                h = g;
                g = f;
                f = e;
                e = (d + temp1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) >>> 0;
            }

            hash[0] = (hash[0] + a) >>> 0;
            hash[1] = (hash[1] + b) >>> 0;
            hash[2] = (hash[2] + c) >>> 0;
            hash[3] = (hash[3] + d) >>> 0;
            hash[4] = (hash[4] + e) >>> 0;
            hash[5] = (hash[5] + f) >>> 0;
            hash[6] = (hash[6] + g) >>> 0;
            hash[7] = (hash[7] + h) >>> 0;
        }

        return hash
            .map((item) => item.toString(16).padStart(8, "0"))
            .join("");
    }

    function getOwnValue(object, key) {
        if (!object || !Object.prototype.hasOwnProperty.call(object, key)) return undefined;
        return object[key];
    }

    function normalizeVisibility(source) {
        const normalized = {
            defaultShowRealMessage: Boolean(source.defaultShowRealMessage),
            sampleMessage: source.sampleMessage || DEFAULT_SAMPLE_MESSAGE,
            showRealMessageFor: {}
        };

        Object.entries(source.showRealMessageFor || {}).forEach(([slug, value]) => {
            normalized.showRealMessageFor[slug] = Boolean(value);
        });

        return normalized;
    }

    function hasRealMessage(guest) {
        return Boolean(guest && guest.showLetter && guest.message);
    }

    function isRealMessageVisible(guest) {
        const slug = typeof guest === "string" ? guest : guest.slug;
        if (typeof guest !== "string" && !hasRealMessage(guest)) return false;
        const override = getOwnValue(visibilityState.showRealMessageFor, slug);
        if (override !== undefined) return Boolean(override);
        return Boolean(visibilityState.defaultShowRealMessage);
    }

    function setPrivacyStatus(value, isError) {
        if (!privacyStatus) return;
        privacyStatus.textContent = value || "";
        privacyStatus.classList.toggle("is-error", Boolean(isError));
    }

    async function loadRemoteVisibility() {
        try {
            const response = await fetch(MESSAGE_VISIBILITY_API_URL, { cache: "no-store" });
            if (!response.ok) throw new Error("Cannot load message visibility.");
            visibilityState = normalizeVisibility(await response.json());
            setPrivacyStatus("Đã tải trạng thái từ D1.");
        } catch (error) {
            visibilityState = normalizeVisibility(window.dadDontLieMessageVisibility || {});
            setPrivacyStatus("Chưa kết nối được D1, đang dùng trạng thái fallback.", true);
        }
        renderGuests();
    }

    async function saveRemoteVisibility(previousState) {
        if (!adminPassword) {
            setPrivacyStatus("Hãy lock rồi mở lại dashboard để lưu thay đổi lên D1.", true);
            visibilityState = previousState;
            renderGuests();
            return;
        }

        isSavingVisibility = true;
        renderGuests();
        setPrivacyStatus("Đang lưu trạng thái lên D1...");

        try {
            const response = await fetch(MESSAGE_VISIBILITY_API_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-dashboard-password": adminPassword
                },
                body: JSON.stringify(visibilityState)
            });
            if (!response.ok) throw new Error("Cannot save message visibility.");
            visibilityState = normalizeVisibility(await response.json());
            setPrivacyStatus("Đã lưu lên D1. Người mở thiệp ở thiết bị khác sẽ thấy trạng thái mới.");
        } catch (error) {
            visibilityState = previousState;
            setPrivacyStatus("Không lưu được lên D1. Mình đã hoàn tác thay đổi vừa rồi.", true);
        }

        isSavingVisibility = false;
        renderGuests();
    }

    function cloneVisibilityState() {
        return normalizeVisibility(JSON.parse(JSON.stringify(visibilityState)));
    }

    function setAllVisibility(value) {
        const previousState = cloneVisibilityState();
        visibilityState.defaultShowRealMessage = Boolean(value);
        visibilityState.showRealMessageFor = {};
        renderGuests();
        saveRemoteVisibility(previousState);
    }

    function setGuestVisibility(slug, value) {
        const guest = guests.find((item) => item.slug === slug);
        if (value && !hasRealMessage(guest)) return;
        const previousState = cloneVisibilityState();
        visibilityState.showRealMessageFor[slug] = Boolean(value);
        renderGuests();
        saveRemoteVisibility(previousState);
    }

    function buildVisibilityFile() {
        const payload = {
            defaultShowRealMessage: visibilityState.defaultShowRealMessage,
            sampleMessage: visibilityState.sampleMessage,
            showRealMessageFor: {}
        };

        guests.forEach((guest) => {
            const override = getOwnValue(visibilityState.showRealMessageFor, guest.slug);
            if (override !== undefined && override !== visibilityState.defaultShowRealMessage) {
                payload.showRealMessageFor[guest.slug] = Boolean(override);
            }
        });

        const json = JSON.stringify(payload, null, 4).replace(/^/gm, "    ").trimStart();
        return [
            "(function () {",
            "    window.dadDontLieMessageVisibility = " + json,
            ";",
            "}());",
            ""
        ].join("\n");
    }

    function downloadText(filename, value) {
        const blob = new Blob([value], { type: "text/javascript;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    async function setUnlocked(unlocked) {
        if (unlocked) {
            sessionStorage.setItem(SESSION_KEY, "1");
            lockScreen.hidden = true;
            dashboardView.hidden = false;
            renderGuests();
            await loadRemoteVisibility();
            searchInput.focus();
            return;
        }

        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_PASSWORD_KEY);
        adminPassword = "";
        lockScreen.hidden = false;
        dashboardView.hidden = true;
        passwordInput.value = "";
        passwordInput.focus();
    }

    function normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function icon(name) {
        return `<span class="material-symbols-rounded" aria-hidden="true">${name}</span>`;
    }

    function copyText(value) {
        return navigator.clipboard.writeText(value);
    }

    function setButtonDone(button, html, timeoutHtml) {
        button.innerHTML = html;
        window.setTimeout(() => {
            button.innerHTML = timeoutHtml;
        }, 1200);
    }

    function renderGuests() {
        const query = normalize(searchInput.value);
        const filteredGuests = guests.filter((guest) => {
            const searchable = [
                guest.displayName,
                guest.ticketRole,
                guest.ticketDisplayName,
                guest.slug,
                guest.invitationUrl
            ].join(" ");
            return normalize(searchable).includes(query);
        });

        const visibleCount = guests.filter((guest) => isRealMessageVisible(guest)).length;
        const savingText = isSavingVisibility ? " · dang luu D1" : "";
        summary.textContent = `${guests.length} thiep moi dang san sang · ${visibleCount} dang hien loi that${savingText}`;
        emptyState.hidden = filteredGuests.length > 0;

        guestList.innerHTML = filteredGuests.map((guest) => {
            const canShowRealMessage = hasRealMessage(guest);
            const checked = isRealMessageVisible(guest);
            const status = checked ? "Loi that" : "Sample";
            const meta = [
                `#${String(guest.index).padStart(2, "0")}`,
                guest.ticketRole || "Khach moi",
                guest.slug,
                status
            ];

            return `
                <article class="guest-row">
                    <label class="message-toggle">
                        <input type="checkbox" data-show-real-message="${guest.slug}" ${checked ? "checked" : ""} ${isSavingVisibility || !canShowRealMessage ? "disabled" : ""}>
                        Hiện lời thật
                    </label>
                    <div>
                        <p class="guest-name">${guest.ticketDisplayName || guest.displayName}</p>
                        <p class="guest-meta">${meta.map((item) => `<span>${item}</span>`).join("")}</p>
                        <a class="guest-link" href="${guest.invitationUrl}" target="_blank" rel="noopener noreferrer">${guest.invitationUrl}</a>
                    </div>
                    <div class="row-actions">
                        <button class="icon-button" type="button" data-copy-link="${guest.slug}" aria-label="Copy invitation link">${icon("content_copy")}</button>
                        <a class="icon-button" href="${guest.invitationUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open invitation">${icon("open_in_new")}</a>
                        <a class="icon-button" href="${guest.storyVideoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open intro video">${icon("movie")}</a>
                    </div>
                </article>
            `;
        }).join("");
    }

    passwordForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        formMessage.textContent = "";

        const normalizedPassword = passwordInput.value.trim().toUpperCase();
        const inputHash = await hashValue(normalizedPassword);
        if (inputHash === PASSWORD_HASH) {
            adminPassword = normalizedPassword;
            sessionStorage.setItem(SESSION_PASSWORD_KEY, adminPassword);
            setUnlocked(true);
        } else {
            formMessage.textContent = "Sai password.";
            passwordInput.select();
        }
    });

    searchInput.addEventListener("input", renderGuests);

    guestList.addEventListener("change", (event) => {
        const checkbox = event.target.closest("[data-show-real-message]");
        if (!checkbox) return;
        setGuestVisibility(checkbox.dataset.showRealMessage, checkbox.checked);
    });

    guestList.addEventListener("click", async (event) => {
        const copyButton = event.target.closest("[data-copy-link]");
        if (!copyButton) return;

        const guest = guests.find((item) => item.slug === copyButton.dataset.copyLink);
        if (!guest) return;

        await copyText(guest.invitationUrl);
        setButtonDone(copyButton, icon("check"), icon("content_copy"));
    });

    hideAllButton.addEventListener("click", () => setAllVisibility(false));
    showAllButton.addEventListener("click", () => setAllVisibility(true));

    copyVisibilityButton.addEventListener("click", async () => {
        await copyText(buildVisibilityFile());
        setButtonDone(copyVisibilityButton, `${icon("check")}Copied`, `${icon("content_copy")}Copy file`);
    });

    downloadVisibilityButton.addEventListener("click", () => {
        downloadText("invitation-message-visibility.js", buildVisibilityFile());
        setButtonDone(downloadVisibilityButton, `${icon("check")}Downloaded`, `${icon("download")}Download file`);
    });

    copyAllButton.addEventListener("click", async () => {
        const output = guests
            .map((guest) => `${guest.displayName}: ${guest.invitationUrl}`)
            .join("\n");
        await copyText(output);
        setButtonDone(copyAllButton, `${icon("check")}Copied`, `${icon("content_copy")}Copy all`);
    });

    lockButton.addEventListener("click", () => setUnlocked(false));

    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
}());
