document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer (Fade In Elements)
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
});
