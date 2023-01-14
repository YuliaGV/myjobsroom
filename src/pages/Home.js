import {useState, useEffect} from 'react'

import Hero from '../components/Hero'
import Navbar from '../components/Navbar'


import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


import {
  useNavigate
} from "react-router-dom";



import WomanComputer from '../img/WomanComputer.png'

const Home = () => {


  const navigate = useNavigate();

 
  const showJob = (id) => {
    navigate(`/job/${id}`);
    }



  const [companies, setCompanies] = useState([]);

  const [JobsByCompany, setJobsByCompany] = useState([]);

  


  useEffect(() => {

    const getData = async () => {
 
        try {
            const querySnapshot = await getDocs(collection(db, "companies"));
            const companies = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

            setCompanies(companies.slice(0,6));

            
        } catch (error) {
            console.log(error)
        }
    }
    getData()

}, [])

  const showJobs = async (company) => {
        try {
          const q = query(collection(db, "jobs"), where("company", "==", company.name));
          const querySnapshot = await getDocs(q);
          setJobsByCompany(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
          
          
      } catch (error) {
          console.log(error)
      }
  }


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

                <div className="grid grid-cols-3 md:grid-cols-3 gap-1 mt-8 mb-8 mx-0">
                  {companies.length > 0  &&

                    companies.map((company) => (
                        <div key={company.id}>
                          <button onClick={() => showJobs(company)}>
                            <img src={company.profilePhoto.img} alt='Logo' />
                          </button>
                        </div>
                    ))
                  
                  
                  }
    
                </div>
            </div>
        </div>

        <div className="md:container md:mx-auto text-center mt-8 mb-8" >

          {JobsByCompany.length > 0 && (
            <div>
              <h3>Ofertas disponibles en {JobsByCompany[0].company}</h3>
          
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Publicado
                            </th>
                            
                            <th scope="col" className="px-6 py-3">
                                Locación
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo de empleo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Ver detalles</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {JobsByCompany.map(job =>(
                      <tr className="bg-white border-b hover:bg-gray-50">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              {job.title}
                          </th>
                          <td className="px-6 py-4">
                              {job.dateposted}
                          </td>
                          
                          <td className="px-6 py-4">
                              {job.locations[0].city}, {job.locations[0].country}
                          </td>
                          <td className="px-6 py-4">
                              {job.jobtype}
                          </td>
                          <td className="px-6 py-4">
                              {job.salary}
                          </td>
                          <td class="px-6 py-4 text-right">
                            <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded" onClick={() => showJob(job.id)}>
                                <span className="px-1 py-1">Detalles</span>
                            </button>
                          </td>
                      </tr>

                    ))}
                      
                    </tbody>
                </table>

              </div>
              
            </div>
          )}

          
        </div>





    </div>
  )
}

export default Home