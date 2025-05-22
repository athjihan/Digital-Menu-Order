// src/controllers/sellerController.js
exports.showDashboard = async (req, res, next) => {
  try {
    const { queue, menuItems, topProducts, bottomProducts } = await req.container.sellerService.getDashboard();
    res.render('seller', { queue, menuItems, topProducts, bottomProducts, totalIncome: undefined });
  } catch (err) { next(err); }
};

exports.confirmOrder = async (req, res, next) => {
  try {
    await req.container.sellerService.confirmOrder(req.body.orderNumber);
    res.redirect('/seller');
  } catch (err) { next(err); }
};

exports.addMenu = async (req, res, next) => {
  try {
    await req.container.sellerService.addMenu(req.body);
    res.redirect('/seller?success=true');
  } catch (err) { next(err); }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    await req.container.sellerService.updateAvailability(
      req.body.product_code, req.body.availability
    );
    res.redirect('/seller');
  } catch (err) { next(err); }
};

exports.checkIncome = async (req, res, next) => {
  try {
    const income = await req.container.sellerService.getIncome(
      req.body.start_date, req.body.end_date
    );
    res.json({ totalIncome: income });
  } catch (err) { next(err); }
};
