import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const categories = [
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4e5f8c23/Pret-AW24-Banner-Women.jpg?sw=800&sh=600&sm=fit', 
    title: 'Women Pret', 
    id: 'women-pret',
    category: 'women'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw5b2d4a15/Ethnic-AW24-Banner-Women.jpg?sw=800&sh=600&sm=fit', 
    title: 'Women Ethnic', 
    id: 'women-ethnic',
    category: 'women'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7c8d9e2f/Lawn-AW24-Banner-Women.jpg?sw=800&sh=600&sm=fit', 
    title: 'Women Lawn', 
    id: 'women-lawn',
    category: 'women'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw1a2b3c4d/Men-AW24-Banner.jpg?sw=800&sh=600&sm=fit', 
    title: 'Men', 
    id: 'men',
    category: 'men'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3d4e5f6g/Kids-AW24-Banner.jpg?sw=800&sh=600&sm=fit', 
    title: 'Kids', 
    id: 'kids',
    category: 'kids'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw8h9i0j1k/Accessories-Banner.jpg?sw=800&sh=600&sm=fit', 
    title: 'Accessories', 
    id: 'accessories',
    category: 'accessories'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2l3m4n5o/Home-Banner.jpg?sw=800&sh=600&sm=fit', 
    title: 'Home', 
    id: 'home',
    category: 'home'
  },
  { 
    img: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6p7q8r9s/Sale-Banner.jpg?sw=800&sh=600&sm=fit', 
    title: 'Sale', 
    id: 'sale',
    category: 'sale'
  }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Top Picks</h2>
        <p className="section-subtitle">We've handpicked the styles we know you'll love. Explore what's trending now.</p>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => navigate(`/${category.id}`)}
            >
              <div 
                className="category-img" 
                style={{ backgroundImage: `url(${category.img})` }}
              >
                <div className="category-overlay">
                  <h3>{category.title}</h3>
                  <button className="shop-btn">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

