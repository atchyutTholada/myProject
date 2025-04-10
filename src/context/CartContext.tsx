import React, { createContext, useState, useContext } from 'react';

interface CartContextType {
  cart: { id: any; quantity: number }[];
  addToCart: (service: { id: any }) => void;
  removeFromCart: (service: { id: any }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

import { ReactNode } from 'react';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ id: any; quantity: number }[]>([]);

  const addToCart = (service: { id: any; }) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService) {
        return prevCart.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (service: { id: any; }) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService && existingService.quantity === 1) {
        return prevCart.filter((item) => item.id !== service.id);
      } else {
        return prevCart.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
