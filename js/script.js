document.addEventListener("DOMContentLoaded", () => {
    // ... VOS SCRIPTS EXISTANTS (le carrousel, etc.) ...

    console.log("DOM entièrement chargé et analysé");

    // --- DÉBUT AJOUT : Logique du bouton Retour en haut ---

    const backToTopBtn = document.getElementById('backToTopBtn');

    // Seulement si le bouton existe sur la page
    if (backToTopBtn) {
        // Le seuil de scroll (en pixels) avant que le bouton n'apparaisse
        const scrollThreshold = 300;

        // Fonction pour montrer/cacher le bouton selon la position du scroll
        const toggleBackToTopButton = () => {
            if (window.scrollY > scrollThreshold) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        // Écouter l'événement de scroll sur la fenêtre
        window.addEventListener('scroll', toggleBackToTopButton);

        // Écouter le clic sur le bouton pour remonter
        // Écouter le clic sur le bouton pour remonter
        backToTopBtn.addEventListener('click', () => {
            // Désactiver temporairement le scroll-behavior CSS pour éviter les conflits
            // qui ralentissent considérablement le scroll sur mobile
            document.documentElement.style.scrollBehavior = 'auto';

            const start = window.scrollY;
            const duration = 300; // Rapide et fluide (300ms)
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function (easeOutCubic) pour un effet naturel
                const ease = 1 - Math.pow(1 - progress, 3);

                window.scrollTo(0, start - (start * ease));

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    // Restaurer le comportement CSS original si nécessaire, ou laisser auto pour éviter d'autres conflits
                    document.documentElement.style.removeProperty('scroll-behavior');
                }
            };

            requestAnimationFrame(animateScroll);
        });

        // Vérification initiale au chargement
        toggleBackToTopButton();
    }
    // --- FIN AJOUT ---


    // --- DÉBUT AJOUT : Logique du Compte à rebours ---
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
    // --- FIN AJOUT ---

    // Vérification des éléments (Votre code existant)
    const carousel = document.querySelector('.carousel-container');
    // ... etc ...
});
