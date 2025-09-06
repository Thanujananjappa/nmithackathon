<<<<<<< HEAD
import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getCart);
router.post("/", authenticateToken, addToCart);
router.delete("/:id", authenticateToken, removeFromCart);

export default router;
=======
const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/', authenticateToken, addToCart);
router.delete('/:id', authenticateToken, removeFromCart);

module.exports = router;
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
