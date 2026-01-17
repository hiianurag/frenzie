/**
 * Component Loader
 * Loads header and footer dynamically using fetch
 */

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "/components/header.html");
  loadComponent("#footer", "/components/footer.html");
});

async function loadComponent(selector, path) {
  const element = document.querySelector(selector);
  if (!element) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);

    const html = await response.text();
    element.innerHTML = html;

    // Highlight active link after header loads
    if (path.includes("header")) {
      setActiveLink();
    }
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

function setActiveLink() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll(".main-nav a");

  links.forEach((link) => {
    // Simple check: active if href matches current path or if root and href is / or /index.html
    const linkPath = link.getAttribute("href");
    if (
      linkPath === currentPath ||
      (currentPath === "/" && linkPath === "/index.html") ||
      (currentPath.endsWith("/") && linkPath === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}
