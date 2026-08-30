const products = [
  {name:"Signature Oversized Tee", category:"T-Shirts", price:499},
  {name:"Paradise White Tee", category:"T-Shirts", price:449},
  {name:"Forest Badge Hoodie", category:"Hoodies", price:899},
  {name:"Essential Brown Hoodie", category:"Hoodies", price:899},
  {name:"Navy Signature Jacket", category:"Jackets", price:1199},
  {name:"LeParadise Beanie", category:"Accessories", price:299}
];

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cartItems");
let cart = JSON.parse(localStorage.getItem("leparadiseCart") || "[]");

function renderProducts(){
  productsEl.innerHTML = products.map((p,i)=>`
    <article class="product">
      <div class="product-img">LP</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.category} · R${p.price}</p>
        <button class="add" onclick="addToCart(${i})">Add to cart</button>
      </div>
    </article>`).join("");
}
function addToCart(i){cart.push(products[i]);saveCart();openCart()}
function removeFromCart(i){cart.splice(i,1);saveCart()}
function saveCart(){localStorage.setItem("leparadiseCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price,0);
  cartItemsEl.innerHTML=cart.length?cart.map((p,i)=>`
    <div class="cart-item"><span>${p.name}<br><small>R${p.price}</small></span>
    <button onclick="removeFromCart(${i})">Remove</button></div>`).join("")
    : "<p style='color:#888;padding:30px 0'>Your cart is empty.</p>";
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkout").onclick=()=>alert("Checkout is ready to connect to a payment provider.");
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();document.getElementById("formMessage").textContent="Thanks for joining LeParadise.";e.target.reset()};
renderProducts();renderCart();
