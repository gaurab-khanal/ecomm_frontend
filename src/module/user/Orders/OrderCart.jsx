import React from 'react'

const OrderCart = ({id, createdAt, totalAmount, orderStatus, orderItems}) => {
  return (
    <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              {[
                ['Order ID', id],
                ['Date', createdAt.split("T")[0]],
                ['Total Amount', `Rs ${totalAmount}`],
                ['Order Status', orderStatus],
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
  )
}

export default OrderCart