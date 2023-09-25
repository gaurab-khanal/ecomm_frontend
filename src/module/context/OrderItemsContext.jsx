import { createContext } from "react";

export const OrderItemsContext = createContext({
    orders: [],
    orderInfo: {},
    shippingInfo: {},
    setShippingInfo: ()=>{},
    totalAmount: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    orderSuccess: ()=>{}
  });