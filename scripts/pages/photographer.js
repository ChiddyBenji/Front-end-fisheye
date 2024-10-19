function photographerDetailTemplate(photographer) {
    const { name, city, country, tagline, portrait, price } = photographer;
    const picture = `assets/photographers/${portrait}`;

    return {
        getUserCardDOM: function () {
            const header = document.querySelector('.photograph-header');
            header.classList.add('photographer-header-flex');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('photographe-img-container');

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const textContainer = document.createElement('div');
            textContainer.classList.add('text-container');

            const contactButton = document.querySelector('.contact_button');
            contactButton.setAttribute('aria-label', `Contacter ${name}`); // Ajout d'un label pour le bouton de contact
            buttonContainer.appendChild(contactButton);

            const img = document.createElement('img');
            img.setAttribute('src', picture);
            img.setAttribute('alt', `Portrait de ${name}`); // Amélioration de l'attribut alt pour une meilleure description
            imgContainer.appendChild(img);

            const h2 = document.createElement('h2');
            h2.textContent = name;
            h2.setAttribute('aria-label', `Photographe : ${name}`); // Ajout d'un aria-label pour le nom du photographe

            const location = document.createElement('p');
            location.textContent = `${city}, ${country}`;
            location.classList.add('photographer-location');
            location.setAttribute('aria-label', `Localisation : ${city}, ${country}`); // Ajout d'un aria-label pour la localisation

            const taglineElement = document.createElement('p');
            taglineElement.textContent = tagline;
            taglineElement.classList.add('photographer-tagline');
            taglineElement.setAttribute('aria-label', `Slogan : ${tagline}`); // Ajout d'un aria-label pour le slogan

            const containPrice = document.querySelector('.cont-likes');
            const priceElement = document.createElement('p');
            priceElement.textContent = `${price}€/jour`;
            priceElement.setAttribute('aria-label', `Tarif : ${price} euros par jour`); // Ajout d'un aria-label pour le tarif

            const likeCountContainer = document.createElement('div');
            likeCountContainer.classList.add('like-count-container');

            const likeCount = document.createElement('p');
            likeCount.classList.add('total-likes');  // Ajoute la classe ici pour bien cibler l'élément
            likeCount.textContent = totalLikes;  // Utilisation de la somme des likes calculée dynamiquement
            likeCount.setAttribute('aria-live', 'polite'); // Indique aux lecteurs d'écran les mises à jour dynamiques des likes

            const heartIcon = document.createElement('span');
            heartIcon.classList.add('fas', 'fa-heart');
            heartIcon.setAttribute('aria-hidden', 'true'); // Masque l'icône pour les lecteurs d'écran puisqu'elle est purement décorative

            likeCountContainer.appendChild(likeCount);
            likeCountContainer.appendChild(heartIcon);

            textContainer.appendChild(h2);
            textContainer.appendChild(location);
            textContainer.appendChild(taglineElement);

            header.appendChild(textContainer);
            header.appendChild(buttonContainer);
            header.appendChild(imgContainer);

            containPrice.appendChild(likeCountContainer);
            containPrice.appendChild(priceElement);

            
        }
    };
}


const params = new URLSearchParams(window.location.search);
const photographerId = params.get('id');
console.log('Photographer ID:', photographerId);

async function getPhotographerById(id) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    console.log('Photographers data:', data);

    return data.photographers.find(photographer => photographer.id == id);
}

async function displayPhotographerData() {
    const photographer = await getPhotographerById(photographerId);
    await displayPhotographerMedia(photographerId);
    if (photographer) {
        console.log('Photographer found:', photographer);
        const photographHeader = document.querySelector('.photograph-header');
        // eslint-disable-next-line no-undef
        photographerName = photographer.name;

        const photographerModel = photographerDetailTemplate(photographer);
        const photographerDOM = photographerModel.getUserCardDOM();

    } else {
        console.error('Photographe non trouvé');
    }
}

async function getPhotographersAndMedia() {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

let totalLikes = 0;  // Remettre à zéro les likes

async function displayPhotographerMedia(photographerId, sortCriteria = 'popularity') {
    totalLikes = 0;
    const data = await getPhotographersAndMedia();

    let mediaData = data.media.filter(media => media.photographerId == photographerId);

    // Appliquer le tri sur les médias avant de les afficher
    // eslint-disable-next-line no-undef
    mediaData = sortMedia(mediaData, sortCriteria);

    const mediaSection = document.querySelector('.photographer-portfolio');
    mediaSection.innerHTML = '';  // Effacer les médias existants pour les remplacer après le tri

    // eslint-disable-next-line no-undef
    const mediaFactory = new MediaFactory();
    // eslint-disable-next-line no-undef
    mediaArray = [];

        mediaData.forEach((media, index) => {
        totalLikes += media.likes; // On ajoute chaque like au total
        const mediaElement = mediaFactory.createMedia(media, index);
        // eslint-disable-next-line no-undef
        mediaArray.push(media);
        mediaSection.appendChild(mediaElement.getMediaDOM());
    });
    updateTotalLikes();
}

displayPhotographerData();

// Fonction pour mettre à jour le total des likes
function updateTotalLikes() {
    // je recherche la classe total-likes qui est dans like-count-container
    const likeCountElement = document.querySelector('.like-count-container .total-likes');
    // la variable likeCountElement stock l'element html; cela fonctionne si la variable est trouvé et c'est le cas
    if (likeCountElement) {
        likeCountElement.textContent = totalLikes; // Mets à jour le total des likes
        likeCountElement.setAttribute('aria-live', 'polite');
    }
}