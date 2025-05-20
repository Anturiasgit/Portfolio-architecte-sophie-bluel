import "./works.js";
import "./categories.js";
import { fetchWorks } from "./works.js";


document.addEventListener("DOMContentLoaded", async () => {
    const allWorks = await fetchWorks();
    const login = document.getElementById("login");
    const worksImages = document.querySelector(".works-images");
    const edit = document.querySelector(".edit");
    const modale = document.querySelector(".modale");


    if (window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")) {
        login.textContent = "logout";
        login.id = "logout";


        function displayWorksImages(worksToDisplay) {
            worksImages.innerHTML = "";

            worksToDisplay.forEach(work => {
                const workImage = document.createElement("div");
                const image = document.createElement("img");
                const bin = document.createElement("i");

                workImage.classList.add("work-image");
                image.src = work.imageUrl;
                image.alt = work.title;
                bin.className = "fa-solid fa-trash-can";

                worksImages.appendChild(workImage);
                workImage.appendChild(image);
                workImage.appendChild(bin);

            });
        }
        displayWorksImages(allWorks);

        edit.addEventListener("click", () => {
            modale.style.display = "inline";
        });

        if(modale.style.display=="inline")
            
    }


    document.getElementById("logout").addEventListener("click", (event) => {
        event.preventDefault(); // pour empêcher un comportement par défaut éventuel
        sessionStorage.clear(); // vide toute la mémoire sessionStorage
        window.location.href = "index.html"; // redirige vers index.html
    });


});


