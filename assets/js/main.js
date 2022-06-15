"use strict"

const items = [
    {
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

document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
})

cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("mostrar")
})


/* nav en el scroll */

let header = document.querySelector("header")

window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})

function mostrarProductos() {
    let fragmentHTML = ""

    items.forEach( (product) =>{
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


    let productsButton = document.querySelectorAll(".buy-button")


    productsButton.forEach( (button) =>{
        button.addEventListener("click", (evento) =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            
            //cart.push( product )
            //console.log((cart))
            agregarProducto(product)
        })
    })
}

function agregarProducto( producto ){

    let resultadoFind = cart.find( item => item.id === producto.id )

    if( resultadoFind ){
        let stoc = cart[resultadoFind.index].quantity
        let quantitySelected = cart[resultadoFind.index].quantitySelected
        if( stoc > quantitySelected ){
            cart[resultadoFind.index].quantitySelected += 1

        }else{
            alert("No tenemos suficiente inventario")
        }        

    }else{
        producto.quantitySelected = 1
        producto.index = cart.length


        cart.push(producto)
    }

    console.log(cart)
    mostrarProductosCart()
}

function mostrarProductosCart(){
    let fragmentoHTML = ``

    cart.forEach(item => {
        fragmentoHTML += `
            <div class="item">
                <img src=${item.image} alt="">
                <p>${item.name}</p>
                <small>Cantidad: ${item.quantitySelected}</small>
            </div>
        `
    })

    cartContainer.innerHTML = fragmentoHTML

}
