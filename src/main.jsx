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
import PrivateRoute from './module/route/PrivateRoute.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='signup' element={<HandleSignUpLogin><Signup/></HandleSignUpLogin>}/>
      <Route path='login' element={<HandleSignUpLogin><Login/></HandleSignUpLogin>}/>
      <Route path='forgetpassword' element={<ForgetPassword/>}/>
      <Route path='resetpassword/:token' element={<ResetPassword/>}/>
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
   <UserInfoProvider>

   <RouterProvider router={router}/>
   </UserInfoProvider>
  </React.StrictMode>,
)
