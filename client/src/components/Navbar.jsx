import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userBtnRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const getPopoverStyle = () => {
    if (!userBtnRef.current) return {};
    const rect = userBtnRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + 8}px`,
      right: `${Math.max(16, window.innerWidth - rect.right)}px`,
    };
  };

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="container">
          <Link to="/" className="navbar__brand" id="nav-brand">
            <span className="navbar__brand-icon"></span>
            NovaMart
          </Link>

          <div className="navbar__links">
            <Link
              to="/products"
              className={`navbar__link ${isActive('/products') ? 'navbar__link--active' : ''}`}
              id="nav-products"
            >
              Products
            </Link>

            {isAuthenticated && (
              <Link to="/cart" className="navbar__cart-btn" id="nav-cart">
                <HiOutlineShoppingCart size={20} />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="navbar__cart-badge" key={totalItems}>
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="navbar__user-wrapper">
                <button
                  ref={userBtnRef}
                  className={`navbar__user-btn ${isProfileOpen ? 'navbar__user-btn--active' : ''}`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  id="nav-profile-btn"
                >
                  <HiOutlineUser className="navbar__user-icon" />
                  <span>{user?.firstName || 'Profile'}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-nav-action" id="nav-login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Render Backdrop & Popover Portal at document.body level */}
      {isProfileOpen &&
        createPortal(
          <>
            {/* Blurred Backdrop */}
            <div
              className="profile-backdrop-overlay"
              onClick={() => setIsProfileOpen(false)}
            />

            {/* Sharp, Crisp Popover Panel */}
            <div style={getPopoverStyle()} className="profile-portal-wrapper">
              <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default Navbar;
