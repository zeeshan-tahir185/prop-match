import React from 'react'
import HomeHero from './components/home/HomeHero'
import Info from './components/home/Info'
import Testimonials from './components/home/Testimonials'
import Partners from './components/home/Partners'
import Features from './components/home/Features'
import Strategy from './components/home/Strategy'

const page = () => {
  return (
    <div className='mt-[100px]'>
      <HomeHero />
      <Info />
      <Testimonials />
      <Partners />
      <Features />
      <Strategy />
    </div>
  )
}

export default page
