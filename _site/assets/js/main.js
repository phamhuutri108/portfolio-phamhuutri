/* ============================================================= */
/* PHAM HUU TRI PORTFOLIO - MAIN JAVASCRIPT                       */
/* All interactive features for the Eleventy site                 */
/* ============================================================= */


/* --- LANGUAGE SWITCHING --- */
function setLanguage(lang) {
    document.body.classList.remove('mode-vi', 'mode-en');
    document.body.classList.add('mode-' + lang);
    localStorage.setItem('preferredLang', lang);
    
    const btnEn = document.getElementById('btn-en');
    const btnVi = document.getElementById('btn-vi');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');
    if (btnVi) btnVi.classList.toggle('active', lang === 'vi');
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
});


/* ============================================================= */
/* --- 1. CHAOS WORDS (HOME PAGE EXPLOSION + MUSIC) ---          */
/* ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById('home');
    const centerImage = document.querySelector('.home-center-img');
    
    if (!homeSection || !centerImage) return;
    
    const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3?v=2');
    bgMusic.loop = true; 
    bgMusic.volume = 0.5;

    let hasChaosStarted = false;
    let resetTimer = null; 
    
    let isDragging = false;
    let currentDragItem = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const wordsListEn = ["one", "Buddha", "is", "not", "enough"];
    const wordsListVi = ["một", "ông Bụt", "là", "không", "đủ"];
    const isMobile = window.innerWidth < 768;
    const WORD_COUNT = isMobile ? 50 : 120; 
    const MIN_SIZE = 7; 
    const MAX_SIZE = 30;     

    function randomRange(min, max) { 
        return Math.random() * (max - min) + min; 
    }

    function startFloating(element) {
        const animations = element.getAnimations();
        animations.forEach(anim => anim.cancel());
        element.animate([
            { transform: `translate(-50%, -50%) rotate(0deg)` },
            { transform: `translate(calc(-50% + ${randomRange(-50,50)}px), calc(-50% + ${randomRange(-50,50)}px)) rotate(${randomRange(-90,90)}deg)` },
            { transform: `translate(-50%, -50%) rotate(0deg)` }
        ], { 
            duration: randomRange(10000, 30000), 
            iterations: Infinity, 
            direction: 'alternate', 
            easing: 'ease-in-out' 
        });
    }

    // Global stop function
    window.stopHomeMusic = function() {
        if (hasChaosStarted) resetChaos();
    };

    function createExplosion() {
        // Stop other music sources
        if (window.stopContactMusic) window.stopContactMusic();
        if (window.stopWritingMusic) window.stopWritingMusic();

        hasChaosStarted = true; 
        if (resetTimer) clearTimeout(resetTimer);
        bgMusic.play().catch(e => console.log("Audio play error:", e));
        
        homeSection.classList.add('music-on'); 

        const isVietnamese = document.body.classList.contains('mode-vi');
        const currentList = isVietnamese ? wordsListVi : wordsListEn;
        
        for (let i = 0; i < WORD_COUNT; i++) {
            const span = document.createElement('span');
            span.innerText = currentList[Math.floor(Math.random() * currentList.length)];
            span.className = 'chaos-word';
            span.style.pointerEvents = 'auto'; 
            span.style.cursor = 'grab';
            
            const size = randomRange(MIN_SIZE, MAX_SIZE);
            span.style.fontSize = `${size}px`;
            span.style.opacity = randomRange(0.2, 0.8);
            span.style.left = '50%'; 
            span.style.top = '50%';
            span.style.transform = 'translate(-50%, -50%)'; 
            
            const flyDuration = randomRange(4.0, 8.0); 
            homeSection.appendChild(span);
            
            requestAnimationFrame(() => {
                span.style.transition = `left ${flyDuration}s cubic-bezier(0.165, 0.84, 0.44, 1), top ${flyDuration}s cubic-bezier(0.165, 0.84, 0.44, 1), opacity ${flyDuration}s ease`;
                const targetX = randomRange(-10, 110); 
                const targetY = randomRange(-10, 110);
                span.style.left = `${targetX}%`; 
                span.style.top = `${targetY}%`;
                setTimeout(() => { 
                    if (hasChaosStarted && currentDragItem !== span) startFloating(span); 
                }, flyDuration * 1000);
            });
        }
    }

    function resetChaos() {
        hasChaosStarted = false; 
        homeSection.classList.remove('music-on');

        const words = document.querySelectorAll('.chaos-word');
        words.forEach(word => {
            const anims = word.getAnimations();
            anims.forEach(anim => anim.cancel());
            word.style.transition = "all 1.5s ease-in-out";
            word.style.left = '50%'; 
            word.style.top = '50%'; 
            word.style.opacity = '0'; 
        });
        resetTimer = setTimeout(() => {
            words.forEach(w => w.remove());
            bgMusic.pause(); 
        }, 1500);
    }

    function toggleChaos() { 
        if (!hasChaosStarted) createExplosion(); 
        else resetChaos(); 
    }
    
    // Drag & Drop Logic
    function getClientCoords(e) { 
        if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY }; 
        return { x: e.clientX, y: e.clientY }; 
    }

    function onDragStart(e) { 
        if (e.target.classList.contains('chaos-word')) { 
            isDragging = true; 
            currentDragItem = e.target; 
            currentDragItem.style.cursor = 'grabbing'; 
            currentDragItem.style.transition = 'none'; 
            
            const anims = currentDragItem.getAnimations(); 
            anims.forEach(anim => anim.cancel()); 

            const rect = currentDragItem.getBoundingClientRect(); 
            const coords = getClientCoords(e); 
            dragOffsetX = coords.x - rect.left; 
            dragOffsetY = coords.y - rect.top; 

            if (e.cancelable && e.type === 'touchstart') e.preventDefault(); 
        } 
    }

    function onDragMove(e) { 
        if (isDragging && currentDragItem) { 
            if (e.cancelable) e.preventDefault(); 
            const containerRect = homeSection.getBoundingClientRect(); 
            const coords = getClientCoords(e); 
            const newLeft = coords.x - containerRect.left - dragOffsetX + (currentDragItem.offsetWidth / 2);
            const newTop = coords.y - containerRect.top - dragOffsetY + (currentDragItem.offsetHeight / 2);
            currentDragItem.style.left = `${newLeft}px`; 
            currentDragItem.style.top = `${newTop}px`; 
        } 
    }

    function onDragEnd() { 
        if (isDragging && currentDragItem) { 
            currentDragItem.style.cursor = 'grab'; 
            if (hasChaosStarted) startFloating(currentDragItem); 
            isDragging = false; 
            currentDragItem = null; 
        } 
    }

    document.addEventListener('mousedown', onDragStart); 
    document.addEventListener('mousemove', onDragMove); 
    document.addEventListener('mouseup', onDragEnd); 
    document.addEventListener('touchstart', onDragStart, { passive: false }); 
    document.addEventListener('touchmove', onDragMove, { passive: false }); 
    document.addEventListener('touchend', onDragEnd);

    // Language switch updates chaos words
    const langSwitchBtn = document.querySelector('.lang-switch');
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => { 
            if (hasChaosStarted) {
                const isVietnamese = document.body.classList.contains('mode-vi');
                const currentList = isVietnamese ? wordsListVi : wordsListEn;
                document.querySelectorAll('.chaos-word').forEach(w => {
                    w.innerText = currentList[Math.floor(Math.random() * currentList.length)];
                });
            }
        });
    }
    
    centerImage.style.cursor = 'pointer'; 
    centerImage.addEventListener('click', (e) => { e.stopPropagation(); toggleChaos(); });
    centerImage.addEventListener('touchstart', (e) => { e.stopPropagation(); e.preventDefault(); toggleChaos(); });
});


/* ============================================================= */
/* --- 2. WANDERING RESUME (ABOUT PAGE) ---                      */
/* ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const resumeLink = document.getElementById('wandering-resume');
    const aboutSection = document.getElementById('about');
    const resumeHolder = document.getElementById('resume-holder');
    
    if (!resumeLink || !aboutSection) return;
    
    let hasStarted = false;
    let isHovering = false; 
    let moveTimer = null;   
    let catchAttempt = 0; 
    const MAX_EVASION = 3;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getNewCoordinates() {
        const containerW = aboutSection.offsetWidth;
        const containerH = aboutSection.offsetHeight;
        const itemW = resumeLink.offsetWidth;
        const itemH = resumeLink.offsetHeight;

        const safeZoneX = containerW * 0.40; 
        const minLeft = safeZoneX;
        const maxLeft = containerW - itemW - 20;

        const minTop = 80;
        const maxTop = containerH - itemH - 20;

        if (maxLeft < minLeft) return { left: containerW - itemW - 10, top: random(minTop, maxTop) };

        return {
            left: random(minLeft, maxLeft),
            top: random(minTop, maxTop)
        };
    }

    function moveResume() {
        if (!hasStarted) return;
        
        if (isHovering || !aboutSection.classList.contains('active-section')) {
            moveTimer = setTimeout(moveResume, 1000);
            return;
        }

        resumeLink.classList.remove('evading');

        const coords = getNewCoordinates();
        resumeLink.style.left = `${coords.left}px`;
        resumeLink.style.top = `${coords.top}px`;

        moveTimer = setTimeout(moveResume, 1300);
    }

    function evadeMouse() {
        resumeLink.classList.add('evading');
        
        const coords = getNewCoordinates();
        resumeLink.style.left = `${coords.left}px`;
        resumeLink.style.top = `${coords.top}px`;

        isHovering = false;
        
        setTimeout(() => {
            if (!isHovering) moveResume();
        }, 300);
    }

    resumeLink.addEventListener('mouseenter', () => {
        if (!hasStarted) {
            hasStarted = true;
            
            const rect = resumeLink.getBoundingClientRect();
            const parentRect = aboutSection.getBoundingClientRect();
            
            const startLeft = rect.left - parentRect.left;
            const startTop = rect.top - parentRect.top;

            resumeLink.style.left = `${startLeft}px`;
            resumeLink.style.top = `${startTop}px`;
            resumeLink.classList.add('flying');

            catchAttempt++;
            evadeMouse();
            return;
        }

        if (catchAttempt < MAX_EVASION) {
            catchAttempt++;
            evadeMouse();
        } else {
            isHovering = true;
            clearTimeout(moveTimer);
            
            const computedStyle = window.getComputedStyle(resumeLink);
            resumeLink.style.transition = 'none';
            resumeLink.style.left = computedStyle.left;
            resumeLink.style.top = computedStyle.top;
        }
    });

    resumeLink.addEventListener('mouseleave', () => {
        if (hasStarted && isHovering) {
            isHovering = false;
            resumeLink.style.transition = 'top 1.3s ease-in-out, left 1.3s ease-in-out, color 0.2s';
            moveResume();
        }
    });
});


/* ============================================================= */
/* --- 3. CONTACT MUSIC PLAYER ---                               */
/* ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const musicalImage = document.getElementById('musical-image');
    const contactAudio = document.getElementById('contact-audio');
    const contactWrapper = document.querySelector('.contact-image-wrapper'); 

    if (!musicalImage || !contactAudio || !contactWrapper) return;

    // Global stop function
    window.stopContactMusic = function() {
        if (contactAudio && !contactAudio.paused) {
            contactAudio.pause();
            contactWrapper.classList.remove('music-on');
            musicalImage.style.opacity = "1";
        }
    };

    function toggleContactMusic() {
        if (contactAudio.paused) {
            // Stop other music sources
            if (window.stopHomeMusic) window.stopHomeMusic();
            if (window.stopWritingMusic) window.stopWritingMusic();

            contactAudio.play();
            contactWrapper.classList.add('music-on'); 
            musicalImage.style.opacity = "0.8"; 
        } else {
            window.stopContactMusic();
        }
    }

    musicalImage.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleContactMusic();
    });
    musicalImage.addEventListener('touchstart', (e) => {
        e.stopPropagation(); 
        e.preventDefault(); 
        toggleContactMusic();
    });
});


/* ============================================================= */
/* --- 4. LIGHTBOX GALLERY ---                                   */
/* ============================================================= */

