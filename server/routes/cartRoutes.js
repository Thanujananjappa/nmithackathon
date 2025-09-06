import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getCart);
router.post("/", authenticateToken, addToCart);
router.delete("/:id", authenticateToken, removeFromCart);

export default router;
