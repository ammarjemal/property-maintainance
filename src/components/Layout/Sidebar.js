import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div
        id="view"
        className="h-full flex flex-row sticky top-0"
        x-data="{ sidenav: true }"
        >
          <button
            className="p-2 border-2 bg-white shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
          >
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="sidebar"
            className="bg-gray-100 h-screen md:block w-30 md:w-60 lg:w-80 overflow-x-hidden transition-transform duration-300 ease-in-out"
            x-show="sidenav"
          >
            <div className="space-y-6 md:space-y-10 mt-10">
                <h1 className="md:block font-normal text-sm md:text-xl text-center text-[#14A9F9] text-[55.6px]">
                    LOGO
                </h1>
                <h2 className='font-bold px-3'>Menu</h2>

              <div id="menu" className="flex flex-col space-y-2">
                <NavLink
                  to="/"
                  exact
                  activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                  className="text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Dashboard</span>
                </NavLink>
                <NavLink
                  to="/management"
                  activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                  className="text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Service Management</span>
                </NavLink>
                <NavLink
                  to="/security"
                  activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                  className="text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Security</span>
                </NavLink>
                <NavLink
                  to="/support"
                  activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                  className="text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Customer support</span>
                </NavLink>
                <NavLink
                  to="/payments"
                  activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                  className="text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <span className="">Payments and Transactions</span>
                </NavLink>
              </div>
            </div>
            <div className='mt-8'>
                <h2 className='font-bold px-3 space-y-2'>Notifications</h2>
                <NavLink
                    to="/advertisments"
                    activeClassName='text-[#14A9F9] border-l-8 border-[#14A9F9]'
                    className="block w-full mt-3 text-sm font-medium py-2 px-10 hover:bg-[#14A9F9] hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                    <span className="">Advertisments</span>
                </NavLink>
            </div>
          </div>
        </div>
  )
}

export default Sidebar;