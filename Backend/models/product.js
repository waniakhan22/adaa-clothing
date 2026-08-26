const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: true,
      enum: ["women", "men", "kids", "new", "sale", "fabrics", "readyToWear", "tailored", "all"],
      default: "all",
    },

    categoryDetails: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    badge: {
      type: String,
      enum: ["New", "Trending", "Popular", "Sale", ""],
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
