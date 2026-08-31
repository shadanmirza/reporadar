import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'



const Layout = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors'>
         <Navbar/>
         <Sidebar/>
         

        </div>
    </div>
  )
}

export default Layout