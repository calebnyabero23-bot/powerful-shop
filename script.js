// 1. DATA STORE
let products = [
    { id: 1, name: "NCN Premium Headphones", price: 59.99, rating: 5 },
    { id: 2, name: "Smart Fitness Tracker", price: 29.99, rating: 4 },
    { id: 3, name: "Wireless Charging Pad", price: 15.50, rating: 5 }
];

let cart = [];
let isAdmin = false;

// 2. CORE ROUTING ENGINE
function showPage(page) {
    const main = document.getElementById('main-content');
    logActivity(`Mapsd to: ${page}`);

    switch(page) {
        case 'home': renderHome(main); break;
        case 'cart': renderCart(main); break;
        case 'login': renderLogin(main); break;
        case 'admin': isAdmin ? renderAdmin(main) : showPage('login'); break;
        case 'checkout': renderCheckout(main); break;
    }
}

// 3. PAGE RENDERS
function renderHome(container) {
    container.innerHTML = `<h1>Featured Products</h1><div class="product-grid" id="p-grid"></div>`;
    const grid = document.getElementById('p-grid');
    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <h3>${p.name}</h3>
                <div class="rating">${'★'.repeat(p.rating)}</div>
                <p class="price">$${p.price.toFixed(2)}</p>
                <button class="btn-amazon" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

function renderAdmin(container) {
    container.innerHTML = `
        <div class="admin-form">
            <h2>Admin Dashboard - Add Product</h2>
            <input type="text" id="newPName" placeholder="Product Name">
            <input type="number" id="newPPrice" placeholder="Price">
            <input type="number" id="newPRating" placeholder="Rating (1-5)" max="5">
            <button class="btn-amazon" onclick="addNewProduct()">Add to Inventory</button>
            <hr>
            <h3>Current Inventory: ${products.length} items</h3>
        </div>
    `;
}

// 4. FUNCTIONALITY
function addNewProduct() {
    const name = document.getElementById('newPName').value;
    const price = parseFloat(document.getElementById('newPPrice').value);
    const rating = parseInt(document.getElementById('newPRating').value);

    if(name && price) {
        products.push({ id: Date.now(), name, price, rating });
        alert("Product added successfully!");
        showPage('home');
    }
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    document.getElementById('cartCount').innerText = cart.length;
    logActivity(`Added to cart: ${item.name}`);
}

function renderCart(container) {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    container.innerHTML = `
        <div class="admin-form" style="max-width: 600px">
            <h2>Your Shopping Cart</h2>
            ${cart.length === 0 ? '<p>Empty</p>' : cart.map(i => `<p>${i.name} - $${i.price}</p>`).join('')}
            <h3>Total: $${total.toFixed(2)}</h3>
            <button class="btn-amazon" onclick="showPage('checkout')">Checkout</button>
        </div>
    `;
}

// 5. SECURITY & LOGIN
function renderLogin(container) {
    container.innerHTML = `
        <div class="admin-form">
            <h2>Sign-In</h2>
            <p style="font-size: 12px; color: #666;">Hint: Use 'admin' as username for admin access</p>
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button class="btn-amazon" onclick="handleLogin()">Login</button>
        </div>
    `;
}

function handleLogin() {
    const user = document.getElementById('username').value.trim();
    if(user.toLowerCase() === 'admin') {
        isAdmin = true;
        document.getElementById('adminNavLink').style.display = 'inline';
        document.getElementById('userGreeting').innerText = "Hello, Admin";
    } else {
        document.getElementById('userGreeting').innerText = `Hello, ${user}`;
    }
    showPage('home');
}

// 6. ANALYTICS MOCK
function logActivity(msg) {
    console.log(`[TRACKING]: ${new Date().toLocaleTimeString()} - ${msg}`);
}

// Start the app
window.onload = () => showPage('home');