let currentCrewArray = []; 
let currentCrewIndex = 0;  

document.addEventListener('click', function(e) {
    // Gallery Wall (BTS images)
    if (e.target && e.target.closest('.gallery-wall img')) {
        const clickedImg = e.target;
        const container = clickedImg.closest('.gallery-wall');
        
        const allImagesArray = Array.from(container.querySelectorAll('img'));

        currentCrewArray = allImagesArray.map(img => ({
            src: img.src,
            name: "",
            role: ""
        }));

        currentCrewIndex = allImagesArray.indexOf(clickedImg);
        openCrewLightbox();
    }
    
    // Crew Scroll Item
    if (e.target && e.target.closest('.crew-card img')) {
        const clickedImg = e.target;
        const container = clickedImg.closest('.crew-scroller');
        
        const allImagesNodeList = container.querySelectorAll('.crew-card img');
        const allImagesArray = Array.from(allImagesNodeList); 

        currentCrewArray = allImagesArray.map(img => ({
            src: img.dataset.full, 
            name: img.dataset.name,
            role: img.dataset.role
        }));

        currentCrewIndex = allImagesArray.indexOf(clickedImg);
        openCrewLightbox();
    }
});

function lockBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
}

function unlockBodyScroll() {
    document.body.style.overflow = ''; 
    document.body.style.touchAction = '';
}

