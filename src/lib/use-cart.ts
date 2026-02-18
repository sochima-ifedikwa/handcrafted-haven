"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

const CART_CHANGE_EVENT = "cart-change";

const subscribe = (onStoreChange: () => void) => {
  const handler = () => onStoreChange();

  window.addEventListener("storage", handler);
  window.addEventListener(CART_CHANGE_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CART_CHANGE_EVENT, handler);
  };
};

const getSnapshot = () => localStorage.getItem("cartItems") ?? "[]";
const getServerSnapshot = () => "[]";

const parseCartItems = (raw: string): CartItem[] => {
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item) =>
        typeof item.productId === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
};

const persistCartItems = (items: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
};

export const useCartItems = () => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => parseCartItems(raw), [raw]);
};

export const addToCart = (
  item: Omit<CartItem, "quantity">,
  quantity = 1,
) => {
  const existing = parseCartItems(getSnapshot());
  const existingItem = existing.find((entry) => entry.productId === item.productId);

  if (existingItem) {
    const next = existing.map((entry) =>
      entry.productId === item.productId
        ? { ...entry, quantity: entry.quantity + quantity }
        : entry,
    );
    persistCartItems(next);
    return;
  }

  persistCartItems([...existing, { ...item, quantity }]);
};

export const updateCartItemQuantity = (productId: number, quantity: number) => {
  const existing = parseCartItems(getSnapshot());

  if (quantity <= 0) {
    const filtered = existing.filter((item) => item.productId !== productId);
    persistCartItems(filtered);
    return;
  }

  const next = existing.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  );
  persistCartItems(next);
};

export const removeFromCart = (productId: number) => {
  const existing = parseCartItems(getSnapshot());
  const filtered = existing.filter((item) => item.productId !== productId);
  persistCartItems(filtered);
};

export const clearCart = () => {
  persistCartItems([]);
};
