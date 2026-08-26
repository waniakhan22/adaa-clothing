import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Newsletter from "./Newsletter";
import { apiUrl } from "../api";
import "./Kids.css";

const Kids = () => {
  const [kidsProducts, setKidsProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerImg =
    "https://shomiofficial.com/cdn/shop/files/Shanzey_SummerCollection_Category_Banner_7406230e-8719-4ea6-b979-277342d0a40b.jpg?v=1772521142";

  useEffect(() => {
    const fetchKidsProducts = async () => {
      try {
        const response = await fetch(
          apiUrl("/products")
        );

        const data = await response.json();

        if (data.success) {
          // Sirf Kids category ke products
          const kids = data.products.filter(
            (product) => product.category === "kids"
          );

          setKidsProducts(kids);
        } else {
          console.error(
            "Failed to fetch products:",
            data.message
          );

          setKidsProducts([]);
        }
      } catch (error) {
        console.error(
          "Error fetching kids products:",
          error
        );

        setKidsProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsProducts();
  }, []);

  return (
    <div className="category-page-wrapper">

      {/* Banner */}
      <div
        className="category-banner"
        style={{
          backgroundImage: `url(${bannerImg})`,
          height: "80vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          className="banner-overlay"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(transparent, rgba(0,0,0,0.3))",
            color: "white",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem" }}>
            
          </h1>
        </div>
      </div>

      {/* Products */}
      <section className="kids-products-section">
        <div className="container">

          <h2 className="section-title">
            Featured Collection
          </h2>

          {loading ? (
            <div className="products-message">
              Loading products...
            </div>
          ) : kidsProducts.length === 0 ? (
            <div className="products-message">
              No kids products found.
            </div>
          ) : (
            <div className="products-grid">
              {kidsProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  category="kids"
                />
              ))}
            </div>
          )}

        </div>
      </section>

      <Newsletter />

    </div>
  );
};

export default Kids;