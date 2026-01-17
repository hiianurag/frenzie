/**
 * Main Application Logic
 * Global scripts for Frenzie
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Frenzie initialized.");

  // Example: Initialize any global UI interactions here
  initSmoothScroll();
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}
