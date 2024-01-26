import { applyCartToTable } from "./cart.js"

// import { getProductsFromJson } from "./shop.js"
export let CURRENCY = "2"

export const getProductsFromJson = async () => {
  return await fetch("./products.json")
    .then((products) => {
      return products.json()
    })
    .then(({ products }) => products)
}

// currency functionality
const currencySelect = document.getElementById("currency")

export const currencies = {
  1: "MAD",
  2: "$",
  3: "€",
}

if (localStorage.getItem("currency")) {
  CURRENCY = localStorage.getItem("currency")
}
currencySelect.value = CURRENCY
applyCurrency()

function applyCurrency() {
  const currencySpans = document.querySelectorAll(".currency-span")
  localStorage.setItem("currency", CURRENCY)

  if (currencySpans?.length > 0) {
    currencySpans.forEach((span) => {
      span.textContent = currencies[CURRENCY] + " "
    })
  }
}

currencySelect.addEventListener("change", (e) => {
  CURRENCY = e.currentTarget.value
  applyCurrency()
  localStorage.setItem("currency", e.currentTarget.value)
})

// Add to cart functionality
export var cart = { products: [], totalPrice: 0 }

export function addToLocalStorage(product) {
  localStorage.setItem("product", JSON.stringify(product))
}

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"))

  applyCart()
}

export function addCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function addToCart(product, quantity = 1) {
  const { id } = product
  const foundProdIndex = cart.products.findIndex((prod) => prod.id === id)

  cart.totalPrice += product.price

  if (foundProdIndex >= 0) {
    cart.products[foundProdIndex].quantity =
      +cart.products[foundProdIndex].quantity + quantity
  } else {
    product.quantity = quantity
    cart.products.push(product)
  }

  applyCart()
  addCartToLocalStorage()
}

export const removeFromCart = (item) => {
  cart.products = cart.products.filter((prod) => prod.id !== item.id)
  const { quantity, price } = item

  if (cart.totalPrice > 0) {
    cart.totalPrice -= quantity * price
  }

  addCartToLocalStorage()
  applyCart()
  applyCartToTable()
}

function createCartProdsWrapper(item) {
  const singleWrapper = document.createElement("div")
  const removeBtn = document.createElement("div")
  removeBtn.className = "remove"
  removeBtn.innerHTML = '<a href="#"><i class="zmdi zmdi-close"></i></a>'

  singleWrapper.className = "cart-single-wraper"
  singleWrapper.innerHTML = `<div class="cart-img">
      <a href="#"
        ><img src=${item.imageUrl} alt=""
      /></a>
    </div>
    <div class="cart-content">
      <div class="cart-name">
        <a href="#">${item.name}</a>
      </div>
      <div class="cart-price"><span class="currency-span"></span>${item.price}</div>
      <div class="cart-qty">Qty: <span>${item.quantity}</span></div>
    </div>`

  removeBtn.addEventListener("click", () => {
    removeFromCart(item)
  })

  singleWrapper.appendChild(removeBtn)
  return singleWrapper
}

export function applyCart() {
  const cartWrapper = document.getElementById("cartWrapper")
  const cartHeaderSpan = document.querySelector(".header-cart span")

  cartHeaderSpan.textContent = cart.products.length
  cartWrapper.innerHTML = `<div class="cart-subtotal">
  Subtotal: <span><span class="currency-span"></span>${+cart.totalPrice.toFixed(
    2
  )}</span>
  </div>
  <div class="cart-check-btn">
  <div class="view-cart">
    <a class="btn-def" href="cart.html">View Cart</a>
  </div>
  </div>
  `

  cart.products.forEach((item) => {
    cartWrapper.prepend(createCartProdsWrapper(item))
  })
}
