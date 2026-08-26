import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getWishlist } from "../wishlist";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(getWishlist);

  useEffect(() => {
    const syncWishlist = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("wishlistchange", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlistchange", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  return (
    <main className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p>Save pieces you love by selecting the heart on any product.</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;