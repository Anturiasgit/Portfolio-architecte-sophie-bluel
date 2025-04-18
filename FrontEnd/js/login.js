window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const loginLink = document.getElementById('login-link');

    if (currentPage.endsWith('login.html')) {
        loginLink.classList.add('active');
    }
});


function authentification() {
    const formAuth = document.querySelector(".auth");
    formAuth.addEventListener("submit", function (event) {
        event.preventDefault();
        const user = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(user);
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    document.querySelector("[name=email]").value = "";
                    document.querySelector("[name=password]").value = "";
                    const errorMessage = document.querySelector(".error-message");
                    if (errorMessage) {
                        errorMessage.style.display = "inline";
                    }
                    throw new Error("Identifiants incorrects ou utilisateur introuvable");
                }
            })
            .then(data => {
                console.log("Connexion réussie :", data);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            })
            .catch(error => console.error("Tentative de connexion échouée", error));
    });
}

authentification();
