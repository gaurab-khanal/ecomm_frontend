import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderCart from './OrderCart';


export default function OrderDetails() {
    const { orderId } = useParams();

    const [orderDetails, setOrderDetails] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    

    const apiURL = import.meta.env.VITE_API_BACKEND;


    let token = localStorage.getItem('token');
    const headers = {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }

    const getOrderDetail = async () => {
        await axios.get(`${apiURL}/order/${orderId}`, { headers })
            .then(res => {
                console.log(res.data.order);
                setOrderDetails(res.data.order);
                console.log(orderDetails)
                const {orderItems} = res.data.order; 
                setOrderItems(orderItems)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getOrderDetail();

    }, [])

    return (
        <><div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
        <h2 className="text-3xl font-bold">Order Details</h2>
        <div className="mt-3 font-bold text-sm">
          Order Placed Successfully
        </div>
            <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              {[
                ['Order ID', orderDetails._id],
                ['Date', orderDetails.createdAt?.split("T")[0]],
                ['Total Amount', `Rs ${orderDetails.totalAmount}`],
                ['Order Status', orderDetails.orderStatus],
              ].map(([key, value]) => (
                <div key={key} className="mb-4">
                  <div className="text-sm font-semibold">{key}</div>
                  <div className="text-sm font-medium text-gray-700 ">{value}</div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
        <div className="flex-1">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
              {orderItems.map((product) => (
                <li
                  key={product._id}
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={product.image}
                        alt={product.image}
                      />
                    </div>

                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{product.name}</p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">Rs {product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      </div>
</div>
        </>

    )
}