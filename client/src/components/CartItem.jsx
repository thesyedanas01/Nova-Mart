import { useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineTrash, HiMinus, HiPlus, HiExclamationTriangle } from 'react-icons/hi2';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!item.product) return null;

  const lineTotal = (item.product.price * item.quantity).toLocaleString('en-IN');

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      setShowConfirmModal(true);
    } else {
      onUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity >= item.product.stock) return;
    onUpdateQuantity(item._id, item.quantity + 1);
  };

  const handleConfirmRemove = () => {
    setShowConfirmModal(false);
    onRemove(item._id);
  };

  return (
    <>
      <div className="cart-item" id={`cart-item-${item._id}`}>
        <img
          className="cart-item__image"
          src={item.product.imageUrl}
          alt={item.product.name}
        />
        <div className="cart-item__info">
          <h4 className="cart-item__name">{item.product.name}</h4>
          <p className="cart-item__price">₹{item.product.price.toLocaleString('en-IN')} each</p>

          {/* Quantity Controls in Checkout Cart */}
          <div className="cart-item__actions">
            <div className="quantity-selector quantity-selector--sm">
              <button
                className="quantity-selector__btn"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                <HiMinus />
              </button>
              <span className="quantity-selector__value">{item.quantity}</span>
              <button
                className="quantity-selector__btn"
                onClick={handleIncrease}
                disabled={item.quantity >= item.product.stock}
                aria-label="Increase quantity"
              >
                <HiPlus />
              </button>
            </div>

            <button
              className="cart-item__remove-btn"
              onClick={() => setShowConfirmModal(true)}
              id={`remove-item-${item._id}`}
              title="Remove item"
            >
              <HiOutlineTrash /> Remove
            </button>
          </div>
        </div>

        <div className="cart-item__total">₹{lineTotal}</div>
      </div>

      {/* Full-Screen Portaled Confirmation Modal Popup */}
      {showConfirmModal &&
        createPortal(
          <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
            <div
              className="modal-card animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
              id={`remove-modal-${item._id}`}
            >
              <div className="modal-card__icon">
                <HiExclamationTriangle />
              </div>
              <h3 className="modal-card__title">Remove Item?</h3>
              <p className="modal-card__text">
                Are you sure you want to remove <strong>{item.product.name}</strong> from your cart?
              </p>
              <div className="modal-card__actions">
                <button
                  className="btn btn--secondary btn--sm"
                  onClick={() => setShowConfirmModal(false)}
                  id="cancel-remove-btn"
                >
                  Cancel
                </button>
                <button
                  className="btn btn--danger btn--sm"
                  onClick={handleConfirmRemove}
                  id="confirm-remove-btn"
                >
                  Yes, Remove Item
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CartItem;
