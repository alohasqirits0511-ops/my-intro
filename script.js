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
                // stop observing once visible (so it stays visible)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Optional: Add a subtle parallax effect on the background blobs depending on mouse movement
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (blob1 && blob2) {
            blob1.style.transform = `translate(${x * -50}px, ${y * -50}px) scale(1)`;
            blob2.style.transform = `translate(${x * 50}px, ${y * 50}px) scale(1)`;
        }
    });

    // Initial Trigger for the hero section so it loads immediately
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if(hero) hero.classList.add('visible');
    }, 100);
});
