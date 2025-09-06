// server/query.js
import db from "./config/database.js";
import "console.table";

console.log("📦 Connected to SQLite database");

// ✅ Ensure tables exist before querying
db.initializeDatabase();

setTimeout(() => {
  db.getDb().all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("❌ Error running query:", err.message);
      process.exit(1);
    } else {
      console.table(rows);
      process.exit(0);
    }
  });
}, 500); // small delay so CREATE TABLE runs
