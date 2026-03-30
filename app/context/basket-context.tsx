"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { Product } from "../data/products";

export type BasketItem = Product & {
  quantity: number;
};

type BasketContextValue = {
  items: BasketItem[];
  itemCount: number;
  basketTotal: number;
  addToBasket: (product: Product) => void;
  clearBasket: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromBasket: (productId: number) => void;
  getItemQuantity: (productId: number) => number;
};

const BasketContext = createContext<BasketContextValue | undefined>(undefined);
const STORAGE_KEY = "357-basket-items";
const listeners = new Set<() => void>();
const EMPTY_ITEMS: BasketItem[] = [];

let cachedItems: BasketItem[] = EMPTY_ITEMS;
let cachedRawValue = "";

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

// Read the saved basket from localStorage in a safe way.
function getStoredItems() {
  if (typeof window === "undefined") {
    return EMPTY_ITEMS;
  }

  const savedItems = window.localStorage.getItem(STORAGE_KEY) ?? "";

  // If localStorage has not changed, reuse the same array reference.
  if (savedItems === cachedRawValue) {
    return cachedItems;
  }

  if (!savedItems) {
    cachedRawValue = "";
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }

  try {
    cachedRawValue = savedItems;
    cachedItems = JSON.parse(savedItems) as BasketItem[];
    return cachedItems;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedRawValue = "";
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }
}

function getServerSnapshot() {
  return EMPTY_ITEMS;
}

function saveItems(items: BasketItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  cachedItems = items;
  cachedRawValue = JSON.stringify(items);
  window.localStorage.setItem(STORAGE_KEY, cachedRawValue);
  emitChange();
}

export function BasketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = useSyncExternalStore(
    subscribe,
    getStoredItems,
    getServerSnapshot,
  );

  function addToBasket(product: Product) {
    const currentItems = getStoredItems();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (!existingItem) {
      saveItems([...currentItems, { ...product, quantity: 1 }]);
      return;
    }

    if (existingItem.quantity >= product.stock) {
      return;
    }

    saveItems(
      currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function clearBasket() {
    saveItems(EMPTY_ITEMS);
  }

  function increaseQuantity(productId: number) {
    const currentItems = getStoredItems();

    saveItems(
      currentItems.map((item) => {
        if (item.id !== productId || item.quantity >= item.stock) {
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      }),
    );
  }

  function decreaseQuantity(productId: number) {
    const currentItems = getStoredItems();

    saveItems(
      currentItems.map((item) => {
        if (item.id !== productId || item.quantity <= 1) {
          return item;
        }

        return { ...item, quantity: item.quantity - 1 };
      }),
    );
  }

  function removeFromBasket(productId: number) {
    const currentItems = getStoredItems();
    saveItems(currentItems.filter((item) => item.id !== productId));
  }

  function getItemQuantity(productId: number) {
    const item = items.find((basketItem) => basketItem.id === productId);
    return item ? item.quantity : 0;
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const basketTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <BasketContext.Provider
      value={{
        items,
        itemCount,
        basketTotal,
        addToBasket,
        clearBasket,
        increaseQuantity,
        decreaseQuantity,
        removeFromBasket,
        getItemQuantity,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error("useBasket must be used inside BasketProvider");
  }

  return context;
}