function openSimpleLightbox(src) {
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const lbCaption = document.getElementById('lb-caption');
    
    if (!lightbox || !lightboxImg) return;
    
    lightboxImg.src = src;
    lightbox.style.display = "flex";
    
    lockBodyScroll();
    
    if (lbPrev) lbPrev.style.display = 'none';
    if (lbNext) lbNext.style.display = 'none';
    if (lbCaption) lbCaption.style.display = 'none';
    
    disableSwipe();
}

function openCrewLightbox() {
    const lightbox = document.getElementById('lightbox-overlay');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const lbCaption = document.getElementById('lb-caption');
    
    if (!lightbox) return;
    
    lightbox.style.display = "flex";
    
    lockBodyScroll();
    
    if (lbPrev) lbPrev.style.display = 'block';
    if (lbNext) lbNext.style.display = 'block';
    if (lbCaption) lbCaption.style.display = 'block';

    updateLbContent();
    enableSwipe();
}

function updateLbContent() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lb-caption');
    const lbName = document.getElementById('lb-name');
    const lbRole = document.getElementById('lb-role');
    
    if (!currentCrewArray || currentCrewArray.length === 0) return;
    const item = currentCrewArray[currentCrewIndex];
    
    if (lightboxImg) lightboxImg.src = item.src;
    if (lbName) lbName.innerHTML = item.name; 
    if (lbRole) lbRole.innerHTML = item.role;

    if (lbCaption) {
        if (!item.name && !item.role) {
            lbCaption.style.display = 'none';
        } else {
            lbCaption.style.display = 'block';
        }
    }
}

