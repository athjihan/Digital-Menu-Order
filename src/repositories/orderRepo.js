// src/repositories/OrderRepository.js
class OrderRepository {
  constructor(db) { this.db = db; }

  async calculateTotal(selectedItems, quantities) {
    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      const [rows] = await this.db.query(
        'SELECT price FROM menu WHERE productCode = ?',
        [selectedItems[i]]
      );
      total += rows[0].price * quantities[i];
    }
    return total;
  }

  async createOrder(customerPhone, tableNumber, totalPrice, paymentMethod) {
    await this.db.query('CALL AddOrder(?, ?, ?, ?)', [customerPhone, tableNumber, totalPrice, paymentMethod]);
    const [orderRow] = await this.db.query('SELECT LAST_INSERT_ID() AS orderNumber');
    return orderRow[0].orderNumber;
  }

  async addOrderDetails(orderNumber, selectedItems, quantities) {
    for (let i = 0; i < selectedItems.length; i++) {
      const [rows] = await this.db.query(
        'SELECT price FROM menu WHERE productCode = ?',
        [selectedItems[i]]
      );
      await this.db.query(
        'INSERT INTO order_details (orderNumber, productCode, priceEach, quantityOrdered) VALUES (?, ?, ?, ?)',
        [orderNumber, selectedItems[i], rows[0].price, quantities[i]]
      );
    }
  }

  async updateTotalAmount(orderNumber, totalPrice) {
    await this.db.query(
      'UPDATE orders SET totalAmount = ? WHERE orderNumber = ?',
      [totalPrice, orderNumber]
    );
  }
}

module.exports = OrderRepository;
