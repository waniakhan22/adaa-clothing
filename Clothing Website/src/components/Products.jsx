
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Products.css';

const Products = ({ category = 'all' }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');

        const data = await response.json();
if (data.success) {
  console.log("PRODUCTS FROM API:", data.products);
  setAllProducts(data.products);
} else {
          console.error('Failed to fetch products:', data.message);
          setAllProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    category === 'all'
      ? allProducts
      : allProducts.filter(
          (product) => product.category === category
        );

  if (loading) {
    return <div className="products-message">Loading products...</div>;
  }

  return (
    <div className="products-container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))
      ) : (
        <div className="products-message">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default Products;

