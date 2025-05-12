import * as w from "./works.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const projects = document.getElementsByClassName("projects");

    // Récupère les catégories
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        let categoryMenu = document.getElementById("category-menu");
        if (!categoryMenu) {
            categoryMenu = document.createElement("div");
            categoryMenu.className = "category-menu";
            projects.insertAdjacentElement("afterend", categoryMenu);
        }
    
        const categoriesSet = new Set();
    
        // Bouton "Tous"
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.addEventListener("click", () => w.display(w.allWorks));
        categoryMenu.appendChild(allButton);
    
        // Ajouter chaque catégorie
        data.forEach(category => categoriesSet.add(category));
    
        categoriesSet.forEach(category => {
            const button = document.createElement("button");
            button.textContent = category.name;
            button.addEventListener("click", () => {
                const filteredWorks = w.allWorks.filter(work => work.categoryId === category.id);
                w.display(filteredWorks);
            });
            categoryMenu.appendChild(button);
        });
    
        const buttons = document.querySelectorAll('.category-menu button');
    
        buttons.forEach(button => {
            button.addEventListener('click', () => {
              buttons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
            });
          });
    })
    .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
});
