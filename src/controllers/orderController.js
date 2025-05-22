// src/controllers/orderController.js
exports.createOrder = async (req, res, next) => {
  const { customer_phone, table_number, payment_method, selected_items, quantities } = req.body;
  const selectedItems = selected_items.split(',');
  const qtys = quantities.split(',').map(Number);

  try {
    const { orderNumber, totalPrice } = await req.container.orderService.placeOrder({
      customerPhone: customer_phone,
      tableNumber: table_number,
      paymentMethod: payment_method,
      selectedItems,
      quantities: qtys
    });

    req.session.lastOrder = { orderNumber, totalPrice, selectedItems, quantities: qtys };
    res.redirect(`/menu?success=Pesanan berhasil dibuat! Order No: ${orderNumber}`);
  } catch (err) {
    next(err);
  }
};
