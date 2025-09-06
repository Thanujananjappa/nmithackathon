const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/', authenticateToken, addToCart);
router.delete('/:id', authenticateToken, removeFromCart);

module.exports = router;