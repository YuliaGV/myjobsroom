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
      navigate('/login')
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
    }
  };


  return (
    
    <section className="h-screen">

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
                    errors.email = 'No es un email v??lido';
                  }

                  if (!values.password) {
                    errors.password = 'La contrase??a es requerida';
                  }


                  if (!values.name) {
                    errors.name = 'El nombre es requerido';
                  }


                  if (!values.city) {
                    errors.city= 'La ciudad es requerida';
                  }


                  if (!values.country) {
                    errors.country= 'El pa??s es requerido';
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
                            Contrase??a
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
                            Pa??s
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
                            Breve descripci??n
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
                            Logo -opcional- | tama??o: 100x100 | formato aceptado:png
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

                

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">O</div>
                </div>
                <div className="flex mt-4 gap-x-2">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                    <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    </button>
                    <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                        </svg>
                    </button>
                </div>



                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    ??Ya tienes una cuenta?{" "}
                   


                    <Link to='/logincompany'>
                      <span className="font-medium text-cyan-600 hover:underline">Inicia sesi??n</span>
                    </Link>

                </p>


    
            </div>
        </div>
    </section>
  )



}

export default RegisterCompany