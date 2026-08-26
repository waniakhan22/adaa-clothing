import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { apiUrl } from '../api';
import './Fabrics.css';

const Fabrics = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [viewColumns, setViewColumns] = useState(3);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // =========================
  // FETCH FABRICS PRODUCTS
  // =========================
  useEffect(() => {
    const fetchFabricsProducts = async () => {
      try {
        const response = await fetch(
          apiUrl('/products')
        );

        const data = await response.json();

        if (data.success) {
          // Sirf fabrics category ke products
          const fabrics = data.products.filter(
            (product) => product.category === 'fabrics'
          );

          setProducts(fabrics);
        } else {
          console.error(
            'Failed to fetch products:',
            data.message
          );

          setProducts([]);
        }
      } catch (error) {
        console.error(
          'Error fetching fabrics products:',
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFabricsProducts();
  }, []);

  // =========================
  // FILTER ACCORDION
  // =========================
  const toggleFilter = (filterName) => {
    setOpenFilter(
      openFilter === filterName ? null : filterName
    );
  };

  // =========================
  // SORT
  // =========================
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // =========================
  // SORT PRODUCTS
  // =========================
  const filteredProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low') {
      return a.price - b.price;
    }

    if (sortOption === 'price-high') {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div className="fabrics-page">

      {/* =========================
          BREADCRUMB
      ========================= */}
      <nav className="breadcrumb">
        <a href="/">Home</a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <a href="/new">New In</a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <span>Fabrics</span>
      </nav>


      <div className="fabrics-container">

        {/* =========================
            LEFT SIDEBAR
        ========================= */}
        <div className="sidebar">

          <div className="sidebar-header">
            <h3>Filter By</h3>

            <button
              className="clear-all"
              onClick={() => setOpenFilter(null)}
            >
              Clear All
            </button>
          </div>


          {/* Campaign */}
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


          {/* Category */}
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


          {/* Size */}
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


          {/* Fabric Category */}
          <div
            className={`accordion-item ${
              openFilter === 'fabricCategory'
                ? 'open'
                : ''
            }`}
          >
            <div
              className="accordion-header"
              onClick={() =>
                toggleFilter('fabricCategory')
              }
            >
              <span>Fabric Category</span>

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
                Cotton
              </label>

              <label>
                <input type="checkbox" />
                Silk
              </label>

            </div>
          </div>


          {/* Color */}
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


          {/* Fabric */}
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


        {/* =========================
            RIGHT CONTENT
        ========================= */}
        <div className="main-content">

          {/* Top Bar */}
          <div className="top-bar">

            <div className="results-info">

              <span>
                {loading
                  ? 'Loading products...'
                  : `Showing 1-${filteredProducts.length} of ${filteredProducts.length} products`}
              </span>

            </div>


            <div className="top-bar-controls">

              {/* Sort */}
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


          {/* =========================
              PRODUCT GRID
          ========================= */}
          <div
            className={`product-grid columns-${viewColumns}`}
          >

            {loading ? (

              <div className="products-message">
                Loading products...
              </div>

            ) : filteredProducts.length === 0 ? (

              <div className="products-message">
                No fabrics products found.
              </div>

            ) : (

              filteredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                  category="fabrics"
                />

              ))

            )}

          </div>

        </div>

      </div>


      {/* =========================
          MOBILE FILTER BUTTON
      ========================= */}
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

export default Fabrics;