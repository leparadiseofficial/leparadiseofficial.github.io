/* =====================================
   LEPARADISE STORE
   ===================================== */


const products = [

  {
    id: 1,
    name: "LeParadise Black T-Shirt",
    category: "T-Shirts",
    price: 499,
    image: "images/20260901_001659.png",
    description:
      "Our signature LeParadise black T-Shirt."
  },

  {
    id: 2,
    name: "LeParadise White T-Shirt",
    category: "T-Shirts",
    price: 499,
    image: "images/20260901_001727.png",
    description:
      "Clean white LeParadise streetwear T-Shirt."
  },

  {
    id: 3,
    name: "LeParadise Light Brown T-Shirt",
    category: "T-Shirts",
    price: 499,
    image: "images/20260901_001751.png",
    description:
      "Light brown LeParadise T-Shirt."
  },

  {
    id: 4,
    name: "LeParadise Black Hoodie",
    category: "Hoodies",
    price: 899,
    image: "images/20260901_001827.png",
    description:
      "Premium black LeParadise hoodie."
  },

  {
    id: 5,
    name: "LeParadise Light Brown Bomber",
    category: "Jackets",
    price: 1099,
    image: "images/20260901_003523.jpg",
    description:
      "Light brown LeParadise bomber jacket."
  },

  {
    id: 6,
    name: "LeParadise Green & White Jacket",
    category: "Jackets",
    price: 1099,
    image: "images/20260901_003618.jpg",
    description:
      "Green and white LeParadise jacket."
  },

  {
    id: 7,
    name: "LeParadise Dark Brown Jacket",
    category: "Jackets",
    price: 1099,
    image: "images/20260901_003647.jpg",
    description:
      "Dark brown LeParadise jacket."
  }

];


let cart = [];
let selectedSize = null;

try {
  const savedCart = JSON.parse(
    localStorage.getItem("leparadiseCart") || "[]"
  );

  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(item =>
      Number.isInteger(item?.id) &&
      Number.isInteger(item?.quantity) &&
      item.quantity > 0 &&
      products.some(product => product.id === item.id)
    );
  }
} catch (error) {
  console.warn("Invalid cart data cleared.");
  localStorage.removeItem("leparadiseCart");
  cart = [];
}


/* START */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    displayFeatured();

    displayProducts(products);

    updateCart();

  }
);


/* PRODUCT CARD */

function productCard(product) {

  return `

    <article class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
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

        <button
          onclick="viewProduct(${product.id})"
        >
          VIEW
        </button>

        <button
          onclick="addToCart(${product.id})"
        >
          ADD TO CART
        </button>

      </div>

    </article>

  `;

}


/* FEATURED */

function displayFeatured() {

  const box =
    document.getElementById(
      "featured-products"
    );

  box.innerHTML =
    products
      .slice(0,4)
      .map(productCard)
      .join("");

}


/* PRODUCTS */

function displayProducts(list) {

  const box =
    document.getElementById(
      "shop-products"
    );

  if (list.length === 0) {

    box.innerHTML = `
      <p>No products found.</p>
    `;

    return;
  }

  box.innerHTML =
    list
      .map(productCard)
      .join("");

}


/* FILTER */

