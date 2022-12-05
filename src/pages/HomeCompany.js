import Navbar from '../components/Navbar'

const HomeCompany = () => {
  return (
    <div>
         <Navbar currentElement='¿Eres una empresa?'/> 
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:container md:mx-auto text-center mt-8">
            <div className='mx-0'>
                <h2 className='font-bold'>Cientos de empresas confían hoy en MyJobsRoom para sus procesos de reclutamiento</h2>
                <p className='mt-8'>MyJobsRoom ofrece un servicio completamente gratuito</p>
            </div>
            <div>
                
                
            </div>
        </div>      
    </div>
  )
}

export default HomeCompany