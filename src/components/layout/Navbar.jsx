import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import logo from '../../assets/logo.png'




const Navbar = () => {
  return (
    <div className='mx-auto mt-8 flex h-16 w-[calc(100%-40px)] max-w-250 items-center rounded-[17px] border border-[#302e2c] bg-[#171615] px-3 text-white'>

         {/* Logo */}
        <div className='mr-auto flex items-center gap-2.5'>
            <div className='flex h-12 w-13 items-center justify-center rounded-[9px] text-3xl font-bold text-white'>
             <img src={logo} alt="" />
            </div>
            <div className='text-xl font-bold text-white'>
                <Link to='/' >RepoReader</Link>
            </div>
        </div>

         {/* Navigation Links */}
        <div className='flex mr-auto items-center gap-6'>
          
          <Link className='text-[17px] cursor-pointer  font-semibold text-white transition hover:text-gray-400' 
          to='/home' >Home</Link>

          <Link className='text-[17px] font-semibold text-white transition hover:text-gray-400' 
          to='/repo' >RepoProfile</Link>

          <Link className='text-[17px] font-semibold text-white transition hover:text-gray-400' 
          to='/compare' >Compare</Link>

          <Link className='text-[17px] font-semibold text-white transition hover:text-gray-400' 
          to='/about' >About Us</Link>
        </div>
  

        {/* Button */}
        <div className='ml-8 flex items-center gap-5'>
              <Button/>
        </div>        
    </div>
  )
}

export default Navbar