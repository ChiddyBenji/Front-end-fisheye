// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const modalFond = document.getElementById("modal_overlay");
    modalFond.style.display = "block";
    modalFond.classList.add("overlay");

    const photographerNameElement = document.getElementById("photographer_name");
    // eslint-disable-next-line no-undef
    photographerNameElement.textContent = photographerName; 
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    const modalFond = document.getElementById("modal_overlay");
    modalFond.style.display = "none";
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    // Empêcher la soumission du formulaire par défaut
    event.preventDefault();

    // Récupérer les valeurs des champs
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !message) {
        alert("Tous les champs doivent être remplis !");
        return;
    }

    if (firstName.length < 2) {
        alert("Le prénom doit contenir au moins 2 caractères !");
        return;
    }
    if (lastName.length < 2) {
        alert("Le nom doit contenir au moins 2 caractères !");
        return;
    }
    if (message.length < 10) {
        alert("Le message doit contenir au moins 10 caractères !");
        return;
    }

    // Validation de l'email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (!emailPattern.test(email)) {
    alert("Veuillez entrer un email valide !");
    return;
}

    // Si tout est valide, vous pouvez soumettre le formulaire
    console.log("c'est une réussite");
    // Ici, vous pouvez faire ce que vous voulez avec les données, comme les envoyer à un serveur.
});