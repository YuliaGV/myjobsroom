import React from 'react'

const Footer = () => {
    
  return (
    
        <footer className="sticky top-[100vh] bottom-0 left-0 z-20 w-full p-4 border-t border-cyan-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-cyan-900">
            <span className="text-sm text-white sm:text-center">© 2023 <a href="/" class="hover:underline">My Jobs Room</a>. No rights reserved
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6 ">Quiénes somos</a>
                </li>
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6">Política de privacidad</a>
                </li>
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6">Licencia</a>
                </li>
                <li>
                    <a href="/" className="hover:underline">Contacto</a>
                </li>
            </ul>
        </footer>


  )
}

export default Footer