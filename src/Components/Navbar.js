import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4  bg-[#212121] opacity-98 sticky top-0 z-50 text-white'>
      <div className='flex items-center gap-4'>
        <div>
        <GiHamburgerMenu/>
        </div>
        <div className='flex items-center gap-2 justify-center'>
        <FaYoutube className='text-2xl text-red-500'/>
        <span className='text-xl font-bold'>YouTube</span>
        </div>
        <div className='flex items-center gap-5 pr-5'>
        <form>
            <div className='flex items-center gap-3'>
            
                <div className='flex items-center '>
                <input type='text' placeholder='Search' className='w-[500px] bg-[#121212] px-4 py-2 rounded-l-full focus:outline-none border border-[#333]'/>
                <button className='px-6 py-3 bg-[#333] rounded-r-full border border-l-0 border-[#333] hover:bg-[#444]'>
                <FaSearch className='text-gray-400'/>
                </button>
                <div className='flex items-center gap-8'>
                <button className='px-6 py-3 bg-[#333] rounded-full border border-[#333] hover:bg-[#444]'>
                <FaMicrophone className='gap-3 text-gray-400'/>
                </button>
                </div>
                </div>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Navbar
