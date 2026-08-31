/* ==========================================
   LEPARADISE ONLINE STORE
   ========================================== */


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "LeParadise Signature Tee",
    category: "T-Shirts",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "Premium everyday streetwear with the LeParadise identity."
  },

  {
    id: 2,
    name: "Oversized Black Tee",
    category: "T-Shirts",
    price: 549,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed oversized fit designed for a modern streetwear look."
  },

  {
    id: 3,
    name: "Paradise Hoodie",
    category: "Hoodies",
    price: 899,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description: "Heavyweight-inspired hoodie made for comfort and style."
  },

  {
    id: 4,
    name: "Cream Essential Hoodie",
    category: "Hoodies",
    price: 899,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    description: "Clean cream hoodie with a premium minimalist aesthetic."
  },

  {
    id: 5,
    name: "LeParadise Cargo Pants",
    category: "Pants",
    price: 799,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    description: "Modern cargo trousers designed for everyday streetwear."
  },

  {
    id: 6,
    name: "Street Cargo",
    category: "Pants",
    price: 749,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed streetwear trousers with a contemporary silhouette."
  },

  {
    id: 7,
    name: "Paradise Cap",
    category: "Accessories",
    price: 299,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    description: "Classic LeParadise cap for completing your look."
  },

  {
    id: 8,
    name: "Signature Beanie",
    category: "Accessories",
    price: 249,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=85",
    description: "Minimal beanie designed for the LeParadise collection."
  }

];


/* CART */

let cart = JSON.parse(localStorage.getItem("leparadiseCart")) || [];


/* START WEBSITE */

document.addEventListener("DOMContentLoaded", function () {

  displayFeaturedProducts();

  displayProducts(products);

  updateCart();

});


/* PRODUCT CARD */

function createProductCard(product) {

  return `

    <div class="product-card">

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-price">
          R${product.price.toLocaleString()}
        </div>

        <button onclick="openProduct(${product.id})">
          VIEW PRODUCT
        </button>

        <button onclick="addToCart(${product.id})">
          ADD TO CART
        </button>

      </div>

    </div>

  `;

}


/* FEATURED PRODUCTS */

function displayFeaturedProducts() {

  const container =
    document.getElementById("featured-products");

  if (!container) return;

  container.innerHTML =
    products
      .slice(0, 4)
      .map(createProductCard)
      .join("");

}


/* ALL PRODUCTS */

function displayProducts(list) {

  const container =
    document.getElementById("shop-products");

  if (!container) return;

  if (list.length === 0) {

    container.innerHTML = `
      <p>No products found.</p>
    `;

    return;
  }

  container.innerHTML =
    list
      .map(createProductCard)
      .join("");

}


/* FILTER */

function filterProducts(category) {

  if (category === "all") {

    displayProducts(products);

  } else {

    const filtered =
      products.filter(
        product => product.category === category
      );

    displayProducts(filtered);

  }

  document
    .getElementById("shop")
    .scrollIntoView({ behavior: "smooth" });

}


/* SEARCH */

function searchProducts() {

  const input =
    document.getElementById("search-input");

  const search =
    input.value.toLowerCase().trim();

  const results =
    products.filter(product =>

      product.name
        .toLowerCase()
        .includes(search)

      ||

      product.category
        .toLowerCase()
        .includes(search)

    );

  displayProducts(results);

}


/* SEARCH BOX */

function openSearch() {

  document
    .getElementById("search-box")
    .classList.add("active");

  document
    .getElementById("search-input")
    .focus();

}

function closeSearch() {

  document
    .getElementById("search-box")
    .classList.remove("active");

}


/* MOBILE MENU */

function toggleMenu() {

  document
    .getElementById("mobile-menu")
    .classList.toggle("active");

}


/* PAGE NAVIGATION */

