const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

// GET /api/products — public
router.get('/', productController.getProducts);

// GET /api/products/:id — public
router.get('/:id', productController.getProductById);

module.exports = router;
