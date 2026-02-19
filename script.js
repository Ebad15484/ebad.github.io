const menuData = [
  { id: 1, name: "Classic Burger", price: 5.99, category: "burgers", img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 2, name: "Cheese Burger", price: 6.49, category: "burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { id: 3, name: "Loaded Fries", price: 3.99, category: "sides", img: "https://images.unsplash.com/photo-1606755962773-0c4f8c1c7a79" },
  { id: 4, name: "Chicken Nuggets", price: 4.49, category: "sides", img: "https://images.unsplash.com/photo-1604908554164-ec0d15b6fbd5" },
  { id: 5, name: "Cola", price: 1.99, category: "drinks", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
  { id: 6, name: "Milkshake", price: 2.99, category: "drinks", img: "https://images.unsplash.com/photo-1577805947697-89e18249d767" }
];

let cart = [];

const menuContainer = document.getElementById("menu-items");
const cartItems = document.getElementById("cart-items");

function renderMenu(items) {
  menuContainer.innerHTML = "";
  items.forEach(item => {
    menuContainer.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function filterCategory(category, btn) {
  // Remove active class from all buttons
  document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
  
  // Add active class to clicked button
  btn.classList.add("active");

  // Render menu items based on category
  if (category === "all") {
    renderMenu(menuData);
  } else {
    renderMenu(menuData.filter(item => item.category === category));
  }
}



function animateCartCount() {
  const countEl = document.getElementById("cart-count");
  countEl.classList.add("bounce");
  setTimeout(() => countEl.classList.remove("bounce"), 300);
}

function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  cart.push(item);
  updateCart();
  animateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  animateCartCount();
}



function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("cart-count").textContent = cart.length;
}


function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

renderMenu(menuData);

document.querySelector(".categories button.active").click();

function removeFromCart(index) {
  cart.splice(index, 1); // remove item at index
  updateCart();          // refresh cart display
}

document.querySelector(".checkout").addEventListener("click", () => {
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  let itemsList = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join("\n");
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  let confirmCheckout = confirm(
    `Confirm your order:\n\n${itemsList}\n\nTotal: $${total.toFixed(2)}`
  );

  if(confirmCheckout){
    alert("Thank you for your order! 🍔 Your food is on the way!");
    cart = []; // clear cart
    updateCart(); // refresh
  }
});

let rotation = document.querySelector('.hero')
document.addEventListener('mousemove', function(e) {
    let dx = e.pageX - window.innerWidth / 2
    let dy = e.pageY - window.innerHeight / 2
    let angleX = 20 * dx / window.innerWidth / 2
    let angleY = 20 * dy / window.innerHeight / 2
    block.style.transform = `rotateX(${-angleY}deg) rotateY(${angleX}deg)`
})