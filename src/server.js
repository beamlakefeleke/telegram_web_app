const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000; // Change this to your desired port

// Middleware to parse JSON requests
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
