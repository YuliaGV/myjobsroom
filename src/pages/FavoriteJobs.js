
import React, {useContext} from 'react'
import { FavoritesContext } from "../context/FavoritesContext";

import Navbar from '../components/Navbar'

const FavoriteJobs = () => {

  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <Navbar currentElement='Mis ofertas favoritas'/> 
      <div className="container mx-auto text-center mt-8">
          <h1 className = "font-semibold">Ofertas guardadas</h1>
      </div>
    </>
  )
}

export default FavoriteJobs