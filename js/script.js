document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM entièrement chargé et analysé");


    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        const scrollThreshold = 300;

        const toggleBackToTopButton = () => {
            if (window.scrollY > scrollThreshold) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTopButton);

        backToTopBtn.addEventListener('click', () => {
            document.documentElement.style.scrollBehavior = 'auto';

            const start = window.scrollY;
            const duration = 300;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                const ease = 1 - Math.pow(1 - progress, 3);

                window.scrollTo(0, start - (start * ease));

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    document.documentElement.style.removeProperty('scroll-behavior');
                }
            };

            requestAnimationFrame(animateScroll);
        });

        toggleBackToTopButton();
    }


    const countdownDate = new Date("Nov 29, 2026 08:45:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        if (daysElem) daysElem.innerText = days;
        if (hoursElem) hoursElem.innerText = hours;
        if (minutesElem) minutesElem.innerText = minutes;
        if (secondsElem) secondsElem.innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownContainer = document.getElementById("countdown");
            if (countdownContainer) {
                countdownContainer.innerHTML = "<h4 class='text-white fw-bold'>C'est le grand jour !</h4>";
            }
        }
    };

    if (document.getElementById("countdown")) {
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    const carousel = document.querySelector('.carousel-container');

    const partnerLogos = document.querySelectorAll('.partner-logo');
    const partnerModal = document.getElementById('partnerModal');

    if (partnerLogos.length > 0 && partnerModal) {
        const modalImage = document.getElementById('partnerModalImage');
        const bootstrapModal = new bootstrap.Modal(partnerModal);

        partnerLogos.forEach(logo => {
            logo.addEventListener('click', function () {
                const imgSrc = this.getAttribute('src');
                const imgAlt = this.getAttribute('alt');

                modalImage.setAttribute('src', imgSrc);
                modalImage.setAttribute('alt', imgAlt);

                bootstrapModal.show();
            });
        });
    }

});
