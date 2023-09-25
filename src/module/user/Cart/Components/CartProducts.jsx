import React, { useContext, useState } from 'react'
import { Heart, Trash } from 'lucide-react'
import { OrderItemsContext } from '../../../context/OrderItemsContext'

const CartProducts = ({product}) => {

  const {removeFromCart, addToCart} = useContext(OrderItemsContext);

  const [updateQuantity, setUpdateQuantity] = useState(product.quantity || 1);
  
  const add_quantity = (newQuantity)=>{
    if(newQuantity>0){
      product.quantity = newQuantity;
      setUpdateQuantity(product.quantity);
      addToCart(product)

    }
  }

  return (

    <div key={product.product} className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a href={product.href} className="font-semibold text-black">
                                {product.name} 
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;Rs {product.price}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">{product.discount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button"  onClick={()=>{add_quantity(product.quantity-1)}} className="h-7 w-7">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={updateQuantity}
                      />
                      <button type="button" onClick={()=>{add_quantity(product.quantity+1)}} className="flex h-7 w-7 items-center justify-center">
                        + 
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" onClick={()=>removeFromCart(product)} className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
  )
}

export default CartProducts