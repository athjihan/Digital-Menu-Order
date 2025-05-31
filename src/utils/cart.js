// public/js/utils/cart.js

function addToCart(cart, newItem) {
    const existing = cart.find(item => item.id === newItem.id);
    if (existing) {
        existing.quantity += newItem.quantity;
    } else {
        cart.push(newItem);
    }
    return cart;
}

function clearCart() {
    sessionStorage.removeItem("cart");
    return [];
}

function removeFromCart(cart, index) {
    cart.splice(index, 1);
    return cart;
}

function getCart() {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

module.exports = {
    addToCart,
    clearCart,
    removeFromCart,
    getCart,
    saveCart
};