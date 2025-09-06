const db = require('../config/database');

const getPurchases = (req, res) => {
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
        return res.status(500).json({ error: 'Server error' });
      }
      res.json(purchases);
    }
  );
};

const checkout = (req, res) => {
  const userId = req.user.id;

  // Get cart items
  db.getDb().all(
    'SELECT * FROM cart WHERE user_id = ?',
    [userId],
    (err, cartItems) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // Begin transaction
      db.getDb().serialize(() => {
        db.getDb().run('BEGIN TRANSACTION');

        let completed = 0;
        let hasError = false;

        cartItems.forEach((item) => {
          // Add to purchases
          db.getDb().run(
            'INSERT INTO purchases (user_id, product_id) VALUES (?, ?)',
            [userId, item.product_id],
            function(err) {
              if (err && !hasError) {
                hasError = true;
                db.getDb().run('ROLLBACK');
                return res.status(500).json({ error: 'Checkout failed' });
              }

              completed++;
              if (completed === cartItems.length && !hasError) {
                // Clear cart
                db.getDb().run(
                  'DELETE FROM cart WHERE user_id = ?',
                  [userId],
                  (err) => {
                    if (err) {
                      db.getDb().run('ROLLBACK');
                      return res.status(500).json({ error: 'Checkout failed' });
                    }

                    db.getDb().run('COMMIT');
                    res.json({ message: 'Checkout successful' });
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

module.exports = { getPurchases, checkout };