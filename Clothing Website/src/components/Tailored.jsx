import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Tailored.css';

// Fallback products agar backend available na ho
const tailoredProducts = [
  {
    id: 1,
    name: 'Custom Sherwani',
    price: 28500,
    oldPrice: 35000,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4a5fe5d6/images/hi-res/t-a11-26-107fg1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Sherwani | Custom',
    category: 'tailored',
  },
  {
    id: 2,
    name: 'Tailored Kurta Pajama',
    price: 12500,
    oldPrice: 16500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7118ba25/images/hi-res/t-a11-26-107ff1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Kurta Pajama | Silk',
    category: 'tailored',
  },
  {
    id: 3,
    name: 'Bespoke Waistcoat',
    price: 8500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw91398346/images/hi-res/t-a11-26-107fd1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Waistcoat | Luxury',
    category: 'tailored',
  },
  {
    id: 4,
    name: 'Custom Pathani Suit',
    price: 14800,
    oldPrice: 18500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw106959a1/images/hi-res/t-a11-26-107fc1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Pathani | Cotton',
    category: 'tailored',
  },
  {
    id: 5,
    name: 'Tailored Nehru Jacket',
    price: 11200,
    oldPrice: 14500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw984a1cf2/images/hi-res/t-a11-26-101fi2_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Nehru Jacket | Wool',
    category: 'tailored',
  },
  {
    id: 6,
    name: 'Bespoke Sherwani Set',
    price: 42500,
    oldPrice: 52000,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw562a2fa2/images/hi-res/1-26-247-b-e1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Sherwani Set | Premium',
    category: 'tailored',
  },
  {
    id: 7,
    name: 'Custom Kurta Shalwar',
    price: 9800,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4a5fe5d6/images/hi-res/t-a11-26-107fg1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Kurta Shalwar | Linen',
    category: 'tailored',
  },
  {
    id: 8,
    name: 'Luxury Waistcoat',
    price: 16500,
    oldPrice: 20500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7118ba25/images/hi-res/t-a11-26-107ff1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Waistcoat | Velvet',
    category: 'tailored',
  },
  {
    id: 9,
    name: 'Tailored Achkan',
    price: 28500,
    oldPrice: 36500,
    image:
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3fa4b3bc/images/hi-res/t-a11-26-101fc1_multi_2.jpg?sw=400&sh=600',
    categoryDetails: 'Achkan | Brocade',
    category: 'tailored',
  },
];

const Tailored = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [viewColumns, setViewColumns] = useState(3);
  const [products, setProducts] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ================================
  // LOAD PRODUCTS FROM BACKEND
  // ================================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/products'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        console.log('All backend products:', data);

        // Backend se sirf tailored products
        const tailoredFromBackend = data.products.filter(
          (product) => product.category === 'tailored'
        );

        console.log(
          'Tailored products from backend:',
          tailoredFromBackend
        );

        setProducts(tailoredFromBackend);
      } catch (error) {
        console.error('Error loading tailored products:', error);

        // Agar backend fail ho to fallback products
        setProducts(tailoredProducts);
      }
    };

    loadProducts();
  }, []);

  // ================================
  // FILTER ACCORDION
  // ================================
  const toggleFilter = (filterName) => {
    setOpenFilter(
      openFilter === filterName ? null : filterName
    );
  };

  // ================================
  // SORT
  // ================================
  const handleSortChange = (e) => {
    const value = e.target.value;

    setSortOption(value);

    let sortedProducts = [...products];

    if (value === 'price-low') {
      sortedProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (value === 'price-high') {
      sortedProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setProducts(sortedProducts);
  };

  const filteredProducts = products;

  return (
    <div className="tailored-page">

      {/* ================================
          BREADCRUMB
      ================================= */}
      <nav className="breadcrumb">
        <a href="/">Home</a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <a href="/new">
          New In
        </a>

        <span className="breadcrumb-separator">
          ›
        </span>

        <span>
          Tailored
        </span>
      </nav>

      <div className="tailored-container">

        {/* ================================
            LEFT SIDEBAR
        ================================= */}
        <div className="sidebar">

          <div className="sidebar-header">
            <h3>Filter By</h3>

            <button className="clear-all">
              Clear All
            </button>
          </div>

          {/* CATEGORY */}
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
              <span>
                Category
              </span>

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
                Sherwani
              </label>

              <label>
                <input type="checkbox" />
                Kurta Pajama
              </label>

              <label>
                <input type="checkbox" />
                Waistcoat
              </label>

            </div>
          </div>

          {/* FABRIC */}
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
              <span>
                Fabric
              </span>

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
                Silk
              </label>

              <label>
                <input type="checkbox" />
                Wool
              </label>

              <label>
                <input type="checkbox" />
                Cotton
              </label>

              <label>
                <input type="checkbox" />
                Velvet
              </label>

            </div>
          </div>

        </div>

        {/* ================================
            RIGHT CONTENT
        ================================= */}
        <div className="main-content">

          {/* TOP BAR */}
          <div className="top-bar">

            <div className="results-info">
              <span>
                Showing {filteredProducts.length} tailored products
              </span>
            </div>

            <div className="top-bar-controls">

              {/* SORT */}
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

              {/* VIEW TOGGLE */}
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

          {/* ================================
              PRODUCT GRID
          ================================= */}
          <div
            className={`product-grid columns-${viewColumns}`}
          >

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <ProductCard
                  key={
                    product._id || product.id
                  }
                  product={product}
                  category="tailored"
                />

              ))

            ) : (

              <div className="no-products">
                <p>
                  No tailored products found.
                </p>
              </div>

            )}

          </div>

        </div>
      </div>

      {/* ================================
          MOBILE FILTER BUTTON
      ================================= */}
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

export default Tailored;