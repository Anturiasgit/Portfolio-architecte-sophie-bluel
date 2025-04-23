document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector(".gallery");
    let allWorks = []; // Stocke tous les travaux ici

    // Fonction pour afficher les travaux
    function display(worksToDisplay) {
        gallery.innerHTML = ""; // Vide la galerie

        worksToDisplay.forEach(work => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}" class="${work.categoryId}">
                <figcaption>${work.title}</figcaption>
            `;
            gallery.appendChild(figure);
        });
    }

     // Récupère les travaux
     fetch("http://localhost:5678/api/works")
     .then(response => response.json())
     .then(data => {
         allWorks = data; // Stocke les travaux dans la variable globale
        display(allWorks); // Affiche tous les travaux au début
     })
     .catch(error => console.error("Erreur lors du fetch :", error));

});

export * from "./works.js";
    
    