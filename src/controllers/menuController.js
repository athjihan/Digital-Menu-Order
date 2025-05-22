// src/controllers/menuController.js
exports.showMenu = async (req, res, next) => {
  const search = req.query.search || '';
  const category = req.query.category || '';

  try {
    const menu = await req.container.menuService.getMenu({ search, category });
    res.render('menu', { menu, searchQuery: search, success: req.query.success || null, error: req.query.error || null });
  } catch (err) {
    next(err);
  }
};