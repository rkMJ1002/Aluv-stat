"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  finish: string;
  quantity: number;
  image: string;
  paypalLink?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aluvion_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.map((item: CartItem) => {
            if (
              item.productId === "aluvion-pocket-4k" ||
              item.productId === "pocket-4k" ||
              item.name?.toLowerCase().includes("pocket 4k") ||
              item.id?.toLowerCase().includes("pocket-4k")
            ) {
              return { ...item, price: 27 };
            }
            return item;
          });
          setItems(sanitized);
          localStorage.setItem("aluvion_cart", JSON.stringify(sanitized));
        }
      }
    } catch {
      // Ignore parse error
    }
    setLoaded(true);
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("aluvion_cart", JSON.stringify(newItems));
    } catch {
      // Ignore write error
    }
  };

  const addItem = (item: Omit<CartItem, "id">) => {
    const normalizedItem = { ...item };
    if (
      normalizedItem.productId === "aluvion-pocket-4k" ||
      normalizedItem.productId === "pocket-4k" ||
      normalizedItem.name?.toLowerCase().includes("pocket 4k")
    ) {
      normalizedItem.price = 27;
    }

    const id = `${normalizedItem.productId}-${normalizedItem.finish}`;
    const existingIndex = items.findIndex((i) => i.id === id);

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = items.map((i, idx) =>
        idx === existingIndex ? { ...i, quantity: i.quantity + normalizedItem.quantity, price: normalizedItem.price } : i
      );
    } else {
      updated = [...items, { ...normalizedItem, id }];
    }
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
