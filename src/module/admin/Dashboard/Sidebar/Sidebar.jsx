import React from 'react'
import { BarChart, Wallet, User, User2, Shirt } from 'lucide-react'
import { Link } from 'react-router-dom'


export function Sidebar() {

  const sideBarList = [
    {
        label: "Dashboard",
        to: 'dashboard',
        icon: <BarChart/>
    },
    {
      label: "Users",
      to: 'users',
      icon: <User2/>
    },
    {
      label: "Products",
      to: 'products',
      icon: <Shirt/>
    }
  ]

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">Admin Dashboard</label>
            {sideBarList.map((sideBar, index)=>
              <Link key={index}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={sideBar.to}
            >
              {sideBar.icon}
              <span className="mx-2 text-sm font-medium">{sideBar.label}</span>
            </Link>
            )}

          </div>
         
        </nav>
      </div>
    </aside>
  )
}
