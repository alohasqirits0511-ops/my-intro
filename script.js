document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation Observer (Fade In Elements)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Initial Trigger for the hero section so it loads immediately
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if(hero) hero.classList.add('visible');
    }, 100);

    // 2. 3D Tilt Effect on Cards (Retro Boxes)
    const cards = document.querySelectorAll('.retro-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the center of the card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust tilt amount (divide by larger number for subtler effect)
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.boxShadow = `${8 - rotateY}px ${8 + rotateX}px 0 var(--shadow-color)`;
            // Remove transition during hover to make it stick to mouse without delay
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', () => {
            // Restore smooth transition to float back to center
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            card.style.boxShadow = `8px 8px 0 var(--shadow-color)`;
        });
    });
});
