import "./works.js";
import "./categories.js";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");

    if(window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userId")){
        login.textContent = "logout";
        login.id = "logout";   
    }

    

    

});


