// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"))

import {
  cart,
  removeFromCart,
  addCartToLocalStorage,
  applyCart,
} from "./script.js"

const createCartTableItem = (item) => {
  const tr = document.createElement("tr")
  const removeBtn = document.createElement("a")
  removeBtn.innerHTML = `<i class="fa fa-trash-o"></i>`

  removeBtn.addEventListener("click", () => {
    removeFromCart(item)
  })

  tr.className = "cart_item"
  tr.innerHTML = `
    <td class="item-img">
      <a href="#"
        ><img
          src=${item.imageUrl}
          alt=""
        />
      </a>
    </td>
    <td class="item-title">
      <a href="#">${item.name} </a>
    </td>
    <td class="item-price">$${item.price}</td>
    <td class="item-qty">
      <div class="cart-quantity">
        <div class="product-qty">
          <div class="cart-quantity">
            <div class="cart-plus-minus">
              <div class="dec qtybutton">-</div>
              <input
                value=${item.quantity}
                name="qtybutton"
                class="cart-plus-minus-box"
                type="text"
              />
              <div class="inc qtybutton">+</div>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td class="total-price">
      <strong> $${(item.price * item.quantity).toFixed(2)}</strong>
    </td>
    <td class="remove-item"></td>`

  const incrementButton = tr.querySelector(".qtybutton.inc")
  const decrementButton = tr.querySelector(".qtybutton.dec")
  const quantityInput = tr.querySelector(".cart-plus-minus-box")
  const totalPriceInp = tr.querySelector(".total-price strong")

  incrementButton.addEventListener("click", () => {
    incrementQuantity(item.id, quantityInput, totalPriceInp)
  })
  decrementButton.addEventListener("click", () => {
    decrementQuantity(item.id, quantityInput, totalPriceInp)
  })

  tr.querySelector(".remove-item").appendChild(removeBtn)
  return tr
}

function incrementQuantity(id, input, totalPriceInp) {
  const foundProdIndex = cart.products.findIndex((prod) => prod.id === id)
  const { price } = cart.products[foundProdIndex]
  const newQuantity = ++cart.products[foundProdIndex].quantity
  input.value = newQuantity
  totalPriceInp.textContent = (newQuantity * price).toFixed(2)

  cart.totalPrice += price
  addCartToLocalStorage()
  applyCart()
}

function decrementQuantity(id, input, totalPriceInp) {
  const foundProdIndex = cart.products.findIndex((prod) => prod.id === id)
  const { price, quantity } = cart.products[foundProdIndex]
  if (quantity > 0) {
    const newQuantity = --cart.products[foundProdIndex].quantity
    input.value = newQuantity
    totalPriceInp.textContent = (price * newQuantity).toFixed(2)
    cart.totalPrice -= price
    addCartToLocalStorage()
    applyCart()
  }
}

export const applyCartToTable = () => {
  const tableBody = document.getElementById("tableBody")

  // I don't know why there is an error: cart is not defined
  const cartToUse = cart ? cart : JSON.parse(localStorage.getItem("cart"))

  if (!tableBody) return

  tableBody.innerHTML = ""

  cartToUse.products.forEach((item) => {
    const tr = createCartTableItem(item)

    tableBody.appendChild(tr)
  })
}

applyCartToTable()
