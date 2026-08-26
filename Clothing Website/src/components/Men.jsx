import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Newsletter from "./Newsletter";
import "./Men.css";

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerImg =
    "https://diners.com.pk/cdn/shop/files/Polo-Web-Banner4.jpg_1_c0d180be-19fb-43b2-ac61-2aadd5126397_1600x.jpg?v=1771665089";

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/products"
        );

        const data = await response.json();

        if (data.success) {
          // Sirf men category ke products
          const men = data.products.filter(
            (product) => product.category === "men"
          );

          setMenProducts(men);
        } else {
          console.error(
            "Failed to fetch products:",
            data.message
          );

          setMenProducts([]);
        }
      } catch (error) {
        console.error(
          "Error fetching men products:",
          error
        );

        setMenProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
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
      <section className="men-products-section">
        <div className="container">

          <h2 className="section-title">
            Featured Collection
          </h2>

          {loading ? (
            <div className="products-message">
              Loading products...
            </div>
          ) : menProducts.length === 0 ? (
            <div className="products-message">
              No men products found.
            </div>
          ) : (
            <div className="products-grid">
              {menProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  category="men"
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

export default Men;