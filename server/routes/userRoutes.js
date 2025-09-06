// server/routes/userRoutes.js
import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put("/me", authenticateToken, updateProfile);

export default router;
