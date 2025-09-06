import db from "../config/database.js";

// ✅ Get all products
export const getProducts = (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  let query = `
    SELECT p.*, u.username 
    FROM products p 
    JOIN users u ON p.user_id = u.id
  `;
  const params = [];
  const conditions = [];

  if (search) {
    conditions.push("(p.title LIKE ? OR p.description LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category && category !== "All") {
    conditions.push("p.category = ?");
    params.push(category);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

  db.getDb().all(query, params, (err, products) => {
    if (err) return res.status(500).json({ error: "Server error" });
    res.json(products);
  });
};

// ✅ Get single product
export const getProductById = (req, res) => {
  const productId = req.params.id;
  db.getDb().get(
    "SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id WHERE p.id = ?",
    [productId],
    (err, product) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    }
  );
};

// ✅ Create product (save image with absolute URL)
export const createProduct = (req, res) => {
  console.log("REQ FILE:", req.file); // ✅ Debug log
  const { title, description, category, price } = req.body;
  const userId = req.user.id;

  if (!title || !category || !price) {
    return res
      .status(400)
      .json({ error: "Title, category, and price are required" });
  }

  const productImage = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  db.getDb().run(
    "INSERT INTO products (user_id, title, description, category, price, image) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, title, description || "", category, price, productImage],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to create product" });
      res.status(201).json({
        message: "Product created successfully",
        productId: this.lastID,
        image: productImage,
      });
    }
  );
};

// ✅ Update product (keep old image if not replaced)
export const updateProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const { title, description, category, price } = req.body;

  db.getDb().get(
    "SELECT * FROM products WHERE id = ? AND user_id = ?",
    [productId, userId],
    (err, product) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!product)
        return res
          .status(404)
          .json({ error: "Product not found or unauthorized" });

      // ✅ Full URL if new image uploaded
      const productImage = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : product.image;

      db.getDb().run(
        "UPDATE products SET title = ?, description = ?, category = ?, price = ?, image = ? WHERE id = ?",
        [title, description, category, price, productImage, productId],
        (err) => {
          if (err)
            return res.status(500).json({ error: "Failed to update product" });
          res.json({ message: "Product updated successfully" });
        }
      );
    }
  );
};

// ✅ Delete product
export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  db.getDb().run(
    "DELETE FROM products WHERE id = ? AND user_id = ?",
    [productId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: "Server error" });
      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: "Product not found or unauthorized" });
      }
      res.json({ message: "Product deleted successfully" });
    }
  );
};
