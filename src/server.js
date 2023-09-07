const express = require("express");

const bodyParser = require("body-parser");
//const mysql = require("mysql2");
const fs = require("fs"); 
const cors = require("cors"); // Add CORS middleware to handle cross-origin requests

const app = express();
const port =8081; // Change this to your desired port

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Create a pool for database connections
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'elev-8',
// });

// Test the database connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error('Database connection error:', err);
//   } else {
//     console.log('Database connected successfully!');
//     // Release the connection when done with it
//     connection.release();
//   }
// });

// module.exports = db;


app.get("/", (req, res) => {
  res.send("Hello, this is your ggggg!");
});

const jsonData = fs.readFileSync("vendor.json");
const data = JSON.parse(jsonData);

app.get("/api/data", (req, res) => {
  res.json(data);
});

// const jsonDatap = fs.readFileSync("product.json");
// const dataproduct = JSON.parse(jsonDatap);

// app.get("/api/data", (req, res) => {
//   res.json(dataproduct);
// });

// Route to handle vendor registration


// ... Add more routes for handling product-related requests here

// app.post("/your-telegram-webhook", (req, res) => {
//   const { message } = req.body;

  // Handle different commands here based on message.text
  // const chatId = message.chat.id;
//   const text = message.text;
//   if (text ==="/start"){

//   }else if (text === "/register") {
//     // Start the registration process
//     // Prompt the user for name and email
//     // Store the chatId and user data in your database
//     app.post("/registerVendor", (req, res) => {
//   const { name, email, phone, telegramid, status,postlimit, datecreated} = req.body;

//   const sql = "INSERT INTO vendors (name, email, phone, telegramid,status, postlimit, datecreated) VALUES (?, ?, ?,?, ?, ?,?)";

//   db.query(sql, [name, email, phone,telegramid,status, postlimit, datecreated], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error registering vendor." });
//     } else {
//       console.log("Vendor registered successfully!");
//       res.status(200).json({ message: "Vendor registered successfully." });
//     }
//   });
// });
//   } else if (text === "/addproduct") {
//     // Handle adding a product
//     // Prompt the user for product details
//     // Store the product in your database
//     app.post("/addProduct", (req, res) => {
//   const { name, price, description, image } = req.body;

//   // Insert the product into the database
//   const sql = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
//   const values = [name, price, description, image];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error adding the product to the database." });
//     } else {
//       console.log("Product added to the database.");
//       res.status(200).json({ message: "Product added to the database successfully." });
//     }
//   });
// });
//   } else if (text === "/listproducts") {
//     // Retrieve and list products from your database
//     // Send the list as a message to the user
//   }

//   res.status(200).end();
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
