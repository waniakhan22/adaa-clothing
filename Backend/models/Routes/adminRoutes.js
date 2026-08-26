const express = require("express");
const Product = require("../product");
const User = require("../user");
const Order = require("../order");
const Cart = require("../cart");
const { protect, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

// GET /api/admin/carts
// Admin only
router.get("/carts", protect, adminOnly, async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user", "name email")
      .populate("items.product", "name image price")
      .sort("-updatedAt");

    res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error("Carts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load carts",
    });
  }
});

// GET /api/admin/dashboard
// Admin only
router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    // Total products
    const totalProducts = await Product.countDocuments();

    // Total registered users (admins excluded)
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    // Total orders
    const totalOrders = await Order.countDocuments();
    const totalCarts = await Cart.countDocuments({ "items.0": { $exists: true } });

    // Total revenue
    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Low stock products
    const lowStockProducts = await Product.find({
      stock: { $lte: 5 },
    })
      .select("name stock price image")
      .sort({ stock: 1 })
      .limit(5);

    // Recent orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort("-createdAt")
      .limit(5);

    // Order status counts
    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    const processingOrders = await Order.countDocuments({
      status: "processing",
    });

    const shippedOrders = await Order.countDocuments({
      status: "shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "cancelled",
    });

    res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalCarts,
        totalRevenue,
      },

      orderStatus: {
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },

      lowStockProducts,
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
});

module.exports = router;