function filterProducts(category) {

  if (category === "all") {

    displayProducts(products);

  } else {

    const filtered =
      products.filter(
        product =>
          product.category === category
      );

    displayProducts(filtered);

  }

  document
    .getElementById("shop")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* SEARCH */

function searchProducts() {

  const input =
    document.getElementById(
      "search-input"
    );

  const search =
    input.value
      .toLowerCase()
      .trim();

  const results =
    products.filter(product => {
      const searchableText = `
        ${product.name}
        ${product.category}
        ${product.description}
      `.toLowerCase();

      return searchableText.includes(search);
    });

  displayProducts(results);

}


/* SEARCH OPEN */

function openSearch() {

  document
    .getElementById("search-box")
    .classList.add("active");

  document
    .getElementById("search-input")
    .focus();

}


/* SEARCH CLOSE */

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


/* PRODUCT DETAILS */

function viewProduct(id) {

  selectedSize = null;

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;


  document
    .getElementById("home")
    .classList.add("hidden");

  const page =
    document.getElementById(
      "product-page"
    );

  page.classList.remove("hidden");


  document
    .getElementById(
      "product-details"
    )
    .innerHTML = `

      <div class="product-detail">

        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-detail-image"
        >

        <div class="product-detail-info">

          <div class="product-category">
            ${product.category}
          </div>

          <h1>
            ${product.name}
          </h1>

          <h2>
            R${product.price.toLocaleString()}
          </h2>

          <p>
            ${product.description}
          </p>

          <div class="size-title">
            Select size
          </div>

          <div class="sizes">

            <button
              onclick="selectSize(this)"
            >
              S
            </button>

            <button
              onclick="selectSize(this)"
            >
              M
            </button>

            <button
              onclick="selectSize(this)"
            >
              L
            </button>

            <button
              onclick="selectSize(this)"
            >
              XL
            </button>

          </div>

          <button
            class="main-button"
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


/* CLOSE PRODUCT */

function closeProduct() {

  document
    .getElementById(
      "product-page"
    )
    .classList.add("hidden");

  document
    .getElementById("home")
    .classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* SELECT SIZE */

function selectSize(button) {

  document
    .querySelectorAll(
      ".sizes button"
    )
    .forEach(btn => {

      btn.classList.remove(
        "selected"
      );

    });

  button.classList.add("selected");
  selectedSize = button.textContent.trim();

}


/* ADD TO CART */

function addToCart(id) {

  if (!selectedSize) {
    alert("Please select a size first.");
    return;
  }

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;

  const existing =
    cart.find(
      item =>
        item.id === id &&
        item.size === selectedSize
    );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      image: product.image,

      size: selectedSize,

      quantity: 1

    });

  }

  saveCart();

  updateCart();

  openCart();

}


/* REMOVE */

function removeFromCart(id, size) {

  cart =
    cart.filter(
      item => !(item.id === id && (size === undefined || item.size === size))
    );

  saveCart();

  updateCart();

}


/* QUANTITY */

function changeQuantity(
  id,
  amount,
  size
) {

  const item =
    cart.find(
      product =>
        product.id === id &&
        (size === undefined || product.size === size)
    );

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

  const box =
    document.getElementById(
      "cart-items"
    );

  const count =
    document.getElementById(
      "cart-count"
    );

  const total =
    document.getElementById(
      "cart-total"
    );


  let numberOfItems = 0;

  let totalPrice = 0;


  cart.forEach(item => {

    numberOfItems +=
      item.quantity;

    totalPrice +=
      item.price *
      item.quantity;

  });


  count.textContent =
    numberOfItems;


  total.textContent =
    totalPrice.toLocaleString();


  if (cart.length === 0) {

    box.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 10px;
      ">

        <h3>
          Your cart is empty.
        </h3>

        <p style="
          margin-top:10px;
          color:#777;
        ">
          Start shopping.
        </p>

      </div>

    `;

    return;

  }


  box.innerHTML =
    cart.map(item => `

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

          <p>
            Size: ${item.size || "One Size"}
          </p>

          <div class="quantity">

            <button
              onclick="changeQuantity(
                ${item.id}, -1, '${item.size || "One Size"}'
              )"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(
                ${item.id}, 1, '${item.size || "One Size"}'
              )"
            >
              +
            </button>

          </div>

          <button
            class="remove"
            onclick="removeFromCart(
              ${item.id}, '${item.size || "One Size"}'
            )"
          >
            Remove
          </button>

        </div>

      </div>

    `).join("");

}


/* SAVE */

function saveCart() {

  localStorage.setItem(
    "leparadiseCart",
    JSON.stringify(cart)
  );

}


/* OPEN CART */

function openCart() {

  document
    .getElementById("cart")
    .classList.add("active");

  document
    .getElementById("overlay")
    .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

  document
    .getElementById("cart")
    .classList.remove("active");

  document
    .getElementById("overlay")
    .classList.remove("active");

}


/* CHECKOUT */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  let message =
    "Hello LeParadise! I would like to place an order:%0A%0A";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price *
      item.quantity;

    total += itemTotal;


    message +=
      `${item.name}%0ASize: ${item.size || "One Size"}%0AQuantity: ${item.quantity}%0APrice: R${itemTotal}%0A%0A`;

  });


  message +=
    `%0ATotal: R${total}`;


  /*
    REPLACE THE NUMBER BELOW
    WITH YOUR LEPARADISE WHATSAPP
    NUMBER.

    Example:
    27821234567
  */

  const phone =
    "27712201955";


  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

}
