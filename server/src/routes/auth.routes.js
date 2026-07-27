const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/signup
router.post(
  '/signup',
  validate([
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ]),
  authController.signup
);

// POST /api/auth/login
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  authController.login
);

// GET /api/auth/me (Protected)
router.get('/me', auth, authController.getProfile);

// PUT /api/auth/profile (Protected)
router.put('/profile', auth, authController.updateProfile);

// PUT /api/auth/change-password (Protected)
router.put('/change-password', auth, authController.changePassword);

module.exports = router;
