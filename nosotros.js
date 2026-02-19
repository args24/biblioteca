// Animación scroll suave
const sections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
},{ threshold:0.15 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
});

// Botón volver arriba
const btn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

btn?.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
});
