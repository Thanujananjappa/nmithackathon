<<<<<<< HEAD
import express from "express";
import { getPurchases, checkout } from "../controllers/purchaseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getPurchases);
router.post("/", authenticateToken, checkout);

export default router;
=======
const express = require('express');
const { getPurchases, checkout } = require('../controllers/purchaseController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getPurchases);
router.post('/', authenticateToken, checkout);

module.exports = router;
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
