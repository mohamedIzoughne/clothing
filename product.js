import { applyCart, addToCart } from "./script.js"

const applySingleProduct = () => {
  const product = JSON.parse(localStorage.getItem("product"))
  const productArea = document.getElementById("productArea")

  productArea.innerHTML = `<div class="col-lg-7">
    <div class="portfolio-thumbnil-area">
      <div class="product-more-views">
        <div class="tab_thumbnail" data-tabs="tabs">
          <div class="thumbnail-carousel">
            <ul class="nav">
              <li>
                <a
                  class="active"
                  href="#view11"
                  class="shadow-box"
                  aria-controls="view11"
                  data-bs-toggle="tab"
                  ><img src="images/product/01.jpg" alt=""
                /></a>
              </li>
              <li>
                <a
                  href="#view22"
                  class="shadow-box"
                  aria-controls="view22"
                  data-bs-toggle="tab"
                  ><img src="images/product/02.jpg" alt=""
                /></a>
              </li>
              <li>
                <a
                  href="#view33"
                  class="shadow-box"
                  aria-controls="view33"
                  data-bs-toggle="tab"
                  ><img src="images/product/03.jpg" alt=""
                /></a>
              </li>
              <li>
                <a
                  href="#view44"
                  class="shadow-box"
                  aria-controls="view44"
                  data-bs-toggle="tab"
                  ><img src="images/product/04.jpg" alt=""
                /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content active-portfolio-area pos-rltv">
        <div class="social-tag">
          <a href="#"><i class="zmdi zmdi-share"></i></a>
        </div>
        <div role="tabpanel" class="tab-pane active" id="view11">
          <div class="product-img">
            <a
              class="fancybox"
              data-fancybox-group="group"
              href="images/product/01.jpg"
              ><img
                src="images/product/01.jpg"
                alt="Single portfolio"
            /></a>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="view22">
          <div class="product-img">
            <a
              class="fancybox"
              data-fancybox-group="group"
              href="images/product/02.jpg"
              ><img
                src="images/product/02.jpg"
                alt="Single portfolio"
            /></a>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="view33">
          <div class="product-img">
            <a
              class="fancybox"
              data-fancybox-group="group"
              href="images/product/03.jpg"
              ><img
                src="images/product/03.jpg"
                alt="Single portfolio"
            /></a>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="view44">
          <div class="product-img">
            <a
              class="fancybox"
              data-fancybox-group="group"
              href="images/product/04.jpg"
              ><img
                src="images/product/04.jpg"
                alt="Single portfolio"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-5">
    <div class="single-product-description">
      <div class="sp-top-des">
        <h3>${product.name}<span>(Brand)</span></h3>
        <div class="prodcut-ratting-price">
          <div class="prodcut-price">
            <div class="new-price">$ ${product.price}</div>
          </div>
        </div>
      </div>

      <div class="sp-des">
        <p>
          ${product.description}
        </p>
      </div>
      <div class="sp-bottom-des">
        <div class="single-product-option">
          <div class="sort product-type">
            <label>Size: </label>
            <select id="input-sort-size" class="input-sort-size">
            </select>
          </div>
        </div>
        <div class="quantity-area">
          <label>Qty :</label>
          <div class="cart-quantity">
            <form action="#" method="POST" id="myform">
              <div class="product-qty">
                <div class="cart-quantity">
                  <div class="cart-plus-minus">
                    <div class="dec qtybutton">-</div>
                    <input
                      type="text"
                      value="1"
                      name="qtybutton"
                      class="cart-plus-minus-box"
                    />
                    <div class="inc qtybutton">+</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="social-icon socile-icon-style-1">
          <ul>
            <li>
              <a
                href="#"
                data-tooltip="Add To Cart"
                class="add-cart add-cart-text"
                data-placement="left"
                tabindex="0"
                >Add To Cart<i class="fa fa-cart-plus"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`

  const sortInp = productArea.querySelector(".input-sort-size")

  const incrementButton = productArea.querySelector(".qtybutton.inc")
  const decrementButton = productArea.querySelector(".qtybutton.dec")
  const quantityInput = productArea.querySelector(".cart-plus-minus-box")
  const addToCartButton = productArea.querySelector(".add-cart")
  incrementButton.addEventListener("click", () => {
    incrementQuantity(quantityInput)
  })
  decrementButton.addEventListener("click", () => {
    decrementQuantity(quantityInput)
  })
  addToCartButton.addEventListener("click", () => {
    addToCart(product, +quantityInput.value)
    applyCart()
  })

  product.sizes.forEach((size) => {
    const optionEle = document.createElement("option")
    optionEle.textContent = size
    optionEle.value = size

    sortInp.appendChild(optionEle)
  })
}

function incrementQuantity(input) {
  const newQuantity = +input.value + 1
  input.value = newQuantity
}

function decrementQuantity(input) {
  const oldQuantity = input.value
  if (oldQuantity > 0) {
    const newQuantity = +input.value - 1
    input.value = newQuantity
  }
}

applySingleProduct()
