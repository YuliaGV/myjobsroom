import React, {useState, useEffect} from 'react'

import Hero from '../components/Hero'
import Navbar from '../components/Navbar'


import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


import WomanComputer from '../img/WomanComputer.png'



const Home = () => {


  const [companies, setCompanies] = useState([]);



  useEffect(() => {

    const getData = async () => {
 
        try {
            const querySnapshot = await getDocs(collection(db, "companies"));
            setCompanies(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            
        } catch (error) {
            console.log(error)
        }
    }
    getData()

}, [])


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

                <div className="grid grid-cols-3 md:grid-cols-3 gap-1 mt-8 mx-0">
                  {companies.length > 0  &&

                    companies.map(company => (
                      <div key={company.id}>
                        <img className = '' src={company.profilePhoto.img} alt='Logo' />
                      </div>
                    ))
                  
                  
                  }
          
                </div>


            </div>


        </div>
    </div>
  )
}

export default Home