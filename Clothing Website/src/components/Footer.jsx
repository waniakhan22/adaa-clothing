import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">ADAA</div>
          <p className="footer-tagline">
            Crafting timeless elegance with exquisite handcrafted textiles 
            since heritage meets contemporary luxury.
          </p>
        </div>

        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Care Instructions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="/women">Women</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/wedding">Wedding</a></li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">📘</a>
            <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
          </div>
          <p>Exclusive offers • New arrivals • Behind the scenes</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 ADAA Luxury Textiles. All rights reserved. | Crafted with ❤️ for timeless elegance</p>
      </div>
    </footer>
  );
};

export default Footer;

