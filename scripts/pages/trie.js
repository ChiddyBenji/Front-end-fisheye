// Fonction de création du bouton de tri
function createSortDropdown() {
    const sortContainer = document.createElement('div');
    sortContainer.classList.add('sort-container');

    // Créer le conteneur personnalisé pour le select
    const customSelectContainer = document.createElement('div');
    customSelectContainer.classList.add('custom-select-container');

    // Créer un label pour le select et l'associer
    const sortLabel = document.createElement('label');
    sortLabel.textContent = 'Trier par :';
    sortLabel.classList.add('sort-label');
    sortLabel.setAttribute('for', 'sort-options'); // Associe le label au select

    const sortSelect = document.createElement('select');
    sortSelect.setAttribute('id', 'sort-options');

    const optionPopularity = document.createElement('option');
    optionPopularity.setAttribute('value', 'popularity');
    optionPopularity.textContent = 'Popularité';

    const optionDate = document.createElement('option');
    optionDate.setAttribute('value', 'date');
    optionDate.textContent = 'Date';

    const optionTitle = document.createElement('option');
    optionTitle.setAttribute('value', 'title');
    optionTitle.textContent = 'Titre';

    // Définir l'option par défaut sur "Popularité"
    optionPopularity.setAttribute('selected', true);

    sortSelect.appendChild(optionPopularity);
    sortSelect.appendChild(optionDate);
    sortSelect.appendChild(optionTitle);

    // Ajouter le select dans le conteneur personnalisé
    customSelectContainer.appendChild(sortSelect);

    // Ajouter le conteneur personnalisé dans le conteneur principal
    sortContainer.appendChild(sortLabel);
    sortContainer.appendChild(customSelectContainer);

    return sortContainer;
}

// Fonction pour appliquer le tri sur les médias
// eslint-disable-next-line no-unused-vars
function sortMedia(mediaArray, criteria) {
    // switch verifie la valeur de criteria
    switch (criteria) {
        // si le critere est popularity, le tableau mediaArray est trié par likes avec la méthode sort
        // tu compare les deux éléments a et b, en soustrayant les nombres de likes de a à b, si b est supérieur il sera décroissant
        case 'popularity':
            return mediaArray.sort((a, b) => b.likes - a.likes); // Trier par popularité (likes)
        case 'date':
            return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // Trier par date
        case 'title':
            // localeCompare permet de comparer les deux titres, cette méthode renvoie un nombre négatif, zéro ou positif
            // qui permet un tri par odre alphabétique
            return mediaArray.sort((a, b) => a.title.localeCompare(b.title)); // Trier par titre (ordre alphabétique)
        default:
            return mediaArray;
    }
}

/*  if (criteria === 'popularity') {
       return mediaArray.sort((a, b) => b.likes - a.likes);
   } else if (criteria ==='date') {
       return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
   } else if (criteria ==='title') {
       return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
   } else {
       return mediaArray;
   } */


document.addEventListener('DOMContentLoaded', () => {
    // Ajouter le bouton de tri entre la photograph-header et photographer-portfolio
    const header = document.querySelector('.photograph-header');

    const sortDropdown = createSortDropdown();
    header.insertAdjacentElement('afterend', sortDropdown);

    // Gérer l'événement de changement dans la liste déroulante
    const sortSelect = document.getElementById('sort-options');
    sortSelect.addEventListener('change', (event) => {
        const selectedOption = event.target.value;
        // eslint-disable-next-line no-undef
        displayPhotographerMedia(photographerId, selectedOption);
    });
});
