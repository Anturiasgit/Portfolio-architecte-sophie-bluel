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
            document.querySelector('#valider').disabled = !isValid;
            console.log("isValid doit être true, isValid ===> ",isValid);
        }

        document.querySelectorAll('#imageInput, #title, #category').forEach(input => {
                input.addEventListener('input', checkFormValidity);
                input.addEventListener('change', checkFormValidity); 
            })
        }
    });