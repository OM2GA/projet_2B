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

    // Galerie Modal Bénévoles
    const volunteerGallery = document.getElementById('volunteerGallery');
    const galleryModal = document.getElementById('galleryModal');

    if (volunteerGallery && galleryModal) {
        const volunteerImages = Array.from(volunteerGallery.querySelectorAll('img'));
        const modalImage = document.getElementById('galleryModalImage');
        const prevBtn = document.getElementById('galleryPrevBtn');
        const nextBtn = document.getElementById('galleryNextBtn');
        const bsModal = new bootstrap.Modal(galleryModal);

        let currentIndex = 0;

        const showImage = (index) => {
            if (volunteerImages.length === 0) return;
            if (index < 0) index = volunteerImages.length - 1;
            if (index >= volunteerImages.length) index = 0;

            currentIndex = index;
            const img = volunteerImages[currentIndex];
            // Get original src directly, could be thumbnail but here they are identical
            modalImage.setAttribute('src', img.getAttribute('src'));
            modalImage.setAttribute('alt', img.getAttribute('alt'));
        };

        volunteerImages.forEach((img, index) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                showImage(index);
                bsModal.show();
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
        }

        // Support clavier
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            }
        };

        galleryModal.addEventListener('shown.bs.modal', () => {
            document.addEventListener('keydown', handleKeyDown);
        });

        galleryModal.addEventListener('hidden.bs.modal', () => {
            document.removeEventListener('keydown', handleKeyDown);
        });
    }

    // Copier l'adresse email
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = document.getElementById('emailText').innerText;

            const handleSuccess = () => {
                const copyIcon = document.getElementById('copyIcon');
                const btn = document.getElementById('copyEmailBtn');

                // Changer la couleur (retirer outline-primary, ajouter success et text-white)
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-success', 'text-white');

                // Changer l'icône
                copyIcon.classList.remove('bi-clipboard');
                copyIcon.classList.add('bi-check-lg');

                // Revenir à l'état normal après 3 secondes
                setTimeout(() => {
                    btn.classList.remove('btn-success', 'text-white');
                    btn.classList.add('btn-outline-primary');

                    copyIcon.classList.remove('bi-check-lg');
                    copyIcon.classList.add('bi-clipboard');
                }, 3000);
            };

            const handleError = (err) => {
                console.error('Erreur lors de la copie : ', err);
                alert("Impossible de copier l'adresse.");
            };

            if (navigator.clipboard && window.isSecureContext) {
                // API moderne (HTTPS)
                navigator.clipboard.writeText(emailText).then(handleSuccess).catch(handleError);
            } else {
                // Fallback pour les environnements non sécurisés (HTTP) ou navigateurs ne supportant pas l'API
                const textArea = document.createElement("textarea");
                textArea.value = emailText;

                // Rendre le textarea invisible
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";

                document.body.appendChild(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                    handleSuccess();
                } catch (err) {
                    handleError(err);
                }

                document.body.removeChild(textArea);
            }
        });
    }

    // Gestion du flip de l'affiche sur mobile
    const flipContainer = document.querySelector('.poster-flip-container');
    if (flipContainer) {
        flipContainer.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    }

    // --- Animation au défilement (Scroll Reveal) ---
    // Sélection automatique de certains éléments pour leur ajouter la classe .scroll-reveal
    // On sélectionne de façon large pour que le site entier s'anime au fur et à mesure.
    const elementsToReveal = document.querySelectorAll(
        '.card-borne, .card, .partner-card, .gallery-img, section h2, main h2, main h3, .table-pricing tr, .alert'
    );
    
    elementsToReveal.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        // Un petit délai optionnel pour simuler un effet cascade sur les éléments frères
        // Le délai est calculé pour éviter une attente trop longue.
        if (el.tagName.toLowerCase() === 'tr' || el.classList.contains('card') || el.classList.contains('card-borne') || el.classList.contains('partner-card') || el.classList.contains('gallery-img')) {
            el.style.transitionDelay = `${(index % 4) * 100}ms`;
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionnel: On cesse d'observer l'élément pour ne l'animer qu'une fois
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialisation sur tous les éléments .scroll-reveal (inclus ceux qu'on vient d'ajouter)
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

});