function changeLbSlide(step, e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }

    if (!currentCrewArray || currentCrewArray.length === 0) return;

    currentCrewIndex += step;
    
    if (currentCrewIndex >= currentCrewArray.length) currentCrewIndex = 0;
    if (currentCrewIndex < 0) currentCrewIndex = currentCrewArray.length - 1;

    updateLbContent();
}

function closeLightbox(e) {
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!e || e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        if (lightbox) lightbox.style.display = "none";
        unlockBodyScroll();
        if (lightboxImg) lightboxImg.src = ""; 
    }
}

document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox-overlay');
    const lbNext = document.getElementById('lb-next');
    
    if (lightbox && lightbox.style.display === "flex" && lbNext && lbNext.style.display === 'block') {
        if (e.key === "ArrowLeft") changeLbSlide(-1, e);
        if (e.key === "ArrowRight") changeLbSlide(1, e);
    }
    if (e.key === "Escape") closeLightbox(e);
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchMove(e) {
    if (e.target.closest('.lb-caption')) {
        return;
    }
    if (e.cancelable) {
        e.preventDefault(); 
    }
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}

function handleSwipeGesture() {
    const SWIPE_THRESHOLD = 50; 
    if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
        changeLbSlide(1);
    }
    if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
        changeLbSlide(-1);
    }
}

function enableSwipe() {
    const lightbox = document.getElementById('lightbox-overlay');
    if (!lightbox) return;
    
    lightbox.addEventListener('touchstart', handleTouchStart, {passive: true});
    lightbox.addEventListener('touchend', handleTouchEnd, {passive: true});
    lightbox.addEventListener('touchmove', handleTouchMove, {passive: false});
}

function disableSwipe() {
    const lightbox = document.getElementById('lightbox-overlay');
    if (!lightbox) return;
    
    lightbox.removeEventListener('touchstart', handleTouchStart);
    lightbox.removeEventListener('touchend', handleTouchEnd);
    lightbox.removeEventListener('touchmove', handleTouchMove);
}


/* ============================================================= */
/* --- 5. WRITING SCATTER PHYSICS ---                            */
/* ============================================================= */

let animationFrameId; 
const physicsItems = []; 

function renderWritingScatter() {
    const container = document.getElementById('writings-list-container');
    if (!container) return;
    
    const writingItems = container.querySelectorAll('.writings-scatter-item');
    if (writingItems.length === 0) return;

    // Reset
    physicsItems.length = 0; 
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    const isMobile = window.innerWidth < 768;
    const sidebarOffset = isMobile ? 20 : 300;
    const safeWidth = container.offsetWidth > 0 ? container.offsetWidth : (window.innerWidth - sidebarOffset);
    const safeHeight = container.offsetHeight > 0 ? container.offsetHeight : window.innerHeight;

    writingItems.forEach((el, index) => {
        el.style.position = 'absolute';
        el.style.whiteSpace = 'nowrap';
        el.style.userSelect = 'none';
        el.style.cursor = 'pointer';
        el.style.opacity = Math.max(0.6, 1 - (index * 0.03));

        const startX = Math.random() * (safeWidth - 100); 
        const startY = Math.random() * (safeHeight - 50);
        const vx = (Math.random() - 0.5) * 0.4; 
        const vy = (Math.random() - 0.5) * 0.4;

        physicsItems.push({
            el: el,
            x: startX,
            y: startY,
            vx: vx,
            vy: vy,
            width: el.offsetWidth, 
            height: el.offsetHeight
        });
    });

    runPhysicsLoop(container);
}

