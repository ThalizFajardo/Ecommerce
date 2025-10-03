"use strict";

import { load } from "../../assets/js/ui.js";
import { headerScroll } from "../../assets/js/ui.js";
import { darkTheme } from "../../assets/js/ui.js";

import { renderProducts } from '../../assets/js/cart.js'

import { cartOverlay } from "../../assets/js/ui.js";
import { items } from "../../assets/js/data/db.js";
import { addProduct } from "../../assets/js/cart.js";

window.addEventListener("load", function () {
  load();
});

document.addEventListener("DOMContentLoaded", function () {
  darkTheme();
  headerScroll();
  cartOverlay();
  addProduct();
  renderProducts();
});

//     // <a href="./assets/images/meme2.jpg" target="_blank">

//     //         </a>

//     // onclick="location.href='./assets/images/meme2.jpg'"
