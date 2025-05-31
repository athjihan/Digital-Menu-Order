// src/services/SellerService.js
const SellerRepository = require('../repositories/sellerRepo');
class SellerService {
  constructor(sellerRepo = new SellerRepository()) {
    this.sellerRepo = sellerRepo;
  }

  async getDashboard() {
    const [queue, menuItems] = await Promise.all([
      this.sellerRepo.getQueue(),
      this.sellerRepo.getMenuItems(),
    ]);
    return { queue, menuItems };
  }

  async confirmOrder(orderNumber) {
    await this.sellerRepo.confirmOrder(orderNumber);
  }

  async addMenu(item) {
    await this.sellerRepo.addMenu(item);
  }

  async updateAvailability(productCode, availability) {
    await this.sellerRepo.updateAvailability(productCode, availability);
  }

  async getIncome(startDate, endDate) {
    return this.sellerRepo.getIncomeInRange(startDate, endDate);
  }
}
module.exports = SellerService;