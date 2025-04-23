import "./works.js"; 

const portfolio = document.querySelector("#portfolio");

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

    const buttons = document.querySelectorAll('.category-menu button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });
})
.catch(error => console.error("Erreur lors de la récupération des catégories :", error));

export * from "./categories.js";