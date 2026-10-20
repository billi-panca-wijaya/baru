/**
 * INTERWIN - Custom Interactive Scripts (Clean, Modular & Production Ready)
 * Features:
 *  1. Announcement Marquee & Live Date Clock
 *  2. Progressive Jackpot Continuous Count-Up
 *  3. Download APK Entrance Animation (Slide-In)
 *  4. Jackpot Winners Vertical Smooth Ticker
 *  5. Banner Carousel Automatic Slider
 *  6. Gentle Canvas Snowfall Animation Effect
 *  7. Provider Carousel Tabs & Mascot Switching
 *  8. Dynamic Game Action Button Vector SVGs (COBA & MAIN - NO EMOJIS)
 *  9. Interactive FAQ Accordion Component
 */

(function () {
    'use strict';

    // === 1. Announcement List Marquee ===
    function initAnnouncementMarquee() {
        try {
            const section = document.querySelector('.announcement-container [data-section="announcements"]');
            const originalList = document.getElementById('announcement_list');
            if (!section || !originalList) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'announcement-marquee-wrapper';

            // Re-parent list into wrapper
            section.innerHTML = '';
            wrapper.appendChild(originalList);

            // Clone for seamless loop
            const cloneList = originalList.cloneNode(true);
            cloneList.id = 'announcement_list_clone';
            wrapper.appendChild(cloneList);
            section.appendChild(wrapper);

            let offset = 0;
            const speed = 0.8;
            let isPaused = false;

            section.addEventListener('mouseenter', () => isPaused = true);
            section.addEventListener('mouseleave', () => isPaused = false);
            section.addEventListener('touchstart', () => isPaused = true, { passive: true });
            section.addEventListener('touchend', () => isPaused = false, { passive: true });

            function animateMarquee() {
                if (!isPaused) {
                    const listWidth = originalList.scrollWidth;
                    if (listWidth > 0) {
                        offset -= speed;
                        if (Math.abs(offset) >= listWidth) {
                            offset += listWidth;
                        }
                        wrapper.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
                    }
                }
                requestAnimationFrame(animateMarquee);
            }
            requestAnimationFrame(animateMarquee);

            // Dynamic live date & time
            const dateEl = document.querySelector('.announcement-container [data-section="date"]');
            if (dateEl) {
                const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                function updateDate() {
                    const now = new Date();
                    const dName = days[now.getDay()];
                    const d = String(now.getDate()).padStart(2, '0');
                    const mName = months[now.getMonth()];
                    const y = now.getFullYear();
                    const hh = String(now.getHours()).padStart(2, '0');
                    const mm = String(now.getMinutes()).padStart(2, '0');
                    const ss = String(now.getSeconds()).padStart(2, '0');
                    dateEl.textContent = dName + ', ' + d + '-' + mName + '-' + y + ' ' + hh + '.' + mm + '.' + ss;
                }
                updateDate();
                setInterval(updateDate, 1000);
            }
        } catch (err) {
            console.error('Marquee error:', err);
        }
    }

    // === 2. Progressive Jackpot Running Millions Count-Up ===
    function initProgressiveJackpot() {
        try {
            const el = document.getElementById('progressive_jackpot');
            if (!el) return;

            const STORAGE_KEY = 'interwin_progressive_jackpot';
            let currentVal = parseFloat(localStorage.getItem(STORAGE_KEY));
            if (isNaN(currentVal) || currentVal < 1000000000) {
                currentVal = 1847382910.45;
            }

            function formatJackpot(num) {
                return num.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }

            el.textContent = formatJackpot(currentVal);

            let lastSave = Date.now();
            function tickJackpot() {
                const increment = Math.random() * 32.50 + 6.25;
                currentVal += increment;
                el.textContent = formatJackpot(currentVal);

                if (Date.now() - lastSave > 2500) {
                    localStorage.setItem(STORAGE_KEY, currentVal.toFixed(2));
                    lastSave = Date.now();
                }

                const delay = Math.floor(Math.random() * 40 + 60);
                setTimeout(tickJackpot, delay);
            }
            setTimeout(tickJackpot, 75);
        } catch (err) {
            console.error('Jackpot error:', err);
        }
    }

    // === 3. Download APK Container Slide-In Effect ===
    function initDownloadApkAnimation() {
        try {
            const container = document.querySelector('.download-apk-container');
            const apkEl = document.getElementById('download_apk');
            if (!apkEl) return;

            function activate() {
                apkEl.classList.add('in-view');
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            activate();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.15 });
                observer.observe(container || apkEl);
            } else {
                activate();
            }

            function checkScroll() {
                const target = container || apkEl;
                const rect = target.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    activate();
                    window.removeEventListener('scroll', checkScroll);
                }
            }
            window.addEventListener('scroll', checkScroll, { passive: true });
            checkScroll();
        } catch (err) {
            console.error('Download APK anim error:', err);
        }
    }

    // === 4. Jackpot Winners Vertical Smooth Scroll ===
    function initJackpotWinnersTicker() {
        try {
            const container = document.querySelector('.jackpot-winners .winners-ticker-container');
            const ticker = document.getElementById('winners_ticker');
            if (!container || !ticker) return;

            const ul = ticker.querySelector('ul');
            if (!ul) return;

            const originalItems = ul.innerHTML;
            ul.innerHTML = originalItems + originalItems;

            let offset = 0;
            const speed = 0.55;
            let isPaused = false;

            container.addEventListener('mouseenter', () => isPaused = true);
            container.addEventListener('mouseleave', () => isPaused = false);
            container.addEventListener('touchstart', () => isPaused = true, { passive: true });
            container.addEventListener('touchend', () => isPaused = false, { passive: true });

            function stepWinners() {
                if (!isPaused) {
                    const singleHeight = ul.scrollHeight / 2;
                    if (singleHeight > 0) {
                        offset -= speed;
                        if (Math.abs(offset) >= singleHeight) {
                            offset += singleHeight;
                        }
                        ul.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
                    }
                }
                requestAnimationFrame(stepWinners);
            }
            requestAnimationFrame(stepWinners);
        } catch (err) {
            console.error('Winners ticker error:', err);
        }
    }

    // === 5. Banner Carousel Automatic Slide ===
    function initBannerCarousel() {
        try {
            const carousel = document.getElementById('banner_carousel');
            const bannerContainer = document.querySelector('.banner');
            if (!carousel || !bannerContainer) return;

            const slides = Array.from(carousel.children).filter(el => el.tagName === 'DIV');
            if (slides.length <= 1) return;

            const track = document.createElement('div');
            track.className = 'banner-carousel-track';

            slides.forEach(slide => {
                slide.classList.add('banner-carousel-slide');
                track.appendChild(slide);
            });
            carousel.appendChild(track);

            let currentIndex = 0;
            const totalSlides = slides.length;
            let autoPlayTimer = null;
            let isPaused = false;

            // Indicators
            const indicators = document.createElement('div');
            indicators.className = 'banner-indicators';
            const dots = [];

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'banner-indicator-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoPlay();
                });
                indicators.appendChild(dot);
                dots.push(dot);
            }
            bannerContainer.appendChild(indicators);

            // Nav buttons
            const prevBtn = document.createElement('div');
            prevBtn.className = 'banner-arrow banner-arrow-prev';
            prevBtn.innerHTML = '&#8249;';
            prevBtn.setAttribute('title', 'Sebelumnya');
            prevBtn.addEventListener('click', () => {
                goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
                resetAutoPlay();
            });

            const nextBtn = document.createElement('div');
            nextBtn.className = 'banner-arrow banner-arrow-next';
            nextBtn.innerHTML = '&#8250;';
            nextBtn.setAttribute('title', 'Selanjutnya');
            nextBtn.addEventListener('click', () => {
                goToSlide((currentIndex + 1) % totalSlides);
                resetAutoPlay();
            });

            bannerContainer.appendChild(prevBtn);
            bannerContainer.appendChild(nextBtn);

            function updateSlide() {
                track.style.transform = 'translate3d(-' + (currentIndex * 100) + '%, 0, 0)';
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            }

            function goToSlide(index) {
                currentIndex = index;
                updateSlide();
            }

            function startAutoPlay() {
                stopAutoPlay();
                autoPlayTimer = setInterval(() => {
                    if (!isPaused) {
                        currentIndex = (currentIndex + 1) % totalSlides;
                        updateSlide();
                    }
                }, 4000);
            }

            function stopAutoPlay() {
                if (autoPlayTimer) {
                    clearInterval(autoPlayTimer);
                    autoPlayTimer = null;
                }
            }

            function resetAutoPlay() {
                stopAutoPlay();
                startAutoPlay();
            }

            bannerContainer.addEventListener('mouseenter', () => isPaused = true);
            bannerContainer.addEventListener('mouseleave', () => isPaused = false);

            let touchStartX = 0;
            bannerContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                isPaused = true;
            }, { passive: true });
            bannerContainer.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                isPaused = false;
                if (touchStartX - touchEndX > 50) {
                    goToSlide((currentIndex + 1) % totalSlides);
                    resetAutoPlay();
                } else if (touchEndX - touchStartX > 50) {
                    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
                    resetAutoPlay();
                }
            }, { passive: true });

            startAutoPlay();
        } catch (err) {
            console.error('Banner carousel error:', err);
        }
    }

    // === 6. Gentle Snowfall Animation Effect (Guaranteed Fixed Visibility) ===
    function initSnowfallAnimation() {
        try {
            let canvas = document.getElementById('snowfall_canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'snowfall_canvas';
                document.body.appendChild(canvas);
            }

            // Guarantee fixed viewport overlay
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '99998';

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }, { passive: true });

            const flakeCount = Math.min(Math.floor(width / 18), 75);
            const flakes = [];

            for (let i = 0; i < flakeCount; i++) {
                flakes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2.2 + 0.8,
                    speedY: Math.random() * 0.9 + 0.45,
                    speedX: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.55 + 0.25,
                    sway: Math.random() * 0.02 + 0.005,
                    angle: Math.random() * Math.PI * 2
                });
            }

            let isVisible = true;
            document.addEventListener('visibilitychange', () => {
                isVisible = (document.visibilityState === 'visible');
            });

            function renderSnow() {
                if (!isVisible) {
                    requestAnimationFrame(renderSnow);
                    return;
                }

                ctx.clearRect(0, 0, width, height);

                for (let i = 0; i < flakeCount; i++) {
                    const f = flakes[i];

                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);

                    if (f.radius > 2.0) {
                        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 1.8);
                        grad.addColorStop(0, 'rgba(255, 255, 255, ' + f.opacity + ')');
                        grad.addColorStop(0.6, 'rgba(255, 250, 235, ' + (f.opacity * 0.7) + ')');
                        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                        ctx.fillStyle = grad;
                        ctx.fill();
                    } else {
                        ctx.fillStyle = 'rgba(255, 255, 255, ' + f.opacity + ')';
                        ctx.fill();
                    }

                    f.angle += f.sway;
                    f.x += Math.sin(f.angle) * 0.7 + f.speedX;
                    f.y += f.speedY;

                    if (f.y > height + 10) {
                        f.y = -10;
                        f.x = Math.random() * width;
                    }
                    if (f.x > width + 10) {
                        f.x = -10;
                    } else if (f.x < -10) {
                        f.x = width + 10;
                    }
                }

                requestAnimationFrame(renderSnow);
            }
            requestAnimationFrame(renderSnow);
        } catch (err) {
            console.error('Snowfall anim error:', err);
        }
    }

    // === 7. Provider Carousel Tabs & Mascot Switching ===
    function initPopularGamesProviders() {
        try {
            const popularGames = document.querySelector('.popular-games');
            if (!popularGames) return;

            popularGames.classList.add('col-md-12-animated');

            const popularProviders = document.getElementById('popular_providers');
            if (!popularProviders) return;

            let wrapper = popularGames.querySelector('.popular-providers-wrapper');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'popular-providers-wrapper';

                const prevBtn = document.createElement('button');
                prevBtn.className = 'popular-providers-nav-btn popular-providers-prev';
                prevBtn.setAttribute('type', 'button');
                prevBtn.setAttribute('aria-label', 'Previous Provider');
                prevBtn.innerHTML = '&#8249;';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'popular-providers-nav-btn popular-providers-next';
                nextBtn.setAttribute('type', 'button');
                nextBtn.setAttribute('aria-label', 'Next Provider');
                nextBtn.innerHTML = '&#8250;';

                const viewport = document.createElement('div');
                viewport.className = 'popular-providers-viewport';

                const rightSection = popularGames.querySelector('[data-section="right"]');
                const tabContent = popularGames.querySelector('.tab-content');

                if (rightSection && tabContent) {
                    viewport.appendChild(popularProviders);
                    wrapper.appendChild(prevBtn);
                    wrapper.appendChild(viewport);
                    wrapper.appendChild(nextBtn);
                    rightSection.insertBefore(wrapper, tabContent);
                }
            }

            const tabs = Array.from(popularProviders.querySelectorAll('li'));
            const totalTabs = tabs.length;
            const visibleTabs = 3;
            let scrollIndex = 0;

            function updateSlider() {
                const maxScroll = Math.max(0, totalTabs - visibleTabs);
                if (scrollIndex > maxScroll) scrollIndex = maxScroll;
                if (scrollIndex < 0) scrollIndex = 0;

                const percent = (scrollIndex * (100 / visibleTabs));
                popularProviders.style.transform = 'translate3d(-' + percent + '%, 0, 0)';
            }

            const prevBtn = popularGames.querySelector('.popular-providers-prev');
            const nextBtn = popularGames.querySelector('.popular-providers-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (scrollIndex > 0) {
                        scrollIndex = Math.max(0, scrollIndex - 1);
                    } else {
                        scrollIndex = Math.max(0, totalTabs - visibleTabs);
                    }
                    updateSlider();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const maxScroll = Math.max(0, totalTabs - visibleTabs);
                    if (scrollIndex < maxScroll) {
                        scrollIndex = Math.min(maxScroll, scrollIndex + 1);
                    } else {
                        scrollIndex = 0;
                    }
                    updateSlider();
                });
            }

            function activateTab(targetLi) {
                if (!targetLi) return;
                const a = targetLi.querySelector('a');
                if (!a) return;
                const targetId = a.getAttribute('href');
                if (!targetId || !targetId.startsWith('#')) return;

                tabs.forEach(t => t.classList.remove('active'));
                targetLi.classList.add('active');

                const allPanes = popularGames.querySelectorAll('.tab-content .tab-pane');
                allPanes.forEach(p => p.classList.remove('active'));

                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');

                    const mascotImg = targetPane.querySelector('.animated-image');
                    if (mascotImg) {
                        mascotImg.style.animation = 'none';
                        void mascotImg.offsetWidth;
                        mascotImg.style.animation = '';
                    }
                }
            }

            tabs.forEach((tab, index) => {
                const a = tab.querySelector('a');
                if (a) {
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        activateTab(tab);

                        if (index < scrollIndex) {
                            scrollIndex = index;
                            updateSlider();
                        } else if (index >= scrollIndex + visibleTabs) {
                            scrollIndex = index - visibleTabs + 1;
                            updateSlider();
                        }
                    });
                }
            });

            if (tabs.length > 0) {
                activateTab(tabs[0]);
            }

            let touchStartX = 0;
            popularProviders.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            popularProviders.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                const maxScroll = Math.max(0, totalTabs - visibleTabs);
                if (diff > 40 && scrollIndex < maxScroll) {
                    scrollIndex = Math.min(maxScroll, scrollIndex + 1);
                    updateSlider();
                } else if (diff < -40 && scrollIndex > 0) {
                    scrollIndex = Math.max(0, scrollIndex - 1);
                    updateSlider();
                }
            }, { passive: true });
        } catch (err) {
            console.error('Popular games provider error:', err);
        }
    }

    // === 8. Dynamic Game Action Button Vector SVGs (COBA & MAIN - NO EMOJIS) ===
    function initGameButtonIcons() {
        try {
            // High-quality crisp Vector Gamepad SVG for "MAIN"
            const gamepadSvg = `
                <svg class="btn-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="6"></rect>
                    <path d="M6 12h4m-2-2v4"></path>
                    <circle cx="15" cy="11" r="1.2" fill="currentColor"></circle>
                    <circle cx="18" cy="13" r="1.2" fill="currentColor"></circle>
                </svg>
            `.trim();

            // High-quality crisp Vector Play Badge SVG for "COBA"
            const trialSvg = `
                <svg class="btn-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                </svg>
            `.trim();

            // Decorate all MAIN buttons
            const playButtons = document.querySelectorAll('.popular-games .link-container a.play-now');
            playButtons.forEach(btn => {
                if (!btn.querySelector('.btn-svg-icon')) {
                    const text = btn.textContent.trim() || 'MAIN';
                    btn.innerHTML = gamepadSvg + ' <span>' + text + '</span>';
                }
            });

            // Decorate all COBA buttons
            const freeButtons = document.querySelectorAll('.popular-games .link-container a.free-play');
            freeButtons.forEach(btn => {
                if (!btn.querySelector('.btn-svg-icon')) {
                    const text = btn.textContent.trim() || 'COBA';
                    btn.innerHTML = trialSvg + ' <span>' + text + '</span>';
                }
            });
        } catch (err) {
            console.error('Button icons error:', err);
        }
    }

    // === 9. Interactive FAQ Accordion Component ===
    function initFaqAccordion() {
        try {
            const faqItems = document.querySelectorAll('.interwin-faq-item, .tri7-faq-item');
            if (!faqItems || faqItems.length === 0) return;

            faqItems.forEach((item, index) => {
                const header = item.querySelector('.interwin-faq-header, .tri7-faq-header');
                const body = item.querySelector('.interwin-faq-body, .tri7-faq-body');
                if (!header || !body) return;

                // Ensure initial max-height if active
                if (item.classList.contains('active')) {
                    const h = body.scrollHeight || 200;
                    body.style.maxHeight = h + 'px';
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    body.style.maxHeight = '0px';
                    header.setAttribute('aria-expanded', 'false');
                }

                header.addEventListener('click', () => {
                    const isAlreadyActive = item.classList.contains('active');

                    // Smoothly close all other items for a clean single-open accordion
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherBody = otherItem.querySelector('.interwin-faq-body, .tri7-faq-body');
                            const otherHeader = otherItem.querySelector('.interwin-faq-header, .tri7-faq-header');
                            if (otherBody) otherBody.style.maxHeight = '0px';
                            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Toggle current item
                    if (isAlreadyActive) {
                        item.classList.remove('active');
                        body.style.maxHeight = '0px';
                        header.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('active');
                        const h = body.scrollHeight || 200;
                        body.style.maxHeight = (h + 30) + 'px';
                        header.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        } catch (err) {
            console.error('FAQ accordion error:', err);
        }
    }

    // Initialize all components once DOM is loaded
    function initAll() {
        initAnnouncementMarquee();
        initProgressiveJackpot();
        initDownloadApkAnimation();
        initJackpotWinnersTicker();
        initBannerCarousel();
        initSnowfallAnimation();
        initPopularGamesProviders();
        initGameButtonIcons();
        initFaqAccordion();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
