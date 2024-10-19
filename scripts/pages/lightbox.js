let currentIndex = 0;
let mediaArray = [];

// Fonction pour ouvrir le carrousel et afficher le média correspondant
function openCarrousel(mediaIndex) {
    const carrousel = document.getElementById('contain-carrousel');
    const imgCenter = document.getElementById('img-center');
    // cela met à jour la variable currentIndex avec la valeur mediaIndex passé en argument
    // comme cela le carrousel sait quel média est en cours d'affichage
    currentIndex = mediaIndex;

    imgCenter.innerHTML = ''; // Réinitialiser le contenu de imgCenter
    // La varibale permet de stocker le média à afficher en accédant au tableau contenant tout les médias dispo
    // Avec currentIndex on sait on nous sommes
    const media = mediaArray[currentIndex];
    // je vais créer une condition
    // si tu récupere le premiere élément du tableau et que c'est une image, tu crée une div
    if (media.image) {
        const carrouselImage = document.createElement('img');
        carrouselImage.src = `assets/images/${media.photographerId}/${media.image}`;
        carrouselImage.alt = media.title; // Description de l'image
        imgCenter.appendChild(carrouselImage);
    } else if (media.video) {
        const videoElement = document.createElement('video');
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('aria-label', `Vidéo intitulée ${media.title}`); // Description de la vidéo

        const source = document.createElement('source');
        source.src = `assets/images/${media.photographerId}/${media.video}`;
        source.type = 'video/mp4';

        videoElement.appendChild(source);
        imgCenter.appendChild(videoElement);
    }

    // Ajouter la description dans img-center
    const mediaDescription = document.createElement('p');
    mediaDescription.textContent = media.title; // Utiliser le titre comme description
    mediaDescription.setAttribute('aria-hidden', 'true'); // Masquer la description pour les lecteurs d'écran car elle est déjà donnée via alt ou aria-label
    imgCenter.appendChild(mediaDescription);

    carrousel.style.display = 'flex'; // Affiche le carrousel

    carrousel.setAttribute('tabindex', '-1'); // Rendre le carrousel focusable
    carrousel.focus(); // Met le focus sur le carrousel
}


// Fonction pour fermer le carrousel
function closeCarrousel() {
    const carrousel = document.getElementById('contain-carrousel');
    carrousel.style.display = 'none'; // Cache le carrousel
}

// Fonction pour passer à l'image ou la vidéo précédente
// currenIndex = 0 par défaut le carrousel s'ouvre au premier élément
function leftCarrousel() {
    // condition ternaire pour mettre à jour l'index
    // si l'index supérieur à 0, on soustrait 1 à l'index, sinon si l'index est le premier élément on revient au dernier élément du tableau
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaArray.length - 1;
    openCarrousel(currentIndex);
}

// Fonction pour passer à l'image ou la vidéo suivante
function rightCarrousel() {
    // Si l'index actuel est inférieur à la longueur du tableau on ajoute 1 à l'index pour passer à l'élément suivant
    // Sinon si l'index est le derniere élément on remet l'index à 0 (premier élément)
    currentIndex = (currentIndex < mediaArray.length - 1) ? currentIndex + 1 : 0;
    openCarrousel(currentIndex);
}

// Fonction pour gérer les événements de clavier pour naviguer dans le carrousel
// event sert à indentifer quelle touche à été pressé
function navigationKey(event) {
    const carrousel = document.getElementById('contain-carrousel');
    if (carrousel.style.display === 'flex') { // cela verifie que les actions ne sont déclenché que lorsque le carrousel est ouvert.
        if (event.key === 'ArrowRight') { // Si tu appuies sur la fleche droite du clavier tu appeles la function rightCarrousel
            rightCarrousel(); // Passe à l'image ou vidéo suivante
        } else if (event.key === 'ArrowLeft') {
            leftCarrousel(); // Passe à l'image ou vidéo précédente
        } else if (event.key === 'Escape') {
            closeCarrousel(); // Ferme le carrousel si on appuie sur Échap
        }
    }
}

// Ajouter un écouteur d'événements pour écouter les touches du clavier
document.addEventListener('keydown', navigationKey);