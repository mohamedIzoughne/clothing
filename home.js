import { getProductsFromJson, addToCart, addToLocalStorage } from "./script.js"

getProductsFromJson().then((prods) => {
  applyOnProducts(prods)
})

// applyToNewArrival()

// function createProduct(product, attributes) {
//   const prodElement = document.createElement("div")
//   const addCartButton = createAnchorTag(
//     `<i class="fa fa-cart-plus"></i>`,
//     "add-cart",
//     {
//       href: "#",
//       "data-tooltip": "Add To Cart",
//       "data-placement": "left",
//     },
//     product
//   )
//   prodElement.className = "product-item"

//   prodElement.innerHTML = `<div class="single-product">
//     <div class="product-img">
//     ${
//       product.new
//         ? `<div class="product-label">
//     <div class="new">New</div>
//   </div>`
//         : ""
//     }
//       <div class="single-prodcut-img product-overlay pos-rltv">
//         <a href="single-product.html">
//           <img
//             alt=""
//             src=${product.imageUrl}
//             class="primary-image"
//           />
//         </a>
//       </div>
//       <div class="product-icon socile-icon-tooltip text-center">
//         <ul>
//           <li class="add-cart-item">
//           </li>
//           <li>
//             <a
//               href="#"
//               data-tooltip="Quick View"
//               class="q-view"
//               data-bs-toggle="modal"
//               data-bs-target=".modal"
//               ><i class="fa fa-eye"></i
//             ></a>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div class="product-text">
//       <div class="prodcut-name">
//         <a href="single-product.html">${product.name}</a>
//       </div>
//       <div class="prodcut-ratting-price">
//         <div class="prodcut-price">
//           <div class="new-price"><span class="currency-span"></span>${
//             product.price
//           }</div>
//         </div>
//       </div>
//     </div>
//   </div>`

//   prodElement.querySelector(".add-cart-item").appendChild(addCartButton)

//   const quickView = prodElement.querySelector(".q-view")

//   quickView.addEventListener("click", () => addToModal(product))
//   prodElement.addEventListener("click", () => addToLocalStorage(product))

//   return prodElement
// }

// function applyToNewArrival(prods) {
//   const productsListEle = document.querySelector(".total-new-arrival")
//   prods = prods.filter((prod) => prod.new)

//   if (prods.length > 4) {
//     prods = prods.slice(0, 4)
//   }

//   prods.forEach((item) => {
//     productsListEle.appendChild(createProduct(item))
//   })
// }

// function createAnchorTag(inner, className, attributes, prod) {
//   const addCartButton = document.createElement("a")
//   addCartButton.className = className
//   addCartButton.innerHTML = inner
//   for (const attr in attributes) {
//     addCartButton.setAttribute(attr, attributes[attr])
//   }

//   addCartButton.addEventListener("click", () => {
//     addToCart(prod)
//   })

//   return addCartButton
// }

function addToModal(product) {
  const modalContentEle = document.querySelector(".modal-content")

  console.log(product)

  modalContentEle.innerHTML = `<div class="modal-header">
    <button
      type="button"
      class="close"
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div
  <div class="modal-body">
    <div class="modal-product">
      <div class="product-images">
        <div class="portfolio-thumbnil-area-2">
          <div class="tab-content active-portfolio-area-2">
            <div role="tabpanel" class="tab-pane active" id="view1">
              <div class="product-img">
                <a href="#"
                  ><img
                    src=${product.imageUrl}
                    alt="Single portfolio"
                /></a>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="view2">
              <div class="product-img">
                <a href="#"
                  ><img
                    src="images/product/02.jpg"
                    alt="Single portfolio"
                /></a>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="view3">
              <div class="product-img">
                <a href="#"
                  ><img
                    src="images/product/03.jpg"
                    alt="Single portfolio"
                /></a>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="view4">
              <div class="product-img">
                <a href="#"
                  ><img
                    src="images/product/04.jpg"
                    alt="Single portfolio"
                /></a>
              </div>
            </div>
          </div>
          <div class="product-more-views-2">
            <div
              class="thumbnail-carousel-modal-2 nav"
              data-tabs="tabs"
            >
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="view1"
                  data-bs-toggle="tab"
                  href="#view1"
                  role="tab"
                  aria-controls="view1"
                  aria-selected="true"
                >
                  <img src="images/product/01.jpg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="view2"
                  data-bs-toggle="tab"
                  href="#view2"
                  role="tab"
                  aria-controls="view2"
                  aria-selected="true"
                >
                  <img src="images/product/02.jpg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="view3"
                  data-bs-toggle="tab"
                  href="#view3"
                  role="tab"
                  aria-controls="view3"
                  aria-selected="true"
                >
                  <img src="images/product/03.jpg" alt="" />
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="view4"
                  data-bs-toggle="tab"
                  href="#view4"
                  role="tab"
                  aria-controls="view4"
                  aria-selected="true"
                >
                  <img src="images/product/04.jpg" alt="" />
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="price-box-3">
          <div class="s-price-box">
            <span class="new-price"><span class="currency-span"></span>${product.price}</span>
          </div>
        </div>
        <div class="quick-add-to-cart">
          <form class="cart">
            <div class="numbers-row">
              <input
                type="number"
                id="french-hens"
                value="1"
                min="1"
              />
            </div>
            <button class="single_add_to_cart_button">
              Add to cart
            </button>
          </form>
        </div>
        <div class="quick-desc">
          ${product.description}
        </div>
        <div class="social-sharing-modal">
          <div class="widget widget_socialsharing_widget">
            <h3 class="widget-title-modal">Share this product</h3>
            <ul class="social-icons-modal">
              <li>
                <a
                  title="Facebook"
                  href="#"
                  class="facebook m-single-icon"
                  ><i class="fa fa-facebook"></i
                ></a>
              </li>
              <li>
                <a
                  title="Twitter"
                  href="#"
                  class="twitter m-single-icon"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li>
                <a
                  title="Pinterest"
                  href="#"
                  class="pinterest m-single-icon"
                  ><i class="fa fa-pinterest"></i
                ></a>
              </li>
              <li>
                <a
                  title="Google +"
                  href="#"
                  class="gplus m-single-icon"
                  ><i class="fa fa-google-plus"></i
                ></a>
              </li>
              <li>
                <a
                  title="LinkedIn"
                  href="#"
                  class="linkedin m-single-icon"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`

  const addToCartButton = modalContentEle.querySelector(
    ".single_add_to_cart_button"
  )
  const quantity = modalContentEle.querySelector(".numbers-row input").value
  addToCartButton.addEventListener("click", () => {
    addToCart(product, +quantity)
  })
}

function applyOnProducts(products) {
  const addToCartButtons = document.querySelectorAll(
    '[data-tooltip="Add To Cart"]'
  )
  const quickViewButtons = document.querySelectorAll(
    '[data-tooltip="Quick View"]'
  )

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = +e.currentTarget.dataset.id
      const foundProduct = products.find((prod) => prod.id === id)

      addToCart(foundProduct)
    })
  })
  quickViewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = +e.currentTarget.dataset.id
      const foundProduct = products.find((prod) => prod.id === id)

      addToLocalStorage(foundProduct)
      addToModal(foundProduct)
    })
  })
}
