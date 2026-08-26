import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate API call
      setStatus('Thank you for subscribing! Exclusive offers coming your way.');
      setTimeout(() => {
        setStatus('');
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Stay Updated With Elegance</h2>
        <p className="newsletter-desc">
          Join our exclusive circle for first access to new collections, 
          private sales and timeless style inspiration.
        </p>
        <div className="newsletter-form-container">
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe Now
            </button>
          </form>
          {status && (
            <div className={`newsletter-success show`}>{status}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
