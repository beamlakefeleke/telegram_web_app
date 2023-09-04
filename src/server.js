const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors"); // Add CORS middleware to handle cross-origin requests

const app = express();
const port = 3000; // Change this to your desired port

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Connection Pool
const db = mysql.createPool({
  host: "localhost",
  user: "your_db_user",
  password: "your_db_password",
  database: "mydatabase", // Change to your database name
});

// Route to handle vendor registration
app.post("/registerVendor", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO vendors (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering vendor." });
    } else {
      console.log("Vendor registered successfully!");
      res.status(200).json({ message: "Vendor registered successfully." });
    }
  });
});

// ... Add more routes for handling product-related requests here
app.post("/addProduct", (req, res) => {
  const { name, price, description, image } = req.body;

  // Insert the product into the database
  const sql = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
  const values = [name, price, description, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding the product to the database." });
    } else {
      console.log("Product added to the database.");
      res.status(200).json({ message: "Product added to the database successfully." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
