// eslint-disable-next-line no-unused-vars
class ImageMedia {
    constructor({ title, image, likes, photographerId }, index) {
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.photographerId = photographerId;
        this.index = index;
        // récuper les objets spécifiquement
    }
    // l'index à une déclaration automatique par Js, il commence par 0, il est généré dynamiquement.
    getMediaDOM() {
        const article = document.createElement('article');
        article.classList.add('media-item');

        const mediaElement = document.createElement('img');
        mediaElement.setAttribute('src', `assets/images/${this.photographerId}/${this.image}`);
        mediaElement.setAttribute('alt', this.title);

        article.appendChild(mediaElement);

        const containAll = document.createElement('div');
        containAll.classList.add('contain-all');

        const containArticle = document.createElement('div');
        containArticle.classList.add('contain-article');

        const titleElement = document.createElement('h3');
        titleElement.textContent = this.title;

        const containHearth = document.createElement('div');
        containHearth.classList.add('contain-hearth');

        const likeElement = document.createElement('p');
        likeElement.textContent = this.likes;
        likeElement.setAttribute('aria-live', 'polite'); // Annonce les mises à jour de likes

        const heartIcon = document.createElement('span');
        heartIcon.classList.add('fas', 'fa-heart');
        heartIcon.setAttribute('role', 'button'); // Rendre l'icône interactive
        heartIcon.setAttribute('aria-label', `aime cette image, likes courants: ${this.likes}`); // Fournir une description pour les lecteurs d'écran
        
        // Ajouter un gestionnaire de clic pour incrémenter les likes
        heartIcon.addEventListener('click', () => {
            
            // Incrémente le nombre de likes pour cette image
            this.likes += 1;
            likeElement.textContent = this.likes; // Met à jour l'affichage des likes de cette image
            // eslint-disable-next-line no-undef
            totalLikes += 1; // Incrémente le total des likes sur la page
            // eslint-disable-next-line no-undef
            updateTotalLikes(); // Met à jour l'affichage du total des likes
        });

        article.appendChild(containAll);
        containAll.appendChild(containArticle);
        containAll.appendChild(containHearth);

        containArticle.appendChild(titleElement);
        containHearth.appendChild(likeElement);
        containHearth.appendChild(heartIcon);

        // Gestionnaire de clic pour ouvrir le carrousel
        mediaElement.addEventListener('click', () => {
            // eslint-disable-next-line no-undef
            openCarrousel(this.index);
        });

        return article;
    }
}