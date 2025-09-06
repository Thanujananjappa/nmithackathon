import db from "../config/database.js";

export const getProducts = (req, res) => {
  const { search, category } = req.query;
  let query = `
    SELECT p.*, u.username 
    FROM products p 
    JOIN users u ON p.user_id = u.id
  `;
  const params = [];

  if (search || category) {
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
    }
    res.json(products);
  });
};

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
      }

      res.json(product);
    }
  );
};

export const createProduct = (req, res) => {
  const { title, description, category, price, image } = req.body;
  const userId = req.user.id;

  if (!title || !category || !price) {
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
      });
    }
  );
};

export const updateProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const { title, description, category, price, image } = req.body;

  db.getDb().get(
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
        }
      );
    }
  );
};

export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  db.getDb().run(
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
