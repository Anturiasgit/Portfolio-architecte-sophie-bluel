export function suppression() {
    const works = document.querySelectorAll(".work-image");

    works.forEach(work => {
        const bin = work.querySelector(".fa-trash-can");
        bin.addEventListener("click", async () => {
            const id = bin.id;
            try {
                const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });
                if (response.ok){
                    work.remove();
                    document.getElementById(id).remove();
                }

            } catch (error) {
                console.error("Erreur lors de la tentative de suppresion:", error);
            }
        });
    });
}




