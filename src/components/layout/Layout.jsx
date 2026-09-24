import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import PagesNavbar from './PagesNavbar'
import BenefitsSection from './BenefitsSection'
import FeaturesSection from './FeaturesSection'
import AnalyticsSection from './AnalyticsSection'
import FAQSection from './FAQSection'



const Layout = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors'>
         <Navbar/>
         
         <div className='flex-1'>
          <HeroSection/>
         </div>

         <BenefitsSection/>
         
         <FeaturesSection/>

         <AnalyticsSection/>

         <FAQSection/>
          
         <Footer/> 

        </div>
    </div>
  )
}

export default Layout
