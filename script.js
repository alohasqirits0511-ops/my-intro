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

    // 3D Tilt Effect on the Hero Name Section only
    const nameCard = document.querySelector('.hero-content');
    if (nameCard) {
        nameCard.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        nameCard.addEventListener('mousemove', (e) => {
            const rect = nameCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            nameCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            nameCard.style.boxShadow = `${8 - rotateY}px ${8 + rotateX}px 0 var(--shadow-color)`;
            nameCard.style.transition = 'none';
        });

        nameCard.addEventListener('mouseleave', () => {
            nameCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            nameCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            nameCard.style.boxShadow = `8px 8px 0 var(--shadow-color)`;
        });
    }

    // 3. Guitar Sound Player
    const guitarContainer = document.querySelector('.guitar-container');
    if (guitarContainer) {
        // フリーのギターサウンド（Mixkit等から引用）
        const guitarSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2288/2288-preview.mp3');
        guitarSound.volume = 0.5;

        guitarContainer.addEventListener('click', () => {
            // 再生位置をリセットして音を鳴らす
            guitarSound.currentTime = 0;
            guitarSound.play().catch(e => console.log("Audio playback blocked by browser: ", e));
            
            const icon = guitarContainer.querySelector('.guitar-icon');
            if (icon) {
                // クリックされた瞬間、激しく弾くようなアニメーションにする
                icon.style.animationDuration = '0.05s';
                setTimeout(() => {
                    // 元のゆったりした揺れに戻す
                    icon.style.animationDuration = '0.4s';
                }, 600);
            }
        });
    }
});
