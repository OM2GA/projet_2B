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
        backToTopBtn.addEventListener('click', () => {
            // Fallback manuel pour garantir l'animation
            const scrollDuration = 500; // Durée en ms
            const scrollStep = -window.scrollY / (scrollDuration / 15);

            const scrollInterval = setInterval(() => {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        });

        // Vérification initiale au chargement
        toggleBackToTopButton();
    }
    // --- FIN AJOUT ---


    // Vérification des éléments (Votre code existant)
    const carousel = document.querySelector('.carousel-container');
    // ... etc ...
});
