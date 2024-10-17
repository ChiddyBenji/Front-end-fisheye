// Fonction pour récupérer les données des photographes via fetch
async function getPhotographers() {
    try {
        // Effectue une requête pour récupérer les données JSON des photographes
        // Remplacez 'data/photographers.json' par le chemin correct vers votre fichier JSON
        const response = await fetch('data/photographers.json');
        
        // Vérifie si la requête a réussi (code de statut 200-299)
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`); // Lance une erreur si la requête a échoué
        }
        
        // Convertit la réponse en JSON
        const data = await response.json();
        
        // Retourne les données des photographes extraites du fichier JSON
        return data;
        
    } catch (error) {
        console.error("Erreur lors de la récupération des données des photographes :", error);
        // Retourne un objet avec un tableau vide en cas d'erreur pour éviter que l'application plante
        return { photographers: [] };
    }
}

// Fonction pour afficher les données des photographes sur la page
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // Crée une carte pour chaque photographe en utilisant une fonction template
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        // Ajoute la carte du photographe dans la section dédiée sur la page
        photographersSection.appendChild(userCardDOM);
    });
}

// Fonction d'initialisation principale
async function init() {
    // Récupère les données des photographes et les affiche
    getPhotographers().then((result) => {
        displayData(result.photographers);
    });
    console.log("end"); // Indique la fin du processus d'initialisation dans la console
}

// Appelle la fonction d'initialisation
init().then();
