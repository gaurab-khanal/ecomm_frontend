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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='forgetpassword' element={<ForgetPassword/>}/>
      <Route path='resetpassword/:token' element={<ResetPassword/>}/>

    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
