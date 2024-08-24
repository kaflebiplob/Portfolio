const hamburger = document.querySelector(".ham-toogle");
const navlinks = document.querySelector(".nav-links");
const navparts = document.querySelectorAll(".nav-links  a");
const body = document.querySelector("body")

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


function handleColor() {
  const links = document.querySelectorAll("section");
  const colorLink = document.querySelectorAll(".nav-links li a");
  let currentLink = "";
  links.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - 50  && window.scrollY < sectionTop + sectionHeight - 50) {
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


function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
}
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

