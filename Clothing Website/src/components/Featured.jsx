import React from 'react';
import './Featured.css';

const Featured = () => {
  return (
    <section className="featured-section">
      <div className="featured-bg" style={{ backgroundImage: `url(/src/assets/hero.png)` }}></div>
      <div className="featured-content">
        <div className="featured-text">

          <p className="featured-desc">Discover our latest designs crafted with premium fabrics</p>
          <button className="cta-btn">Explore Collection</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
