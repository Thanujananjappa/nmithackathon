<<<<<<< HEAD
import express from "express";
import {
=======
const express = require('express');
const {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
<<<<<<< HEAD
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, createProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
=======
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
