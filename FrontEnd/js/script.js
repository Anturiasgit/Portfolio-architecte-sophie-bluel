document.addEventListener("DOMContentLoaded", () => {
    const portfolio = document.querySelector("#portfolio");
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

    // Récupère les catégories
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            let categoryMenu = document.getElementById("category-menu");
            if (!categoryMenu) {
                categoryMenu = document.createElement("div");
                categoryMenu.className = "category-menu";
                const h2 = portfolio.querySelector("h2");
                h2.insertAdjacentElement("afterend", categoryMenu);
            }

            const categoriesSet = new Set();

            // Bouton "Tous"
            const allButton = document.createElement("button");
            allButton.textContent = "Tous";
            allButton.addEventListener("click", () => display(allWorks));
            categoryMenu.appendChild(allButton);

            // Ajouter chaque catégorie
            data.forEach(category => categoriesSet.add(category));

            categoriesSet.forEach(category => {
                const button = document.createElement("button");
                button.textContent = category.name;
                button.addEventListener("click", () => {
                    const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
                    display(filteredWorks);
                });
                categoryMenu.appendChild(button);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
});
