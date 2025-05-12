import "./works.js";
import "./categories.js";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
        

    if(window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")){
        login.textContent = "logout";
        login.id = "logout"; 
        
    }

    document.getElementById("logout").addEventListener("click", (event) => {
            event.preventDefault(); // pour empêcher un comportement par défaut éventuel
            sessionStorage.clear(); // vide toute la mémoire sessionStorage
            window.location.href = "index.html"; // redirige vers index.html
        });    
    
    

    

});


