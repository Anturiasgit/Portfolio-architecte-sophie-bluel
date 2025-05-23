export function suppression() {
    const works = document.querySelectorAll(".work-image");
    const figures = document.querySelectorAll("figure");

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
                    figures.forEach(fig => {
                        if(fig.id == id) {
                            fig.remove();
                        }
                    });
                }

            } catch (error) {
                console.error("Erreur lors de la tentative de suppresion:", error);
            }
        });
    });
}




