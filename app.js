// Signup Functionality
const signupSection = document.getElementById("signup-section");
const loginSection = document.getElementById("login-section");
const website = document.getElementById("website");
const cartSection = document.getElementById("cart-section");

const signupButton = document.getElementById("signup-btn");
const loginButton = document.getElementById("login-btn");
const cartIcon = document.getElementById("cart-icon");
const cartItemsList = document.getElementById("cart-items");

let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sign up
signupButton.addEventListener("click", () => {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (username && password) {
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    signupSection.style.display = "none";
    loginSection.style.display = "block";
  } else {
    alert("Please fill in all fields.");
  }
});

// Login
loginButton.addEventListener("click", () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful!");
    loginSection.style.display = "none";
    website.style.display = "block";
  } else {
    alert("Invalid username or password.");
  }
});

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const name = e.target.getAttribute("data-name");
    const price = e.target.getAttribute("data-price");

    if (name && price) {
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart!`);
      cartIcon.click(); // Simulate cart redirection
    } else {
      console.error("Product data missing!");
    }
  });
});

// View Cart
cartIcon.addEventListener("click", () => {
  website.style.display = "none";
  cartSection.style.display = "block";
  cartItemsList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
  });
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout complete! Thank you for your purchase.");
  cart = [];
  localStorage.removeItem("cart");
  cartItemsList.innerHTML = "";
  website.style.display = "block";
  cartSection.style.display = "none";
});