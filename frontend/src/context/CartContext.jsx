import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.product._id === product._id);
      if (exist) {
        return prev.map(item => item.product._id === product._id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { product, qty }];
    });
  };

  const updateQty = (productId, qty) => {
    setCartItems(prev => prev.map(item => item.product._id === productId ? { ...item, qty } : item));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};