function showPage(page) {

  const home =
    document.getElementById("home-page");

  const productPage =
    document.getElementById("product-page");

  if (page === "shop") {

    home.classList.remove("hidden");

    setTimeout(() => {

      document
        .getElementById("shop")
        .scrollIntoView({ behavior: "smooth" });

    }, 50);

  }

  else if (page === "about") {

    home.classList.remove("hidden");

    setTimeout(() => {

      document
        .getElementById("about")
        .scrollIntoView({ behavior: "smooth" });

    }, 50);

  }

  else if (page === "contact") {

    home.classList.remove("hidden");

    setTimeout(() => {

      document
        .getElementById("contact")
        .scrollIntoView({ behavior: "smooth" });

    }, 50);

  }

  else {

    home.classList.remove("hidden");

    productPage.classList.add("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


/* PRODUCT DETAILS */

function openProduct(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;

  document
    .getElementById("home-page")
    .classList.add("hidden");

  const page =
    document.getElementById("product-page");

  page.classList.remove("hidden");

  document
    .getElementById("product-details")
    .innerHTML = `

      <div class="product-detail">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-detail-info">

          <div class="product-category">
            ${product.category}
          </div>

          <h1>${product.name}</h1>

          <h2>
            R${product.price.toLocaleString()}
          </h2>

          <p>
            ${product.description}
          </p>

          <strong>Choose size</strong>

          <div class="size-buttons">

            <button onclick="selectSize(this)">
              S
            </button>

            <button onclick="selectSize(this)">
              M
            </button>

            <button onclick="selectSize(this)">
              L
            </button>

            <button onclick="selectSize(this)">
              XL
            </button>

          </div>

          <button
            class="primary-button"
            onclick="addToCart(${product.id})"
          >
            ADD TO CART
          </button>

        </div>

      </div>

    `;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* SIZE */

function selectSize(button) {

  document
    .querySelectorAll(".size-buttons button")
    .forEach(btn => {

      btn.classList.remove("selected");

    });

  button.classList.add("selected");

}


/* ADD TO CART */

function addToCart(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1

    });

  }

  saveCart();

  updateCart();

  openCart();

}


/* REMOVE ITEM */

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  updateCart();

}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id);

    return;

  }

  saveCart();

  updateCart();

}


/* UPDATE CART */

function updateCart() {

  const container =
    document.getElementById("cart-items");

  const count =
    document.getElementById("cart-count");

  const total =
    document.getElementById("cart-total");

  if (!container) return;


  let itemCount = 0;

  let cartTotal = 0;


  cart.forEach(item => {

    itemCount += item.quantity;

    cartTotal +=
      item.price * item.quantity;

  });


  count.textContent = itemCount;

  total.textContent =
    cartTotal.toLocaleString();


  if (cart.length === 0) {

    container.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 10px;
      ">

        <h3>Your cart is empty.</h3>

        <p style="
          margin-top:10px;
          color:#777;
        ">
          Add something from the collection.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML = cart.map(item => `

    <div class="cart-item">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="cart-item-info">

        <h3>
          ${item.name}
        </h3>

        <strong>
          R${item.price.toLocaleString()}
        </strong>

        <div style="
          margin-top:10px;
          display:flex;
          align-items:center;
          gap:10px;
        ">

          <button
            onclick="changeQuantity(${item.id}, -1)"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>

        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${item.id})"
        >
          Remove
        </button>

      </div>

    </div>

  `).join("");

}


/* SAVE CART */

function saveCart() {

  localStorage.setItem(
    "leparadiseCart",
    JSON.stringify(cart)
  );

}


/* OPEN CART */

function openCart() {

  document
    .getElementById("cart-panel")
    .classList.add("active");

  document
    .getElementById("overlay")
    .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

  document
    .getElementById("cart-panel")
    .classList.remove("active");

  document
    .getElementById("overlay")
    .classList.remove("active");

}


/* CLOSE EVERYTHING */

function closeEverything() {

  closeCart();

  closeSearch();

  document
    .getElementById("mobile-menu")
    .classList.remove("active");

}


/* CHECKOUT */

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;

  }


  let message =
    "Hello LeParadise! I would like to place an order:%0A%0A";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    message +=
      `${item.name} x ${item.quantity} - R${itemTotal}%0A`;

  });


  message +=
    `%0ATotal: R${total}`;


  /*
    CHANGE THIS NUMBER TO YOUR
    LEPARADISE WHATSAPP NUMBER.

    Example South African format:
    27821234567
  */

  const phone =
    "27000000000";


  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

}
