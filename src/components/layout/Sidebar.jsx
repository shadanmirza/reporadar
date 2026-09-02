import React from 'react'
import Button from '../ui/Button'
import { ArrowRight } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='mt-25 '>
        <div className=' mx-auto flex-col flex justify-center items-center w-[calc(100%-40px)] max-w-250 h-80'>
          <h1 className="font-inter text-4xl text-center font-extrabold leading-tight tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
           Analyze{' '}
           
           <span className="bg-linear-to-r from-pink-500 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">Github Repos</span>{' '}
           
            <br />
            like a Pro
          </h1>
          
          <p
            className="
              mx-auto max-w-2xl
              text-center
              text-lg
              text-gray-600 dark:text-gray-400
              sm:text-xl
            "
          >
            Enter any repository name and get beautiful insights
            into its health, community, and activity — all in one
            dashboard.
          </p>
            
          <Button variant='secondary' size='lg' className='mt-4 -ml-3 '>Get Started <ArrowRight/>
             </Button>
        </div>
    </div>
  )
}

export default Sidebar