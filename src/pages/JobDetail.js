import React, {useState} from 'react'
import jobList from '../jobList'
import Navbar from '../components/Navbar'

import {
  useParams
} from "react-router-dom";


const JobDetail = () => {
  
  let { id } = useParams();
  //const [job, setJob] = useState({})

 let job = jobList.find(elem => elem.id === id);

  return (
    <>
      <Navbar />
      <div className='md:container md:mx-auto text-center mt-8'>

        <h1 className='font-bold text-xl'>{job.title}</h1>

        <div className='jobDetails mt-5 text-left'>

          <ul>
            <li><span className='font-bold'>Fecha de publicación:</span> {job.dateposted}</li>
            <li><span className='font-bold'>Empresa:</span>  {job.company}</li>
            <li><span className='font-bold'>Ubicaciones:</span> 
              <ul>
                {job.location.map((elem, index) =>(
                  <li key={index}>{elem.city}, {elem.country}</li>
                ))}
              </ul>
            </li>
          </ul>

        </div>

        <h1 className='font-bold text-lg'>Descripción del puesto</h1>

        <p>{job.description}</p>


        { 
          job.benefits.length > 0 && (
            <>
              <h2 className='font-bold mt-4'>Beneficios</h2>
              <ul>
                {job.benefits.map((elem, index) => (
                  <li key={index}>{elem.name}</li>
                ))}
              </ul>
            </>
          )
        }


        
      </div>
    </>
    
  )
}

export default JobDetail