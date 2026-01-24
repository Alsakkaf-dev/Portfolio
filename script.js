document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');
    const heroHeadline = document.querySelector('.hero-headline');
    const projectCards = document.querySelectorAll('.project-card');

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Hero Tilt Effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        heroHeadline.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    // Smooth reveal on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.project-card, .stat-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});
