import "./works.js";
import "./categories.js";
import { fetchWorks } from "./works.js";
import "./add.js";
import { suppression } from "./delete.js";


document.addEventListener("DOMContentLoaded", async () => {
    const allWorks = await fetchWorks();    


    if (window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")) {
        const login = document.getElementById("login");
        const h2 = document.querySelector("#portfolio h2");
        h2.style.marginRight = "25px";
        h2.style.marginLeft = "120px";
        login.textContent = "logout";
        login.id = "logout";

        const worksImages = document.querySelector(".works-images");
        const edit = document.querySelector(".edit");
        const modale = document.querySelector(".modale");
        const modaleGal = document.querySelector(".modale-gallery");
        const modaleAdd = document.querySelector(".modale-add");
        const overlay = document.querySelector("#overlay");
        const croix = document.querySelector(".fa-xmark");
        

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
                bin.id = work.id;

                worksImages.appendChild(workImage);
                workImage.appendChild(image);
                workImage.appendChild(bin);

            });
        }
        displayWorksImages(allWorks);
        suppression();
        
        edit.style.display = "flex";
       
        edit.addEventListener("click", () => {
            modale.style.display = "inline";
            overlay.style.display = "inline";
            overlay.style.height = `${document.documentElement.scrollHeight}px`;
        });

        overlay.addEventListener("click", () => {
            if (modale.style.display == "inline" && overlay.style.display == "inline") {
                modale.style.display = "none";
                overlay.style.display = "none";
            }
        });

        modale.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        croix.addEventListener("click", () => {
            modale.style.display = "none";
            overlay.style.display = "none";
        });

        modaleGal.querySelector(".btn-add").addEventListener("click", () => {
            modaleAdd.style.display = "inline";
            modaleGal.style.display = "none";
        });

        modaleAdd.querySelector(".fa-arrow-left").addEventListener("click", () => {
            modaleGal.style.display = "inline";
            modaleAdd.style.display = "none";

        });

        
    document.getElementById("logout").addEventListener("click", (event) => {
        event.preventDefault(); // pour empêcher un comportement par défaut éventuel
        sessionStorage.clear(); 
        window.location.href = "index.html"; 
    });

    }


});


