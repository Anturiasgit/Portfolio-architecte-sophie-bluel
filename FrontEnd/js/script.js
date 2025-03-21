document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery"); // Sélectionne la galerie

    fetch("http://localhost:5678/api/works") 
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ""; // Vide la galerie existante

            data.forEach(work => {
                const figure = document.createElement("figure");
                figure.innerHTML = `
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                `;
                gallery.appendChild(figure);
            });
        })
        .catch(error => console.error("Erreur lors du fetch :", error));


        fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {

            let categoryMenu = document.getElementById("category-menu");
            if (!categoryMenu) {
                categoryMenu = document.createElement("select");
                categoryMenu.id = "category-menu";
                gallery.appendChild(categoryMenu); // Ajoute au body ou à un autre conteneur
            }
    
            const categoriesSet = new Set();
    
            // Ajouter une option "Tous" en premier
            const allOption = document.createElement("button");
            allOption.textContent = "Tous";
            allOption.dataset.categoryId = "0";
            categoryMenu.appendChild(allOption);
    
            // Remplir le Set avec les catégories de l'API
            data.forEach(category => categoriesSet.add(category));
    
            // Créer les boutons dynamiquement
            categoriesSet.forEach(category => {
                const option = document.createElement("option");
                option.value = category.name;
                option.dataset.categoryId = category.id;
                categoryMenu.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
    

});
