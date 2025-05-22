import { fetchCategories } from "./categories.js";

document.addEventListener("DOMContentLoaded", async () => {

    if (window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")) {
        const allCats = await fetchCategories();

        const input = document.querySelector('#file-input');
        const preview = document.querySelector("#preview");
        const addCat = document.querySelector("#category");

        allCats.forEach(category => {
            const option = document.createElement("option");
            option.value = category.name;
            option.innerHTML = category.name;
            addCat.appendChild(option);
        });

        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                document.querySelector(".fa-image").style.display = "none";
                document.querySelector(".ajouter-photo").style.display = "none";
                document.querySelector(".input-text").style.display = "none";
                document.querySelector("#preview").style.display = "flex";
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
        });

        function checkFormValidity() {
            const image = input.files[0];
            const title = document.querySelector('#title').value.trim();
            const category = document.querySelector('#category').value;

            const isValid = image && title && category;
            document.querySelector("#valider").disabled = !isValid;

            if (isValid) {
                document.querySelector("#error-fullness").style.display = "none";
            } else {
                document.querySelector("#error-fullness").style.display = "block";
            }
        }

        document.querySelectorAll('#imageInput, #title, #category').forEach(input => {
            input.addEventListener('input', checkFormValidity);
            input.addEventListener('change', checkFormValidity);
        });

        async function sendWork(title, file, categoryId) {
            try {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("title", title);
                formData.append("category", categoryId);

                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Échec de l'ajout");
                }
                console.log("Travail ajouté avec succès !");
                console.log(response);
            } catch (error) {
                console.error("Erreur lors de l'ajout d'un work :", error.message);
                }
        }


        document.querySelector("form").addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.querySelector('#title').value;
            const file = document.querySelector('#file-input').files[0];
            const categoryValue = document.querySelector('#category').value;
            let categoryId = 0;

            allCats.forEach(category => {
                if (category.name == categoryValue) {
                    categoryId = category.id;
                }
            });

            sendWork(title, file, categoryId);
        });





    }
});