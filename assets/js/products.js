async function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // reset

  const [categories, products] = await Promise.all([
    fetch("/data/categories.json").then((r) => r.json()),
    fetch("/data/products.json").then((r) => r.json()),
  ]);

  // Create a lookup map for category validation
  const categorySet = new Set(categories);

  categories.forEach((category) => {
    const sectionProducts = products.filter((p) => {
      return Array.isArray(p.categories) && p.categories.includes(category);
    });

    if (sectionProducts.length === 0) return;

    const section = document.createElement("section");
    section.innerHTML = `<h2>${category}</h2>`;

    sectionProducts.forEach((product) => {
      // category validation
      const valid = product.categories.every((c) => categorySet.has(c));
      if (!valid) {
        console.error(
          `Invalid category detected for product "${product.name}". Please fix in products.json`,
        );
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "product-card";

      wrapper.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        ${product.tag && product.tag.trim() !== "" ? `<div class="product-tag">${product.tag}</div>` : ""}
      `;

      section.appendChild(wrapper);
    });

    container.appendChild(section);
  });

  // console errors for products that do not belong to any category
  products.forEach((product) => {
    const belongsSomewhere = product.categories.some((c) => categorySet.has(c));
    if (!belongsSomewhere) {
      console.error(
        `Product "${product.name}" does not belong to any valid category and will not be rendered.`,
      );
    }
  });
}

renderProducts();
