// src/services/OrderService.js
class OrderService {
  constructor(orderRepo) { this.orderRepo = orderRepo; }

  async placeOrder(data) {
    const { customerPhone, tableNumber, paymentMethod, selectedItems, quantities } = data;
    if (!customerPhone || !selectedItems.length) {
      throw new Error('Required fields missing');
    }

    await this.orderRepo.db.beginTransaction();
    try {
      const totalPrice = await this.orderRepo.calculateTotal(selectedItems, quantities);
      const orderNumber = await this.orderRepo.createOrder(
        customerPhone, tableNumber, totalPrice, paymentMethod
      );
      await this.orderRepo.addOrderDetails(orderNumber, selectedItems, quantities);
      await this.orderRepo.updateTotalAmount(orderNumber, totalPrice);
      await this.orderRepo.db.commit();
      return { orderNumber, totalPrice };
    } catch (err) {
      await this.orderRepo.db.rollback();
      throw err;
    }
  }
}

module.exports = OrderService;