import React, {useState, useContext } from 'react'
import FavoritesContext from '../context/FavoritesContext';


import {
    useNavigate
  } from "react-router-dom";

import { MdLocationOn,MdFavoriteBorder,MdFavorite} from 'react-icons/md';




const JobCard = ({job}) => {

  const navigate = useNavigate();

  const {favorites, setFavorites } = useContext(FavoritesContext);


  const addToFavorites = (job) =>{
    setFavorites([...favorites, job])
  }

  const removeFromFavorites = (job) =>{
    setFavorites(favorites.filter(fav => fav.id !== job.id))
  }


  const isFavorite = (job) => {
    return favorites.some(fav => fav.id === job.id);
  }


  const [showModal, setShowModal] = useState(false);

  const showJob = (id) => {
    navigate(`/job/${id}`);
    }

  


  return (
    <>
    <div className="rounded overflow-hidden shadow-lg border">
        <div className="px-6 py-4 flex flex-row justify-between">
            <div>
                <p className="text-xs text-right text-gray-700 datePosted">
                Publicado: {job.dateposted}
                </p>
            </div>
            <div>
              { job.remote && (
                  <div className='text-xs font-bold text-amber-600'><p>Remoto</p></div>
              )}
            </div>
        </div>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 title">{job.title}</div>

            <div className='flex flex-row justify-center items-center mb-4'>

              <div><img src={job.logo.img} alt='logo'/></div>

              <div>
                <p className="text-gray-700 text-md mb-2 company">
                {job.company}
                </p>
            
                <div className='flex flex-row justify-center'>
                    <div>
                      <MdLocationOn />
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm  mb-2 location">
                        {job.locations[0].city}, {job.locations[0].country}
                      </p>
                    </div>
                </div>
              </div>
             
  
            </div>

          
         
            {
            job.locations.length > 1 && 
            (
            <button
                className="bg-transparent text-amber-600 text-sm active:bg-gray-100 
              font-bold px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Ver +{job.locations.length-1} ubicaciones
            </button>
            )}
            
        </div>

       
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 salary">{job.salary}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 jobtype">{job.jobtype}</span>
        </div>

        <div className="px-6 pt-4 pb-2 flex flex-row justify-between">
            <div>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded" onClick={() => showJob(job.id)}>
                    <span className="px-1 py-1">Detalles</span>
                </button>
            
                
            </div>
            <div>
                  { isFavorite(job) ? 

                    (
                    <button className="bg-white text-cyan-600 font-bold rounded text-2xl" onClick={() => removeFromFavorites(job)}>
                         <MdFavorite/>
                    </button>
                    ):
                    (
                      <button className="bg-white text-cyan-600 font-bold rounded text-2xl" onClick={() => addToFavorites(job)}>
                         <MdFavoriteBorder/>
                      </button>
                    )

                  }

            </div>
        </div>
    </div>

    {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-lg">Otras ubicaciones para la oferta <span className='font-bold'>{job.title}</span></h3>
                  
                </div>
                <div className="relative p-6 flex-auto">
                    <ul>
                        {
                        job.locations.slice(1).map((elem, index) => (
                            <li key={index}>{elem.city}, {elem.country}</li>
                        ))}
                    </ul>
                 
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-amber-600 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}


    
    


    </>
  )
}

export default JobCard