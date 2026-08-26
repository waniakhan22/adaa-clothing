import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import {
  isInWishlist,
  toggleWishlist,
} from "../wishlist";
import { apiUrl } from "../api";

const ProductCard = ({ product, category = "all" }) => {
  const [liked, setLiked] = useState(() => isInWishlist(product));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncWishlist = () => {
      setLiked(isInWishlist(product));
    };

    window.addEventListener("wishlistchange", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlistchange", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, [product]);

  const oldPrice =
    product.oldPrice || Math.floor(product.price * 1.5);

  const discount = Math.floor(
    ((oldPrice - product.price) / oldPrice) * 100
  );

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to add products to cart.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        apiUrl("/cart/add"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to add product to cart");
        return;
      }

      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`product-card ${category}`}
      data-category={category}
    >
      <div className="product-image-wrapper">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {/* Wishlist */}
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={liked ? "#ff4081" : "none"}
            stroke="#666"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Discount */}
        {discount > 0 && (
          <div className="discount-badge">
            {discount}% OFF
          </div>
        )}

        {/* Basket / Add to Cart */}
        <button
          className="add-btn"
          onClick={handleAddToCart}
          disabled={loading}
          aria-label="Add to basket"
          title="Add to basket"
        >
          {loading ? (
            <span className="basket-loading">...</span>
          ) : (
            <svg
              className="icon-cart"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          )}
        </button>

      </div>

      {/* Product Information */}
      <div className="product-info">

        <div className="product-category">
          {product.categoryDetails || "Printed | Cotton"}
        </div>

        <h3 className="product-title">
          {product.name}
        </h3>

        {/* Price */}
        <div className="price-section">
          {product.oldPrice > product.price && (
            <span className="old-price">
              PKR {oldPrice.toLocaleString()}
            </span>
          )}

          <span className="new-price">
            PKR {product.price.toLocaleString()}
          </span>
        </div>

        <div className="product-badge">
          Exclusively Online
        </div>

      </div>
    </div>
  );
};

export default ProductCard;