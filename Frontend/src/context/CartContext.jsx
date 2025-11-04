import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableId, setTableId] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedTableId = localStorage.getItem('tableId');
    const savedTableNumber = localStorage.getItem('tableNumber');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedTableId) {
      setTableId(savedTableId);
    }
    if (savedTableNumber) {
      setTableNumber(savedTableNumber);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const setTable = (id, number) => {
    setTableId(id);
    setTableNumber(number);
    localStorage.setItem('tableId', id);
    localStorage.setItem('tableNumber', number);
  };

  const addToCart = (item, quantity = 1, note = '') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.menuItemId === item._id && cartItem.note === note
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItemId === item._id && cartItem.note === note
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prevCart, {
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity,
        note,
        imageUrl: item.imageUrl
      }];
    });
  };

  const updateQuantity = (menuItemId, note, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId, note);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.menuItemId === menuItemId && item.note === note
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (menuItemId, note) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.menuItemId === menuItemId && item.note === note)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    tableId,
    tableNumber,
    setTable,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
