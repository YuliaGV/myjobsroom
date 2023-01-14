import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import Navbar from '../components/Navbar'



import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const Jobs = () => {


  const [jobList, setJobList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
 

  useEffect(() => {

    const getData = async () => {
 
        try {
            const querySnapshot = await getDocs(collection(db, "jobs"));
            setJobList(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            setFilteredList(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            
        } catch (error) {
            console.log(error)
        }
    }
    getData()

  }, [])


  


  const filterBySearch = (event) => {
    // Access input value
    console.log("even")
    const query = event.target.value;

    // Create copy of item list
    var updatedList = [...jobList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };



  return (
    <>
      <Navbar currentElement='Ofertas'/>    

      <div className="container mx-auto text-center mt-8 mb-8">

          <h1 className = "font-semibold">Ofertas en este momento</h1>

          <div className='mx-0 mb-5 mt-5 max-w-sm md:max-w-lg'>
                <label
                    htmlFor="search"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Filtrar: 
                </label>
                <input
                    className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border-solid border-2 border-cyan-500 rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    name="search"
                    onChange={filterBySearch}
                />
              
          </div>

          <div className="columns-1 xs:columns-2 md:columns-3 lg:columns-4 mt-8">

          { 
            filteredList.length > 0 &&
            filteredList.map((elem, index) => (
              <div className = "job mb-4" key={index}>
                <JobCard job={elem} />
              </div>
            ))
          }

          { filteredList.length === 0 && (<p>No hay ofertas para mostrar en este momento :c</p>)}

          </div>
        
      </div>
    </>
  )
}

export default Jobs