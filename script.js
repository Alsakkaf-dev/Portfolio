/**
 * BENTO ARCHITECT ENGINE v6.0
 * Pure interaction, Zero cursor lag.
 */

'use strict';

const Architect = {
    init() {
        this.revealOnScroll();
        this.magneticInteraction();
        console.log("%c BENTO ARCHITECT ONLINE ", "background: #00f2ff; color: #000; font-weight: bold; padding: 4px;");
    },

    /**
     * Subtle staggered reveal for bento cards
     */
    revealOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay reveal based on current visibility to create stagger
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.bento-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            observer.observe(card);
        });
    },

    /**
     * Subtle light tilt effect on hover for high-end feel
     * (Not a cursor, just card reaction)
     */
    magneticInteraction() {
        const cards = document.querySelectorAll('.bento-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 50;
                const rotateY = (centerX - x) / 50;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Architect.init());
