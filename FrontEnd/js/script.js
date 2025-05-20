import "./works.js";
import "./categories.js";
import { fetchWorks } from "./works.js";


document.addEventListener("DOMContentLoaded", async () => {
    const allWorks = await fetchWorks();
    const login = document.getElementById("login");
    const worksImages = document.querySelector(".works-images");
    const edit = document.querySelector(".edit");
    const modale = document.querySelector(".modale");
    const overlay = document.querySelector("#overlay");
    const croix = document.querySelector(".fa-xmark");


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

        edit.style.display = "flex";

        edit.addEventListener("click", () => {
            modale.style.display = "inline";
            overlay.style.display = "inline";
            overlay.style.height = `${document.documentElement.scrollHeight}px`;
        });

       overlay.addEventListener("click", () => {
        if(modale.style.display == "inline" && overlay.style.display == "inline") {
         modale.style.display = "none";
         overlay.style.display = "none";
        }
       });

       modale.addEventListener("click", function(event) {
        event.stopPropagation();
       });

       croix.addEventListener("click", () => {
         modale.style.display = "none";
         overlay.style.display = "none";
       });
            
    }


    document.getElementById("logout").addEventListener("click", (event) => {
        event.preventDefault(); // pour empêcher un comportement par défaut éventuel
        sessionStorage.clear(); // vide toute la mémoire sessionStorage
        window.location.href = "index.html"; // redirige vers index.html
    });


});


