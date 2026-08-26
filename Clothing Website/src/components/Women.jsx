import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Newsletter from './Newsletter';
import './Women.css';

const Women = () => {
  const [womenProducts, setWomenProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerImg =
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw5cb27db4/images/homepage/0.0-eid-sale-desktop-banner-1920x700eidsale.jpg";

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/products'
        );

        const data = await response.json();

        if (data.success) {
          // Sirf women category ke products
          const women = data.products.filter(
            (product) => product.category === 'women'
          );

          setWomenProducts(women);
        } else {
          console.error(
            'Failed to fetch products:',
            data.message
          );
          setWomenProducts([]);
        }
      } catch (error) {
        console.error(
          'Error fetching women products:',
          error
        );
        setWomenProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <div className="category-page-wrapper">

      {/* Banner */}
      <div
        className="category-banner"
        style={{
          backgroundImage: `url(${bannerImg})`,
          height: '80vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div
          className="banner-overlay"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background:
              'linear-gradient(transparent, rgba(0,0,0,0.3))',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '3rem' }}>
            
          </h1>
        </div>
      </div>

      {/* Products */}
      <section className="women-products-section">
        <div className="container">

          <h2 className="section-title">
            Featured Collection
          </h2>

          {loading ? (
            <div className="products-message">
              Loading products...
            </div>
          ) : womenProducts.length === 0 ? (
            <div className="products-message">
              No women products found.
            </div>
          ) : (
            <div className="products-grid">
              {womenProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  category="women"
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

export default Women;