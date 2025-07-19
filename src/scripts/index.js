export const displayProducts = (products) => {
  const productList = document.getElementById("catalog-products-list");
  const quantity = document.getElementById("quantity");

  productList.innerHTML = "";
  quantity.innerText = `${products.length} товаров`;

  if (products.length) {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.innerHTML = `
          <div class="catalog-products-card">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <div class="catalog-products-card-wrapper">
              <span class="catalog-products-card-price">${Number(
                product.price
              ).toFixed()} ₽</span>
              <button onclick="addToCart(${
                product.id
              })" class="catalog-products-card-button">
              </button>
           </div>
          </div>
        `;
      productList.appendChild(productCard);
    });
  } else {
    productList.innerHTML = `
    <h3> Товары не найдены</h3>
    `;
  }
};

const filterByNew = (products) => {
  return products.filter((product) => product.new);
};

const filterByStock = (products) => {
  return products.filter((product) => product.inStock);
};

const filterBySale = (products) => {
  return products.filter((product) => product.onSale);
};

export const filterProducts = (products) => {
  const New = document.getElementById("new");
  const Sale = document.getElementById("sale");
  const InStock = document.getElementById("instock");

  let filtered = [...products];

  if (New.checked) {
    filtered = filterByNew(filtered);
  }

  if (Sale.checked) {
    filtered = filterBySale(filtered);
  }
  if (InStock.checked) {
    filtered = filterByStock(filtered);
  }

  return filtered;
};

export const sortProducts = (products) => {
  const sort = document.getElementById("catalog-sort");

  return products.sort((a, b) => {
    switch (sort.value) {
      case "expensive":
        return b.price - a.price;
        break;
      case "cheap":
        return a.price - b.price;
        break;
      case "popular":
        return b.popular - a.popular;
        break;
      case "recent":
        return new Date(b.date) - new Date(a.date);
        break;
    }
  });
};
