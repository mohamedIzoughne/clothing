import {
  CURRENCY,
  currencies,
  addToCart,
  getProductsFromJson,
  addToLocalStorage,
} from "./script.js"
let PRODUCTS = []
let productsSlice = [0, 10]
let unsortedProds = []

// export const getProductsFromJson = async () => {
//   return await fetch("./products.json")
//     .then((products) => {
//       return products.json()
//     })
//     .then(({ products }) => products)
// }

const getProducts = async () => {
  PRODUCTS = await getProductsFromJson()
  unsortedProds = [...PRODUCTS]
  addToShop(false)
  return [...PRODUCTS]
}

getProducts()

// toggle buttons
const sizeFilterButtons = document.querySelectorAll(".size-filter li a")
const tagFilterButtons = document.querySelectorAll(".tag-filter li a")
const paginationButtons = document.querySelectorAll(
  ".pagination-btn a.page-numbers"
)

const removeCurrentClass = (buttons, className) => {
  buttons.forEach((span) => {
    if (span.classList.contains(className)) {
      span.classList.remove(className)
    }
  })
}

const toggleButtons = (buttons, className, isPag) => {
  buttons.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (!isPag && e.currentTarget.classList.contains(className)) {
        e.currentTarget.classList.remove(className)
        return
      }
      removeCurrentClass(buttons, className)
      e.currentTarget.classList.add(className)
    })
  })
}

toggleButtons(paginationButtons, "current", true)
toggleButtons(sizeFilterButtons, "active")
toggleButtons(tagFilterButtons, "active")

// ========= pagination

const hideAndShowPagButtons = (prods) => {
  if (prods.length <= 20) {
    paginationButtons[2].classList.add("d-none")
    if (paginationButtons[2].classList.contains("current")) {
      paginationButtons[1].classList.add("current")
    }
  } else {
    paginationButtons[2].classList.remove("d-none")
    paginationButtons[1].classList.remove("d-none")
    return
  }

  if (prods.length <= 10) {
    paginationButtons[1].classList.add("d-none")
    if (paginationButtons[1].classList.contains("current")) {
      paginationButtons[0].classList.add("current")
    }
  } else {
    paginationButtons[1].classList.remove("d-none")
  }
}

const applyPagination = () => {
  const activePagButton = document.querySelector(
    ".pagination-btn a.page-numbers.current"
  )
  const pageNumber = activePagButton.dataset.num

  productsSlice[0] = (pageNumber - 1) * 10
  productsSlice[1] = pageNumber * 10
  addToShop()
}

paginationButtons.forEach((btn) => {
  btn.addEventListener("click", applyPagination)
})

// ======== filtering
const filterButton = document.getElementById("filterButton")
const filterInputPriceEle = document.querySelector(".price_filter #amount")

filterButton.addEventListener("click", addToShop)

const getRange = () => {
  const filterInputPrice = filterInputPriceEle.value
  const least = +filterInputPrice.split("-")[0].trim().slice(1)
  const most = +filterInputPrice.split("-")[1].trim().slice(1)

  return [least, most]
}

function filterProducts(products) {
  const tag = document.querySelector(".tag-filter li a.active")?.dataset?.tag
  const size = document.querySelector(".size-filter li a.active")?.dataset?.size
  const filterObj = {
    price: getRange(),
    tag: tag?.toLowerCase(),
    size: size?.toUpperCase(),
  }

  return products.filter((prod) => {
    return (
      prod.price <= filterObj.price[1] &&
      prod.price >= filterObj.price[0] &&
      (!filterObj.tag || prod.tags.includes(filterObj.tag)) &&
      (!filterObj.size || prod.sizes.includes(filterObj.size))
    )
  })
}

// =========== Sorting
const sortInp = document.getElementById("input-sort")

const sortByNameAToZ = (products) => {
  return products.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  )
}

const sortByNameZToA = (products) => {
  return products.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
  )
}

const sortByPriceLowestToHighest = (products) => {
  return products.sort((a, b) => a.price - b.price)
}

const sortByPriceHighestToLowest = (products) => {
  return products.sort((a, b) => b.price - a.price)
}

const applySort = () => {
  const sortBy = sortInp.value

  switch (sortBy) {
    case "a-to-z":
      PRODUCTS = sortByNameAToZ(PRODUCTS)
      break
    case "z-to-a":
      PRODUCTS = sortByNameZToA(PRODUCTS)
      break
    case "low-to-high":
      PRODUCTS = sortByPriceLowestToHighest(PRODUCTS)
      break
    case "high-to-low":
      PRODUCTS = sortByPriceHighestToLowest(PRODUCTS)
      break
    default:
      PRODUCTS = [...unsortedProds]
  }
  addToShop()
}

sortInp.addEventListener("change", applySort)

// add products to page

