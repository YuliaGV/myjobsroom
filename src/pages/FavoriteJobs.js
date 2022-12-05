
import React, {useContext} from 'react'
import { FavoritesContext } from "../context/FavoritesContext";

import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'

const FavoriteJobs = () => {

  const { favorites } = useContext(FavoritesContext);
  console.log(favorites)

  return (
    <>
      <Navbar currentElement='Mis ofertas favoritas'/> 
      <div className="container mx-auto text-center mt-8">
          <h1 className = "font-semibold">Mis ofertas guardadas</h1>


          <div className="columns-1 xs:columns-2 md:columns-3 lg:columns-5 mt-8">

          { 
            favorites.length > 0 &&
            favorites.map((elem, index) => (
              <div className = "job mb-4" key={index}>
                <JobCard job={elem} />
              </div>
            ))
          }

          { favorites.length === 0 && (<p>No tienes ofertas favoritas</p>)}

          </div>


      </div>
    </>
  )
}

export default FavoriteJobs