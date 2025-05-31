// src/repositories/OrderRepository.js
class OrderRepository {
  constructor(pool) {
    this.pool = pool; // pool mysql2
  }

  // Hitung total harga—gunakan `conn`
  async calculateTotal(conn, selectedItems, quantities) {
    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      const [rows] = await conn.query(
        'SELECT price FROM menu WHERE productCode = ?',
        [selectedItems[i]]
      );
      total += rows[0].price * quantities[i];
    }
    return total;
  }

  // Buat entry di tabel orders—pakai `conn`
  async createOrder(conn, { customerPhone, tableNumber, totalPrice, paymentMethod }) {
    await conn.query(
      "INSERT INTO orders (phoneNumber, tableNumber, totalAmount, payment, orderDate) VALUES (?, ?, ?, ?, NOW());",
      [customerPhone, tableNumber, totalPrice, paymentMethod]
    );
    const [orderRow] = await conn.query('SELECT LAST_INSERT_ID() AS orderNumber');
    return orderRow[0].orderNumber;
  }

  // Masukkan detail order
  async addOrderDetails(conn, orderNumber, selectedItems, quantities) {
    for (let i = 0; i < selectedItems.length; i++) {
      const [rows] = await conn.query(
        'SELECT price FROM menu WHERE productCode = ?',
        [selectedItems[i]]
      );
      await conn.query(
        'INSERT INTO order_details (orderNumber, productCode, priceEach, quantityOrdered) VALUES (?, ?, ?, ?)',
        [orderNumber, selectedItems[i], rows[0].price, quantities[i]]
      );
    }
  }

  // Update totalAmount di orders
  async updateTotalAmount(conn, orderNumber, totalPrice) {
    await conn.query(
      'UPDATE orders SET totalAmount = ? WHERE orderNumber = ?',
      [totalPrice, orderNumber]
    );
  }
}

module.exports = OrderRepository;
