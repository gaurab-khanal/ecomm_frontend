import React, {useState, useEffect } from 'react';
import { OrderItemsContext } from './OrderItemsContext';


export const OrderItemsProvider = ({children}) => {

    const [orders, setOrder] = useState(()=>{
        const savedCart = JSON.parse(localStorage.getItem('cart'))
        return savedCart || [];
    });

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
         
            // if(orders.length>0){
                localStorage.setItem('cart', JSON.stringify(orders));
            // }
        
        } catch (error) {
          console.error("Error saving cart to local storage:", error);
        }
      }, [orders]);

    const addToCart = (product)=>{
        try {
            const existingProductIndex = orders.findIndex((item) => item.product === product.product);

            if (existingProductIndex !== -1) {
              const updatedOrder = [...orders];
              updatedOrder[existingProductIndex].quantity += product.quantity;
              setOrder(updatedOrder);
              alert("Product updated in cart.");
            } else {
              setOrder([...orders, product]);
              alert("Product added to cart.");
            }
          } catch (error) {
            console.error("Error adding to cart:", error);
          }
    };

    const removeFromCart = (product)=>{
        const updatedOrder = orders.filter((item)=> item.product !== product.product)
        setOrder(updatedOrder);
    }

    const orderContextValue = {
        orders,
        addToCart,
        removeFromCart,
      };

      return (
        <OrderItemsContext.Provider value={orderContextValue}>
          {children}
        </OrderItemsContext.Provider>
      );
}

export default OrderItemsProvider