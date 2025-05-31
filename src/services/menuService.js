// src/services/MenuService.js
class MenuService {
  constructor(menuRepo) { this.menuRepo = menuRepo; }

  async getMenu({ search = '', category = '' }) {
    if (search) {
      return this.menuRepo.searchByName(search);
    } else if (category && category !== 'all') {
      return this.menuRepo.filterByCategory(category);
    }
    return this.menuRepo.findAll();
  }
}

module.exports = MenuService;
