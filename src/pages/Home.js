import React from 'react'

import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import WomanComputer from '../img/WomanComputer.png'

const Home = () => {
  return (
    <div>
        <Navbar currentElement='Inicio'/>        
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:container md:mx-auto text-center mt-8">
            <div className='mx-0'>
                <img src={WomanComputer} alt="Woman with computer" />
            </div>
            <div>
                <h2 className='font-bold'>Empresas que confían en MyJobsRoom</h2>
            </div>
        </div>
    </div>
  )
}

export default Home