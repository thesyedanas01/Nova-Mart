import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  const getStockClass = () => {
    if (product.stock === 0) return 'product-card__stock product-card__stock--out';
    if (product.stock <= 5) return 'product-card__stock product-card__stock--low';
    return 'product-card__stock';
  };

  const getStockText = () => {
    if (product.stock === 0) return 'Out of stock';
    if (product.stock <= 5) return `Only ${product.stock} left`;
    return `${product.stock} in stock`;
  };

  const staggerClass = `stagger-${(index % 8) + 1}`;

  return (
    <div
      className={`glass-card product-card animate-fade-in-up ${staggerClass}`}
      onClick={() => navigate(`/products/${product._id}`)}
      id={`product-card-${product._id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${product._id}`)}
    >
      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop';
          }}
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__footer-row">
          <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className={getStockClass()}>{getStockText()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
