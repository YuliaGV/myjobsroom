import React, {useState} from 'react'
import { MdMenu } from 'react-icons/md';

import {Link} from "react-router-dom";


import Logo from '../img/LogoMini.png'

const Navbar = ({ currentElement}) => {


    const [navbarOpen, setNavbarOpen] = useState(false);

    let pages = [];
  

    pages = [    
        { text: 'Inicio', href: '/' },
        { text: 'Ofertas', href: '/jobs' },
        { text: 'Empresas', href: '/companies'},
        { text: '¿Eres una empresa?', href: '/forcompanies' }
    ]


 
     return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-900 mb-0">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a
                    className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                    href="#pablo"
                    >
                    <img src={Logo} alt='Logo'/>
                    </a>
                    <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                    <MdMenu />
                    </button>
                </div>
                <div
                    className={
                    "lg:flex flex-grow items-center" +
                    (navbarOpen ? " flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        {pages.map((page) => (
                            <li key={page.text} className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/'>
                                    <span className={page.text === currentElement ? 'text-amber-500 ml-2':'ml-2'}>{page.text}</span>
                                </Link>
                            </li>
                        
                        ))}

                        <li className="nav-item">
                            <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/login'>
                                <span className="ml-2">Ingresar</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/register'>
                                <button class="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded">
                                    <span className="px-2 py-2 uppercase">Registrarte</span>
                                </button>
                            </Link>
                        </li>


                    </ul>
                </div>
                </div>
            </nav>
            
        </>


  )
}

export default Navbar