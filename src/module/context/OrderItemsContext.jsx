import { createContext } from "react";

export const OrderItemsContext = createContext({
    orders: [],
    addToCart: () => {},
    removeFromCart: () => {},
  });