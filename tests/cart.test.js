const {
    addToCart,
    removeFromCart,
    getCart,
    saveCart
} = require('../src/utils/cart');

describe('Cart Logic Unit Tests', () => {
    test('addToCart adds new item if not exists', () => {
        const cart = [];
        const newItem = { id: "1", name: "Ayam Bakar", price: 15000, quantity: 1 };
        const result = addToCart(cart, newItem);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(newItem);
    });

    test('addToCart increases quantity if item exists', () => {
        const cart = [{ id: "1", name: "Ayam Bakar", price: 15000, quantity: 1 }];
        const newItem = { id: "1", name: "Ayam Bakar", price: 15000, quantity: 2 };
        const result = addToCart(cart, newItem);
        expect(result[0].quantity).toBe(3);
    });

    test('removeFromCart removes item by index', () => {
        const cart = [{ id: "1" }, { id: "2" }];
        const result = removeFromCart(cart, 0);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");
    });

});
