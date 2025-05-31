// src/app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const pool = require('./config/db');

const MenuService = require('./services/menuService');
const OrderService = require('./services/orderService');
const SellerService = require('./services/sellerService');

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

const app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, _, next) => {
  req.container = {
    menuService: new MenuService(new (require('./repositories/menuRepo'))(pool)),
    orderService: new OrderService(new (require('./repositories/orderRepo'))(pool)),
    sellerService: new SellerService(new (require('./repositories/sellerRepo'))(pool))
  };
  next();
});

app.use('/', menuRoutes);
app.use('/', orderRoutes);
app.use('/', sellerRoutes);

app.get('/', (req, res) => {
  res.render('landing'); // pastikan ada file views/index.ejs
});

app.use((err, req, res, next) => {
  console.error(err);
  res.redirect(`/menu?error=${encodeURIComponent(err.message)}`);
});

module.exports = app;