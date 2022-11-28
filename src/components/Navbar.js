import React, {useState, useContext } from 'react'


import { signOut  } from "firebase/auth";
import { auth } from "../firebase";


import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

import { MdMenu } from 'react-icons/md';
import {Link} from "react-router-dom";

import Swal from 'sweetalert2'

import Logo from '../img/LogoMini.png'


const Navbar = ({ currentElement}) => {


    const navigate = useNavigate();

    const {currentUser, dispatch} = useContext(AuthContext)
 
    const [navbarOpen, setNavbarOpen] = useState(false);

    let pages = [];
  

    pages = [    
        { text: 'Inicio', href: '/' },
        { text: 'Ofertas', href: '/jobs' },
        { text: 'Mis ofertas favoritas', href: '/favoritejobs'},
        { text: '¿Eres una empresa?', href: '/forcompanies' },
        { text: 'Empresas', href: '/companies'}
    ]


    const handleLogout = () =>{
        signOut(auth).then(() => {
            dispatch({type:"LOGOUT", payload:null})
            let timerInterval
            Swal.fire({
            title: 'Sesión cerrada exitosamente',
            html: 'Esta ventana se cerrará en <b></b> milisegundos',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo malio sal',
            })
        })
    }

 
     return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-900 mb-0">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link
                    className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                    to="/"
                    >
                    <img src={Logo} alt='Logo'/>
                    </Link>
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
                                <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to={page.href}>
                                    <span className={page.text === currentElement ? 'text-amber-500 ml-2':'ml-2'}>{page.text}</span>
                                </Link>
                            </li>
                        
                        ))}
                    </ul>

                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                    {!currentUser ? (
                        <>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/login'>
                                    <span className="ml-2">Ingresar</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/register'>
                                    <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded">
                                        <span className="px-2 py-2 uppercase">Registrarte</span>
                                    </button>
                                </Link>
                            </li>
                        </>

                    ):(
                        <>
                            <li className="nav-item">
                            <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/profile'>
                                <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded">
                                    <span className="px-2 py-2 uppercase">Mi perfil</span>
                                </button>
                            </Link>
                            
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75" to='/'>
                                    <button className="bg-transparent text-white font-bold" onClick={() => handleLogout()}>
                                        <span className="px-2 py-2 uppercase">Cerrar sesión</span>
                                    </button>
                                </Link>
                            </li>
                        </>

                    )}

        
                    </ul>
                </div>
                </div>
            </nav>
            
        </>


  )
}

export default Navbar