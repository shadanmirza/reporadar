import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'



const Layout = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors'>
         <Navbar/>

         
         <div className='flex-1'>
          <Sidebar/>
         </div>
        
          
        <Footer/> 

        </div>
    </div>
  )
}

export default Layout