function runPhysicsLoop(container) {
    function update() {
        const containerW = container.offsetWidth > 0 ? container.offsetWidth : window.innerWidth;
        const containerH = container.offsetHeight > 0 ? container.offsetHeight : window.innerHeight;

        physicsItems.forEach((itemA, i) => {
            itemA.x += itemA.vx;
            itemA.y += itemA.vy;

            // Wall Bounce
            if (itemA.x <= 0) {
                itemA.x = 0;
                itemA.vx *= -1;
            } else if (itemA.x + itemA.width >= containerW) {
                itemA.x = containerW - itemA.width;
                itemA.vx *= -1;
            }

            if (itemA.y <= 0) {
                itemA.y = 0;
                itemA.vy *= -1;
            } else if (itemA.y + itemA.height >= containerH) {
                itemA.y = containerH - itemA.height;
                itemA.vy *= -1;
            }

            // Object Collision
            for (let j = i + 1; j < physicsItems.length; j++) {
                const itemB = physicsItems[j];

                if (isOverlapping(itemA, itemB)) {
                    let dx = (itemA.x + itemA.width/2) - (itemB.x + itemB.width/2);
                    let dy = (itemA.y + itemA.height/2) - (itemB.y + itemB.height/2);

                    if (dx === 0) dx = Math.random() - 0.5;
                    if (dy === 0) dy = Math.random() - 0.5;

                    const distance = Math.sqrt(dx*dx + dy*dy);
                    const unitX = dx / distance;
                    const unitY = dy / distance;

                    const pushForce = 0.2; 

                    itemA.vx += unitX * pushForce;
                    itemA.vy += unitY * pushForce;
                    itemB.vx -= unitX * pushForce;
                    itemB.vy -= unitY * pushForce;
                    
                    const separateSpeed = 1;
                    itemA.x += unitX * separateSpeed;
                    itemA.y += unitY * separateSpeed;
                    itemB.x -= unitX * separateSpeed;
                    itemB.y -= unitY * separateSpeed;
                }
            }

            // Speed limit
            const maxSpeed = 0.8;
            if (itemA.vx > maxSpeed) itemA.vx = maxSpeed;
            if (itemA.vx < -maxSpeed) itemA.vx = -maxSpeed;
            if (itemA.vy > maxSpeed) itemA.vy = maxSpeed;
            if (itemA.vy < -maxSpeed) itemA.vy = -maxSpeed;

            // Render
            itemA.el.style.left = itemA.x + 'px';
            itemA.el.style.top = itemA.y + 'px';
        });

        animationFrameId = requestAnimationFrame(update);
    }
    update();
}

function isOverlapping(a, b) {
    const padding = 15; 
    return (
        a.x < b.x + b.width + padding &&
        a.x + a.width + padding > b.x &&
        a.y < b.y + b.height + padding &&
        a.y + a.height + padding > b.y
    );
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(renderWritingScatter, 100);
});


/* ============================================================= */
/* --- 6. WRITING MUSIC PLAYER ---                               */
/* ============================================================= */

