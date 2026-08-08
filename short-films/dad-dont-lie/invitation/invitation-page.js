(function () {
    function getCurrentSlug() {
        var path = window.location.pathname.replace(/\/+$/, "");
        var marker = "/short-films/dad-dont-lie/invitation/";
        var markerIndex = path.indexOf(marker);
        if (markerIndex === -1) return "nguyen-tung-lam";
        var slug = path.slice(markerIndex + marker.length).split("/")[0];
        return slug || "nguyen-tung-lam";
    }

    function text(value, fallback) {
        return value || fallback || "";
    }

    function setText(selector, value) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            element.textContent = value;
        });
    }

    function setImage(selector, src, alt) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (image) {
            if (!src) return;
            image.src = src;
            image.alt = alt || "";
        });
    }

    function setMeta(selector, value) {
        var tag = document.querySelector(selector);
        if (tag && value) tag.setAttribute("content", value);
    }

    function setPhoneLink(selector, value) {
        var phone = text(value);
        var hrefPhone = phone.replace(/[^\d+]/g, "");
        var links = document.querySelectorAll(selector);
        links.forEach(function (link) {
            link.textContent = phone;
            if (hrefPhone) link.href = "tel:" + hrefPhone;
        });
    }

    function showIntroCard() {
        var intro = document.getElementById("intro-screen");
        if (intro) intro.classList.add("card-visible");
    }

    function openInvitation() {
        var target = document.getElementById("invitation-root");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function setDownload(selector, url, filename) {
        var links = document.querySelectorAll(selector);
        links.forEach(function (link) {
            if (!url) {
                link.href = "#";
                link.classList.add("is-disabled");
                link.setAttribute("aria-disabled", "true");
                link.title = "Chưa có file download. Gắn URL asset trong invitation-data.js.";
                return;
            }
            link.href = url;
            link.classList.remove("is-disabled");
            link.removeAttribute("aria-disabled");
            if (filename) link.setAttribute("download", filename);
        });
    }

    function setupIntro(config) {
        var video = document.getElementById("intro-video");
        var fallback = document.getElementById("intro-fallback");
        var cue = document.getElementById("scroll-cue");
        var soundStart = document.getElementById("sound-start");

        if (fallback) fallback.src = config.fallbackStillUrl || config.posterUrl || "";
        if (cue) cue.addEventListener("click", openInvitation);
        if (soundStart) {
            soundStart.addEventListener("click", function () {
                soundStart.hidden = true;
                video.muted = false;
                video.volume = 1;
                video.play().catch(showIntroCard);
            });
        }

        if (!config.introVideoUrl) {
            var intro = document.getElementById("intro-screen");
            if (intro) intro.classList.add("no-video");
            window.setTimeout(showIntroCard, 900);
            return;
        }

        video.src = config.introVideoUrl;
        video.muted = false;
        video.volume = 1;
        video.addEventListener("ended", showIntroCard);
        video.addEventListener("error", showIntroCard);

        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
                if (soundStart) soundStart.hidden = false;
            });
        }

        window.setTimeout(function () {
            if (!document.querySelector(".intro-screen.card-visible") && video.readyState < 2) {
                showIntroCard();
            }
        }, 4000);
    }

    function renderMissing(slug) {
        var intro = document.getElementById("intro-screen");
        var root = document.getElementById("invitation-root");
        if (intro) intro.remove();
        if (!root) return;
        root.innerHTML = [
            '<section class="missing">',
            "<h1>Invitation not found</h1>",
            "<p>No invitation data exists for " + slug + ".</p>",
            "</section>"
        ].join("");
    }

    function renderInvitation() {
        var data = window.dadDontLieInvitationConfig;
        if (!data || !data.guests) return;

        var slug = getCurrentSlug();
        var guest = data.guests[slug];
        if (!guest) {
            renderMissing(slug);
            return;
        }

        var title = text(guest.shareTitle, "Lời mời đến " + guest.displayName);
        var description = text(guest.shareDescription, text(data.filmTitleVi, data.filmTitle));
        var shareImage = text(guest.shareImageUrl, data.shareImageUrl || data.posterUrl);
        document.title = title;
        setMeta('meta[name="description"]', description);
        setMeta('meta[property="og:title"]', title);
        setMeta('meta[property="og:description"]', description);
        setMeta('meta[property="og:url"]', window.location.href);
        setMeta('meta[property="og:image"]', shareImage);
        setMeta('meta[name="twitter:title"]', title);
        setMeta('meta[name="twitter:description"]', description);
        setMeta('meta[name="twitter:image"]', shareImage);

        setText("[data-film-title]", text(data.introFilmTitle, data.filmTitle));
        setText("[data-intro-salutation]", text(data.introSalutation, "Mến gửi"));
        setText("[data-host-name]", data.hostName);
        setText("[data-ticket-host]", data.hostName);
        setText("[data-ticket-title]", data.filmTitle);
        setText("[data-dear-name]", text(guest.dearName, guest.displayName));
        setText("[data-letter-title]", text(guest.letterTitle, "Gửi " + text(guest.dearName, guest.displayName) + ","));
        setText("[data-ticket-dear-name]", text(guest.ticketName, guest.dearName || guest.displayName));
        setText("[data-story-line]", text(guest.storyLine, data.introStoryLine || "Trân trọng mời anh đến buổi chiếu phim thân mật"));
        setText("[data-message]", guest.message);
        setText("[data-role]", text(guest.ticketRole, guest.role || "Guest"));
        setText("[data-invitation-id]", text(guest.invitationId, "DDL-000"));
        setText("[data-event-date]", text(guest.eventDate, data.eventDate));
        setText("[data-event-time]", text(guest.eventTime, data.eventTime));
        setText("[data-theater-name]", text(guest.theaterName, data.theaterName));
        setText("[data-location-name]", text(guest.locationName, data.locationName));
        setText("[data-location-address]", text(guest.locationAddress, data.locationAddress));
        setPhoneLink("[data-contact-info]", text(guest.contactInfo, data.contactInfo));
        setText("[data-note]", text(guest.note, data.note));

        var posterUrl = text(guest.posterUrl, data.posterUrl);
        var ticketImageUrl = text(guest.ticketImageUrl, data.ticketImageUrl || data.fallbackStillUrl || posterUrl);
        var secondaryTicketImageUrl = text(guest.secondaryTicketImageUrl, data.secondaryTicketImageUrl);
        setImage("[data-poster]", posterUrl, "Dad, Don't Lie poster");
        setImage("[data-ticket-image]", ticketImageUrl, "Dad, Don't Lie still frame");
        setImage("[data-ticket-image-secondary]", secondaryTicketImageUrl, "Dad, Don't Lie still frame");

        var posterLabel = document.querySelector("[data-poster-placeholder]");
        if (posterLabel) {
            var label = guest.posterPlaceholderLabel || data.posterPlaceholderLabel;
            posterLabel.textContent = label || "";
            posterLabel.hidden = !label;
        }

        var map = document.querySelector("[data-map-link]");
        if (map) map.href = text(guest.mapUrl, data.mapUrl);

        setDownload("[data-download-story-image]", text(guest.storyImageUrl, data.storyImageUrl || posterUrl), "dad-dont-lie-story.jpg");
        setDownload("[data-download-story-video]", text(guest.storyVideoUrl, data.storyVideoUrl), "dad-dont-lie-story.mp4");
        setDownload("[data-download-full-video]", text(guest.fullInvitationVideoUrl, data.fullInvitationVideoUrl), "dad-dont-lie-invitation.mp4");

        setupIntro(Object.assign({}, data, {
            introVideoUrl: text(guest.introVideoUrl, data.introVideoUrl)
        }));
    }

    document.addEventListener("DOMContentLoaded", renderInvitation);
})();
