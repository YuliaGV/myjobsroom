import {Link} from "react-router-dom";
const Hero = () => {
  return (
    
    <div className='bg-cyan-900 text-white text-center mt-0 pt-10 pb-10 rounded-bl-xl rounded-br-full'>
        <h2><span className="font-bold text-2xl text-amber-500">+10.000</span> ofertas esperando talentos como tú</h2>
        <Link to='/register'>
            <span className="mt-2 underline">Regístrate ahora</span>
        </Link>
        
    </div>
  )
}

export default Hero