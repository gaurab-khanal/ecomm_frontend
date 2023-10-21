import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from './module/Home/HomePage.jsx';
import { Signup } from './module/auth/signup/Signup.jsx';
import { Login } from './module/auth/login/Login.jsx';
import { ForgetPassword } from './module/auth/forgetPassword/Forgetpassword.jsx';
import { ResetPassword } from './module/auth/forgetPassword/ResetPassword.jsx';
import HandleSignUpLogin from './module/route/HandleSignUpLogin.jsx';
import UserInfoProvider from './module/context/UserInfoProvider.jsx';
import Dashboard from './module/admin/Dashboard/Dashboard.jsx';
import Users from './module/admin//Dashboard/Users/Users.jsx';
import UserDetails from './module/admin/Dashboard/Users/UserDetails.jsx';
import Products from './module/admin/Dashboard/Products/Products.jsx';
import AdminRoute from './module/route/AdminRoute.jsx';
import { Cart } from './module/user/Cart/Cart.jsx';
import OrderItemsProvider from './module/context/OrderItemsProvider.jsx';
import Order from './module/user/Orders/Order.jsx'
import { OrderFromBackendProvider } from './module/context/OrderFromBackendProvider.jsx';
import ShippingInfo from './module/user/Cart/ShippingInfo';
import EsewaSuccess from './module/user/Cart/esewa/EsewaSuccess.jsx';
import EsewaFailure from './module/user/Cart/esewa/EsewaFailure.jsx';
import OrderDetails from './module/user/Orders/OrderDetails.jsx';
import Contact from './module/Contact/Contact.jsx';
import About from './module/About/About.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='signup' element={<HandleSignUpLogin><Signup/></HandleSignUpLogin>}/>
      <Route path='login' element={<HandleSignUpLogin><Login/></HandleSignUpLogin>}/>
      <Route path='forgetpassword' element={<ForgetPassword/>}/>
      <Route path='resetpassword/:token' element={<ResetPassword/>}/>
      <Route path='users'>
        <Route path='cart' element={<Cart/>}/>
        <Route path='orders' element={<Order/>}/>
        <Route path='shippingInfo' element={<ShippingInfo/>}/>
        <Route path='esewa_payment_success' element={<EsewaSuccess/>}/>
        <Route path='esewa_payment_failed' element={<EsewaFailure/>}/>
        <Route path='orders/:orderId' element={<OrderDetails/>}/>
      </Route>
      <Route path='admin' element={<AdminRoute><Dashboard/></AdminRoute>}>
        <Route path='dashboard' element={<HomePage/>}></Route>
        <Route path='users' element={<Users/>}></Route>
        <Route path='user/details' element={<UserDetails/>}></Route>
        <Route path='products' element={<Products/>}></Route>
      </Route>
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <OrderFromBackendProvider>
    <OrderItemsProvider>
   <UserInfoProvider>
   <RouterProvider router={router}/>
   </UserInfoProvider>
   </OrderItemsProvider>
   </OrderFromBackendProvider>
  </React.StrictMode>,
)
