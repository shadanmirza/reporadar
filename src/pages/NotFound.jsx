import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold text-gray-300 mt-2'>404</h1>
        <p className='text-2xl font-bold text-gray-500 mt-5'>Page not found</p>
        <Link to='/' className='mt-6 text-red-600 hover:underline'
        >Go back home</Link>
        
    </div>
  )
}

export default NotFound