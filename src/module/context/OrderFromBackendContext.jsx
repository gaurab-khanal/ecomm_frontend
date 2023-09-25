import { createContext } from "react";

export const OrderFromBackend = createContext({
    getAllOrder: [],
    totalOrder:0,
    getOrderInfo: ()=>{},
    getMyOrders: ()=>{}
  });