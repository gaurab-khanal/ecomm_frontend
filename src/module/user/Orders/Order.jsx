import React , {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import OrderCart from './OrderCart';
import { OrderFromBackend } from '../../context/OrderFromBackendContext';







const Order = () => {
  
  
  
  const {getOrderInfo, getAllOrder} = useContext(OrderFromBackend)





  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Order Details</h2>
      <div className="mt-3 text-sm">
        Check the status of recent and old orders & discover more products
      </div>
      {getAllOrder.map((eachOrder)=>(
        <OrderCart key={eachOrder._id}
         id={eachOrder._id}
         createdAt={eachOrder.createdAt}
         totalAmount= {eachOrder.totalAmount}
         orderStatus= {eachOrder.orderStatus}
         orderItems= {eachOrder.orderItems}
         />
      ))}
    </div>
  )
}

export default Order;
