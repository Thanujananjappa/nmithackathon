<<<<<<< HEAD
import db from "../config/database.js";

export const getProducts = (req, res) => {
=======
const db = require('../config/database');

const getProducts = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const { search, category } = req.query;
  let query = `
    SELECT p.*, u.username 
    FROM products p 
    JOIN users u ON p.user_id = u.id
  `;
  const params = [];

  if (search || category) {
<<<<<<< HEAD
    query += " WHERE ";
    const conditions = [];

    if (search) {
      conditions.push("(p.title LIKE ? OR p.description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category && category !== "All") {
      conditions.push("p.category = ?");
      params.push(category);
    }

    query += conditions.join(" AND ");
  }

  query += " ORDER BY p.created_at DESC";

  db.getDb().all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
=======
    query += ' WHERE ';
    const conditions = [];
    
    if (search) {
      conditions.push('(p.title LIKE ? OR p.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (category && category !== 'All') {
      conditions.push('p.category = ?');
      params.push(category);
    }
    
    query += conditions.join(' AND ');
  }

  query += ' ORDER BY p.created_at DESC';

  db.getDb().all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
    }
    res.json(products);
  });
};

<<<<<<< HEAD
export const getProductById = (req, res) => {
  const productId = req.params.id;

  db.getDb().get(
    "SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id WHERE p.id = ?",
    [productId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
=======
const getProductById = (req, res) => {
  const productId = req.params.id;

  db.getDb().get(
    'SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
    [productId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      }

      res.json(product);
    }
  );
};

<<<<<<< HEAD
export const createProduct = (req, res) => {
=======
const createProduct = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const { title, description, category, price, image } = req.body;
  const userId = req.user.id;

  if (!title || !category || !price) {
<<<<<<< HEAD
    return res.status(400).json({ error: "Title, category, and price are required" });
  }

  const productImage =
    image || "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg";

  db.getDb().run(
    "INSERT INTO products (user_id, title, description, category, price, image) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, title, description || "", category, price, productImage],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to create product" });
      }

      res.status(201).json({
        message: "Product created successfully",
        productId: this.lastID,
=======
    return res.status(400).json({ error: 'Title, category, and price are required' });
  }

  const productImage = image || 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg';

  db.getDb().run(
    'INSERT INTO products (user_id, title, description, category, price, image) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, title, description || '', category, price, productImage],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create product' });
      }

      res.status(201).json({
        message: 'Product created successfully',
        productId: this.lastID
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      });
    }
  );
};

<<<<<<< HEAD
export const updateProduct = (req, res) => {
=======
const updateProduct = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const productId = req.params.id;
  const userId = req.user.id;
  const { title, description, category, price, image } = req.body;

  db.getDb().get(
<<<<<<< HEAD
    "SELECT * FROM products WHERE id = ? AND user_id = ?",
    [productId, userId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (!product) {
        return res
          .status(404)
          .json({ error: "Product not found or unauthorized" });
      }

      db.getDb().run(
        "UPDATE products SET title = ?, description = ?, category = ?, price = ?, image = ? WHERE id = ?",
        [title, description, category, price, image || product.image, productId],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to update product" });
          }
          res.json({ message: "Product updated successfully" });
=======
    'SELECT * FROM products WHERE id = ? AND user_id = ?',
    [productId, userId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!product) {
        return res.status(404).json({ error: 'Product not found or unauthorized' });
      }

      db.getDb().run(
        'UPDATE products SET title = ?, description = ?, category = ?, price = ?, image = ? WHERE id = ?',
        [title, description, category, price, image || product.image, productId],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to update product' });
          }
          res.json({ message: 'Product updated successfully' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
        }
      );
    }
  );
};

<<<<<<< HEAD
export const deleteProduct = (req, res) => {
=======
const deleteProduct = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const productId = req.params.id;
  const userId = req.user.id;

  db.getDb().run(
<<<<<<< HEAD
    "DELETE FROM products WHERE id = ? AND user_id = ?",
    [productId, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: "Product not found or unauthorized" });
      }

      res.json({ message: "Product deleted successfully" });
    }
  );
};
=======
    'DELETE FROM products WHERE id = ? AND user_id = ?',
    [productId, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Product not found or unauthorized' });
      }

      res.json({ message: 'Product deleted successfully' });
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