const createAnchorTag = (inner, className, attributes, prod) => {
  const addCartButton = document.createElement("a")
  addCartButton.className = className
  addCartButton.innerHTML = inner
  for (const attr in attributes) {
    addCartButton.setAttribute(attr, attributes[attr])
  }

  addCartButton.addEventListener("click", () => {
    addToCart(prod)
  })

  return addCartButton
}

const createProduct = (product) => {
  const colView1 = document.createElement("div")
  const colView2 = document.createElement("div")
  const addCartButtonView1 = createAnchorTag(
    `<i class="fa fa-cart-plus"></i>`,
    "add-cart",
    {
      href: "#",
      "data-tooltip": "Add To Cart",
      "data-placement": "left",
    },
    product
  )
  const addCartButtonView2 = createAnchorTag(
    `<i class="zmdi zmdi-shopping-cart"></i>`,
    "",
    { href: "#" },
    product
  )

  colView1.className = "col-lg-4 col-md-6 item"
  colView2.className = "col-lg-12 item"
  colView1.innerHTML = `<div class="single-product">
    <div class="product-img">
    ${
      product.new
        ? `<div class="product-label red">
          <div class="new">New</div>
        </div>`
        : ""
    }
      <div
        class="single-prodcut-img product-overlay pos-rltv"
      >
        <a href="single-product.html">
          <img
            alt=""
            src="${product.imageUrl}"
            class="primary-image"
          />
        </a>
      </div>
      <div
        class="product-icon socile-icon-tooltip text-center"
      >
        <ul>
          <li class="add-cart-item">
          </li>
          <li>
            <a
              href="#"
              data-tooltip="Quick View"
              class="q-view"
              data-bs-toggle="modal"
              data-bs-target=".modal"
              ><i class="fa fa-eye"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-text">
      <div class="prodcut-name">
        <a href="single-product.html"
          >${product.name}</a
        >
      </div>
      <div class="prodcut-ratting-price">
        <div class="prodcut-price">
          <div class="new-price"><span class"currency-span">${
            currencies[CURRENCY]
          } </span>${product.price}</div>
        </div>
      </div>
    </div>
  </div>`
  colView2.innerHTML = `<div class="single-product single-product-list">
  <div class="product-img">
  ${
    product.new
      ? `<div class="product-label red">
  <div class="new">Sale</div>
</div>`
      : ""
  }
    <div
      class="single-prodcut-img product-overlay pos-rltv"
    >
      <a href="single-product.html">
        <img
          alt=""
          src=${product.imageUrl}
          class="primary-image"
        />
      </a>
    </div>
  </div>
  <div class="product-text prodcut-text-list fix">
    <div class="prodcut-name list-name montserrat">
      <a href="single-product.html"
        >${product.name}</a
      >
    </div>
    <div class="prodcut-ratting-price">
      <div class="prodcut-price list-price">
        <div class="new-price">$${product.price}</div>
      </div>
    </div>
    <div class="list-product-content">
      <p>
        ${product.description}
      </p>
    </div>
    <div class="social-icon-wraper mt-25">
      <div class="social-icon socile-icon-style-1">
        <ul>
          <li class="add-cart-item">
          </li>
          <li>
            <a
              href="#"
              data-tooltip="Quick View"
              class="q-view"
              data-bs-toggle="modal"
              data-bs-target=".modal"
              tabindex="0"
              ><i class="zmdi zmdi-eye"></i
            ></a>
          </li>
          <!-- <li>
            <a href="#"
              ><i class="zmdi zmdi-repeat"></i
            ></a>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</div>`
  colView1.querySelector(".add-cart-item").appendChild(addCartButtonView1)
  colView2.querySelector(".add-cart-item").appendChild(addCartButtonView2)

  const quickView1 = colView1.querySelector(".q-view")
  const quickView2 = colView2.querySelector(".q-view")
  const singleProduct1 = colView1.querySelector(".single-product")
  const singleProduct2 = colView2.querySelector(".single-product")

  quickView1.addEventListener("click", () => addToModal(product))
  quickView2.addEventListener("click", () => addToModal(product))
  singleProduct1.addEventListener("click", () => addToLocalStorage(product))
  singleProduct2.addEventListener("click", () => addToLocalStorage(product))

  return [colView1, colView2]
}

function addToModal(product) {
  const modalContentEle = document.querySelector(".modal-content")

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
    addToCart(product, quantity)
  })
}

function addToShop(filterIsClicked = true) {
  let products
  if (filterIsClicked) {
    products = filterProducts(PRODUCTS)
  } else {
    products = [...PRODUCTS]
  }

  const rows = document.querySelectorAll(".tab-pane .row")
  rows[0].innerHTML = ""
  rows[1].innerHTML = ""

  products.slice(productsSlice[0], productsSlice[1]).forEach((ele, index) => {
    for (let i = 0; i < 2; i++) {
      rows[i].appendChild(createProduct(ele)[i])
    }
  })
  hideAndShowPagButtons(products)
}

const currencySelect = document.getElementById("currency")
currencySelect.addEventListener("change", () => {
  addToShop()
})
