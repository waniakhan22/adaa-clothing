import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./search.css";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");

    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {
        setRecentSearches([]);
      }
    }

    inputRef.current?.focus();
  }, []);

  // Search API
  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:3000/api/products"
        );

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          const searchText = query.toLowerCase();

          const filtered = data.products.filter((product) => {
            const text = `
              ${product.name || ""}
              ${product.category || ""}
              ${product.description || ""}
              ${product.categoryDetails || ""}
            `.toLowerCase();

            return text.includes(searchText);
          });

          setProducts(filtered);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Save search
  const saveSearch = (value) => {
    const search = value.trim();

    if (!search) return;

    const updated = [
      search,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== search.toLowerCase()
      ),
    ].slice(0, 6);

    setRecentSearches(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  // Enter key
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      saveSearch(searchQuery);
    }
  };

  // Trending search
  const handleTrendingSearch = (value) => {
    setSearchQuery(value);
    saveSearch(value);
    inputRef.current?.focus();
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    inputRef.current?.focus();
  };

  // Clear history
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <main className="search-page">

      {/* TOP HEADER */}
      <header className="search-header">

        <button
          className="search-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>

          <span>Back</span>
        </button>

        <div className="search-logo">
          <span>ADAA</span>
        </div>

        <button
          className="search-close"
          onClick={() => navigate(-1)}
          aria-label="Close search"
        >
          <span>ESC</span>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        </button>

      </header>


      {/* HERO */}
      <section className="search-hero">

        <div className="search-eyebrow">
          <span></span>
          ADAA SEARCH
          <span></span>
        </div>

        <h1>
          Find something
          <em> beautiful.</em>
        </h1>

        <p>
          Search through our latest collections,
          timeless essentials and signature styles.
        </p>

      </section>


      {/* SEARCH BAR */}
      <section className="search-box-section">

        <div
          className={`professional-search-box ${
            searchQuery ? "has-value" : ""
          }`}
        >

          <svg
            className="main-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <circle cx="11" cy="11" r="7.5" />
            <path d="M20 20l-4-4" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            placeholder="Search for products, categories..."
            autoComplete="off"
            spellCheck="false"
          />

          {searchQuery && (
            <button
              className="clear-search"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <div className="search-key">
            <span>ENTER</span>
            <kbd>↵</kbd>
          </div>

        </div>

      </section>


      {/* SEARCH RESULTS */}
      {searchQuery.trim() ? (

        <section className="search-results-section">

          <div className="results-header">

            <div>
              <span className="results-label">
                SEARCH RESULTS
              </span>

              <h2>
                {loading
                  ? "Searching..."
                  : `${products.length} ${
                      products.length === 1
                        ? "result"
                        : "results"
                    } found`}
              </h2>
            </div>

            {!loading && products.length > 0 && (
              <span className="results-query">
                “{searchQuery}”
              </span>
            )}

          </div>


          {loading ? (

            <div className="search-loader">
              <div className="loader-circle"></div>
              <p>Finding your perfect style...</p>
            </div>

          ) : products.length > 0 ? (

            <div className="search-product-grid">

              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  category={product.category}
                />
              ))}

            </div>

          ) : (

            <div className="no-results">

              <div className="no-results-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
              </div>

              <span>NOTHING FOUND</span>

              <h2>
                We couldn't find
                <br />
                “{searchQuery}”
              </h2>

              <p>
                Try another search or explore one
                of our popular categories.
              </p>

              <button
                className="browse-button"
                onClick={() => setSearchQuery("")}
              >
                Explore Collections
              </button>

            </div>

          )}

        </section>

      ) : (

        <>
          {/* RECENT SEARCHES */}
          {recentSearches.length > 0 && (

            <section className="search-section">

              <div className="section-heading">

                <div>
                  <span>02</span>
                  <h2>Recent Searches</h2>
                </div>

                <button onClick={clearHistory}>
                  Clear All
                </button>

              </div>

              <div className="recent-list">

                {recentSearches.map((search, index) => (

                  <button
                    key={`${search}-${index}`}
                    onClick={() =>
                      handleTrendingSearch(search)
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v4l2.5 2.5" />
                    </svg>

                    <span>{search}</span>

                    <strong>↗</strong>
                  </button>

                ))}

              </div>

            </section>

          )}


          {/* TRENDING */}
          <section className="search-section">

            <div className="section-heading">

              <div>
                <span>01</span>
                <h2>Trending Searches</h2>
              </div>

            </div>

            <div className="trending-list">

              {[
                "New In",
                "Printed Lawn",
                "Ready To Wear",
                "Embroidered",
                "3 Piece",
                "Summer Collection",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    handleTrendingSearch(item)
                  }
                >
                  {item}
                  <span>↗</span>
                </button>

              ))}

            </div>

          </section>


          {/* COLLECTIONS */}
          <section className="search-section collections-section">

            <div className="section-heading">

              <div>
                <span>03</span>
                <h2>Explore Collections</h2>
              </div>

            </div>


            <div className="collection-grid">

              <button
                className="collection-card"
                onClick={() => navigate("/women")}
              >
                <img
                  src="https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dwcc652e9f/images/Thumbnails/0.0-new-in-fabrics-thumbnails-7.jpg"
                  alt="Women"
                />

                <div className="collection-overlay">
                  <span>01</span>
                  <h3>Women</h3>
                  <p>Explore Collection →</p>
                </div>
              </button>


              <button
                className="collection-card"
                onClick={() => navigate("/men")}
              >
                <img
                  src="https://i.pinimg.com/736x/bd/c8/23/bdc823760e568ee3be2b927d6954ce03.jpg"
                  alt="Men"
                />

                <div className="collection-overlay">
                  <span>02</span>
                  <h3>Men</h3>
                  <p>Explore Collection →</p>
                </div>
              </button>


              <button
                className="collection-card"
                onClick={() => navigate("/kids")}
              >
                <img
                  src="https://i.pinimg.com/1200x/df/b2/56/dfb256e16ab9a5294de8081ad8b7a66a.jpg"
                  alt="Kids"
                />

                <div className="collection-overlay">
                  <span>03</span>
                  <h3>Kids</h3>
                  <p>Explore Collection →</p>
                </div>
              </button>

            </div>

          </section>

        </>
      )}

    </main>
  );
};

export default Search;