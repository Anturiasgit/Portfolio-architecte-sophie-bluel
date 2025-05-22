export function deletable() {
    const works = document.querySelectorAll(".work-image");

    works.forEach(work => {
            const bin = work.querySelector(".fa-trash-can");
        bin.addEventListener("click", async () => {
            const id = bin.id;

            try {
                const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des travaux :", error);
            }
        });
    });
}
    



