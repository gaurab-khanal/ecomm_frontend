import React from 'react'
import NavBar from "./module/common/NavBar/NavBar"
import Footer from './module/common/Footer/Footer'
import HomePage from './module/Home/HomePage'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <>
       <NavBar/>
       <Outlet/>
       <Footer/>
    </>
  )
}

export default App