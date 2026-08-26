import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNewInDropdown, setShowNewInDropdown] = useState(false);

  const navigate = useNavigate();

  const handleNewInMouseEnter = () => {
    setShowNewInDropdown(true);
  };

  const handleNewInMouseLeave = () => {
    setShowNewInDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          <NavLink to="/">
            <h2>Adaa</h2>
          </NavLink>
        </div>

        {/* MENU */}
        <ul className="nav-menu">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/women"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Women
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/men"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Men
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/kids"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Kids
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sale"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Sale
            </NavLink>
          </li>

          {/* NEW IN */}
          <li
            className="new-in-container"
            onMouseEnter={handleNewInMouseEnter}
            onMouseLeave={handleNewInMouseLeave}
          >
            <NavLink
              to="/new"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              New In
            </NavLink>

            {showNewInDropdown && (
              <div className="new-in-dropdown">

                <div className="dropdown-box">
                  <NavLink to="/fabrics" className="box-link">
                    <img
                      src="https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dwcc652e9f/images/Thumbnails/0.0-new-in-fabrics-thumbnails-7.jpg"
                      alt="Fabrics"
                      className="box-image"
                    />
                    <span className="box-label">Fabrics</span>
                  </NavLink>
                </div>

                <div className="dropdown-box">
                  <NavLink to="/ready-to-wear" className="box-link">
                    <img
                      src="https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dw6d3e6df7/images/Thumbnails/0.0-1-110-thumbnails-1.jpg"
                      alt="Ready to Wear"
                      className="box-image"
                    />
                    <span className="box-label">
                      Ready to Wear
                    </span>
                  </NavLink>
                </div>

                <div className="dropdown-box">
                  <NavLink to="/tailored" className="box-link">
                    <img
                      src="https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dw221be4e4/images/Thumbnails/0.0-new-in-tailored-thumbnails-10.jpg"
                      alt="Tailored"
                      className="box-image"
                    />
                    <span className="box-label">
                      Tailored
                    </span>
                  </NavLink>
                </div>

              </div>
            )}
          </li>

        </ul>

        {/* RIGHT ICONS */}
       {/* RIGHT ICONS */}
<div className="nav-icons">

  {/* SEARCH */}
  <button
    type="button"
    className="navbar-icon-btn"
    aria-label="Search"
    onClick={() => navigate('/search')}
  >
    <svg
      className="navbar-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  </button>

  {/* PROFILE */}
  <NavLink
    to="/profile"
    className="navbar-icon-link"
    aria-label="Profile"
  >
    <svg
      className="navbar-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
    </svg>
  </NavLink>

  {/* HEART */}
  <button
    type="button"
    className="navbar-icon-btn"
    aria-label="Wishlist"
    onClick={() => navigate('/wishlist')}
  >
    <svg
      className="navbar-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>

  {/* CART */}
  <NavLink
    to="/cart"
    className="navbar-cart-link"
    aria-label="Cart"
  >
    <svg
      className="navbar-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>

    <span className="cart-count">0</span>
  </NavLink>

</div>

      </div>
    </nav>
  );
};

export default Navbar;