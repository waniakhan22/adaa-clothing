require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

// Import routes
const adminRoutes = require("./models/Routes/adminRoutes");
const productRoutes = require("./models/Routes/productRoutes");
const authRoutes = require("./models/Routes/authRoutes");
const userRoutes = require("./models/Routes/userRoutes");
const cartRoutes = require("./models/Routes/cartRoutes");
const orderRoutes = require("./models/Routes/orderRoutes");
const newsletterRoutes = require("./models/Routes/newsletterRoutes");

const app = express();

const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Clothing Website Backend API is running!",
    endpoints: {
      products: "/api/products",
      auth: "/api/auth",
      users: "/api/users",
      cart: "/api/cart",
      orders: "/api/orders",
      newsletter: "/api/newsletter",
    },
  });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ success: false, message: "API route not found" });
  }
  next();
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ success: false, message: "Internal server error", error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});
