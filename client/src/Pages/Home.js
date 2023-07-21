import React from 'react'
import BannerSection from '../components/BannerSection'
import AboutSection from '../components/AboutSection'


import ChooseSection from '../components/ChooseSection'
import ClientSection from '../components/ClientSection'
import ContactSection from '../components/ContactSection'
import CarList from '../components/CarList'

const Home = () => {
  return (
    <div>
      <BannerSection />
      <AboutSection />
      <CarList />
      <ChooseSection />
      <ClientSection />
      <ContactSection />
    </div>
  )
}

export default Home
