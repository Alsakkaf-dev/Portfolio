/**
 * THE ARCHITECT'S ENGINE v2.0
 * Mohammed Alsakkaf - Advanced Interaction Controller
 */

'use strict';

const Engine = {
    init() {
        this.cursor();
        this.scrollReactions();
        this.magneticItems();
        this.animations();
        this.smoothScroll();
        this.parallax();
        console.log("%c ARCHITECT ENGINE LOADED ", "background: #ffaa00; color: #000; font-weight: bold;");
    },

    // Premium Cursor Logic
    cursor() {
        const dot = document.querySelector('.master-cursor');
        const follower = document.querySelector('.cursor-follower');

        if (!dot || !follower) return;

        let mx = 0, my = 0;
        let dx = 0, dy = 0;
        let fx = 0, fy = 0;

        window.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
        });

        const loop = () => {
            // Inner dot speed
            dx += (mx - dx) * 0.2;
            dy += (my - dy) * 0.2;
            dot.style.transform = `translate(${dx}px, ${dy}px)`;

            // Outer follower speed (delay effect)
            fx += (mx - fx) * 0.1;
            fy += (my - fy) * 0.1;
            follower.style.transform = `translate(${fx - 15}px, ${fy - 15}px)`;

            requestAnimationFrame(loop);
        };
        loop();

        // Hover expansions
        document.querySelectorAll('a, button, .card-obsidian').forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '80px';
                follower.style.height = '80px';
                follower.style.transform = `translate(${fx - 35}px, ${fy - 35}px)`;
                follower.style.background = 'rgba(255, 170, 0, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.background = 'transparent';
            });
        });
    },

    // Magnetic Gravity for Buttons
    magneticItems() {
        const items = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link');
        items.forEach(item => {
            item.addEventListener('mousemove', e => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                item.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = `translate(0, 0)`;
            });
        });
    },

    // Section Visibility Engine
    scrollReactions() {
        const sections = document.querySelectorAll('section');
        const nav = document.querySelector('header');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(s => observer.observe(s));

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    },

    // Parallax Depth Logic
    parallax() {
        const turb = document.querySelector('#liquid feTurbulence');
        let frame = 0;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const blobs = document.querySelectorAll('.blob');

            // Animate liquid properties on scroll
            if (turb) {
                turb.setAttribute('baseFrequency', `${0.01 + (scrolled * 0.00001)} ${0.01 + (scrolled * 0.00001)}`);
            }

            blobs.forEach((blob, i) => {
                const speed = (i + 1) * 0.2;
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });

            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroTitle.style.opacity = 1 - (scrolled / 700);
            }
        });

        // Continuous Physics Loop
        const physicsLoop = () => {
            frame += 0.005;
            if (turb) {
                const baseFreq = 0.01 + Math.sin(frame) * 0.002;
                turb.setAttribute('baseFrequency', `${baseFreq} ${baseFreq}`);
            }
            requestAnimationFrame(physicsLoop);
        };
        physicsLoop();
    },

    // Smooth & Page Switching
    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Trigger Transition Animation
                    const transition = document.querySelector('.page-transition');
                    transition.style.transformOrigin = 'bottom';
                    transition.style.transform = 'scaleY(1)';

                    setTimeout(() => {
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: 'auto'
                        });
                        transition.style.transformOrigin = 'top';
                        transition.style.transform = 'scaleY(0)';
                    }, 600);
                }
            });
        });
    },

    animations() {
        // Initial entrance
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Engine.init());
