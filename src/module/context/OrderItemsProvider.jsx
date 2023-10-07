import React, { useState, useEffect } from 'react';
import { OrderItemsContext } from './OrderItemsContext';


export const OrderItemsProvider = ({ children }) => {

  // to track orders
  const [orders, setOrder] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    return savedCart || [];
  });
  
  const [shippingInfo, setShippingInfo] = useState(() => {
    const savedInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    return savedInfo || {};
  });

  const [totalAmount, setTotalAmount] = useState(0);
  // set JSON to send to backend // initial values // orderInfo to sent to backend


  const [orderInfo, setOrderInfo] = useState({
    shippingInfo: shippingInfo,
    payment_method: "esewa",
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
    orderItems: orders,
  });

  // for order items to save to localstorage
  // load cart items from local storage on component mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setOrder(savedCartItems);
    }
  }, []);

  // save cart items to local storage whenever the orders state changes

  


  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(orders));

    } catch (error) {
      console.error("Error saving cart to local storage:", error);
    }
  }, [orders]);

  const addToCart = (product) => {
    try {
      const existingProductIndex = orders.findIndex((item) => item.product === product.product);

      if (existingProductIndex !== -1) {
        const updatedOrder = [...orders];
        setOrder(updatedOrder);
      } else {
        setOrder([...orders, product]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  // to calculate total amount and render in frontend and sent to backend
  useEffect(() => {
    let total = 0;
    if (orders.length > 0) {
      orders.forEach(order => {
        total += order.price * order.quantity;
      })
    }
    setTotalAmount(total);
  }, [orders]);


  // info that are being initialized which will set orderInfo and send to backend
  const infos = {
    shippingInfo: shippingInfo,
    paymentInfo: {
      id: ""
    },
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: totalAmount,
    orderItems: orders
  }

  // store the info on localstorage with infos name so that 
  // it can be accessed easily to send data to backend
  useEffect(() => {
    setOrderInfo(infos);
    localStorage.setItem('orderInfo', JSON.stringify(infos));
  }, [orders, totalAmount, shippingInfo]);


  const removeFromCart = (product) => {
    const updatedOrder = orders.filter((item) => item.product !== product.product)
    setOrder(updatedOrder);
  }

  const orderSuccess = ()=>{
    setOrder([]);
  }

  const [checkOutOrders, setCheckOutOrders] = useState(0)

  const orderContextValue = {
    orders,
    checkOutOrders,
    totalAmount,
    shippingInfo,
    setShippingInfo,
    addToCart,
    orderInfo,
    orderSuccess,
    removeFromCart,
  };

  return (
    <OrderItemsContext.Provider value={orderContextValue}>
      {children}
    </OrderItemsContext.Provider>
  );
}

export default OrderItemsProvider