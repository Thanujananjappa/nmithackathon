<<<<<<< HEAD
// server/server.js
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
=======
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// Import database
const db = require('./config/database');
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9

// Load environment variables
dotenv.config();

<<<<<<< HEAD
// Setup dirname (since __dirname isn’t available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

=======
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
db.initializeDatabase();

// Routes
<<<<<<< HEAD
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchases", purchaseRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "EcoFinds API is running!" });
=======
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'EcoFinds API is running!' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
<<<<<<< HEAD
  res.status(500).json({ error: "Something went wrong!" });
=======
  res.status(500).json({ error: 'Something went wrong!' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
});

app.listen(PORT, () => {
  console.log(`🌱 EcoFinds API running on port ${PORT}`);
});

<<<<<<< HEAD
export default app;
=======
module.exports = app;
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
