const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = 10000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection URI
const uri = "mongodb+srv://locphan90:IS4fN1pS6ZUdfWXl@cluster0.xcrw5.mongodb.net/"; // Replace with your MongoDB URI
const dbName = "TestNhapLieu";
let db;

// Connect to MongoDB
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB!");
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Routes

// 1. Get test item
app.get("/users", async (req, res) => {
  try {
    const items = await db.collection("ThongTinUser").find().toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// 2. Get all customer
app.get("/customer", async (req, res) => {
  try {
    const items = await db.collection("Customer").find().toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
