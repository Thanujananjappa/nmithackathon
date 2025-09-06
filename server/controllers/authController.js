<<<<<<< HEAD
import bcrypt from "bcryptjs";
import db from "../config/database.js";
import { generateToken } from "../middleware/authMiddleware.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
=======
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { generateToken } = require('../middleware/authMiddleware');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  }

  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    db.getDb().run(
<<<<<<< HEAD
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE constraint failed")) {
            return res
              .status(400)
              .json({ error: "Username or email already exists" });
          }
          return res.status(500).json({ error: "Failed to create user" });
=======
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username or email already exists' });
          }
          return res.status(500).json({ error: 'Failed to create user' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
        }

        const newUser = { id: this.lastID, username, email };
        const token = generateToken(newUser);

        res.status(201).json({
<<<<<<< HEAD
          message: "User created successfully",
          user: newUser,
          token,
=======
          message: 'User created successfully',
          user: newUser,
          token
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
        });
      }
    );
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
=======
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
  }

  try {
    db.getDb().get(
<<<<<<< HEAD
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Server error" });
        }

        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
=======
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Server error' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
<<<<<<< HEAD
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const userInfo = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        const token = generateToken(userInfo);

        res.json({
          message: "Login successful",
          user: userInfo,
          token,
=======
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userInfo = { id: user.id, username: user.username, email: user.email };
        const token = generateToken(userInfo);

        res.json({
          message: 'Login successful',
          user: userInfo,
          token
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
        });
      }
    );
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ error: "Server error" });
  }
};
=======
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
