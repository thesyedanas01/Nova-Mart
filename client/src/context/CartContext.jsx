import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data } = await API.get('/cart');
      setCartItems(data.cart.items || []);
      setTotalPrice(data.cart.totalPrice || 0);
      setTotalItems(data.cart.totalItems || 0);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalPrice(0);
      setTotalItems(0);
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      try {
        const { data } = await API.post('/cart', { productId, quantity });
        setCartItems(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
        setTotalItems(data.cart.totalItems);
        toast.success('Added to cart!');
        return data;
      } catch (error) {
        const msg = error.response?.data?.message || 'Failed to add item';
        toast.error(msg);
        throw error;
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        const { data } = await API.put(`/cart/${itemId}`, { quantity });
        setCartItems(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
        setTotalItems(data.cart.totalItems);
      } catch (error) {
        const msg = error.response?.data?.message || 'Failed to update quantity';
        toast.error(msg);
        throw error;
      }
    },
    []
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      try {
        const { data } = await API.delete(`/cart/${itemId}`);
        setCartItems(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
        setTotalItems(data.cart.totalItems);
        toast.success('Item removed');
      } catch (error) {
        const msg = error.response?.data?.message || 'Failed to remove item';
        toast.error(msg);
      }
    },
    []
  );

  const value = {
    cartItems,
    totalPrice,
    totalItems,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
