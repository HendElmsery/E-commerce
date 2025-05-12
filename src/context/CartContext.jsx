// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleIncrement = (productId) => {
    const newCart = { ...cart };
    if (newCart[productId]) {
      newCart[productId].count += 1;
      setCart(newCart);
    }
  };

  const handleDecrement = (productId) => {
    const newCart = { ...cart };
    if (newCart[productId]?.count > 1) {
      newCart[productId].count -= 1;
      setCart(newCart);
    }
  };

  const handleRemove = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  };

  const addToCart = (product) => {
    const newCart = { ...cart };
    if (newCart[product.id]) {
      newCart[product.id].count += 1;
    } else {
      newCart[product.id] = { ...product, count: 1 };
    }
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        handleIncrement,
        handleDecrement,
        handleRemove,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
