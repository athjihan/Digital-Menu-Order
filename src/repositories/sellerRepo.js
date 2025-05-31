// src/repositories/SellerRepository.js
class SellerRepository {
  constructor(db) { this.db = db; }

  async getQueue() {
    const [rows] = await this.db.query(
      `SELECT od.orderNumber, o.tableNumber, m.productName, od.quantityOrdered, od.queue_status
       FROM order_details od
       JOIN orders o ON od.orderNumber = o.orderNumber
       JOIN menu m ON od.productCode = m.productCode
       WHERE od.queue_status = 'waiting'
       ORDER BY od.orderNumber ASC`
    );
    return rows;
  }

  async getMenuItems() {
    const [rows] = await this.db.query(
      'SELECT productCode, productName FROM menu'
    );
    return rows;
  }

  async confirmOrder(orderNumber) {
    await this.db.query(
      "UPDATE order_details SET queue_status = 'delivered' WHERE orderNumber = ?",
      [orderNumber]
    );
  }

  async addMenu(item) {
    const { productCode, productName, price, category, availability, image_url } = item;
    await this.db.query(
      `INSERT INTO menu
       (productCode, productName, price, category, availability, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [productCode, productName, price, category, availability, image_url]
    );
  }

  async updateAvailability(productCode, availability) {
    await this.db.query(
      'UPDATE menu SET availability = ? WHERE productCode = ?',
      [availability, productCode]
    );
  }

  async getIncomeInRange(startDate, endDate) {
    const [rows] = await this.db.query(
      `SELECT SUM(totalAmount) AS totalIncome
       FROM orders
       WHERE orderDate BETWEEN ? AND ?;`,
      [startDate, endDate]
    );
    return rows[0]?.totalIncome || 0;
  }
}
module.exports = SellerRepository;
