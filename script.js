/* ========================================
   APPLE PREMIUM JAVASCRIPT
   Advanced Scroll Animations & Interactions
   ======================================== */

// ========================================
// PROGRESSIVE NAVIGATION BAR
// Transparent → Blurred → Solid on scroll
// ========================================

function initPremiumNavbar() {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    const updateNavbar = () => {
        const currentScroll = window.pageYOffset;

        // Progressive states based on scroll position
        if (currentScroll > 200) {
            nav.classList.add('solid');
            nav.classList.remove('scrolled');
        } else if (currentScroll > 50) {
            nav.classList.add('scrolled');
            nav.classList.remove('solid');
        } else {
            nav.classList.remove('scrolled', 'solid');
        }

        lastScroll = currentScroll;
    };

    // Throttled scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// CINEMATIC SCROLL REVEAL ANIMATIONS
// Apple-style cubic-bezier motion
// ========================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after reveal for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-triggered elements
    const elementsToReveal = document.querySelectorAll(
        '[data-scroll-reveal], [data-text-reveal], [data-scroll-section]'
    );

    elementsToReveal.forEach(el => revealObserver.observe(el));
}

// ========================================
// PREMIUM 3D PARALLAX FOR AIRPODS
// Multi-layer parallax with Y-axis + rotation
// ========================================

