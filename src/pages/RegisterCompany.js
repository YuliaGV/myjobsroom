import { useEffect, useState } from "react";

import {Link, useNavigate } from "react-router-dom";

import { Formik} from 'formik';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {doc,setDoc } from "firebase/firestore";

import Swal from 'sweetalert2'

import Logo from '../img/Logo.PNG'


const RegisterCompany = () => {

  const [file, setFile] = useState("");
  const [dataFile, setDataFile] = useState({});


  useEffect(() => {

    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, 
      (error) => {
        console.log(error)
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDataFile({img: downloadURL})
        });
      }
    );

    };
    file && uploadFile();

  }, [file]);


  const navigate = useNavigate();

  const handleAdd = async (data) => {

  
    try {
    
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      let user = {

        email:data.email,
        password:data.password,
        name: data.name,
        city: data.city,
        country: data.country,
        about: data.about,
        role: 'company',
        profilePhoto: dataFile,
        jobs: []

      }

   
      await setDoc(doc(db, "companies", res.user.uid), user);

      Swal.fire({
        title: 'Registro exitoso',
        width: 600,
        padding: '3em',
        color: 'fff',
        
      })
      navigate('/logincompany')
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
    }
  };


  return (
    

      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <img className='mx-auto' src={Logo} alt='Logo' />
                <h1 className="text-3xl font-semibold text-center text-cyan-700">
                   Registro de empresa
                </h1>

                <Formik
                initialValues={{ email: '', password: '', name: '', city:'', country:'', about:''}}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'El email es requerido';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'No es un email válido';
                  }

                  if (!values.password) {
                    errors.password = 'La contraseña es requerida';
                  }


                  if (!values.name) {
                    errors.name = 'El nombre es requerido';
                  }


                  if (!values.city) {
                    errors.city= 'La ciudad es requerida';
                  }


                  if (!values.country) {
                    errors.country= 'El país es requerido';
                  }


                  if (!values.about) {
                    errors.about= 'MyJobsRoom quiere saber sobre tu empresa';
                  }


                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => handleAdd(values)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>


            

                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoFocus
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}

                        />
                        <p className="text-amber-600">{errors.email && touched.email && errors.email}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Contraseña
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <p className="text-amber-600">{errors.password && touched.password && errors.password}</p>
                    </div>



                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Nombre
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoFocus
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}

                        />
                        <p className="text-amber-600">{errors.name && touched.name && errors.name}</p>
                    </div>


                    <div className="mb-2">
                        <label
                            htmlFor="city"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Ciudad
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoFocus
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}

                        />
                        <p className="text-amber-600">{errors.city && touched.city && errors.city}</p>
                    </div>


                    <div className="mb-2">
                        <label
                            htmlFor="country"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            País
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoFocus
                            type="text"
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.country}

                        />
                        <p className="text-amber-600">{errors.country && touched.country && errors.country}</p>
                    </div>


                    <div className="mb-2">
                        <label
                            htmlFor="about"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Breve descripción
                        </label>
                        <textarea
                            className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            autoFocus
                            type="text"
                          
                            name="about"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.about}

                        />
                        <p className="text-amber-600">{errors.about && touched.about && errors.about}</p>
                    </div>


                    <div className="mb-2">
                        <label
                            htmlFor="logo"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Logo -opcional- | tamaño: 100x100 | formato aceptado:png
                        </label>
                        <img
                          width={100}
                          height={100}
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt=""
                        />
                        <input
                            type="file"
                            name="logo"
                            accept=".png"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        
                    </div>
        
                    <div className="mt-6">
                      <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                        Registrarse
                      </button>
                        
                    </div>
                    
                  </form>
                )}
              </Formik>

      
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    ¿Ya tienes una cuenta?{" "}
                   


                    <Link to='/logincompany'>
                      <span className="font-medium text-cyan-600 hover:underline">Inicia sesión</span>
                    </Link>

                </p>


    
            </div>
        </div>
    
  )



}

export default RegisterCompany