const hamburger = document.querySelector(".ham-toogle");
const navlinks = document.querySelector(".nav-links");
const navparts = document.querySelectorAll(".nav-links li a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navlinks.classList.toggle("active");
});
navparts.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navlinks.classList.remove("active");
  });
});

// function colorActive() {
//   navparts.forEach((link) => {
//     link.addEventListener("click", () => {
//       colorLink.classList.add("coloractive");
//       colorLink.classList.remove("coloractive");
//     });
//   });
// }
// function colorActive(event) {
//   colorLink.forEach((link) => link.classList.remove("coloractive"));
//   event.target.classList.add("coloractive");
// }
// colorLink.forEach((link) => {
//   link.addEventListener("scroll", colorActive);
// });

function handleColor() {
  const links = document.querySelectorAll("section");
  const colorLink = document.querySelectorAll(".nav-links li a");
  let currentLink = "";
  links.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 50 ) {
      currentLink = section.getAttribute("id");
    }
  });
  colorLink.forEach((link) => {
    link.classList.remove("coloractive");
    if (link.getAttribute("href") === `#${currentLink}`) {
      link.classList.add("coloractive");
    }
  });
}
window.addEventListener("scroll", handleColor);
