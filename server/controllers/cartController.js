<<<<<<< HEAD
import db from "../config/database.js";

export const getCart = (req, res) => {
=======
const db = require('../config/database');

const getCart = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const userId = req.user.id;

  db.getDb().all(
    `SELECT c.id as cart_id, p.*, u.username 
     FROM cart c 
     JOIN products p ON c.product_id = p.id 
     JOIN users u ON p.user_id = u.id
     WHERE c.user_id = ?`,
    [userId],
    (err, cartItems) => {
      if (err) {
<<<<<<< HEAD
        return res.status(500).json({ error: "Server error" });
=======
        return res.status(500).json({ error: 'Server error' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      }
      res.json(cartItems);
    }
  );
};

<<<<<<< HEAD
export const addToCart = (req, res) => {
=======
const addToCart = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
<<<<<<< HEAD
    return res.status(400).json({ error: "Product ID is required" });
  }

  db.getDb().get("SELECT * FROM products WHERE id = ?", [productId], (err, product) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.user_id === userId) {
      return res.status(400).json({ error: "Cannot add your own product to cart" });
    }

    db.getDb().get(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId],
      (err, existing) => {
        if (err) {
          return res.status(500).json({ error: "Server error" });
        }

        if (existing) {
          return res.status(400).json({ error: "Product already in cart" });
        }

        db.getDb().run(
          "INSERT INTO cart (user_id, product_id) VALUES (?, ?)",
          [userId, productId],
          function (err) {
            if (err) {
              return res.status(500).json({ error: "Failed to add to cart" });
            }
            res.status(201).json({ message: "Product added to cart" });
          }
        );
      }
    );
  });
};

export const removeFromCart = (req, res) => {
=======
    return res.status(400).json({ error: 'Product ID is required' });
  }

  // Check if product exists and is not user's own product
  db.getDb().get(
    'SELECT * FROM products WHERE id = ?',
    [productId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.user_id === userId) {
        return res.status(400).json({ error: 'Cannot add your own product to cart' });
      }

      // Check if already in cart
      db.getDb().get(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (err, existing) => {
          if (err) {
            return res.status(500).json({ error: 'Server error' });
          }

          if (existing) {
            return res.status(400).json({ error: 'Product already in cart' });
          }

          // Add to cart
          db.getDb().run(
            'INSERT INTO cart (user_id, product_id) VALUES (?, ?)',
            [userId, productId],
            function(err) {
              if (err) {
                return res.status(500).json({ error: 'Failed to add to cart' });
              }
              res.status(201).json({ message: 'Product added to cart' });
            }
          );
        }
      );
    }
  );
};

const removeFromCart = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const cartId = req.params.id;
  const userId = req.user.id;

  db.getDb().run(
<<<<<<< HEAD
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [cartId, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ message: "Item removed from cart" });
    }
  );
};
=======
    'DELETE FROM cart WHERE id = ? AND user_id = ?',
    [cartId, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      res.json({ message: 'Item removed from cart' });
    }
  );
};

module.exports = { getCart, addToCart, removeFromCart };
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
