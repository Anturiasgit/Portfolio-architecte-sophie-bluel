import { fetchWorks } from "./works.js";
import * as w from "./works.js";

let cats = [];

 export async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:5678/api/categories");
            const data = await response.json();
            cats = data;
            return cats;
        } catch(error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    }

document.addEventListener("DOMContentLoaded", async () => {
    const allCats = await fetchCategories();
    const projects = document.getElementsByClassName("projects")[0];
    const allWorks = await fetchWorks();


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
        allButton.addEventListener("click", () => w.display(allWorks));
        categoryMenu.appendChild(allButton);
    
        // Ajouter chaque catégorie
        allCats.forEach(category => categoriesSet.add(category));
    
        categoriesSet.forEach(category => {
            const button = document.createElement("button");
            button.textContent = category.name;
            button.addEventListener("click", () => {
                const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
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

        if (window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")) {
            document.querySelector(".category-menu").style.display = "none";
        }

    });

