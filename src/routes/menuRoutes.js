// src/routes/menuRoutes.js
const express = require('express');
const { showMenu } = require('../controllers/menuController');

const router = express.Router();
router.get('/menu', showMenu);

module.exports = router;
