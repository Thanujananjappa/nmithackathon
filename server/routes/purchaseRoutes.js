import express from "express";
import { getPurchases, checkout } from "../controllers/purchaseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getPurchases);
router.post("/", authenticateToken, checkout);

export default router;
