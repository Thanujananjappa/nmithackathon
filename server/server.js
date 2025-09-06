import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";

// Import database
import db from "./config/database.js";

// Load env
dotenv.config();

// Setup dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files from server/uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Init DB
db.initializeDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchases", purchaseRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "EcoFinds API is running!" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🌱 EcoFinds API running on port ${PORT}`);
});

export default app;
