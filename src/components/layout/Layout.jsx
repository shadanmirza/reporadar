import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'



const Layout = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors'>
         <Navbar/>
         {/* <Sidebar/> */}
        <main className="flex-1">
             <Outlet />
         </main>
          
        <Footer/> 

        </div>
    </div>
  )
}

export default Layout