import React from 'react'
import { NavLink } from 'react-router-dom'
import bg from "../../assets/bg.jpg"

const Sidebar = () => {
  return (
    <div
      className="h-full flex flex-row sticky top-0"
      x-data="{ sidenav: true }"
      style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
      >
      <div
        id="sidebar"
        className="bg-clip-padding bg-opacity-90 bg-gray-100 h-screen md:block w-30 md:w-60 lg:w-[18rem] overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
        style={{backdropFilter: `blur(20px)`}}
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