const writingPlaylist = [
    { title: "better day", src: "https://assets.phamhuutri.com/assets/writings/still-life/1_betterday_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "one light", src: "https://assets.phamhuutri.com/assets/writings/still-life/2_onelight_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "morning", src: "https://assets.phamhuutri.com/assets/writings/still-life/3_morning_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "fragile", src: "https://assets.phamhuutri.com/assets/writings/still-life/4_fragile_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "your sonnet", src: "https://assets.phamhuutri.com/assets/writings/still-life/5_yoursonnet_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "fly", src: "https://assets.phamhuutri.com/assets/writings/still-life/6_Fly_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "call from spring", src: "https://assets.phamhuutri.com/assets/writings/still-life/7_callfromspring_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "easel", src: "https://assets.phamhuutri.com/assets/writings/still-life/8_easel_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "sometime", src: "https://assets.phamhuutri.com/assets/writings/still-life/9_sometime_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "seasons when a wind passes by", src: "https://assets.phamhuutri.com/assets/writings/still-life/10_seasonswhenawindpassesby_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "rainy day", src: "https://assets.phamhuutri.com/assets/writings/still-life/11_rainyday_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "anthology", src: "https://assets.phamhuutri.com/assets/writings/still-life/12_anthology_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "call me", src: "https://assets.phamhuutri.com/assets/writings/still-life/13_callme_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "17:00", src: "https://assets.phamhuutri.com/assets/writings/still-life/14_1700_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" },
    { title: "foresight light", src: "https://assets.phamhuutri.com/assets/writings/still-life/15_foresightlight_still_life_haruka_nakamura.mp3?v=2", duration: "--:--" }
];

let wpIsActive = false;
let wpIsPlaying = false;
let wpIsExpanded = false;
let wpCurrentIndex = 0;

const iconWpPlay = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const iconWpPause = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function preloadDurations() {
    writingPlaylist.forEach((item, index) => {
        const tempAudio = new Audio(item.src);
        tempAudio.addEventListener('loadedmetadata', () => {
            item.realDuration = tempAudio.duration;
            updatePlaylistItemDuration(index, tempAudio.duration);
        });
    });
}

function updatePlaylistItemDuration(index, duration) {
    const items = document.querySelectorAll('.wp-playlist-item');
    if (items[index]) {
        const timeSpan = items[index].querySelector('span:last-child');
        if (timeSpan && index !== wpCurrentIndex) {
            timeSpan.innerText = formatTime(duration);
        }
    }
}

// Global stop function
window.stopWritingMusic = function() {
    const wpAudio = document.getElementById('writing-audio-source');
    if (wpIsPlaying && wpAudio) {
        wpAudio.pause();
        wpIsPlaying = false;
        updateWpPlayIcon();
    }
}

function toggleWritingMusic() {
    const wpTitleEl = document.getElementById('writing-main-title');
    const wpHintEl = document.getElementById('writing-hint');
    const wpPanelEl = document.getElementById('writing-player');
    const wpAudio = document.getElementById('writing-audio-source');
    
    if (!wpTitleEl || !wpPanelEl || !wpAudio) return;
    
    wpIsActive = !wpIsActive;
    
    const hintEn = wpHintEl ? wpHintEl.querySelector('.content-en') : null;
    const hintVi = wpHintEl ? wpHintEl.querySelector('.content-vi') : null;

    if (wpIsActive) {
        // Stop other music sources
        if (window.stopHomeMusic) window.stopHomeMusic();
        if (window.stopContactMusic) window.stopContactMusic();

        wpTitleEl.classList.add('music-active'); 
        if(hintEn) hintEn.innerText = "Click to close";
        if(hintVi) hintVi.innerText = "Bấm để đóng";
        wpPanelEl.classList.add('visible');
        
        const displayWpTitle = document.getElementById('wp-song-title');
        if (displayWpTitle) displayWpTitle.innerText = "Still Life - Haruka Nakamura"; 
        
        loadWpSong(wpCurrentIndex);
    } else {
        wpTitleEl.classList.remove('music-active');
        if(hintEn) hintEn.innerText = "Click to open";
        if(hintVi) hintVi.innerText = "Bấm để mở";
        wpPanelEl.classList.remove('visible');
        wpPanelEl.classList.remove('expanded');
        wpIsExpanded = false;
        
        wpAudio.pause();
        wpIsPlaying = false;
        updateWpPlayIcon();
    }
}

function wpToggleExpand() {
    const wpPanelEl = document.getElementById('writing-player');
    if (!wpIsActive || !wpPanelEl) return;
    
    wpIsExpanded = !wpIsExpanded;
    if (wpIsExpanded) wpPanelEl.classList.add('expanded');
    else wpPanelEl.classList.remove('expanded');
}

function loadWpSong(index) {
    const wpAudio = document.getElementById('writing-audio-source');
    const displayWpTitle = document.getElementById('wp-song-title');
    const displayWpTime = document.getElementById('wp-artist-name');
    
    if (index < 0 || index >= writingPlaylist.length || !wpAudio) return;
    
    const song = writingPlaylist[index];
    if (displayWpTitle) displayWpTitle.innerText = "Still Life - Haruka Nakamura"; 
    if (displayWpTime) displayWpTime.innerText = "Loading..."; 
    
    wpAudio.src = song.src;
    wpAudio.load(); 
    renderWpPlaylist(); 
}

function renderWpPlaylist() {
    const wpPlaylistContainer = document.getElementById('wp-playlist');
    if (!wpPlaylistContainer) return;
    
    wpPlaylistContainer.innerHTML = '';
    writingPlaylist.forEach((song, index) => {
        const div = document.createElement('div');
        div.className = 'wp-playlist-item';
        let timeDisplay = "";
        if (index === wpCurrentIndex) {
            div.classList.add('active');
            timeDisplay = `<span id="wp-active-time-display">--:--</span>`;
        } else {
            const durationToShow = song.realDuration ? formatTime(song.realDuration) : song.duration;
            timeDisplay = `<span>${durationToShow}</span>`;
        }
        div.innerHTML = `<span>${index + 1}. ${song.title}</span> ${timeDisplay}`;
        
        div.onclick = () => {
            if (window.stopHomeMusic) window.stopHomeMusic();
            if (window.stopContactMusic) window.stopContactMusic();

            wpCurrentIndex = index;
            loadWpSong(wpCurrentIndex);
            setTimeout(() => {
                const wpAudio = document.getElementById('writing-audio-source');
                wpIsPlaying = true;
                if (wpAudio) wpAudio.play().catch(e => console.log(e));
                updateWpPlayIcon();
            }, 50);
        };
        wpPlaylistContainer.appendChild(div);
    });
}

function wpTogglePlay() {
    const wpAudio = document.getElementById('writing-audio-source');
    if (!wpAudio) return;
    
    if (wpIsPlaying) {
        wpAudio.pause();
        wpIsPlaying = false;
    } else {
        if (window.stopHomeMusic) window.stopHomeMusic();
        if (window.stopContactMusic) window.stopContactMusic();

        wpAudio.play();
        wpIsPlaying = true;
    }
    updateWpPlayIcon();
}

function updateWpPlayIcon() {
    const wpPlayBtn = document.getElementById('wp-play-btn');
    if (wpPlayBtn) wpPlayBtn.innerHTML = wpIsPlaying ? iconWpPause : iconWpPlay;
}

function wpNext() {
    wpCurrentIndex = (wpCurrentIndex + 1) % writingPlaylist.length;
    loadWpSong(wpCurrentIndex);
    setTimeout(() => { 
        const wpAudio = document.getElementById('writing-audio-source');
        wpIsPlaying = true; 
        if (wpAudio) wpAudio.play(); 
        updateWpPlayIcon(); 
    }, 50);
}

function wpPrev() {
    wpCurrentIndex = (wpCurrentIndex - 1 + writingPlaylist.length) % writingPlaylist.length;
    loadWpSong(wpCurrentIndex);
    setTimeout(() => { 
        const wpAudio = document.getElementById('writing-audio-source');
        wpIsPlaying = true; 
        if (wpAudio) wpAudio.play(); 
        updateWpPlayIcon(); 
    }, 50);
}

// Audio event listeners
document.addEventListener("DOMContentLoaded", () => {
    const wpAudio = document.getElementById('writing-audio-source');
    if (!wpAudio) return;
    
    wpAudio.addEventListener('loadedmetadata', () => {
        const totalDuration = wpAudio.duration;
        writingPlaylist[wpCurrentIndex].realDuration = totalDuration; 
        const displayWpTime = document.getElementById('wp-artist-name');
        if (!wpIsPlaying && displayWpTime) {
            displayWpTime.innerText = formatTime(totalDuration);
        }
        renderWpPlaylist();
    });

    wpAudio.addEventListener('timeupdate', () => {
        if (wpAudio.duration) {
            const remaining = wpAudio.duration - wpAudio.currentTime;
            const formattedTime = "-" + formatTime(remaining);
            const displayWpTime = document.getElementById('wp-artist-name');
            if (displayWpTime) displayWpTime.innerText = formattedTime;
            const activeTimeEl = document.getElementById('wp-active-time-display');
            if (activeTimeEl) {
                activeTimeEl.innerText = formattedTime;
                activeTimeEl.style.fontVariantNumeric = "tabular-nums"; 
            }
        }
    });

    wpAudio.addEventListener('ended', () => {
        wpNext();
    });

    setTimeout(preloadDurations, 2000);
});


/* ============================================================= */
/* --- 7. WRITING FONT SIZE ADJUSTMENT ---                       */
/* ============================================================= */

let currentFontSize = 16;

function toggleMobileMenu() {
    const tools = document.getElementById('mobile-text-tools');
    if (tools) tools.classList.toggle('is-open');
}

function adjustWritingSize(amount) {
    const contentEl = document.getElementById('detail-content');
    if (!contentEl) return;

    currentFontSize += amount;
    
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 26) currentFontSize = 26;

    contentEl.style.fontSize = currentFontSize + "px";
    contentEl.style.lineHeight = (1.6 + (amount * 0.05)) + "";
}

