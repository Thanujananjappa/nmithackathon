<<<<<<< HEAD
import db from "../config/database.js";

export const getPurchases = (req, res) => {
=======
const db = require('../config/database');

const getPurchases = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const userId = req.user.id;

  db.getDb().all(
    `SELECT pur.*, p.title, p.price, p.image, u.username as seller
     FROM purchases pur 
     JOIN products p ON pur.product_id = p.id
     JOIN users u ON p.user_id = u.id
     WHERE pur.user_id = ?
     ORDER BY pur.purchase_date DESC`,
    [userId],
    (err, purchases) => {
      if (err) {
<<<<<<< HEAD
        return res.status(500).json({ error: "Server error" });
=======
        return res.status(500).json({ error: 'Server error' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      }
      res.json(purchases);
    }
  );
};

<<<<<<< HEAD
export const checkout = (req, res) => {
=======
const checkout = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const userId = req.user.id;

  // Get cart items
  db.getDb().all(
<<<<<<< HEAD
    "SELECT * FROM cart WHERE user_id = ?",
    [userId],
    (err, cartItems) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
=======
    'SELECT * FROM cart WHERE user_id = ?',
    [userId],
    (err, cartItems) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      }

      // Begin transaction
      db.getDb().serialize(() => {
<<<<<<< HEAD
        db.getDb().run("BEGIN TRANSACTION");
=======
        db.getDb().run('BEGIN TRANSACTION');
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9

        let completed = 0;
        let hasError = false;

        cartItems.forEach((item) => {
          // Add to purchases
          db.getDb().run(
<<<<<<< HEAD
            "INSERT INTO purchases (user_id, product_id) VALUES (?, ?)",
            [userId, item.product_id],
            function (err) {
              if (err && !hasError) {
                hasError = true;
                db.getDb().run("ROLLBACK");
                return res.status(500).json({ error: "Checkout failed" });
=======
            'INSERT INTO purchases (user_id, product_id) VALUES (?, ?)',
            [userId, item.product_id],
            function(err) {
              if (err && !hasError) {
                hasError = true;
                db.getDb().run('ROLLBACK');
                return res.status(500).json({ error: 'Checkout failed' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
              }

              completed++;
              if (completed === cartItems.length && !hasError) {
                // Clear cart
                db.getDb().run(
<<<<<<< HEAD
                  "DELETE FROM cart WHERE user_id = ?",
                  [userId],
                  (err) => {
                    if (err) {
                      db.getDb().run("ROLLBACK");
                      return res.status(500).json({ error: "Checkout failed" });
                    }

                    db.getDb().run("COMMIT");
                    res.json({ message: "Checkout successful" });
=======
                  'DELETE FROM cart WHERE user_id = ?',
                  [userId],
                  (err) => {
                    if (err) {
                      db.getDb().run('ROLLBACK');
                      return res.status(500).json({ error: 'Checkout failed' });
                    }

                    db.getDb().run('COMMIT');
                    res.json({ message: 'Checkout successful' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
                  }
                );
              }
            }
          );
        });
      });
    }
  );
};
<<<<<<< HEAD
=======

module.exports = { getPurchases, checkout };
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
