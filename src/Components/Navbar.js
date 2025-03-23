import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-[#212121] opacity-98 sticky top-0 z-50 text-white'>
      <div className='flex items-center gap-4'>
        <div>
          <GiHamburgerMenu />
        </div>
        <div className='flex items-center gap-2 justify-center'>
          <FaYoutube className='text-2xl text-red-500' />
          <span className='text-xl font-bold'>YouTube</span>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center max-w-[800px]'>
        <form className='w-full'>
          <div className='flex items-center justify-center gap-3'>
            <div className='flex items-center w-full'>
              <input type='text' placeholder='Search' className='w-full max-w-[600px] bg-[#121212] px-4 py-2 rounded-l-full focus:outline-none border border-[#333]' />
              <button className='px-6 py-3 bg-[#333] rounded-r-full border border-l-0 border-[#333] hover:bg-[#444]'>
                <FaSearch className='text-gray-400' />
              </button>
            </div>
            <div className='flex items-center'>
              <button className='px-3 py-3 bg-[#333] rounded-full border border-[#333] hover:bg-[#444]'>
                <FaMicrophone className='text-gray-300' />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='flex items-center gap-4'>
        <div className='items-center flex gap-3 px-6 py-2 bg-[#333] rounded-full border border-[#333] hover:bg-[#444] text-white-300'>
          <FaPlus className='flex items-center' /><span className='font-bold'>Create</span>
        </div>
        <div>
          <IoMdNotificationsOutline className='font-bold text-3xl' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