/* --- WRITING DETAIL OPEN/CLOSE --- */

function openWritingDetail(id) {
    // Find the writing metadata from writingData
    if (typeof writingData === 'undefined') {
        console.error('writingData not loaded');
        return;
    }
    
    const post = writingData.find(item => item.id === id);
    if (!post) {
        console.error('Writing not found:', id);
        return;
    }
    
    const titleEl = document.getElementById('detail-title');
    const metaEl = document.getElementById('detail-meta');
    const contentEl = document.getElementById('detail-content');
    const viewEl = document.getElementById('writings-detail-view');

    // Populate title and meta
    if (titleEl) {
        titleEl.innerHTML = `<span class="content-vi">${post.title.vi}</span><span class="content-en">${post.title.en}</span>`;
    }
    if (metaEl) {
        metaEl.innerText = `${post.location}, ${post.date}`;
    }
    
    // Get content from hidden content store (rendered from markdown)
    const contentStore = document.querySelector(`#writings-content-store [data-writing-id="${id}"]`);
    if (contentEl && contentStore) {
        contentEl.innerHTML = contentStore.innerHTML;
    }

    // Show detail view (scatter items remain visible behind)
    if (viewEl) {
        viewEl.style.display = 'block';
        setTimeout(() => viewEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    // Update URL
    const slug = id.replace('writings-', '');
    window.history.pushState({ pageId: 'cat-writings', writingId: id }, "", '/writings/' + slug);
}

function closeWritingDetail() {
    const viewEl = document.getElementById('writings-detail-view');
    const topArea = document.querySelector('.writings-top-area');

    // Hide detail view
    if (viewEl) {
        viewEl.style.display = 'none';
    }

    // Scroll back to top area
    if (topArea) {
        topArea.scrollIntoView({ behavior: 'smooth' });
    }

    // Update URL
    window.history.pushState({ pageId: 'cat-writings' }, "", '/writings');
}

// Handle click on writing links from sidebar
function handleWritingClick(event, writingId) {
    // Check if we're on the writings page (including detail view with /writings/slug)
    const path = window.location.pathname;
    if (path === '/writings/' || path === '/writings' || path.startsWith('/writings/')) {
        event.preventDefault();
        openWritingDetail(writingId);
        return false;
    }
    // If not on writings page, let the link navigate (with hash)
    return true;
}

// Check for hash on page load to open specific writing
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#writings-')) {
        const writingId = hash.substring(1); // Remove the #
        setTimeout(() => {
            if (typeof openWritingDetail === 'function') {
                openWritingDetail(writingId);
            }
        }, 300);
    }
});

