(function () {
    var MESSAGE_VISIBILITY_API_URL = "/api/invitation-message-visibility";
    var MESSAGE_VISIBILITY_TIMEOUT_MS = 1800;

    function getCurrentSlug() {
        var hash = window.location.hash.replace(/^#/, "").trim();
        if (hash) {
            try {
                hash = decodeURIComponent(hash);
            } catch (error) {
                // Keep the original hash when it is not valid URI encoding.
            }

            var hashSlug = hash.replace(/^invite=/, "").replace(/^\/+|\/+$/g, "");
            if (/^[a-z0-9-]+$/.test(hashSlug)) return hashSlug;
        }

        var path = window.location.pathname.replace(/\/+$/, "");
        var marker = "/short-films/dad-dont-lie/invitation/";
        var markerIndex = path.indexOf(marker);
        if (markerIndex === -1) return "nguyen-tung-lam";
        var parts = path.slice(markerIndex + marker.length).split("/").filter(Boolean);
        var slug = parts[0] === "khach-moi" ? parts[1] : parts[0];
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

    function setHidden(selector, hidden) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            element.hidden = Boolean(hidden);
        });
    }

    function toggleClass(selector, className, enabled) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            element.classList.toggle(className, Boolean(enabled));
        });
    }

    function getOwnValue(object, key) {
        if (!object || !Object.prototype.hasOwnProperty.call(object, key)) return undefined;
        return object[key];
    }

    async function fetchRemoteMessageVisibility() {
        var controller = window.AbortController ? new AbortController() : null;
        var timeout = window.setTimeout(function () {
            if (controller) controller.abort();
        }, MESSAGE_VISIBILITY_TIMEOUT_MS);

        try {
            var response = await fetch(MESSAGE_VISIBILITY_API_URL, {
                cache: "no-store",
                signal: controller ? controller.signal : undefined
            });
            if (!response.ok) throw new Error("Message visibility API failed.");
            return await response.json();
        } catch (error) {
            return null;
        } finally {
            window.clearTimeout(timeout);
        }
    }

    async function getMessageVisibility() {
        var source = window.dadDontLieMessageVisibility || {};
        var remote = await fetchRemoteMessageVisibility();
        var remoteDefault = getOwnValue(remote, "defaultShowRealMessage");
        var remoteSample = getOwnValue(remote, "sampleMessage");
        return {
            defaultShowRealMessage: Boolean(remoteDefault !== undefined ? remoteDefault : source.defaultShowRealMessage),
            sampleMessage: text(remoteSample !== undefined ? remoteSample : "", source.sampleMessage),
            showRealMessageFor: Object.assign({}, source.showRealMessageFor || {}, remote && remote.showRealMessageFor || {})
        };
    }

    function shouldShowRealMessage(slug, visibility) {
        var override = getOwnValue(visibility.showRealMessageFor, slug);
        if (override !== undefined) return Boolean(override);
        return Boolean(visibility.defaultShowRealMessage);
    }

    function getSampleMessage(visibility) {
        return text(visibility.sampleMessage, "Đây là lời nhắn. ".repeat(20).trim());
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

    function setContactInfo(config, guest) {
        var phone = text(guest.contactPhone, config.contactPhone);
        var contactName = text(guest.contactName, config.contactName);
        var suffix = contactName ? " - " + contactName : "";
        setPhoneLink("[data-contact-phone]", phone);
        setText("[data-contact-name]", suffix);
    }

    function renderSchedule(value) {
        var schedule = document.querySelector("[data-note-timeline]");
        var fallback = document.querySelector("[data-note]");
        var source = text(value);
        var rows = source
            .split(/\r?\n/)
            .map(function (line) {
                return line.trim();
            })
            .filter(Boolean)
            .map(function (line) {
                var dotParts = line.split("·");
                var time = "";
                var title = "";
                var rangeMatch = line.match(/^(\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2})\s*:\s*(.+)$/);

                if (dotParts.length > 1) {
                    time = dotParts.shift();
                    title = dotParts.join("·").trim();
                } else if (rangeMatch) {
                    time = rangeMatch[1];
                    title = rangeMatch[2];
                } else {
                    var parts = line.split(":");
                    time = parts.shift();
                    title = parts.join(":").trim();
                }

                return {
                    time: (time || "").trim(),
                    title: title || line
                };
            });

        if (!schedule || rows.length === 0) {
            if (fallback) {
                fallback.textContent = source;
                fallback.hidden = !source;
            }
            return;
        }

        schedule.innerHTML = "";
        rows.forEach(function (row) {
            var item = document.createElement("div");
            var time = document.createElement("span");
            var dot = document.createElement("span");
            var title = document.createElement("span");

            item.className = "schedule-item";
            time.className = "schedule-time";
            dot.className = "schedule-dot";
            title.className = "schedule-title";

            time.textContent = row.time;
            title.textContent = row.title;

            item.appendChild(time);
            item.appendChild(dot);
            item.appendChild(title);
            schedule.appendChild(item);
        });
        schedule.hidden = false;
        if (fallback) fallback.hidden = true;
    }

    function showIntroCard() {
        var intro = document.getElementById("intro-screen");
        if (intro) intro.classList.add("card-visible");
    }

    function openInvitation() {
        var target = document.getElementById("invitation-root");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function setDownloadStatus(value) {
        var status = document.querySelector("[data-download-status]");
        if (status) status.textContent = value || "";
    }

    function setDownloadLabel(link, value) {
        var label = link.querySelector("[data-download-label]");
        if (label) label.textContent = value;
    }

    function getVideoFilename(url, fallback) {
        try {
            var pathname = new URL(url, window.location.href).pathname;
            var name = pathname.split("/").filter(Boolean).pop();
            return name || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function saveBlob(blob, filename) {
        var blobUrl = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(function () {
            URL.revokeObjectURL(blobUrl);
        }, 1000);
    }

    function openDirectDownload(url) {
        window.location.href = url;
    }

    async function shareVideoToPhotos(url, filename, link) {
        var resolvedFilename = getVideoFilename(url, filename || "dad-dont-lie-story.mp4");
        link.classList.add("is-busy");
        setDownloadLabel(link, "Đang chuẩn bị");
        setDownloadStatus("Đang chuẩn bị video...");

        try {
            var response = await fetch(url, { mode: "cors", credentials: "omit" });
            if (!response.ok) throw new Error("Video response was not ok.");

            var blob = await response.blob();
            var file = new File([blob], resolvedFilename, { type: blob.type || "video/mp4" });
            var canShareFile = navigator.share && navigator.canShare && navigator.canShare({ files: [file] });

            if (canShareFile) {
                setDownloadStatus("Chọn Lưu video trong bảng chia sẻ của iPhone.");
                await navigator.share({
                    files: [file],
                    title: "Ba Ơi, Đừng Nói Dối"
                });
            } else {
                setDownloadStatus("Trình duyệt này không hỗ trợ lưu vào album ảnh. Đang tải file video.");
                saveBlob(blob, resolvedFilename);
            }
        } catch (error) {
            setDownloadStatus("Không thể chuẩn bị file tự động. Đang mở video gốc.");
            window.setTimeout(function () {
                openDirectDownload(url);
            }, 450);
        } finally {
            link.classList.remove("is-busy");
            setDownloadLabel(link, "Download video");
        }
    }

    function setDownload(selector, url, filename, options) {
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
            if (options && options.shareVideo) {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    if (link.classList.contains("is-busy")) return;
                    shareVideoToPhotos(url, filename, link);
                });
            }
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

    async function renderInvitation() {
        var data = window.dadDontLieInvitationConfig;
        if (!data || !data.guests) return;

        var slug = getCurrentSlug();
        if (window.location.hash && slug === "cha-bong") {
            window.location.replace("/short-films/dad-dont-lie/invitation/cha-bong/");
            return;
        }

        var guest = data.guests[slug];
        if (!guest) {
            renderMissing(slug);
            return;
        }

        var title = text(guest.shareTitle, "Lời mời đến " + guest.displayName);
        var description = text(guest.shareDescription, text(data.filmTitleVi, data.filmTitle));
        var shareImage = text(guest.shareImageUrl, data.shareImageUrl || data.posterUrl);
        var shareUrl = window.location.hash
            ? window.location.origin + window.location.pathname + window.location.search
            : window.location.href;
        document.title = title;
        setMeta('meta[name="description"]', description);
        setMeta('meta[property="og:title"]', title);
        setMeta('meta[property="og:description"]', description);
        setMeta('meta[property="og:url"]', shareUrl);
        setMeta('meta[property="og:image"]', shareImage);
        setMeta('meta[name="twitter:title"]', title);
        setMeta('meta[name="twitter:description"]', description);
        setMeta('meta[name="twitter:image"]', shareImage);

        setText("[data-film-title]", text(data.introFilmTitle, data.filmTitle));
        setText("[data-intro-salutation]", text(guest.introSalutation, data.introSalutation || "Mến gửi"));
        setText("[data-host-name]", data.hostName);
        setText("[data-ticket-host]", data.hostName);
        setText("[data-ticket-title]", data.filmTitle);
        var dearName = text(guest.dearName, guest.displayName);
        var namePrefix = text(guest.namePrefix);
        var visibility = await getMessageVisibility();
        var sampleMessage = getSampleMessage(visibility);
        var realMessageEnabled = shouldShowRealMessage(slug, visibility);
        var realLetterAvailable = Boolean(guest.showLetter) && Boolean(text(guest.message));
        var showRealLetter = realLetterAvailable && realMessageEnabled;
        var showLetter = realLetterAvailable && Boolean(showRealLetter || sampleMessage);
        var letterTitle = showRealLetter ? text(guest.letterTitle, "Gửi " + dearName + ",") : "Gửi " + dearName + ",";
        var message = showRealLetter ? text(guest.message, sampleMessage) : sampleMessage;
        setText("[data-dear-name]", dearName);
        setText("[data-intro-name-prefix]", namePrefix);
        setHidden("[data-intro-name-prefix]", !namePrefix);
        setText("[data-intro-display-name]", text(guest.displayName, dearName));
        setText("[data-letter-title]", showLetter ? letterTitle : "");
        var ticketRole = text(guest.ticketRole, guest.role);
        setText("[data-ticket-role-prefix]", ticketRole);
        setHidden("[data-ticket-role-prefix]", !ticketRole);
        setText("[data-ticket-name]", text(guest.ticketName, dearName));
        setText("[data-story-line]", text(guest.storyLine, data.introStoryLine || "Trân quý mời anh đến buổi chiếu phim thân mật"));
        setText("[data-message]", showLetter ? message : "");
        setHidden(".letter-copy", !showLetter);
        toggleClass(".letter-section", "no-letter", !showLetter);
        var messageLength = showLetter ? text(message).replace(/\s+/g, " ").trim().length : 0;
        toggleClass(".letter-section", "letter-short", showLetter && messageLength < 420);
        toggleClass(".letter-section", "letter-medium", showLetter && messageLength >= 420 && messageLength < 900);
        toggleClass(".letter-section", "letter-long", showLetter && messageLength >= 900);
        setText("[data-invitation-id]", text(guest.invitationId, "DDL-000"));
        setText("[data-event-date]", text(guest.eventDate, data.eventDate));
        setText("[data-event-time]", text(guest.eventTime, data.eventTime));
        setText("[data-theater-name]", text(guest.theaterName, data.theaterName));
        setText("[data-location-name]", text(guest.locationName, data.locationName));
        setText("[data-location-address]", text(guest.locationAddress, data.locationAddress));
        setContactInfo(data, guest);
        renderSchedule(text(guest.note, data.note));
        setText("[data-note-caption]", text(guest.noteCaption, data.noteCaption));

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
        setDownload("[data-download-story-video]", text(guest.storyVideoUrl, data.storyVideoUrl), "dad-dont-lie-story.mp4", { shareVideo: true });
        setDownload("[data-download-full-video]", text(guest.fullInvitationVideoUrl, data.fullInvitationVideoUrl), "dad-dont-lie-invitation.mp4");

        setupIntro(Object.assign({}, data, {
            introVideoUrl: text(guest.introVideoUrl, data.introVideoUrl)
        }));
    }

    document.addEventListener("DOMContentLoaded", renderInvitation);
})();
