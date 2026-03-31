const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce_dashboard";

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Root route ---
app.get("/", (req, res) => {
  res.send("E-Commerce Sales Dashboard API is running.");
});

// --- Health check ---
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Auth routes ---
app.use("/api/auth", authRoutes);

// --- API: Overview summary ---
app.get("/api/overview", (req, res) => {
  res.json({
    totalOrders: 320,
    totalUnits: 1240,
    totalRevenue: 580000,
    totalProfit: 145000,
  });
});

// --- API: Monthly sales ---
app.get("/api/monthly-sales", (req, res) => {
  res.json([
    { month: "Jan", revenue: 35000 },
    { month: "Feb", revenue: 42000 },
    { month: "Mar", revenue: 50000 },
    { month: "Apr", revenue: 47000 },
    { month: "May", revenue: 52000 },
    { month: "Jun", revenue: 61000 },
    { month: "Jul", revenue: 58000 },
    { month: "Aug", revenue: 64000 },
    { month: "Sep", revenue: 60000 },
    { month: "Oct", revenue: 67000 },
    { month: "Nov", revenue: 71000 },
    { month: "Dec", revenue: 75000 },
  ]);
});

// --- API: Customer demographics ---
app.get("/api/demographics", (req, res) => {
  res.json([
    { label: "North", value: 120 },
    { label: "South", value: 90 },
    { label: "East", value: 70 },
    { label: "West", value: 40 },
  ]);
});

// --- API: Top-selling products ---
app.get("/api/top-products", (req, res) => {
  res.json([
    { name: "Wireless Earbuds", unitsSold: 240, revenue: 120000 },
    { name: "Smartphone Case", unitsSold: 310, revenue: 93000 },
    { name: "Bluetooth Speaker", unitsSold: 180, revenue: 86000 },
    { name: "Laptop Stand", unitsSold: 140, revenue: 64000 },
    { name: "Smartwatch Strap", unitsSold: 190, revenue: 57000 },
  ]);
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
