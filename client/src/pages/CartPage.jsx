import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, totalPrice, totalItems, loading, updateQuantity, removeFromCart } = useCart();

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  const itemsLabel = totalItems === 1 ? '1 item' : `${totalItems} items`;

  return (
    <div className="container cart-page" id="cart-page">
      <h1 className="cart-page__title">Shopping Cart ({itemsLabel})</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state animate-fade-in-up">
          <div className="empty-state__icon">
            <HiOutlineShoppingBag />
          </div>
          <h2 className="empty-state__title">Your shopping cart is empty</h2>
          <p className="empty-state__text">
            Explore authentic Indian products and handcrafted items
          </p>
          <Link to="/products" className="btn btn--primary" id="browse-products">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-page__content animate-fade-in-up">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="cart-summary" id="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal ({itemsLabel})</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="cart-summary__row">
              <span>Delivery Charges</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>FREE</span>
            </div>

            <hr className="cart-summary__divider" />

            <div className="cart-summary__total">
              <span>Total ({itemsLabel})</span>
              <span className="cart-summary__total-price">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Non-functional Demo Checkout Button */}
            <div style={{ marginTop: '1.4rem' }}>
              <button
                className="btn btn--primary btn--full"
                id="checkout-demo-btn"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.8rem 1rem',
                  gap: '0.1rem',
                  cursor: 'default',
                }}
                onClick={(e) => e.preventDefault()}
              >
                <span style={{ fontSize: '0.98rem', fontWeight: 800 }}>Proceed to Checkout</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.85, textTransform: 'lowercase' }}>
                  (demo as instructed)
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
