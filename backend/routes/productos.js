const express = require('express');
const router = express.Router();
const { getProductos } = require('../controllers/productosController');

router.get('/', getProductos);
// Puedes agregar más rutas: POST, PUT, DELETE

module.exports = router;
