import {useState, useEffect} from 'react'

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";



import Navbar from '../components/Navbar'

import {
  useParams
} from "react-router-dom";


const JobDetail = () => {
  
  let { id } = useParams();

  const [job, setJob] = useState({})

  useEffect(() => {

    const getData = async () => {
 
        try {
          const docRef = doc(db, "jobs", id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setJob(docSnap.data());
          } else {

            console.log("No such document!");
          }
            
        } catch (error) {
            console.log(error)
        }
    }
    getData()

  }, [id])


  return (
  
      <>
      
      <Navbar />
      
      <div className='md:container md:mx-auto text-center mt-8'>

      {Object.keys(job).length > 0 ? (

        <>
          <h1 className='font-bold text-xl'>{job.title}</h1><div className='jobDetails mt-5 text-left'>

            <ul>
              <li><span className='font-bold'>Fecha de publicación:</span> {job.dateposted}</li>
              <li><span className='font-bold'>Empresa:</span>  {job.company}</li>
              <li><span className='font-bold'>Ubicaciones:</span>
                <ul>
                  {job.locations.map((elem, index) => (
                    <li key={index}>{elem.city}, {elem.country}</li>
                  ))}
                </ul>
              </li>
            </ul>

          </div><h1 className='font-bold text-lg'>Descripción del empleo</h1><p>{job.description}</p>


           <h2 className='font-bold mt-4'>Beneficios</h2>
           <ul>
                {job.benefits.map((elem, index) => (
                  <li key={index}>{elem.benefit}</li>
                ))}
          </ul>

          <hr/>

          <h2 className='font-bold mt-4'>¿Cómo aplicar?</h2>

          <p>Envía tu hoja de vida al correo: {job.applyemail}</p>

        </>

      ):(
        <p>Cargando descripción...</p>
      )
    
    
    }

    </div>

    </>
      
    
  )
}

export default JobDetail