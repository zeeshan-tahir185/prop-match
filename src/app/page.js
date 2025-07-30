import React from 'react'
import HomeHero from './components/home/HomeHero'
import Info from './components/home/Info'
import Testimonials from './components/home/Testimonials'

const page = () => {
  return (
    <div className='mt-[100px]'>
      <HomeHero />
      <Info />
      <Testimonials />
    </div>
  )
}

export default page
