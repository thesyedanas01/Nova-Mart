import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiArrowRight,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineTag,
  HiOutlineBookOpen,
} from 'react-icons/hi2';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCategoryClick = (categoryName) => {
    navigate('/products', { state: { category: categoryName } });
  };

  return (
    <div className="landing-wrapper" id="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid animate-fade-in-up">
            {/* Left Content Column */}
            <div className="hero-content">
              <span className="product-detail__category" style={{ marginBottom: '1rem' }}>
                Authentic Indian Heritage
              </span>
              <h1 className="hero-title">
                Handcrafted Treasures <br />
                <span className="hero-title-gradient">Direct from Artisans</span>
              </h1>
              <p className="hero-subtitle">
                Explore Banarasi silk sarees, Madhubani canvas paintings, Kerala Ayurvedic wellness,
                and authentic regional gourmet delicacies at fair Indian market rates.
              </p>
              <div className="hero-cta-group">
                <Link to="/products" className="btn btn--primary btn--lg" id="shop-now-btn">
                  Explore Catalog <HiArrowRight />
                </Link>
                {!isAuthenticated && (
                  <Link to="/signup" className="btn btn--secondary btn--lg" id="join-btn">
                    Create Account
                  </Link>
                )}
              </div>
            </div>

            {/* Right Preview Grid (Pure Clean Image Showcase) */}
            <div className="hero-preview-grid">
              <div className="hero-preview-card" onClick={() => navigate('/products')}>
                <img
                  src="https://m.media-amazon.com/images/I/91rBerY1vNL._SY741_.jpg?w=700&h=700&fit=crop"
                  alt="Pure Banarasi Silk Saree"
                  className="hero-preview-img"
                />
              </div>

              <div className="hero-preview-card" onClick={() => navigate('/products')}>
                <img
                  src="https://m.media-amazon.com/images/I/81rUgirD8qL._SX679_.jpg?w=700&h=700&fit=crop"
                  alt="Jute Rug"
                  className="hero-preview-img"
                />
              </div>

              <div className="hero-preview-card" onClick={() => navigate('/products')}>
                <img
                  src="https://m.media-amazon.com/images/I/81m7WbqSlkL._SX522_.jpg?w=700&h=700&fit=crop"
                  alt="Madhubani Canvas Painting"
                  className="hero-preview-img"
                />
              </div>

              <div className="hero-preview-card" onClick={() => navigate('/products')}>
                <img
                  src="https://m.media-amazon.com/images/I/71MpKKT2uSL._SX679_.jpg?w=700&h=700&fit=crop"
                  alt="Desi Ghee Kaju Katli"
                  className="hero-preview-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="features-banner">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">
                <HiOutlineShieldCheck />
              </div>
              <h4 className="feature-title">100% Authentic Products</h4>
              <p className="feature-desc">Sourced directly from verified artisan guilds & weavers</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <HiOutlineTag />
              </div>
              <h4 className="feature-title">Fair Market Prices (₹)</h4>
              <p className="feature-desc">Authentic Indian market rates with transparent pricing</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <HiOutlineTruck />
              </div>
              <h4 className="feature-title">Express Delivery</h4>
              <p className="feature-desc">Secure nationwide delivery directly to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Strip */}
      <section className="landing-categories">
        <div className="container">
          <h3 className="landing-categories__title">Popular Collections</h3>
          <div className="landing-categories__grid">
            <div className="landing-cat-item" onClick={() => handleCategoryClick('Ethnic Wear')}>
              <div className="landing-cat-item__circle">
                <HiOutlineShoppingBag />
              </div>
              <span className="landing-cat-item__label">Ethnic Wear</span>
            </div>

            <div className="landing-cat-item" onClick={() => handleCategoryClick('Handicrafts')}>
              <div className="landing-cat-item__circle">
                <HiOutlineSparkles />
              </div>
              <span className="landing-cat-item__label">Handicrafts</span>
            </div>

            <div className="landing-cat-item" onClick={() => handleCategoryClick('Wellness')}>
              <div className="landing-cat-item__circle">
                <HiOutlineHeart />
              </div>
              <span className="landing-cat-item__label">Wellness</span>
            </div>

            <div className="landing-cat-item" onClick={() => handleCategoryClick('Gourmet')}>
              <div className="landing-cat-item__circle">
                <HiOutlineTag />
              </div>
              <span className="landing-cat-item__label">Gourmet</span>
            </div>

            <div className="landing-cat-item" onClick={() => handleCategoryClick('Art & Books')}>
              <div className="landing-cat-item__circle">
                <HiOutlineBookOpen />
              </div>
              <span className="landing-cat-item__label">Art & Books</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