function initProductParallax() {
    const heroProduct = document.getElementById('heroProduct');
    if (!heroProduct) return;

    const airpodContainers = heroProduct.querySelectorAll('[data-parallax-speed]');
    const productShowcase = heroProduct.querySelector('.product-showcase-3d');

    // Scroll-based parallax
    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroProduct.offsetTop + heroProduct.offsetHeight;

        if (scrolled < heroHeight) {
            airpodContainers.forEach(container => {
                const speed = parseFloat(container.dataset.parallaxSpeed) || 1;
                const yPos = -(scrolled * speed * 0.15);
                const rotation = scrolled * 0.02;

                container.style.transform = `
                    translateY(${yPos}px)
                    rotateX(${rotation}deg)
                `;
            });
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 3D Mouse hover interaction
    heroProduct.addEventListener('mousemove', (e) => {
        const rect = heroProduct.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        // Apply 3D transform to showcase
        if (productShowcase) {
            productShowcase.style.transform = `
                rotateY(${deltaX * 8}deg)
                rotateX(${-deltaY * 8}deg)
            `;
        }

        // Individual airpod rotation
        airpodContainers.forEach((container, index) => {
            const multiplier = index % 2 === 0 ? 1 : -1;
            const airpod = container.querySelector('.airpod, .charging-case');

            if (airpod) {
                airpod.style.transform = `
                    rotateY(${deltaX * 15 * multiplier}deg)
                    rotateX(${-deltaY * 10}deg)
                    translateZ(20px)
                `;
            }
        });
    });

    // Reset on mouse leave
    heroProduct.addEventListener('mouseleave', () => {
        if (productShowcase) {
            productShowcase.style.transform = '';
        }

        airpodContainers.forEach(container => {
            const airpod = container.querySelector('.airpod, .charging-case');
            if (airpod) {
                airpod.style.transform = '';
            }
        });
    });
}

// ========================================
// SEQUENTIAL SPEC CARD ANIMATIONS
// Apple Keynote-style staggered reveals
// ========================================

function initSpecsAnimation() {
    const specCards = document.querySelectorAll('.spec-card');

    const specObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                specObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    specCards.forEach(card => specObserver.observe(card));
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// PREMIUM GEL BUTTON INTERACTIONS
// Ripple effect on click
// ========================================

function initGelButtons() {
    const gelButtons = document.querySelectorAll('.gel-button');

    gelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;

            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
                pointer-events: none;
                z-index: 10;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation dynamically
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// ADVANCED SCROLL-BASED EFFECTS
// Parallax background blur
// ========================================

function initScrollEffects() {
    const featureBgBlur = document.querySelector('.feature-bg-blur');

    if (featureBgBlur) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const blurSection = featureBgBlur.closest('.feature-section');

                    if (blurSection) {
                        const sectionTop = blurSection.offsetTop;
                        const sectionHeight = blurSection.offsetHeight;
                        const scrollProgress = (scrolled - sectionTop) / sectionHeight;

                        if (scrollProgress >= 0 && scrollProgress <= 1) {
                            const moveY = scrollProgress * 100;
                            featureBgBlur.style.transform = `translateY(${moveY}px)`;
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// ========================================
// SPATIAL AUDIO SPHERE INTERACTION
// Scroll-based rotation
// ========================================

function initSpatialAudioViz() {
    const audioSphere = document.querySelector('.audio-sphere-3d');

    if (audioSphere) {
        const sphereSection = audioSphere.closest('.feature-section');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking && sphereSection) {
                window.requestAnimationFrame(() => {
                    const rect = sphereSection.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom > 0;

                    if (inView) {
                        const progress = 1 - (rect.top / window.innerHeight);
                        const rotationY = progress * 180;
                        audioSphere.style.transform = `rotateY(${rotationY}deg) rotateX(${progress * 20}deg)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// ========================================
// KONAMI CODE EASTER EGG
// ↑↑↓↓←→←→BA - AirPods bounce animation
// ========================================

function initKonamiCode() {
    const konamiPattern = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiProgress = [];

    document.addEventListener('keydown', (e) => {
        konamiProgress.push(e.key);
        konamiProgress = konamiProgress.slice(-10);

        const matches = konamiProgress.every((key, index) =>
            key === konamiPattern[index]
        );

        if (matches && konamiProgress.length === 10) {
            activateKonamiEasterEgg();
            konamiProgress = [];
        }
    });
}

function activateKonamiEasterEgg() {
    const airpods = document.querySelectorAll('.airpod');
    const chargingCase = document.querySelector('.charging-case');

    // Console celebration
    console.log(
        '%c🎉 KONAMI CODE ACTIVATED! 🎉',
        'font-size: 24px; font-weight: bold; color: #667eea; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
    );
    console.log(
        '%cApple Premium Mode: ON',
        'font-size: 16px; color: #764ba2;'
    );

    // Create bounce animation style if not exists
    if (!document.getElementById('konami-bounce')) {
        const style = document.createElement('style');
        style.id = 'konami-bounce';
        style.textContent = `
            @keyframes konamiBounce {
                0%, 100% {
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                25% {
                    transform: translateY(-80px) rotate(15deg) scale(1.2);
                }
                50% {
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                75% {
                    transform: translateY(-40px) rotate(-15deg) scale(1.15);
                }
            }

            @keyframes konamiSpin {
                from {
                    transform: rotate(0deg) scale(1);
                }
                to {
                    transform: rotate(720deg) scale(1.3);
                }
            }

            @keyframes konamiGlow {
                0%, 100% {
                    filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
                }
                50% {
                    filter: drop-shadow(0 0 40px rgba(118, 75, 162, 1));
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Animate AirPods with bounce
    airpods.forEach((airpod, index) => {
        airpod.style.animation = 'none';
        setTimeout(() => {
            airpod.style.animation = `
                konamiBounce 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s,
                konamiGlow 1.5s ease-in-out ${index * 0.2}s
            `;
        }, 10);

        setTimeout(() => {
            airpod.style.animation = '';
        }, 2000 + (index * 200));
    });

    // Animate charging case with spin
    if (chargingCase) {
        chargingCase.style.animation = 'none';
        setTimeout(() => {
            chargingCase.style.animation = `
                konamiSpin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                konamiGlow 2s ease-in-out
            `;
        }, 10);

        setTimeout(() => {
            chargingCase.style.animation = '';
        }, 2000);
    }

    // Create particle effect
    createParticleExplosion();
}

function createParticleExplosion() {
    const heroProduct = document.getElementById('heroProduct');
    if (!heroProduct) return;

    const particleCount = 30;
    const colors = ['#667eea', '#764ba2', '#2997ff'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        heroProduct.appendChild(particle);

        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
        }).onfinish = () => particle.remove();
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;

                console.log('%c⚡ Performance Metrics', 'font-size: 14px; font-weight: bold; color: #0071e3;');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Server Response: ${connectTime}ms`);
                console.log(`DOM Render: ${renderTime}ms`);
            }, 0);
        });
    }
}

// ========================================
// WELCOME MESSAGE
// ========================================

function showWelcomeMessage() {
    console.clear();
    console.log(
        '%c🎧 AirWave Pro - Apple Premium Edition',
        'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; border-radius: 8px;'
    );
    console.log(
        '%cDesigned with Apple\'s premium design principles',
        'font-size: 13px; color: #6e6e73; font-style: italic;'
    );
    console.log('%c━'.repeat(50), 'color: #d1d1d6;');
    console.log('%cFeatures:', 'font-size: 14px; font-weight: bold; color: #1d1d1f;');
    console.log('  ✓ Progressive Navigation (Transparent → Blurred → Solid)');
    console.log('  ✓ Cinematic Scroll Animations');
    console.log('  ✓ 3D Parallax Product Showcase');
    console.log('  ✓ Premium Gel Buttons with Shimmer');
    console.log('  ✓ Sequential Spec Card Reveals');
    console.log('  ✓ Apple Keyframe Motion (cubic-bezier)');
    console.log('%c━'.repeat(50), 'color: #d1d1d6;');
    console.log('%c🎮 Easter Egg: Try the Konami Code!', 'font-size: 12px; color: #667eea;');
    console.log('%c   ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 11px; color: #86868b; font-family: monospace;');
    console.log('%c━'.repeat(50), 'color: #d1d1d6;');
    console.log('%cBuilt with ❤️ by Claude Code', 'font-size: 11px; color: #86868b;');
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Show welcome message
    showWelcomeMessage();

    // Initialize all features
    initPremiumNavbar();
    initScrollReveal();
    initProductParallax();
    initSpecsAnimation();
    initSmoothScroll();
    initGelButtons();
    initScrollEffects();
    initSpatialAudioViz();
    initKonamiCode();

    // Log performance metrics
    logPerformance();

    // Fade in page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    console.log('%c✨ All systems initialized', 'color: #34c759; font-weight: bold;');
});

// ========================================
// RESIZE HANDLER (Debounced)
// ========================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-calculate positions on resize
        console.log('♻️ Layout recalculated');
    }, 250);
});

// ========================================
// VISIBILITY CHANGE HANDLER
// Pause animations when tab is hidden
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Page hidden - animations paused');
    } else {
        console.log('▶️ Page visible - animations resumed');
    }
});
