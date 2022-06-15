"use strict"

let cartIcon = document.querySelector(".cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")


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