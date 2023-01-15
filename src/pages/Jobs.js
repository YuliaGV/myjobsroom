import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import Navbar from '../components/Navbar'



import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const Jobs = () => {


  const [jobList, setJobList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [filters, setFilters] = useState({
    title:'',
    company:''
  })

  console.log(filters)


 

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


  useEffect(() => {

    var updatedList = [...jobList];

    if(filters.title.length>0){
      updatedList = updatedList.filter((item) => {
        return item.title.toLowerCase().indexOf(filters.title.toLowerCase()) !== -1;
      });
    }

    if(filters.company.length>0){
      updatedList = updatedList.filter((item) => {
        return item.company.toLowerCase().indexOf(filters.company.toLowerCase()) !== -1;
      });
     
    }

    setFilteredList(updatedList);



  }, [filters, jobList])




  const handleFilter = (event) => {
    setFilters({
        ...filters,
        [event.target.name] : event.target.value
    })
  }


  return (
    <>
      <Navbar currentElement='Ofertas'/>    

      <div className="container mx-auto text-center mt-8 mb-8">

          <h1 className = "font-semibold">Ofertas en este momento</h1>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>

            <div className='mx-0 mb-5 mt-5 max-w-xs md:max-w-lg'>
                  <label
                      htmlFor="title"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Título: 
                  </label>
                  <input
                      className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border-solid border-2 border-cyan-500 rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      type="text"
                      name="title"
                      onChange={handleFilter}
                  />
                
            </div>

            <div className='mx-0 mb-5 mt-5 max-w-xs md:max-w-lg'>
                  <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Empresa: 
                  </label>
                  <input
                      className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border-solid border-2 border-cyan-500 rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      type="text"
                      name="company"
                      onChange={handleFilter}
                  />
            </div>

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