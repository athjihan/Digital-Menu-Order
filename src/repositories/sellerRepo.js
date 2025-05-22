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

  async getTopProducts(limit = 5) {
    const [results] = await this.db.query("CALL GetTopProducts(?, 'DESC')", [limit]);
    return results[0] || [];
  }

  async getBottomProducts(limit = 5) {
    const [results] = await this.db.query("CALL GetTopProducts(?, 'ASC')", [limit]);
    return results[0] || [];
  }

  async confirmOrder(orderNumber) {
    await this.db.query('CALL UpdateQueueStatus(?)', [orderNumber]);
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
    await this.db.query('CALL UpdateMenuAvailability(?, ?)', [productCode, availability]);
  }

  async getIncomeInRange(startDate, endDate) {
    const [rows] = await this.db.query('CALL GetIncomeInRange(?, ?)', [startDate, endDate]);
    return rows[0][0]?.totalIncome || 0;
  }
}
module.exports = SellerRepository;
