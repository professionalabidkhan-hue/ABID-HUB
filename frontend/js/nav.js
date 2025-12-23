<script>
document.addEventListener("DOMContentLoaded", () => {
  const navbarMenu = document.getElementById("menu");
  const burgerMenu = document.getElementById("burger");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Function to show/hide dropdown
  function toggleDropdownItem(item) {
    const dropdownContent = item.querySelector(".dropdown-content");

    if (item.classList.contains("dropdown-show")) {
      dropdownContent.removeAttribute("style");
      item.classList.remove("dropdown-show");
      item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    } else {
      dropdownContent.style.height = dropdownContent.scrollHeight + "px";
      item.classList.add("dropdown-show");
      item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
    }
  }

  // Burger menu toggle
  burgerMenu.addEventListener("click", () => {
    const isActive = burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
    burgerMenu.setAttribute("aria-expanded", isActive);
  });

  // Dropdown toggle
  dropdowns.forEach((item) => {
    const dropdownToggle = item.querySelector(".dropdown-toggle");

    dropdownToggle.addEventListener("click", () => {
      const openDropdown = document.querySelector(".dropdown-show");
      toggleDropdownItem(item);

      // Close other dropdowns
      if (openDropdown && openDropdown !== item) {
        toggleDropdownItem(openDropdown);
      }
    });
  });

  // Unified resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      // Reset dropdowns
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.removeAttribute("style");
      });
      dropdowns.forEach((item) => {
        item.classList.remove("dropdown-show");
        const toggle = item.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });

      // Reset navbar
      if (navbarMenu.classList.contains("is-active")) {
        navbarMenu.classList.remove("is-active");
        burgerMenu.classList.remove("is-active");
        burgerMenu.setAttribute("aria-expanded", "false");
      }
    }
  });
});
</script>
