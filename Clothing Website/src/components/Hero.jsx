import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const banners = [
    {
      src: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwabfe61da/images/homepage/0.0-eid-sale-desktop-banner-1920x700.jpg',
      alt: 'Eid Sale Banner'
    },
    {
      src: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw917761a0/images/homepage/0.0-NEW-desktop-banner-1920x700.jpg',
      alt: 'New Arrivals Banner'
    }
  ];

  const [topPicksProducts, setTopPicksProducts] = useState([]);

  // =========================
  // FETCH PRODUCTS FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/products'
        );

        const data = await response.json();

        if (data.success) {
          setTopPicksProducts(data.products);
        } else {
          console.error(
            'Failed to fetch products:',
            data.message
          );
          setTopPicksProducts([]);
        }
      } catch (error) {
        console.error(
          'Error fetching hero products:',
          error
        );
        setTopPicksProducts([]);
      }
    };

    fetchTopPicks();
  }, []);

  // =========================
  // BANNER SLIDER
  // =========================
  const [bannerSlide, setBannerSlide] = useState(0);
  const [bannerHover, setBannerHover] = useState(false);

  const goToBannerSlide = (index) => {
    setBannerSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!bannerHover) {
        setBannerSlide(
          (prev) => (prev + 1) % banners.length
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [bannerHover, banners.length]);

  // =========================
  // PRODUCT SLIDER
  // =========================
  const [productSlide, setProductSlide] = useState(0);
  const [productHover, setProductHover] = useState(false);

  const totalProducts = topPicksProducts.length;

  const visibleCards = 4;

  const maxSlides = Math.min(
    5,
    Math.max(1, totalProducts - visibleCards + 1)
  );

  const nextProductSlide = () => {
    setProductSlide(
      (prev) => (prev + 1) % maxSlides
    );
  };

  const prevProductSlide = () => {
    setProductSlide(
      (prev) => (prev - 1 + maxSlides) % maxSlides
    );
  };

  const goToProductSlide = (index) => {
    setProductSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!productHover) {
        nextProductSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [productHover, maxSlides]);

  // =========================
  // PRODUCT CLICK
  // =========================
  const handleProductClick = (product) => {
    navigate(`/women/${product._id}`);
  };

  // =========================
  // CATEGORY CLICK
  // =========================
  const handleCategoryClick = (category) => {
    navigate(`/${category}`);
  };

  return (
    <section className="hero-section">

      {/* =========================
          BANNER SLIDER
      ========================= */}
      <div
        className="hero-background"
        onMouseEnter={() => setBannerHover(true)}
        onMouseLeave={() => setBannerHover(false)}
      >
        <div className="hero-images-container">
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner.src}
              alt={banner.alt}
              className={`hero-image ${
                index === bannerSlide ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <div className="hero-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`hero-dot ${
                index === bannerSlide ? 'active' : ''
              }`}
              onClick={() => goToBannerSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* =========================
          TOP PICKS + CATEGORIES
      ========================= */}
      <section className="hero-categories-section">

        <div className="container">

          <h2 className="section-title">
            Top Picks
          </h2>

          <p className="section-subtitle">
            We've handpicked the styles we'll know you'll love.
            Explore what's trending now.
          </p>

          <img
            src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwec94270f/0.0-0.0-0.0-0.0-0.0-0.0-0.025-2-26-TopPicksDesktop675x1920-uae.jpg"
            alt="Top Picks Banner"
            className="top-picks-image"
          />

          {/* =========================
              CATEGORY CARDS
          ========================= */}
          <div className="hero-grid category-grid">

            {/* WOMEN */}
            <div
              className="hero-card women-card"
              style={{
                backgroundImage:
                  'url(https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw36983800/images/hi-res/a33-26-103fb2_multi_2.jpg?sw=400&sh=600)'
              }}
              onClick={() =>
                handleCategoryClick('women')
              }
            >
              <div className="hero-card-overlay">
                <h3>Women</h3>

                <button className="shop-btn">
                  Shop Now
                </button>
              </div>
            </div>

            {/* MEN */}
            <div
              className="hero-card"
              style={{
                backgroundImage:
                  'url(https://i.pinimg.com/736x/bd/c8/23/bdc823760e568ee3be2b927d6954ce03.jpg)'
              }}
              onClick={() =>
                handleCategoryClick('men')
              }
            >
              <div className="hero-card-overlay">
                <h3>Men</h3>

                <button className="shop-btn">
                  Shop Now
                </button>
              </div>
            </div>

            {/* KIDS */}
            <div
              className="hero-card kids-card"
              style={{
                backgroundImage:
                  'url(https://i.pinimg.com/1200x/df/b2/56/dfb256e16ab9a5294de8081ad8b7a66a.jpg)'
              }}
              onClick={() =>
                handleCategoryClick('kids')
              }
            >
              <div className="hero-card-overlay">
                <h3>Kids</h3>

                <button className="shop-btn">
                  Shop Now
                </button>
              </div>
            </div>

          </div>

          {/* =========================
              BEST SELLERS
          ========================= */}
          <div className="best-sellers-section">

            <h2 className="section-title">
              Best Sellers
            </h2>

            <p className="section-subtitle">
              Discover this season's favorites and refresh
              your style with looks you'll wear on repeat.
            </p>

            <img
              src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw821a6167/0.0-0.0-0.0-0.0-0.0-0.0-0.025-2-26-bestsellerDesktop675x1920-uae2.jpg"
              alt="Best Sellers Banner"
              className="top-picks-image"
            />

          </div>

          {/* =========================
              PRODUCT SLIDER
          ========================= */}
          <div
            className="hero-product-slider"
            onMouseEnter={() =>
              setProductHover(true)
            }
            onMouseLeave={() =>
              setProductHover(false)
            }
          >

            {/* PREVIOUS */}
            <button
              className="slider-arrow slider-prev"
              onClick={prevProductSlide}
            >
              ‹
            </button>

            {/* PRODUCTS */}
            <div
              className="hero-grid slider-track"
              style={{
                transform: `translateX(-${
                  productSlide * 25
                }%)`,
                width: `${totalProducts * 25}%`
              }}
            >

              {topPicksProducts.map(
                (product, index) => (

                  <div
                    key={`${product._id}-${index}`}
                    className="slider-card"
                  >

                    <ProductCard
                      product={product}
                      category={product.category}
                    />

                  </div>

                )
              )}

            </div>

            {/* NEXT */}
            <button
              className="slider-arrow slider-next"
              onClick={nextProductSlide}
            >
              ›
            </button>

            {/* DOTS */}
            <div className="product-dots">

              {Array.from({
                length: maxSlides
              }).map((_, index) => (

                <span
                  key={index}
                  className={`product-dot ${
                    index === productSlide
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    goToProductSlide(index)
                  }
                />

              ))}

            </div>

          </div>

        </div>

      </section>

    </section>
  );
};

export default Hero;