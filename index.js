// Select the menu icon and navbar
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("nav-menu");

// Toggle navbar visibility on click
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Close the navbar when a link is clicked (optional)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});
