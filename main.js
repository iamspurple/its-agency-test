import "./src/App/styles/main.scss";
import axios from "axios";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  displayProducts,
  filterProducts,
  sortProducts,
  displayError,
} from "./src/scripts";

import "./src/scripts/cart";

let products;
let filtered;

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://660661bfbe53febb857dcbbd.mockapi.io/api/posts1/goods")
    .then((response) => {
      products = sortProducts(response.data);

      displayProducts(products);
      filtered = products;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      displayError();
    });

  updateCart();
});

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  direction: "horizontal",

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const New = document.getElementById("new");
const Sale = document.getElementById("sale");
const InStock = document.getElementById("instock");

const selectSort = document.getElementById("catalog-sort");

New.addEventListener("change", () => {
  const filteredProducts = sortProducts(filterProducts(products));
  displayProducts(filteredProducts);
  filtered = filteredProducts;
});
Sale.addEventListener("change", () => {
  const filteredProducts = sortProducts(filterProducts(products));
  displayProducts(filteredProducts);
  filtered = filteredProducts;
});
InStock.addEventListener("change", () => {
  const filteredProducts = sortProducts(filterProducts(products));
  displayProducts(filteredProducts);
  filtered = filteredProducts;
});

selectSort.addEventListener("change", () => {
  const sortedProducts = sortProducts(filtered);
  displayProducts(sortedProducts);
  filtered = sortedProducts;
});

const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const cartModal = document.getElementById("cart-modal");

openCartBtn.addEventListener("click", () => {
  cartModal.style.opacity = 1;
  cartModal.style.zIndex = 100;
});

closeCartBtn.addEventListener("click", () => {
  cartModal.style.opacity = 0;
  cartModal.style.zIndex = -100;
});

const openNavBtn = document.getElementById("open-nav");
const closeNavBtn = document.getElementById("close-nav");
const navModal = document.getElementById("nav-modal");

openNavBtn.addEventListener("click", () => {
  navModal.style.opacity = 1;
  navModal.style.zIndex = 100;
});

closeNavBtn.addEventListener("click", () => {
  navModal.style.opacity = 0;
  navModal.style.zIndex = -100;
});

const openFiltersBtn = document.getElementById("open-filters");
const closeFiltersBtn = document.getElementById("close-filters");
const filtersModal = document.getElementById("filters-modal");

openFiltersBtn.addEventListener("click", () => {
  filtersModal.style.opacity = 1;
  filtersModal.style.zIndex = 100;
});

closeFiltersBtn.addEventListener("click", () => {
  filtersModal.style.opacity = 0;
  filtersModal.style.zIndex = -100;
});

let cart = [];

const updateCart = () => {
  const cartContainer = document.getElementById("cart");
  const cartFooter = document.getElementById("cart-footer");

  cartContainer.innerHTML = "";

  if (!cart.length) {
    cartContainer.innerHTML = `
      <h3>Пусто</h3>
    `;
    cartFooter.innerHTML = "";
  } else {
    cartContainer.innerHTML = `
      <div class="cart-wrapper">
        <span class="cart-length">${cart.length} товаров</span>
        <button class="cart-clear" onclick="clearCart()">Очистить список</button>
      </div>
      <ul class="cart-list" id="cart-list"></ul>
    `;

    openCartBtn.innerText = cart.length;

    const cartList = document.getElementById("cart-list");
    let total = 0;

    cart.forEach((item) => {
      total += item.quantity * Number(item.price).toFixed();
      const cartItem = document.createElement("li");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
      <div>
        <img class="cart-item-image" src=${item.image} alt=${item.name} />
        <div class="cart-item-wrapper">
          <span class="cart-item-title">${item.name}</span>
          <span class="cart-item-price">${Number(item.price).toFixed()}₽</span>
        </div>
      </div>
      <div>

        <div class="cart-item-quantity">
          <button onclick="decrease(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increase(${item.id})">+</button>
        </div>
        <button onclick="deleteCartItem(${
          item.id
        })" class="cart-item-delete"></button>
        </div>

      `;

      cartList.appendChild(cartItem);
    });

    cartFooter.innerHTML = `
      <div class="cart-footer-wrapper">
      <span>Итого</span>
      <span class="cart-total">${total}₽</span>
      </div>
      <button class="cart-order">Оформить заказ</button>
    `;
  }
};

const addToCart = (id) => {
  const product = products.find((product) => product.id == id);

  if (cart.find((item) => item.id == id)) {
    increase(id);
  } else {
    cart.push({ ...product, quantity: 1 });
    updateCart();
  }
};

const increase = (id) => {
  const newCart = cart.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    } else return item;
  });

  cart = [...newCart];

  updateCart();
};

const decrease = (id) => {
  const newCart = cart.map((item) => {
    if (item.id == id && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    } else return item;
  });

  cart = [...newCart];

  updateCart();
};

const clearCart = () => {
  cart = [];
  updateCart();
};

const deleteCartItem = (id) => {
  cart = cart.filter((item) => item.id != id);
  updateCart();
};

window.addToCart = addToCart;
window.increase = increase;
window.decrease = decrease;
window.deleteCartItem = deleteCartItem;
window.clearCart = clearCart;
