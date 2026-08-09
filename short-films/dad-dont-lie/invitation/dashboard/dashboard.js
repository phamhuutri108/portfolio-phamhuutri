(function () {
    const PUBLIC_INVITATION_BASE = "https://phamhuutri.com/short-films/dad-dont-lie/invitation";
    const PASSWORD_HASH = "1e72293938c5f5a7d5b20fccbd9e59ab0c5c82b0db3bbd2a95a635e4a74e5fa3";
    const SESSION_KEY = "dad-dont-lie-dashboard-unlocked";

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
    const lockButton = document.querySelector("[data-lock-button]");

    const guests = Object.entries(window.dadDontLieInvitationGuests || {}).map(([slug, guest], index) => ({
        index: index + 1,
        slug,
        ...guest,
        invitationUrl: `${PUBLIC_INVITATION_BASE}/${slug}`
    }));

    function toHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    async function hashValue(value) {
        const encoded = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest("SHA-256", encoded);
        return toHex(digest);
    }

    function setUnlocked(unlocked) {
        if (unlocked) {
            sessionStorage.setItem(SESSION_KEY, "1");
            lockScreen.hidden = true;
            dashboardView.hidden = false;
            renderGuests();
            searchInput.focus();
            return;
        }

        sessionStorage.removeItem(SESSION_KEY);
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

        summary.textContent = `${guests.length} thiep moi dang san sang`;
        emptyState.hidden = filteredGuests.length > 0;

        guestList.innerHTML = filteredGuests.map((guest) => {
            const meta = [
                `#${String(guest.index).padStart(2, "0")}`,
                guest.ticketRole || "Khach moi",
                guest.slug
            ];

            return `
                <article class="guest-row">
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

        if (!crypto.subtle) {
            formMessage.textContent = "Trinh duyet nay khong ho tro mo khoa dashboard.";
            return;
        }

        const inputHash = await hashValue(passwordInput.value);
        if (inputHash === PASSWORD_HASH) {
            setUnlocked(true);
        } else {
            formMessage.textContent = "Sai password.";
            passwordInput.select();
        }
    });

    searchInput.addEventListener("input", renderGuests);

    guestList.addEventListener("click", async (event) => {
        const copyButton = event.target.closest("[data-copy-link]");
        if (!copyButton) return;

        const guest = guests.find((item) => item.slug === copyButton.dataset.copyLink);
        if (!guest) return;

        await copyText(guest.invitationUrl);
        copyButton.innerHTML = icon("check");
        window.setTimeout(() => {
            copyButton.innerHTML = icon("content_copy");
        }, 1200);
    });

    copyAllButton.addEventListener("click", async () => {
        const output = guests
            .map((guest) => `${guest.displayName}: ${guest.invitationUrl}`)
            .join("\n");
        await copyText(output);
        copyAllButton.innerHTML = `${icon("check")}Copied`;
        window.setTimeout(() => {
            copyAllButton.innerHTML = `${icon("content_copy")}Copy all`;
        }, 1200);
    });

    lockButton.addEventListener("click", () => setUnlocked(false));

    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
}());
