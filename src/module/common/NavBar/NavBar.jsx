import React, { useContext, useEffect } from 'react'
import { Menu, X, ShoppingCart, Truck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../../context/UserInfoContext'
import { OrderItemsContext } from './../../context/OrderItemsContext';
import { OrderFromBackend } from '../../context/OrderFromBackendContext';

const menuItems = [
  {
    name: 'Home',
    href: '/home',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Dashboard',
    href: '/admin',
  },
]

const NavBar = () => {

  const { user } = useContext(UserInfoContext)

  const {totalOrder} = useContext(OrderFromBackend)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    
    navigate('/')
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const {orders} = useContext(OrderItemsContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to='/'>
          <div className="inline-flex items-center space-x-2">
            <span>
              <svg width="50"
                height="40" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                  <path d="M4,12,2,8,6,3H9a3,3,0,0,0,6,0h3l4,5-2,4-3-2V21H7V10Z"></path></g></svg>
            </span>
            <span className="font-bold">T-Shirt</span>
          </div>
        </Link>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (

              <li key={item.name}>
                {item.name != "Dashboard" ?
                  <Link
                    to={item.href}
                    className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}


                  </Link>
                  : user.role === 'admin' ?
                    <Link
                      to={item.href}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}


                    </Link>
                    : ''}

              </li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">

          {!localStorage.getItem("token") &&
            <Link to='/signup'>
              <button
                type="button"
                className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign Up
              </button>
            </Link>
          }
          {!localStorage.getItem('token') &&
            <Link to='/login'>
              <button
                type="button"
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log In
              </button>
            </Link>}

          {localStorage.getItem("token") &&
            <div className='flex items-center'>
              <span className='mr-4'>{user.name}</span>
              <span className='cursor-pointer' onClick={()=>navigate('/users/cart')}>
                <span className='text-xs px-3 mr-4 bg-red-200 text-red-800 rounded-full'>
                {orders.length}
                </span>
                <ShoppingCart/>

              </span>
              <span className='cursor-pointer' onClick={()=>navigate('/users/orders')}>
                <span className='text-xs px-3 mr-4 bg-red-200 text-red-800 rounded-full'>
                {totalOrder}
                </span>
               <Truck/>

              </span>
              <Link to='/'>
                <button
                  type="button" onClick={() => logout()}
                  className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log Out
                </button>
              </Link>
            </div>
          }
        </div>

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg width="50"
                        height="40" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                          <path d="M4,12,2,8,6,3H9a3,3,0,0,0,6,0h3l4,5-2,4-3-2V21H7V10Z"></path></g></svg>
                    </span>
                    <span className="font-bold">T-Shirt</span>
                  </div>

                  <div className="mr-2">

                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >

                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>

                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-2 space-y-2">
                  {!localStorage.getItem('token') &&
                    <Link to="/signup">
                      <button
                        type="button"
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Sign Up
                      </button>
                    </Link>}
                  {!localStorage.getItem('token') &&
                    <Link to='/login'>
                      <button
                        type="button"
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Log In
                      </button>
                    </Link>
                  }

                  {localStorage.getItem("token") &&
                    <div>

                      <Link to='/'>
                        <button
                          type="button" onClick={() => logout()}
                          className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Log Out
                        </button>
                      </Link>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar