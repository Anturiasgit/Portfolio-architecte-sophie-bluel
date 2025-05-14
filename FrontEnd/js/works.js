const gallery = document.querySelector(".gallery");
let allWorks = [];


export async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        allWorks = data;
        return allWorks;
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }  
}


// Fonction pour afficher les travaux
export function display(worksToDisplay) {
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

fetchWorks().then(display);













