
import { items } from "../../assets/js/data/db.js";

const cartCount = document.getElementById("cart-count");
const cartContainer = document.querySelector(".cart__container");
const cartTotal = document.getElementById("cart-total")
const cartCheckout = document.getElementById("cart-checkout")

let counter = 0;
let cart = [];

const cartCounter = () => {
  counter = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = counter;
};

export const db = {
  items: window.localStorage.getItem("products")
    ? JSON.parse(window.localStorage.getItem("products"))
    : items,
  methods: {
    find: (id) => db.items.find((item) => item.id === id),
    getAll: () => db.items,
    removeStock: (items) => {
      items.forEach(({ id, quantity }) => {
        const product = db.methods.find(id);
        if (product) product.quantity -= quantity;
      });
    },
  },
};

export const renderProducts = () => {
  let fragmentHTML = "";

  db.methods.getAll().forEach((product) => {
    fragmentHTML += `
      <article class="products__card ${product.category}">
        <div class="products__shape">
          <img src="${product.image}" alt="${product.name}" class="products__img">
        </div>
        <div class="products__data">
          <h2 class="products__price">$${product.price} <span class="products__quantity">| Stock: ${product.quantity}</span></h2>
          <h3 class="products__name">${product.name}</h3>
          <button class="button products__button" data-id="${product.id}">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </article>
    `;

  });

 const productsContainer = document.querySelector("#products__content");
  
  productsContainer.innerHTML = fragmentHTML;
  addProduct();
  
  window.localStorage.setItem("products", JSON.stringify(db.items));

};

export const addProduct = () => {
  const productsButton = document.querySelectorAll(".products__button");

  productsButton.forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const product = db.methods.find(id);

      if (product && product.quantity > 0) {
        const cartItem = cart.find((p) => p.id === id);

        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        product.quantity -= 1;

        cartCounter();
        renderCart();
      } else {
        alert("Sorry, we're out of stock!");
      }
    });
  });
};


const renderCart = () => {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";

  cart.forEach((product) => {
    cartContainer.innerHTML += `
      <article class="cart__card">
        <div class="cart__box">
          <img src=${product.image} alt=${product.name} class="cart__img">
        </div>

        <div class="cart__details">
          <h3 class="cart__title">${product.name}</h3>
          <span class="cart__stock">Stock: ${product.quantity} | <span class="cart__price">$${product.price}</span></span>
          <span class="cart__subtotal">
            Subtotal: $${product.price * product.quantity}
          </span>

          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box minus" data-id="${product.id}">
                <i class="bx bx-minus"></i>
              </span>

              <span class="cart__amount-number">${product.quantity} units</span>

              <span class="cart__amount-box plus" data-id="${product.id}">
                <i class="bx bx-plus"></i>
              </span>
            </div>

            <i class="bx bx-trash-alt cart__amount-trash" data-id="${product.id}"></i>
          </div>
        </div>
      </article>  
    `;
   
  });

  attachCartEvents();
  cartCounter();

  
  
};

// 👉 Controladores de botones en el carrito
const attachCartEvents = () => {
  // PLUS
  const plusButtons = document.querySelectorAll(".cart__amount-box.plus");
  plusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const cartItem = cart.find((p) => p.id === id);
      const product = db.methods.find(id);

      if (product && product.quantity > 0) {
        cartItem.quantity++;
        product.quantity--;
        renderCart();
      } else {
        alert("No hay más stock");
      }
    });
  });

  // MINUS
  const minusButtons = document.querySelectorAll(".cart__amount-box.minus");
  minusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const cartItem = cart.find((p) => p.id === id);
      const product = db.methods.find(id);

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        product.quantity++;
      } else {
        // Si solo queda uno, eliminar
        cart = cart.filter((p) => p.id !== id);
        product.quantity++;
      }
      renderCart();
    });
  });

  // DELETE
  const deleteButtons = document.querySelectorAll(".cart__amount-trash");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const cartItem = cart.find((p) => p.id === id);
      const product = db.methods.find(id);

      if (cartItem) {
        product.quantity += cartItem.quantity;
        cart = cart.filter((p) => p.id !== id);
        renderCart();
      }
    });
  });
};
