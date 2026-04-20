// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');

// Update cart count in navbar (total quantity)
function updateCartCount() {
    if (cartCount) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Display cart items
function displayCart() {
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item d-flex justify-content-between align-items-center mb-3 p-2 border rounded';
            itemDiv.innerHTML = `
                <div>
                    <span class="fw-bold">${item.name}</span><br>
                    <small>P${item.price} each</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-2" onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemDiv);
        });
    }

    if (cartTotal) {
        cartTotal.textContent = `P${total}`;
    }
}

// Change quantity of item
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
}

// Proceed to checkout
function proceedToCheckout() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCart();

    // Attach event listener to checkout button if exists
    const checkoutBtn = document.getElementById('Checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});
