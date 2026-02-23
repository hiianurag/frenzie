/**
 * Component Loader
 * Loads header and footer dynamically using fetch.
 * Works with both Live Server (absolute paths) and file:// protocol (relative paths).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Determine base path: relative paths for file://, absolute for server
  const isFile = window.location.protocol === "file:";
  const base = isFile ? "" : "";

  loadComponent("#header", `${base}/components/header.html`);
  loadComponent("#footer", `${base}/components/footer.html`);
});

async function loadComponent(selector, path) {
  const element = document.querySelector(selector);
  if (!element) return;

  // For file:// protocol, try relative path
  if (window.location.protocol === "file:") {
    // Build relative path from current file location
    const currentDir = window.location.href.replace(/\/[^/]*$/, "");
    path = currentDir + "/" + path.replace(/^\//, "");
  }

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);

    const html = await response.text();
    element.innerHTML = html;

    // Highlight active nav link after header loads
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
