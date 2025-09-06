<<<<<<< HEAD
import db from "../config/database.js";

export const getProfile = (req, res) => {
  const userId = req.user.id;

  db.getDb().get(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
=======
const db = require('../config/database');

const getProfile = (req, res) => {
  const userId = req.user.id;

  db.getDb().get(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
      }

      res.json(user);
    }
  );
};

<<<<<<< HEAD
export const updateProfile = (req, res) => {
=======
const updateProfile = (req, res) => {
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  const userId = req.user.id;
  const { username, email } = req.body;

  if (!username || !email) {
<<<<<<< HEAD
    return res.status(400).json({ error: "Username and email are required" });
  }

  db.getDb().run(
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
    [username, email, userId],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res
            .status(400)
            .json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Failed to update profile" });
      }

      res.json({ message: "Profile updated successfully" });
    }
  );
};
=======
    return res.status(400).json({ error: 'Username and email are required' });
  }

  db.getDb().run(
    'UPDATE users SET username = ?, email = ? WHERE id = ?',
    [username, email, userId],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Failed to update profile' });
      }

      res.json({ message: 'Profile updated successfully' });
    }
  );
};

module.exports = { getProfile, updateProfile };
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
