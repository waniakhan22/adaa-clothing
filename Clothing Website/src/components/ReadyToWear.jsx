import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { apiUrl } from '../api';
import './ReadyToWear.css';

const ReadyToWear = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [viewColumns, setViewColumns] = useState(3);
  const [products, setProducts] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Ready To Wear products from backend
  useEffect(() => {
    const fetchReadyToWearProducts = async () => {
      try {
        const response = await fetch(
          apiUrl('/products')
        );

        const data = await response.json();

        if (data.success) {
          // Sirf Ready To Wear category ke products
          const readyToWear = data.products.filter(
            (product) => product.category === 'readyToWear'
          );

          setProducts(readyToWear);
        } else {
          console.error(
            'Failed to fetch products:',
            data.message
          );

          setProducts([]);
        }
      } catch (error) {
        console.error(
          'Error fetching ready to wear products:',
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReadyToWearProducts();
  }, []);

  const toggleFilter = (filterName) => {
    setOpenFilter(
      openFilter === filterName ? null : filterName
    );
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...products];

    if (value === 'price-low') {
      sortedProducts.sort(
        (a, b) => a.price - b.price
      );
    }

    if (value === 'price-high') {
      sortedProducts.sort(
        (a, b) => b.price - a.price
      );
    }

    setProducts(sortedProducts);
  };

  const filteredProducts = products;

  return (
    <div className="ready-to-wear-page">

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <a href="/new">New In</a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <span>Ready to Wear</span>
      </nav>

      <div className="ready-to-wear-container">

        {/* ================= SIDEBAR ================= */}

        <div className="sidebar">

          <div className="sidebar-header">
            <h3>Filter By</h3>

            <button className="clear-all">
              Clear All
            </button>
          </div>

          {/* Campaign Filter */}
          <div
            className={`accordion-item ${
              openFilter === 'campaign'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('campaign')
              }
            >
              <span>Campaign</span>

              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>

            <div className="accordion-content">
              <label>
                <input type="checkbox" />
                Summer Collection
              </label>
            </div>
          </div>

          {/* Category Filter */}
          <div
            className={`accordion-item ${
              openFilter === 'category'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('category')
              }
            >
              <span>Category</span>

              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>

            <div className="accordion-content">
              <label>
                <input type="checkbox" />
                2 Piece
              </label>

              <label>
                <input type="checkbox" />
                3 Piece
              </label>
            </div>
          </div>

          {/* Size Filter */}
          <div
            className={`accordion-item ${
              openFilter === 'size'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('size')
              }
            >
              <span>Size</span>

              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>

            <div className="accordion-content">
              <label>
                <input type="checkbox" />
                2 Pc
              </label>

              <label>
                <input type="checkbox" />
                3 Pc
              </label>
            </div>
          </div>

          {/* Color Filter */}
          <div
            className={`accordion-item ${
              openFilter === 'color'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('color')
              }
            >
              <span>Color</span>

              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>

            <div className="accordion-content">
              <label>
                <input type="checkbox" />
                Multi 9
              </label>
            </div>
          </div>

          {/* Fabric Filter */}
          <div
            className={`accordion-item ${
              openFilter === 'fabric'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('fabric')
              }
            >
              <span>Fabric</span>

              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>

            <div className="accordion-content">

              <label>
                <input type="checkbox" />
                Lawn
              </label>

              <label>
                <input type="checkbox" />
                Chiffon
              </label>

              <label>
                <input type="checkbox" />
                Cotton
              </label>

              <label>
                <input type="checkbox" />
                Silk
              </label>

            </div>
          </div>

        </div>

        {/* ================= RIGHT CONTENT ================= */}

        <div className="main-content">

          <div className="top-bar">

            <div className="results-info">

              <span>
                Showing {filteredProducts.length} products
              </span>

            </div>

            <div className="top-bar-controls">

              {/* Sort Dropdown */}
              <div className="sort-dropdown">

                <select
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>
                </select>

              </div>

              {/* View Toggle */}
              <div className="view-toggle">

                <button
                  className={
                    viewColumns === 2
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setViewColumns(2)
                  }
                >
                  2
                </button>

                <button
                  className={
                    viewColumns === 3
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setViewColumns(3)
                  }
                >
                  3
                </button>

                <button
                  className={
                    viewColumns === 4
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setViewColumns(4)
                  }
                >
                  4
                </button>

              </div>

            </div>

          </div>

          {/* ================= PRODUCTS ================= */}

          {loading ? (

            <div className="products-message">
              Loading products...
            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="products-message">
              No Ready To Wear products found.
            </div>

          ) : (

            <div
              className={`product-grid columns-${viewColumns}`}
            >

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                  category="readyToWear"
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Mobile Filter Button */}
      <button
        className="mobile-filter-btn"
        onClick={() =>
          setShowMobileFilters(
            !showMobileFilters
          )
        }
      >
        Filters
      </button>

    </div>
  );
};

export default ReadyToWear;