// Highlight active nav link
const current = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
  link.addEventListener("click", e => {
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});

// Hamburger toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    navToggle.classList.toggle("open");
  });
}
