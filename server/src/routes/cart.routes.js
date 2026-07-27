const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// GET /api/cart
router.get('/', cartController.getCart);

// POST /api/cart
router.post(
  '/',
  validate([
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('quantity')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),
  ]),
  cartController.addToCart
);

// PUT /api/cart/:itemId (Update quantity)
router.put(
  '/:itemId',
  validate([
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
  ]),
  cartController.updateQuantity
);

// DELETE /api/cart/:itemId
router.delete('/:itemId', cartController.removeFromCart);

module.exports = router;
