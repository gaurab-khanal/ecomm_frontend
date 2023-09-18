import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {  User } from 'lucide-react'
import { Signup } from './../../../auth/signup/Signup';
import Model from '../../../common/Model/Model';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditProduct } from './EditProduct';
import { AddProducts } from './AddProducts';



const apiURL = import.meta.env.VITE_API_BACKEND;


function Products() {


    const deleteSuccess = ()=>{
      return toast.success("Product Deleted Successfully")
    }
    
    const deleteFailure = ()=>{
      console.log("Hiii")
      return toast.error("Error in deleting product")
    }

    const navigate = useNavigate();

    const [oneUserInfo, setOneUserInfo] = useState([]);
    const [userId, setUserId] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [modalType, setModalType] = useState('');
    const [trackDelete, setTrackDelete] =useState(false);
    const [trackUpdate, setTrackUpdate] =useState([]);

    const addAction= ()=>{
      setShowModel(true)
      setModalType('add')
    }
    const deleteAction= (user)=>{
      setShowModel(true)
      console.log(user._id, user.name);
      setOneUserInfo(user);

      setModalType('delete')
    }
 
    const editAction= (userInfo)=>{
      setShowModel(true)
      setModalType('edit')
      console.log(userInfo._id, userInfo.name);
      setUserId(userInfo._id);
      setOneUserInfo(userInfo)
    }
    const [getAllUsers, setAllUsers] = useState([]);
    
    useEffect(() => {
      if (getAllUsers && !showModel){
        getAllUsersAdmin();

      }
      }, [showModel, trackDelete, trackUpdate]); // Fetch data when the component mounts


     

   const getAdminOneUser = (id)=>{
    let token = localStorage.getItem('token');
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': "application/json"
    }
    axios.get(`${apiURL}/admin/user/${id}`, {headers}).then(res=>{
      console.log("This is one user")
      console.log(res.data.user);
      setOneUserInfo(res.data.user)
      console.log('This is one user')  
       

    }).catch(err=>{
        if (err.response && err.response.price === 401) {
            // Unauthorized access
            console.log("Unauthorized access: You don't have permission to access this resource.");
          } else {
            // Other errors
            console.log("An error occurred:", err.message);
          }
    })
   }

   const adminDeleteOneUser = (id, role)=>{
    
    if (role === "admin") {
      setShowModel(false)

      return deleteFailure();
    }

    let token = localStorage.getItem('token');
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': "application/json"
    }
    axios.delete(`${apiURL}/admin/products/${id}`, {headers}).then(res=>{
      console.log("Delete User")
      console.log(res.data.user);
      console.log('This is one user') 
      deleteSuccess()
      setShowModel(false)
      setTrackDelete(!trackDelete);    
    }).catch(err=>{
        if (err.response && err.response.price === 401) {
            // Unauthorized access
            console.log("Unauthorized access: You don't have permission to access this resource.");
          } else {
            // Other errors
            console.log("An error occurred:", err.message);
          }
    })
   }

    const getAllUsersAdmin  = ()=>{
        let token = localStorage.getItem('token');
        const headers = {
          "Authorization": `Bearer ${token}`,
          'Content-Type': "application/json"
        }
        axios.get(`${apiURL}/admin/products`, {headers}).then(res=>{
          console.log(res.data.products);
          setAllUsers(res.data.products);

          console.log('Heyyyyy')
          console.log(getAllUsers);
          
    
        }).catch(err=>{
            if (err.response && err.response.price === 401) {
                // Unauthorized access
                console.log("Unauthorized access: You don't have permission to access this resource.");
              } else {
                // Other errors
                console.log("An error occurred:", err.message);
              }
        })
      }


  return (
    <>
   <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">products</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all products. You can add new products, edit or delete existing ones.
            </p>
          </div>
          <div>
            <button
              onClick={addAction}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Product
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>SN</span>
                      </th>

                      <th
                        scope="col"
                        className="px-20 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Product Name</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Price</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Stock</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Category</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Description</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Manage</span>
                      </th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getAllUsers.map((person, index) => (
                        
                      <tr key={person._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-700">{index + 1}</div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 cursor-pointer " onClick={()=> {getAdminOneUser(person._id);  navigate('/admin/user/details')  }}>
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{person.name}</div>
                              <div className="text-base font-bold text-gray-700">{person.brand}</div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Rs {person.price}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.stock}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.category}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.description}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text text-sm font-medium">
                          <button className="text-gray-700" onClick={()=>editAction(person)}>
                            Edit
                          </button>
                          <button  className="text-red-700 ml-6" onClick={()=> deleteAction(person)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={2000}/>
      </section>
      {showModel && modalType === 'add' &&
      <Model show={showModel} setShowModel={setShowModel}>
               <AddProducts setShowModel={setShowModel}/> 
      </Model>
      }

      {showModel && modalType === 'edit' &&
      <Model show={showModel} setShowModel={setShowModel}>
               <EditProduct  product={oneUserInfo} setShowModel={setShowModel} productId = {userId} setTrackUpdate={setTrackUpdate}/>
      </Model>
      }
      {showModel && modalType === 'delete' &&
      <Model show={showModel} setShowModel={setShowModel}>
               <div>
                <div>Press Yes to Delete</div>
                <div className='flex py-4'
                >
                  <button className='px-2' onClick={()=> setShowModel(false)}>Cancel</button>
                  <button className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white' 
                  onClick={()=> adminDeleteOneUser(oneUserInfo._id, oneUserInfo.role)}>Yes</button>
                </div>
               </div>
      </Model>
      }
   
    </>
  )
}

export default Products