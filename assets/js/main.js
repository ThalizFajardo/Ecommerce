"use strict"

const items = [{
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
        category: 'shirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
        category: 'sweatshirts',
        quantity: 20
    },
    {
        id: 4,
        name: 'Sweatshirts',
        price: 30.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
        category: 'sweatshirts',
        quantity: 10
    }
]

let cartIcon = document.querySelector(".cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".products")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos()
})

cartIcon.addEventListener("click", () => {
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener("click", () => {
    cartOverlay.classList.remove("mostrar")
})


/* nav en el scroll */

let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scroll-header")
    } else {
        header.classList.remove("scroll-header")
    }
})


/*cambiando a dark-mode */
let themeIcon = document.getElementById("theme-toggler")

let body = document.querySelector("body")

themeIcon.addEventListener("click", (e) => {
    body.classList.toggle("dark-theme")
})

function mostrarProductos() {
    let fragmentHTML = ""

    items.forEach((product) => {
        fragmentHTML += `
        <div class="card">
            <div class="imagen">
                 <img src=${product.image}>
            </div>
            <button data-id="${product.id}" class="buy-button"><i class='bx bx-plus-circle bx-md'></i></button>
            <div class="info-card">
                <h4>$${product.price} |</h4>
                <p>stock:${product.quantity}</p>
                <h4>${product.name}</h4>
            </div>
        </div>
        `
            /*<div class="product-card">
                <div class="product-image-container">
                    <img src=${product.image} alt="" class="product-img">
                </div>
                <p>$${product.price}</p>
                <button data-id="${product.id}" class="product-button">
                    <i class='bx bx-plus-circle bx-md'></i>
                </button>
            </div>*/
    })

    listProducts.innerHTML = fragmentHTML


    let productsButton = document.querySelectorAll(".product-button")


    productsButton.forEach((button) => {
        button.addEventListener("click", (evento) => {
            let id = parseInt(button.getAttribute("data-id"))
            let product = items.find(item => {
                return item.id === id
            })

            agregarProducto(product)
                // cart.push( product )
                //console.log((cart))
        })
    })
}


/*cambiando a dark-mode */
let themeIcon = document.getElementById("theme-toggler")

let body = document.querySelector("body")

themeIcon.addEventListener("click", (e) => {
    body.classList.toggle("dark-theme")
})