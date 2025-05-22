// src/repositories/MenuRepository.js
class MenuRepository {
  constructor(db) { this.db = db; }

  async findAll() {
    const [rows] = await this.db.query("SELECT * FROM menu");
    return rows;
  }

  async searchByName(keyword) {
    const [results] = await this.db.query('CALL SearchMenu(?)', [keyword]);
    return results[0] || [];
  }

  async filterByCategory(category) {
    const [results] = await this.db.query('CALL GetCategory(?)', [category]);
    return results[0] || [];
  }
}

module.exports = MenuRepository;