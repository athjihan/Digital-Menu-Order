// src/services/OrderService.js
class OrderService {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
    // orderRepo.pool adalah pool mysql
  }

  async placeOrder({ customerPhone, tableNumber, paymentMethod, selectedItems, quantities }) {
    if (!customerPhone || !selectedItems.length) {
      throw new Error('Required fields missing');
    }

    // 1. ambil connection dari pool
    const conn = await this.orderRepo.pool.getConnection();

    try {
      // 2. mulai transaksi
      await conn.beginTransaction();

      // 3. hitung total
      const totalPrice = await this.orderRepo.calculateTotal(conn, selectedItems, quantities);

      // 4. buat order
      const orderNumber = await this.orderRepo.createOrder(conn, {
        customerPhone,
        tableNumber,
        totalPrice,
        paymentMethod
      });

      // 5. simpan detail
      await this.orderRepo.addOrderDetails(conn, orderNumber, selectedItems, quantities);

      // 6. update total di order
      await this.orderRepo.updateTotalAmount(conn, orderNumber, totalPrice);

      // 7. commit
      await conn.commit();

      return { orderNumber, totalPrice };
    } catch (err) {
      // rollback bila gagal
      await conn.rollback();
      throw err;
    } finally {
      // lepas connection
      conn.release();
    }
  }
}

module.exports = OrderService;
