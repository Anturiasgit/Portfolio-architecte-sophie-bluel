import "./works.js";
import "./categories.js";
import { fetchWorks } from "./works.js";


document.addEventListener("DOMContentLoaded", async () => {
    const allWorks = await fetchWorks();
    const login = document.getElementById("login");
    const worksImages = document.querySelector(".works-images");


    if (window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")) {
        login.textContent = "logout";
        login.id = "logout";

        function displayWorksImages(worksToDisplay) {
            worksImages.innerHTML = "";

            worksToDisplay.forEach(work => {
                const image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                worksImages.appendChild(image);                  
            });
        }
            displayWorksImages(allWorks);

    }


    document.getElementById("logout").addEventListener("click", (event) => {
    event.preventDefault(); // pour empêcher un comportement par défaut éventuel
    sessionStorage.clear(); // vide toute la mémoire sessionStorage
    window.location.href = "index.html"; // redirige vers index.html
});    


});


