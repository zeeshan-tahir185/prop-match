import React from 'react'
import HomeHero from './components/home/HomeHero'
import Info from './components/home/Info'
import Testimonials from './components/home/Testimonials'
import Partners from './components/home/Partners'
import Features from './components/home/Features'
import Strategy from './components/home/Strategy'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const page = () => {
  return (
    <div className='mt-[100px]'>
      <Navbar />
      <HomeHero />
      <Info />
      <Testimonials />
      <Partners />
      <Features />
      <Strategy />
      <Footer />
    </div>
  )
}

export default page
