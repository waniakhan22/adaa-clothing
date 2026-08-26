const express = require("express");
const Product = require("../product");
const { protect, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// GET /api/products
// Get all products
// Optional: ?category=women
// =====================================================

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    const products = await Product.find(filter).sort("-createdAt");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// =====================================================
// GET /api/products/search?q=chiffon
// Search products
// Public
// =====================================================

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    // Empty search
    if (!q || !q.trim()) {
      return res.status(200).json({
        success: true,
        count: 0,
        products: [],
      });
    }

    const searchText = q.trim();

    // Case-insensitive search
    const searchRegex = new RegExp(searchText, "i");

    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { categoryDetails: searchRegex },
      ],
    })
      .sort("-createdAt")
      .limit(6);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error.message,
    });
  }
});

// =====================================================
// GET /api/products/:id
// Get single product
// Public
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// =====================================================
// POST /api/products
// Add product
// Private/Admin
// =====================================================

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});

// =====================================================
// PUT /api/products/:id
// Update product
// Private/Admin
// =====================================================

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// =====================================================
// DELETE /api/products/:id
// Delete product
// Private/Admin
// =====================================================

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;