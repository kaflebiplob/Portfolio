const hamburger = document.querySelector(".ham-toogle")
const navlinks = document.querySelector(".nav-links")
const navparts = document.querySelectorAll(".nav-links li a")
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active');
    navlinks.classList.toggle("active")

})
navparts.forEach((item) => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navlinks.classList.remove("active")
    })

})