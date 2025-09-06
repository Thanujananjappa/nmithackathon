const express = require('express');
const { getPurchases, checkout } = require('../controllers/purchaseController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getPurchases);
router.post('/', authenticateToken, checkout);

module.exports = router;