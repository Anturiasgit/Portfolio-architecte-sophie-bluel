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
});
