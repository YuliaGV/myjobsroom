
import jobList from '../jobList'

import JobCard from '../components/JobCard'
import Navbar from '../components/Navbar'


const Jobs = () => {
  return (
    <>
      <Navbar currentElement='Ofertas'/>    

      <div className="container mx-auto text-center mt-8">

          <h1 className = "font-semibold">Ofertas en este momento</h1>

          <div className="columns-1 xs:columns-2 md:columns-3 lg:columns-5 mt-8">

          { 
            jobList.length > 0 &&
            jobList.map((elem, index) => (
              <div className = "job mb-4" key={index}>
                <JobCard job={elem} />
              </div>
            ))
          }

          { jobList.length === 0 && (<p>No hay ofertas para mostrar en este momento :c</p>)}

          </div>
        
      </div>
    </>
  )
}

export default Jobs