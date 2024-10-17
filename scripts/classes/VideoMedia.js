// eslint-disable-next-line no-unused-vars
class VideoMedia {
    constructor({ title, video, likes, photographerId }, index) {
        this.title = title;
        this.video = video;
        this.likes = likes;
        this.photographerId = photographerId;
        this.index = index;
    }

    getMediaDOM() {
        const article = document.createElement('article');
        article.classList.add('media-item');

        const videoElement = document.createElement('video');
        videoElement.setAttribute('aria-label', this.title); // Description de la vidéo pour l'accessibilité
        const source = document.createElement('source');
        source.setAttribute('src', `assets/images/${this.photographerId}/${this.video}`);
        source.setAttribute('type', 'video/mp4');

        videoElement.appendChild(source);
        article.appendChild(videoElement);

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
        heartIcon.setAttribute('aria-label', 'likes');

        // Ajouter un gestionnaire de clic pour incrémenter les likes
        heartIcon.addEventListener('click', () => {
            // Incrémente le nombre de likes
            this.likes += 1;
            likeElement.textContent = this.likes;
            // eslint-disable-next-line no-undef
            totalLikes += 1;
            // eslint-disable-next-line no-undef
            updateTotalLikes();
        });

        article.appendChild(containAll);
        containAll.appendChild(containArticle);
        containAll.appendChild(containHearth);

        containArticle.appendChild(titleElement);
        containHearth.appendChild(likeElement);
        containHearth.appendChild(heartIcon);

        videoElement.addEventListener('click', () => {
            // eslint-disable-next-line no-undef
            openCarrousel(this.index);
        });

        return article;
    }
}