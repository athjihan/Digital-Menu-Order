// src/repositories/MenuRepository.js
class MenuRepository {
  constructor(db) { this.db = db; }

  async findAll() {
    const [rows] = await this.db.query("SELECT * FROM menu");
    return rows;
  }

  async searchByName(keyword) {
    const [results] = await this.db.query(
      "SELECT * FROM menu WHERE productName LIKE CONCAT('%', ?, '%')",
      [keyword]
    );
    return results;
  }

  async filterByCategory(category) {
    const [results] = await this.db.query("SELECT * FROM menu WHERE category = ?", [category]);
    return results;
  }
}

module.exports = MenuRepository;