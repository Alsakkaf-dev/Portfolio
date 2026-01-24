/**
 * CRYSTAL ENGINE v1.0
 * High-performance, clean interaction controller
 */

'use strict';

const Crystal = {
    init() {
        this.cursor();
        this.reveal();
        this.smoothScroll();
        this.navbar();
        console.log("%c CRYSTAL UI LOADED ", "background: #4f46e5; color: #fff; font-weight: bold; padding: 4px;");
    },

    cursor() {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');

        let mouse = { x: 0, y: 0 };
        let dotPos = { x: 0, y: 0 };
        let ringPos = { x: 0, y: 0 };

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        const tick = () => {
            // Smooth lerping
            dotPos.x += (mouse.x - dotPos.x) * 0.2;
            dotPos.y += (mouse.y - dotPos.y) * 0.2;

            ringPos.x += (mouse.x - ringPos.x) * 0.1;
            ringPos.y += (mouse.y - ringPos.y) * 0.1;

            if (dot) dot.style.transform = `translate(${dotPos.x - 4}px, ${dotPos.y - 4}px)`;
            if (ring) ring.style.transform = `translate(${ringPos.x - 20}px, ${ringPos.y - 20}px)`;

            requestAnimationFrame(tick);
        };
        tick();

        // Hover states
        const targets = document.querySelectorAll('a, button, .card, .project-card');
        targets.forEach(t => {
            t.addEventListener('mouseenter', () => {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.transform = `translate(${ringPos.x - 30}px, ${ringPos.y - 30}px)`;
                ring.style.background = 'rgba(79, 70, 229, 0.1)';
                ring.style.borderColor = 'transparent';
            });
            t.addEventListener('mouseleave', () => {
                ring.style.width = '40px';
                ring.style.height = '40px';
                ring.style.background = 'transparent';
                ring.style.borderColor = 'var(--primary)';
            });
        });
    },

    reveal() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    },

    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    navbar() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = 'none';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Crystal.init());
