import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  HiArrowLeft,
  HiMinus,
  HiPlus,
  HiShoppingCart,
  HiStar,
  HiMapPin,
  HiCheckBadge,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlassPlus,
  HiXMark,
} from 'react-icons/hi2';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // Lightbox Zoom Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);
        setCurrentIndex(0);
      } catch (error) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }

    setAdding(true);
    try {
      await addToCart(product._id, quantity);
      setQuantity(1);
    } catch (error) {
      // Error handled in CartContext
    } finally {
      setAdding(false);
    }
  };

  const getStockInfo = () => {
    if (!product) return { text: '', className: '' };
    if (product.stock === 0) return { text: 'Out of stock', className: 'product-detail__stock--out' };
    if (product.stock <= 5) return { text: `Only ${product.stock} left in stock`, className: 'product-detail__stock--low' };
    return { text: `${product.stock} in stock`, className: '' };
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) return null;

  const stockInfo = getStockInfo();

  // Combine product.imageUrl and product.images ensuring uniqueness
  const galleryImages = (() => {
    const list = [];
    if (product.imageUrl) list.push(product.imageUrl);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list;
  })();

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const specs = product.specifications ? Object.entries(product.specifications) : [];
  const seller = product.seller || { name: 'Artisan Heritage India', rating: 4.8, location: 'Jaipur, Rajasthan' };

  return (
    <div className="container product-detail" id="product-detail-page">
      <button
        className="product-detail__back"
        onClick={() => navigate('/products')}
        id="back-to-products"
      >
        <HiArrowLeft /> Back to Products
      </button>

      <div className="product-detail__content animate-fade-in-up">
        {/* Left Column: Image Gallery Slider with Click-to-Zoom Lightbox */}
        <div className="product-detail__gallery">
          <div
            className="product-detail__image-wrapper"
            onClick={() => {
              setLightboxScale(1);
              setIsLightboxOpen(true);
            }}
            title="Click to view full-screen zoom"
          >
            <img
              className="product-detail__image"
              src={galleryImages[currentIndex] || product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&h=700&fit=crop';
              }}
            />

            {/* Click to Zoom Badge */}
            <div className="gallery-zoom-badge">
              <HiMagnifyingGlassPlus /> Click to Zoom
            </div>

            {/* Slider Arrow Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  className="gallery-arrow gallery-arrow--prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  id="gallery-prev-btn"
                >
                  <HiChevronLeft />
                </button>
                <button
                  className="gallery-arrow gallery-arrow--next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  id="gallery-next-btn"
                >
                  <HiChevronRight />
                </button>
                <div className="gallery-counter">
                  {currentIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="product-detail__thumbnails">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`product-detail__thumb ${
                    currentIndex === idx ? 'product-detail__thumb--active' : ''
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} preview ${idx + 1}`}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&h=700&fit=crop';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="product-detail__info">
          <span className="product-detail__category">{product.category}</span>
          <h1 className="product-detail__name" id="product-name">
            {product.name}
          </h1>
          <span className="product-detail__price" id="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <p className="product-detail__description">{product.description}</p>
          <p className={`product-detail__stock ${stockInfo.className}`} id="product-stock">
            {stockInfo.text}
          </p>

          {/* Add to Cart Actions */}
          {product.stock > 0 && (
            <div className="product-detail__actions">
              <div className="quantity-selector" id="quantity-selector">
                <button
                  className="quantity-selector__btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <HiMinus />
                </button>
                <span className="quantity-selector__value">{quantity}</span>
                <button
                  className="quantity-selector__btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  <HiPlus />
                </button>
              </div>

              <button
                className="btn btn--primary btn--lg"
                onClick={handleAddToCart}
                disabled={adding}
                id="add-to-cart-btn"
              >
                <HiShoppingCart />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          )}

          {/* Seller Info Card */}
          <div className="seller-card">
            <div className="seller-card__header">
              <span className="seller-card__badge">
                <HiCheckBadge /> Verified Artisan Seller
              </span>
            </div>
            <h4 className="seller-card__name">{seller.name}</h4>
            <div className="seller-card__meta">
              <span className="seller-card__rating">
                <HiStar style={{ color: '#F59E0B' }} /> {seller.rating || 4.8} / 5.0
              </span>
              <span className="seller-card__location">
                <HiMapPin /> {seller.location || 'India'}
              </span>
            </div>
          </div>

          {/* Product Specifications */}
          {specs.length > 0 && (
            <div className="specs-card">
              <h4 className="specs-card__title">Product Specifications</h4>
              <div className="specs-card__grid">
                {specs.map(([key, value]) => (
                  <div className="specs-card__item" key={key}>
                    <span className="specs-card__key">{key}:</span>
                    <span className="specs-card__value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Lightbox Zoom Modal */}
      {isLightboxOpen &&
        createPortal(
          <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close lightbox"
              >
                <HiXMark />
              </button>

              {/* Lightbox Controls */}
              <div className="lightbox-controls">
                <button
                  className="lightbox-zoom-btn"
                  onClick={() => setLightboxScale((s) => Math.max(1, s - 0.4))}
                  disabled={lightboxScale <= 1}
                >
                  <HiMinus /> Zoom Out
                </button>
                <span className="lightbox-scale-label">
                  {Math.round(lightboxScale * 100)}%
                </span>
                <button
                  className="lightbox-zoom-btn"
                  onClick={() => setLightboxScale((s) => Math.min(3, s + 0.4))}
                  disabled={lightboxScale >= 3}
                >
                  <HiPlus /> Zoom In
                </button>
              </div>

              {/* Main Lightbox Image */}
              <div className="lightbox-image-container">
                <img
                  className="lightbox-image"
                  src={galleryImages[currentIndex] || product.imageUrl}
                  alt={product.name}
                  style={{ transform: `scale(${lightboxScale})` }}
                />

                {/* Slider Nav inside Lightbox */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      className="gallery-arrow gallery-arrow--prev"
                      onClick={handlePrevImage}
                    >
                      <HiChevronLeft />
                    </button>
                    <button
                      className="gallery-arrow gallery-arrow--next"
                      onClick={handleNextImage}
                    >
                      <HiChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div className="lightbox-thumbnails">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`product-detail__thumb ${
                        currentIndex === idx ? 'product-detail__thumb--active' : ''
                      }`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setLightboxScale(1);
                      }}
                    >
                      <img src={imgUrl} alt="Thumbnail preview" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProductDetailPage;