// Handle browser back button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.pageId === 'cat-writings') {
        if (event.state.writingId) {
            openWritingDetail(event.state.writingId);
        } else {
            closeWritingDetail();
        }
    }
});

// Auto-close mobile menu on scroll
document.addEventListener("DOMContentLoaded", () => {
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const tools = document.getElementById('mobile-text-tools');
        
        if (tools && tools.classList.contains('is-open')) {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                tools.classList.remove('is-open');
            }, 100);
        }
    }, { passive: true });
});


/* ============================================================= */
/* --- 8. ANTI-COPY PROTECTION ---                               */
/* ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Block right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Block drag & drop
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Block keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Block F12
        if (e.key === 'F12') {
            e.preventDefault();
            return;
        }

        // Block Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return;
        }

        // Block Ctrl+C, Ctrl+S, Ctrl+U, Ctrl+P
        if (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'u' || e.key === 'p')) {
            e.preventDefault();
            return;
        }
    });
});


/* ============================================================= */
/* --- 9. CREW SCROLLER SYSTEM ---                               */
/* ============================================================= */

function initCrewSystem() {
    const sliders = document.querySelectorAll('.crew-scroller');

    sliders.forEach(slider => {
        if (slider.dataset.init === "true") return;
        slider.dataset.init = "true";

        const cards = Array.from(slider.querySelectorAll('.crew-card'));
        
        let isDragging = false;
        let startDragX = 0;

        const updateActiveState = () => {
            const centerPoint = slider.scrollLeft + (slider.offsetWidth / 2);
            let closest = null;
            let minDistance = Infinity;

            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(centerPoint - cardCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = card;
                }
            }

            cards.forEach(card => {
                if (card === closest) {
                    if (!card.classList.contains('active')) card.classList.add('active');
                } else {
                    if (card.classList.contains('active')) card.classList.remove('active');
                }
            });
        };

        let ticking = false;
        
        slider.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveState();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    return; 
                }

                if (!card.classList.contains('active')) {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } 
                else {
                    const img = card.querySelector('img');
                    openCrewLightboxFromElement(img, slider);
                }
            });
        });

        // Drag support for desktop
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            startDragX = e.pageX;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            
            slider.style.scrollSnapType = 'none'; 
            slider.style.scrollBehavior = 'auto';
        });

        const stopDragging = () => {
            if (!isDown) return;
            isDown = false;
            slider.classList.remove('active');
            
            slider.style.scrollSnapType = 'x mandatory'; 
            setTimeout(() => { isDragging = false; }, 50); 
        };

        slider.addEventListener('mouseleave', stopDragging);
        slider.addEventListener('mouseup', stopDragging);

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            if (Math.abs(e.pageX - startDragX) > 5) isDragging = true; 

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; 
            slider.scrollLeft = scrollLeft - walk;
        });

        updateActiveState();
    });
}

function openCrewLightboxFromElement(clickedImg, container) {
    const allImages = Array.from(container.querySelectorAll('.crew-card img'));
    
    currentCrewArray = allImages.map(img => ({
        src: img.dataset.full, 
        name: img.dataset.name,
        role: document.body.classList.contains('mode-vi') 
              ? img.dataset.roleVi 
              : img.dataset.roleEn 
    }));

    currentCrewIndex = allImages.indexOf(clickedImg);
    
    openCrewLightbox(); 
}

// MutationObserver for dynamic content
const crewObserver = new MutationObserver((mutations) => {
    if (document.querySelector('.crew-scroller:not([data-init="true"])')) {
        initCrewSystem();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    crewObserver.observe(document.body, { childList: true, subtree: true });
    initCrewSystem();
});

window.addEventListener('resize', () => {
    const sliders = document.querySelectorAll('.crew-scroller');
    sliders.forEach(slider => slider.dispatchEvent(new Event('scroll')));
});


/* ============================================================= */
/* --- 10. ACTIVE LINK HIGHLIGHTING ---                          */
/* ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath !== '/' && currentPath.startsWith(href) && href !== '/')) {
            link.classList.add('active-link');
            
            // Open parent category group if exists
            const categoryGroup = link.closest('.category-group');
            if (categoryGroup) {
                categoryGroup.classList.add('is-open');
            }
        }
    });
});
