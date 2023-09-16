import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  return (

        <div className='flex'>
        {/* Sidebar */}
        <Sidebar/>
        {/* content page */}
        <div className='flex-1 p-8'>
           <Outlet/>
        </div>
    </div>

  )
}

export default Dashboard