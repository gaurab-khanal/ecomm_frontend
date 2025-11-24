import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { OrderItemsContext } from "../context/OrderItemsContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiURL = import.meta.env.VITE_API_BACKEND;



const HomePage = () => {

  const [allProducts, setAllProducts] = useState([]);
  const { addToCart} = useContext(OrderItemsContext);
  const token = localStorage.getItem('token');

  const getAllProducts  = ()=>{
 
    axios.get(`${apiURL}/products`).then(res=>{
      console.log(res.data.productsObj);
      setAllProducts(res.data.productsObj)

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

  useEffect(()=>{
    getAllProducts();
  },[])

  const handleCart = (product)=>{
    if (!token){
      return toast.error("Login to access this feature");
    }
    const neccesaryDetails = {
      name: product.name,
      quantity: 1,
      image: product.photos[0].secure_url,
      price: product.price,
      product: product._id
    }
    addToCart(neccesaryDetails);
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {allProducts.map((product, index) => (
        <div key={index} className="rounded-md border">
          <img
            src={product.photos[0].secure_url}
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[300px]"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">{product.name}</h1>
            <p className="mt-3 text-sm text-gray-600">
            {product.description}
            </p>
    
            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Prize : </span>
              <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
               RS {product.price}
              </span>
              
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={()=>handleCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </div>
      ))}
    </div>
  )
}

export default HomePage
