/**
 * THE NEON ARCHITECT ENGINE v3.0
 * Mohammed Alsakkaf - Advanced Interaction Controller
 */

'use strict';

const Engine = {
    init() {
        this.cursor();
        this.navIntersection();
        this.revealOnScroll();
        this.magneticButtons();
        this.auraTracking();
        console.log("%c NEON ARCHITECT ENGINE LOADED ", "background: #9d50bb; color: #fff; font-weight: bold; padding: 4px;");
    },

    // Ultra-Smooth Dual Cursor
    cursor() {
        const dot = document.querySelector('.c-dot');
        const circle = document.querySelector('.c-circle');
        if (!dot || !circle) return;

        let mx = 0, my = 0;
        let dx = 0, dy = 0;
        let cx = 0, cy = 0;

        window.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
        });

        const tick = () => {
            // Speed for dot
            dx += (mx - dx) * 0.25;
            dy += (my - dy) * 0.25;
            dot.style.transform = `translate(${dx - 5}px, ${dy - 5}px)`;

            // Slower speed for circle (trailing effect)
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            circle.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;

            requestAnimationFrame(tick);
        };
        tick();

        // Hover expansions
        document.querySelectorAll('a, button, .neo-btn, .timeline-card, .skill-box').forEach(el => {
            el.addEventListener('mouseenter', () => {
                circle.style.width = '70px';
                circle.style.height = '70px';
                circle.style.transform = `translate(${cx - 35}px, ${cy - 35}px)`;
                circle.style.background = 'rgba(157, 80, 187, 0.1)';
                circle.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                circle.style.width = '40px';
                circle.style.height = '40px';
                circle.style.background = 'transparent';
                circle.style.borderColor = 'var(--acc-purple)';
            });
        });
    },

    // Floating Nav Highlight
    navIntersection() {
        const links = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(s => observer.observe(s));
    },

    // Reveal Animations
    revealOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill-box, .about-box, .hero-massive-title, .hero-desc');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    },

    // Aura Mouse Tracking (Moves glows with mouse)
    auraTracking() {
        const purple = document.querySelector('.aura-purple');
        const green = document.querySelector('.aura-green');

        window.addEventListener('mousemove', e => {
            const x = e.clientX;
            const y = e.clientY;

            if (purple) purple.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
            if (green) green.style.transform = `translate(${x * -0.05}px, ${y * -0.05}px)`;
        });
    },

    magneticButtons() {
        const btns = document.querySelectorAll('.neo-btn');
        btns.forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0, 0)`;
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Engine.init());
