/**
 * @fileoverview Mohammed Alsakkaf - Portfolio JavaScript
 * Enhanced interactive elements with mouse tracking, 3D effects, and smooth scrolling.
 * @author Mohammed Alsakkaf
 */

'use strict';

/**
 * Initializes the custom animated cursor.
 */
const initCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /**
     * Animation loop for the cursor movement.
     */
    const animateCursor = () => {
        // Smooth cursor following
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;

        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .about-card, .project-showcase, .stat-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
};

/**
 * Adds a 3D tilt effect to an element based on mouse position.
 * @param {HTMLElement} element - The element to apply the tilt effect to.
 */
const addTiltEffect = (element) => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
};

/**
 * Initializes tilt effects on specific cards.
 */
const initTiltEffects = () => {
    const tiltCards = document.querySelectorAll('.about-card, .stat-card, .browser-mockup');
    tiltCards.forEach(card => {
        card.style.transition = 'transform 0.1s ease-out';
        addTiltEffect(card);
    });
};

/**
 * Initializes magnetic effect on buttons.
 */
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
};

/**
 * Initializes floating cards with parallax mouse tracking.
 */
const initFloatingCards = () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 10;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;

            card.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
};

/**
 * Initializes smooth scrolling for anchor links.
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/**
 * Highlights the active navigation link based on scroll position.
 */
const highlightNavOnScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

/**
 * Initializes intersection observer for fade-in animations.
 */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .stat-card, .project-showcase, .contact-item, .principle-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

/**
 * Initializes parallax scrolling effects.
 */
const initParallax = () => {
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.4}px)`;
        }

        // Floating cards parallax
        floatingCards.forEach((card, index) => {
            const speed = 0.2 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

/**
 * Handles the contact form submission.
 * @param {Event} event - The submit event.
 */
const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Animate button
    submitButton.textContent = 'Sending...';
    submitButton.style.transform = 'scale(0.95)';

    setTimeout(() => {
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitButton.style.transform = 'scale(1)';
        submitButton.disabled = true;

        console.log('Contact Form Submission:', data);

        setTimeout(() => {
            form.reset();
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
    }, 1000);
};

/**
 * Initializes form handling.
 */
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
};

/**
 * Updates navbar background on scroll.
 */
const initNavbarScroll = () => {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.nav-bar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
                navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
};

/**
 * Initializes project preview hover effects.
 */
const initProjectPreview = () => {
    const browserContent = document.querySelector('.browser-content');
    if (browserContent) {
        browserContent.addEventListener('mouseenter', () => {
            browserContent.style.transform = 'scale(1.02)';
            browserContent.style.transition = 'transform 0.3s ease';
        });

        browserContent.addEventListener('mouseleave', () => {
            browserContent.style.transform = 'scale(1)';
        });
    }
};

/**
 * Initializes smooth page load animation.
 */
const initPageLoad = () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
};

/**
 * Initializes scroll progress indicator.
 */
const initScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

/**
 * Main initialization function.
 */
const init = () => {
    initCursor();
    initTiltEffects();
    initMagneticButtons();
    initFloatingCards();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initContactForm();
    initNavbarScroll();
    initProjectPreview();
    initPageLoad();
    initScrollProgress();

    window.addEventListener('scroll', highlightNavOnScroll);

    // Performance Monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log(`Page load time: ${entry.loadEventEnd - entry.fetchStart}ms`);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['navigation'] });
    }

    // Console Easter Egg
    console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cThis portfolio was built with precision and purpose by Mohammed Alsakkaf.', 'font-size: 14px; color: #a0a0b8;');
    console.log('%cInterested in working together? Let\'s connect!', 'font-size: 14px; color: #f5576c;');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
