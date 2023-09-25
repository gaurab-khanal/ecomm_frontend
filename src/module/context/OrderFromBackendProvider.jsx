import React, { useState, useEffect } from 'react'
import { OrderFromBackend } from './OrderFromBackendContext';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_BACKEND;

export const OrderFromBackendProvider = ({children}) => {

    const [getAllOrder, setAllOrder] = useState([]);

    const [totalOrder, setTotalOrder] = useState(0);

    const getMyOrders  = ()=>{
        let token = localStorage.getItem('token');
        const headers = {
          "Authorization": `Bearer ${token}`,
          'Content-Type': "application/json"
        }
        axios.get(`${apiURL}/order/myorder`, {headers}).then(res=>{
          setAllOrder(res.data.order);
          setTotalOrder(res.data.order.length)
    
        }).catch(err=>{
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                console.log("Unauthorized access: You don't have permission to access this resource.");
              } else {
                // Other errors
                console.log("An error occurred:", err.message);
              }
        })
      }
    
      useEffect( ()=>{
        getMyOrders();
      },[])
      
     


    const updatedValues = {
        totalOrder,
        getAllOrder,
        getMyOrders
    }

  return (
   <OrderFromBackend.Provider value={updatedValues}>
    {children}
   </OrderFromBackend.Provider>
  )
}

export default OrderFromBackendProvider