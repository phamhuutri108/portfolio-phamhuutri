(function () {
    var VIDEO_URL = "https://assets.phamhuutri.com/assets/short-films/BODND/invitation/intro/cha-bong.mp4";
    var DOWNLOAD_FILENAME = "cha-bong-dad-dont-lie-story.mp4";

    function text(value, fallback) {
        return value || fallback || "";
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.textContent = value;
        });
    }

    function showIntroNote() {
        var intro = document.getElementById("intro-screen");
        var video = document.getElementById("intro-video");
        var soundStart = document.getElementById("sound-start");
        if (soundStart) soundStart.hidden = true;
        if (video && !video.paused) video.pause();
        if (intro) intro.classList.add("note-visible");
    }

    function openInvitation() {
        var root = document.getElementById("invitation-root");
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (root) root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    function setupIntro() {
        var intro = document.getElementById("intro-screen");
        var video = document.getElementById("intro-video");
        var soundStart = document.getElementById("sound-start");
        var introOpen = document.getElementById("intro-open");
        var progressBar = document.getElementById("intro-progress-bar");

        if (introOpen) introOpen.addEventListener("click", openInvitation);

        if (!video || !VIDEO_URL) {
            if (intro) intro.classList.add("no-video");
            window.setTimeout(showIntroNote, 700);
            return;
        }

        if (!video.currentSrc) video.src = VIDEO_URL;
        video.muted = false;
        video.volume = 1;
        video.addEventListener("timeupdate", function () {
            if (!progressBar || !Number.isFinite(video.duration) || video.duration <= 0) return;
            progressBar.style.transform = "scaleX(" + Math.min(video.currentTime / video.duration, 1) + ")";
        });
        video.addEventListener("ended", showIntroNote);
        video.addEventListener("error", showIntroNote);
        video.load();

        if (soundStart) {
            soundStart.hidden = false;
            soundStart.addEventListener("click", function () {
                soundStart.hidden = true;
                video.muted = false;
                video.play().catch(showIntroNote);
            });
        }
    }

    function parseSchedule(source) {
        return text(source)
            .split(/\r?\n/)
            .map(function (line) {
                return line.trim();
            })
            .filter(Boolean)
            .map(function (line) {
                var rangeMatch = line.match(/^(\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2})\s*:\s*(.+)$/);
                if (rangeMatch) {
                    return {
                        time: rangeMatch[1],
                        title: rangeMatch[2]
                    };
                }

                var parts = line.split(":");
                return {
                    time: parts.shift(),
                    title: parts.join(":").trim() || line
                };
            });
    }

    function renderSchedule(config) {
        var list = document.querySelector("[data-note-timeline]");
        var titleOverrides = {
            "Đón khách": "Đón em 🥸",
            "Chiếu phim": "Chiếu phim cho em 🥸",
            "Giao lưu": "\"Giao lưu\" với em 🥸"
        };
        if (!list) return;

        list.innerHTML = "";
        parseSchedule(config.note).forEach(function (row) {
            var item = document.createElement("p");
            var time = document.createElement("span");
            var title = document.createElement("strong");

            item.className = "timeline-item";
            time.className = "timeline-time";
            title.className = "timeline-title";
            time.textContent = row.time;
            title.textContent = titleOverrides[row.title] || row.title;

            item.appendChild(time);
            item.appendChild(title);
            list.appendChild(item);
        });
    }

    function setupMemories() {
        var collageImages = Array.from({ length: 33 }, function (_, index) {
            var number = index + 1;
            return {
                src: "/short-films/dad-dont-lie/invitation/assets/cha-bong/cha-bong-img-" + number + ".jpeg",
                alt: "Ảnh kỷ niệm Chà Bông " + number,
                caption: "Ảnh kỷ niệm " + number
            };
        });
        var stillFrames = [
            "still-1.jpg",
            "still-2.jpg",
            "still-3.jpeg",
            "still-4.jpg",
            "still-5.jpg",
            "still-6.jpg",
            "still-7.jpg",
            "still-8.jpg"
        ].map(function (filename, index) {
            return {
                src: "/short-films/dad-dont-lie/invitation/assets/cha-bong/still/" + filename,
                alt: "Still frame trong phim Ba Ơi, Đừng Nói Dối " + (index + 1),
                caption: "Still frame " + (index + 1)
            };
        });
        var stillIndex = 0;
        var lightboxItems = [];
        var lightboxIndex = 0;
        var touchStartX = 0;
        var stillImage = document.querySelector("[data-still-image]");
        var stillOpen = document.querySelector("[data-still-open]");
        var stillPrev = document.querySelector("[data-still-prev]");
        var stillNext = document.querySelector("[data-still-next]");
        var lightbox = document.querySelector("[data-photo-lightbox]");
        var lightboxImage = document.querySelector("[data-lightbox-image]");
        var lightboxBackdrop = document.querySelector("[data-lightbox-backdrop]");
        var lightboxPrev = document.querySelector("[data-lightbox-prev]");
        var lightboxNext = document.querySelector("[data-lightbox-next]");
        var puzzle = document.querySelector("[data-memory-puzzle]");
        var puzzleForm = document.querySelector("[data-memory-puzzle-form]");
        var puzzleQuestion = document.querySelector("[data-memory-question]");
        var puzzleAnswer = document.querySelector("[data-memory-answer]");
        var puzzleFeedback = document.querySelector("[data-memory-feedback]");
        var puzzleNewQuestion = document.querySelector("[data-memory-new-question]");
        var currentPuzzleIndex = 0;
        var memoryQuestions = [
            {
                question: "Trái cây anh thích là gì?",
                answers: ["dưa hấu", "dua hau"]
            },
            {
                question: "Rau gì anh thích nhất?",
                answers: ["rau muống", "rau muong"]
            },
            {
                question: "1 + 1 = ?",
                answers: ["2", "hai"]
            },
            {
                question: "Phim anh thích nhất là gì?",
                answers: ["yiyi", "yi yi"]
            },
            {
                question: "Nghề nghiệp tương lai anh muốn làm nhất là gì?",
                answers: ["đạo diễn", "dao dien"]
            }
        ];

        function renderCollage() {
            var collage = document.querySelector("[data-personal-collage]");
            if (!collage) return;
            collage.innerHTML = "";
            collageImages.forEach(function (item, index) {
                var button = document.createElement("button");
                var image = document.createElement("img");

                button.className = "collage-tile";
                button.type = "button";
                button.dataset.lightboxTrigger = "";
                button.dataset.gallery = "collage";
                button.dataset.index = String(index);
                image.src = item.src;
                image.alt = item.alt;
                image.loading = index > 5 ? "lazy" : "eager";

                button.appendChild(image);
                collage.appendChild(button);
            });
        }

        function renderStill() {
            var item = stillFrames[stillIndex];
            if (!item || !stillImage) return;
            stillImage.src = item.src;
            stillImage.alt = item.alt;
        }

        function shiftStill(amount) {
            stillIndex = (stillIndex + amount + stillFrames.length) % stillFrames.length;
            renderStill();
        }

        function getCollageItems() {
            return collageImages;
        }

        function getWeddingItems() {
            return Array.prototype.map.call(document.querySelectorAll(".wedding-notice-button img"), function (image) {
                return {
                    src: image.currentSrc || image.src,
                    alt: image.alt || "Giấy thông báo hôn lễ",
                    caption: "Giấy thông báo hôn lễ"
                };
            });
        }

        function renderLightbox() {
            var item = lightboxItems[lightboxIndex];
            if (!item || !lightboxImage) return;
            lightboxImage.src = item.src;
            lightboxImage.alt = item.alt || "";
        }

        function openLightbox(items, index) {
            if (!lightbox || !items.length) return;
            lightboxItems = items;
            lightboxIndex = index || 0;
            renderLightbox();
            lightbox.hidden = false;
            document.body.classList.add("lightbox-open");
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.hidden = true;
            document.body.classList.remove("lightbox-open");
        }

        function shiftLightbox(amount) {
            if (!lightboxItems.length) return;
            lightboxIndex = (lightboxIndex + amount + lightboxItems.length) % lightboxItems.length;
            renderLightbox();
        }

        function consume(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        function normalizeAnswer(value) {
            return String(value || "")
                .trim()
                .toLocaleLowerCase("vi-VN")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/[^a-z0-9]+/g, " ")
                .trim();
        }

        function renderPuzzleQuestion() {
            if (!puzzleQuestion || !memoryQuestions.length) return;
            puzzleQuestion.textContent = memoryQuestions[currentPuzzleIndex].question;
            if (puzzleAnswer) puzzleAnswer.value = "";
            if (puzzleFeedback) puzzleFeedback.textContent = "";
        }

        function pickPuzzleQuestion() {
            currentPuzzleIndex = Math.floor(Math.random() * memoryQuestions.length);
            renderPuzzleQuestion();
        }

        function unlockCollage() {
            var collage = document.querySelector("[data-personal-collage]");
            renderCollage();
            if (puzzle) puzzle.hidden = true;
            if (collage) {
                collage.hidden = false;
                collage.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        }

        function setupMemoryPuzzle() {
            if (!puzzleForm || !puzzleAnswer) {
                renderCollage();
                return;
            }

            pickPuzzleQuestion();

            puzzleForm.addEventListener("submit", function (event) {
                event.preventDefault();
                var current = memoryQuestions[currentPuzzleIndex];
                var answer = normalizeAnswer(puzzleAnswer.value);
                var isCorrect = current.answers.some(function (value) {
                    return normalizeAnswer(value) === answer;
                });

                if (isCorrect) {
                    if (puzzleFeedback) puzzleFeedback.textContent = "Đúng rồi, mở kho ảnh thôi.";
                    unlockCollage();
                    return;
                }

                if (puzzleFeedback) puzzleFeedback.textContent = "Chưa đúng rồi, thử lại một xíu nha.";
                puzzleAnswer.select();
            });

            if (puzzleNewQuestion) {
                puzzleNewQuestion.addEventListener("click", function () {
                    currentPuzzleIndex = (currentPuzzleIndex + 1) % memoryQuestions.length;
                    renderPuzzleQuestion();
                });
            }
        }

        document.addEventListener("click", function (event) {
            if (!event.target.closest) return;
            var button = event.target.closest("[data-lightbox-trigger]");
            if (!button || (lightbox && lightbox.contains(button))) return;

            if (button.dataset.gallery === "collage") {
                event.preventDefault();
                openLightbox(getCollageItems(), Number(button.dataset.index) || 0);
                return;
            }

            if (button.dataset.gallery === "wedding") {
                event.preventDefault();
                openLightbox(getWeddingItems(), Number(button.dataset.index) || 0);
            }
        });

        if (stillOpen) {
            stillOpen.addEventListener("click", function () {
                openLightbox(stillFrames, stillIndex);
            });
        }
        if (stillPrev) stillPrev.addEventListener("click", function () { shiftStill(-1); });
        if (stillNext) stillNext.addEventListener("click", function () { shiftStill(1); });
        document.querySelectorAll("[data-lightbox-close]").forEach(function (button) {
            button.addEventListener("click", function (event) {
                consume(event);
                closeLightbox();
            });
        });
        if (lightboxBackdrop) {
            lightboxBackdrop.addEventListener("click", function (event) {
                consume(event);
                closeLightbox();
            });
        }
        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", function (event) {
                consume(event);
                shiftLightbox(-1);
            });
        }
        if (lightboxNext) {
            lightboxNext.addEventListener("click", function (event) {
                consume(event);
                shiftLightbox(1);
            });
        }
        if (lightbox) {
            lightbox.addEventListener("click", function (event) {
                consume(event);
                if (!event.target.closest(".lightbox-frame, .lightbox-nav, .lightbox-close")) closeLightbox();
            });
            lightbox.addEventListener("touchstart", function (event) {
                touchStartX = event.changedTouches[0].clientX;
            }, { passive: true });
            lightbox.addEventListener("touchend", function (event) {
                var deltaX = event.changedTouches[0].clientX - touchStartX;
                if (Math.abs(deltaX) < 44) return;
                shiftLightbox(deltaX > 0 ? -1 : 1);
            }, { passive: true });
        }

        document.addEventListener("keydown", function (event) {
            if (!lightbox || lightbox.hidden) return;
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") shiftLightbox(-1);
            if (event.key === "ArrowRight") shiftLightbox(1);
        });
        setupMemoryPuzzle();
        renderStill();
    }

    function getVideoFilename(url, fallback) {
        try {
            var pathname = new URL(url, window.location.href).pathname;
            return pathname.split("/").filter(Boolean).pop() || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function setDownloadStatus(value) {
        setText("[data-download-status]", value || "");
    }

    function setDownloadLabel(link, value) {
        var label = link.querySelector("[data-download-label]");
        if (label) label.textContent = value;
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

    async function downloadVideo(url, link) {
        var filename = getVideoFilename(url, DOWNLOAD_FILENAME);
        link.classList.add("is-busy");
        setDownloadLabel(link, "Đang chuẩn bị");
        setDownloadStatus("Đang chuẩn bị video...");

        try {
            var response = await fetch(url, { mode: "cors", credentials: "omit" });
            if (!response.ok) throw new Error("Video response was not ok.");

            var blob = await response.blob();
            var file = new File([blob], filename, { type: blob.type || "video/mp4" });
            var canShareFile = navigator.share && navigator.canShare && navigator.canShare({ files: [file] });

            if (canShareFile) {
                setDownloadStatus("Chọn Lưu video trong bảng chia sẻ của iPhone.");
                await navigator.share({
                    files: [file],
                    title: "Ba Ơi, Đừng Nói Dối"
                });
            } else {
                setDownloadStatus("Đang tải file video.");
                saveBlob(blob, filename);
            }
        } catch (error) {
            setDownloadStatus("Đang mở video gốc.");
            window.setTimeout(function () {
                window.location.href = url;
            }, 450);
        } finally {
            link.classList.remove("is-busy");
            setDownloadLabel(link, "Lưu video");
        }
    }

    function setupDownload() {
        document.querySelectorAll("[data-download-story-video]").forEach(function (link) {
            link.href = VIDEO_URL;
            link.addEventListener("click", function (event) {
                event.preventDefault();
                if (link.classList.contains("is-busy")) return;
                downloadVideo(VIDEO_URL, link);
            });
        });
    }

    function renderConfig() {
        var config = window.dadDontLieInvitationConfig || {};
        setText("[data-event-date]", text(config.eventDate, "T6, 21/08/2026"));
        setText("[data-event-time]", text(config.eventTime, "17:00"));
        setText("[data-location-name]", text(config.locationName, "DCINE Bến Thành - 6 Mạc Đĩnh Chi, Phường Sài Gòn, HCM"));
        setText("[data-theater-name]", text(config.theaterName, "04"));
        setText("[data-note-caption]", "bữa đó anh chở em đến rạp 🥸");

        document.querySelectorAll("[data-map-link]").forEach(function (map) {
            map.href = text(config.mapUrl, map.href);
        });

        renderSchedule(config);
    }

    document.addEventListener("DOMContentLoaded", function () {
        renderConfig();
        setupIntro();
        setupMemories();
        setupDownload();
    });
})();
