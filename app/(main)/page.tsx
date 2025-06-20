import Gallery from '@/components/Gallery'
import HeroSection from '@/components/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div className=' min-h-screen  bg-gray-50 dark:bg-gray-950 text-white'>
      <HeroSection/>
      <Gallery/>
    </div>
  )
}

export default page