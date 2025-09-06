<<<<<<< HEAD
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Database {
  constructor() {
    this.db = new sqlite3.Database(
      path.join(__dirname, "../ecofinds.db"),
      (err) => {
        if (err) {
          console.error("❌ Error connecting to database:", err.message);
        } else {
          console.log("📦 Connected to SQLite database");
        }
      }
    );
  }

  initializeDatabase() {
    // Users table
=======
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../ecofinds.db'), (err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('📦 Connected to SQLite database');
      }
    });
  }

  initializeDatabase() {
    // Create Users table
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

<<<<<<< HEAD
    // Products table
=======
    // Create Products table
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
    this.db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image TEXT DEFAULT 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

<<<<<<< HEAD
    // Cart table
=======
    // Create Cart table
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
    this.db.run(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

<<<<<<< HEAD
    // Purchases table
=======
    // Create Purchases table
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
    this.db.run(`
      CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

<<<<<<< HEAD
    console.log("✅ Database tables initialized");
=======
    console.log('✅ Database tables initialized');
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  }

  getDb() {
    return this.db;
  }
}

<<<<<<< HEAD
// 👇 Export as default so you can `import db from "../config/database.js"`
const database = new Database();
export default database;
=======
module.exports = new Database();
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
