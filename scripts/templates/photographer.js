// eslint-disable-next-line no-unused-vars
function photographerTemplate(photographer) {
    const { id, name, city, country, tagline, price, portrait } = photographer;
    const picture = `assets/photographers/${portrait}`;

    return {
        getUserCardDOM: function () {
            const article = document.createElement('article');

            // Créer un lien vers la page du photographe
            const link = document.createElement('a');
            link.setAttribute('href', `photographer.html?id=${id}`);
            link.setAttribute('aria-label', `Voir la page de ${name}`); // Ajout d'un aria-label pour décrire l'action du lien

            // Créer une div pour englober l'image
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('photographer-img-container');

            // Créer l'image du photographe
            const img = document.createElement('img');
            img.setAttribute('src', picture);
            img.setAttribute('alt', `Portrait de ${name}`); // Description améliorée pour une meilleure accessibilité
            imgContainer.appendChild(img);

            // Créer le titre avec le nom du photographe
            const h2 = document.createElement('h2');
            h2.textContent = name;
            h2.setAttribute('aria-label', `Nom du photographe : ${name}`); // Ajout d'un aria-label pour le nom

            // Ajouter l'image et le titre au lien
            link.appendChild(imgContainer);
            link.appendChild(h2);

            // Créer l'élément pour la localisation (ville, pays)
            const location = document.createElement('p');
            location.textContent = `${city}, ${country}`;
            location.classList.add('photographer-location');
            location.setAttribute('aria-label', `Localisation : ${city}, ${country}`); // Ajout d'un aria-label pour la localisation

            // Créer l'élément pour le slogan (tagline)
            const taglineElement = document.createElement('p');
            taglineElement.textContent = tagline;
            taglineElement.classList.add('photographer-tagline');
            taglineElement.setAttribute('aria-label', `Slogan : ${tagline}`); // Ajout d'un aria-label pour le slogan

            // Créer l'élément pour le tarif par jour
            const priceElement = document.createElement('p');
            priceElement.textContent = `${price}€/jour`;
            priceElement.classList.add('photographer-price');
            priceElement.setAttribute('aria-label', `Tarif : ${price} euros par jour`); // Ajout d'un aria-label pour le tarif

            // Ajouter tous les éléments à l'article
            article.appendChild(link);
            article.appendChild(location);
            article.appendChild(taglineElement);
            article.appendChild(priceElement);

            return article;
        }
    };
}
