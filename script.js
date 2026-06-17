const categoryOrder = ["Boxing", "Fishing", "Fitness", "Rowing", "Trampolines", "E-Mobility"];
const productsRoot = document.querySelector("#catalog");
const categoryNav = document.querySelector("#categoryNav");
const productCount = document.querySelector("#productCount");
const priceRange = document.querySelector("#priceRange");
const deliveryRange = document.querySelector("#deliveryRange");
const featuredGrid = document.querySelector("#featuredGrid");

const productsByCategory = categoryOrder
  .map((category) => ({
    category,
    items: window.EGG_PRODUCTS.filter((product) => product.category === category)
  }))
  .filter((group) => group.items.length);

const formatSar = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

function renderStats() {
  const prices = window.EGG_PRODUCTS.map((product) => product.priceSar);
  const deliveries = window.EGG_PRODUCTS.map((product) => product.deliveryDays);

  productCount.textContent = `${window.EGG_PRODUCTS.length} products`;
  priceRange.textContent = `SAR ${formatSar(Math.min(...prices))} - ${formatSar(Math.max(...prices))}`;
  deliveryRange.textContent = `${Math.min(...deliveries)} - ${Math.max(...deliveries)} days`;
}

function renderCategoryNav() {
  categoryNav.innerHTML = productsByCategory
    .map(
      ({ category, items }) =>
        `<a href="#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" class="category-pill">${category}<span>${items.length}</span></a>`
    )
    .join("");
}

function productCard(product, index) {
  const details = product.details
    .slice(0, 3)
    .map((detail) => `<li>${detail}</li>`)
    .join("");

  return `
    <article class="product-card" style="--delay: ${Math.min(index, 10) * 55}ms">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-sku">${product.id}</span>
      </div>
      <div class="product-body">
        <div class="product-kicker">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <ul>${details}</ul>
        ${product.note ? `<div class="product-note">${product.note}</div>` : ""}
      </div>
      <div class="product-footer">
        <div>
          <span class="label">Price</span>
          <strong>SAR ${formatSar(product.priceSar)}</strong>
        </div>
        <div>
          <span class="label">Estimated delivery</span>
          <strong>About ${product.deliveryDays} days</strong>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured() {
  if (!featuredGrid) return;

  const featured = [
    window.EGG_PRODUCTS.find((product) => product.id === "EGG-029"),
    window.EGG_PRODUCTS.find((product) => product.id === "EGG-019"),
    window.EGG_PRODUCTS.find((product) => product.id === "EGG-047")
  ].filter(Boolean);

  featuredGrid.innerHTML = featured
    .map(
      (product) => `
        <article class="feature-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div>
            <span>${product.category}</span>
            <h3>${product.name}</h3>
            <p>SAR ${formatSar(product.priceSar)} / about ${product.deliveryDays} days</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCatalog() {
  productsRoot.innerHTML = productsByCategory
    .map(({ category, items }) => {
      const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `
        <section class="catalog-section" id="${anchor}">
          <div class="section-heading">
            <span>${items.length} items</span>
            <h2>${category}</h2>
          </div>
          <div class="product-grid">
            ${items.map(productCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

renderStats();
renderCategoryNav();
renderFeatured();
renderCatalog();
