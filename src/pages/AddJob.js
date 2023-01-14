//import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types'

import { Formik, Field, FieldArray,ErrorMessage} from 'formik';

import { db } from "../firebase";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {collection, addDoc, doc, updateDoc } from "firebase/firestore";

import Swal from 'sweetalert2'

import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";



const AddJob = ({company, idCompany}) => {

  const time = Date.now();   
  const today = new Date(time);

  const navigate = useNavigate();

  const handleAdd = async (data) => {

    /*let locations = []

    data.location.split(';').forEach(elem => {
      
      locations.push({
        city: elem.split(',').shift().trim(),
        country: elem.split(',').pop().trim(),

      })
    });*/

  

    try {
    

      let job = {
        
        title:data.title,
        company: company.name,
        logo: company.profilePhoto,
        locations:data.locations,
        remote: data.remote,
        dateposted: today.toLocaleDateString(),
        jobtype: data.jobtype,
        salary: data.salary,
        description: data.description,
        benefits: data.benefits
     
      }



    
      const docRef = await addDoc(collection(db, "jobs"), job);

      const companyRef = doc(db, "companies", idCompany);
   

      // Set the "capital" field of the city 'DC'
      await updateDoc(companyRef, {
        jobs: [...company.jobs, docRef.id]
      });
      
      Swal.fire({
        title: 'Oferta agregada',
        width: 600,
        padding: '3em',
        color: 'fff',
        
      })
      navigate('/homecompany')
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
    }
  };

  return (

    <>


      <div className="md:container md:mx-auto text-center mt-8">

        <h2 className="font-bold text-color-cyan mt-8">Agregar una oferta</h2>


                <div className="mt-8">

                    <Formik
                      initialValues={{ title: '', remote: false, locations: [{city: '',country: '',},], jobtype:'Tiempo completo', salary:'', description:'', benefits:[{benefit:''}] }}
                      validate={values => {
                        const errors = {};
                    
                        if (!values.title) {
                          errors.title = 'El título es requerido';
                        }

                        if (!values.locations[0].city) {
                          errors.locations = 'Ingresa una ciudad';
                        }

                        if (!values.locations[0].country) {
                          errors.locations = 'Ingresa un país';
                        }

                        if (!values.salary) {
                          errors.salary = 'Indica el salario de la oferta';
                        }

                        if (!values.description) {
                          errors.description = 'Describe la oferta brevemente';
                        }


                        if (!values.benefits[0].benefit) {
                          errors.benefits = 'Ingresa al menos un beneficio';
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

                          <div className="mb-3">
                              <label
                                  htmlFor="title"
                                  className="block text-sm font-semibold text-cyan-700"
                              >
                                  Título
                              </label>
                              <input
                                  className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  type="text"
                                  name="title"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.title}
                              />
                              <p className="text-amber-600">{errors.title && touched.title && errors.title}</p>
                          </div>


                          <div className="mb-3">
                              <label
                                  htmlFor="title"
                                  className="block text-sm font-semibold text-cyan-700"
                              >
                                  Locaciones
                              </label>

                              <FieldArray name="locations">
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.locations.length > 0 &&
                                      values.locations.map((loc, index) => (

                                        <div className="flex flex-row gap-0.5" key={index}>

                                          <div>
                                            <label 
                                              htmlFor={`locations.${index}.city`}
                                              className="block text-sm font-semibold"
                                            >
                                              Ciudad
                                            </label>
                                            <Field
                                              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                              name={`locations.${index}.city`}
                                              type="text"
                                            />
                                            <ErrorMessage
                                              name={`locations.${index}.city`}
                                              component="div"
                                              className="field-error"
                                            />
                                          </div>

                                          <div>
                                            <label 
                                              htmlFor={`locations.${index}.country`}
                                              className="block text-sm font-semibold"
                                            >
                                              País
                                            </label>
                                            <Field
                                              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                              name={`locations.${index}.country`}
                                              type="text"
                                              
                                            />
                                            <ErrorMessage
                                              name={`locations.${index}.country`}
                                              component="div"
                                              className="field-error"
                                            />
                                          </div>
                                          

                                          <div className="col">
                                            <button
                                              type="button"
                                              className="secondary"
                                              onClick={() => 
                                                {
                                                  if(values.locations.length>1){
                                                    remove(index)
                                                  }
                                                }
                                               
                                              }
                                            >
                                              <MdOutlineCancel/>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    <button
                                      type="button"
                                      className=" text-cyan-700 font-bold underline"
                                      onClick={() => push({ city: '', country: '' })}
                                    >
                                      <MdOutlineAddBox/>
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                              <p className="text-amber-600">{errors.locations && touched.locations && errors.locations}</p>
                              
                          </div>

                          <div className="mb-3">
                              <label>
                                <p>¿Es trabajo remoto?</p>
                                <Field type="checkbox" name="remote" />
                              </label>
                          </div>


                          <div className="mb-3">
                              <label
                                  htmlFor="jobtype"
                                  className="block text-sm font-semibold text-cyan-700"
                              >
                                  Tipo de empleo
                              </label>
                              <Field 
                                  name="jobtype" 
                                  as="select"
                                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              >
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Tiempo parcial">Tiempo parcial</option>
                              </Field>
                              <p className="text-amber-600">{errors.jobtype && touched.jobtype && errors.jobtype}</p>
                          </div>


                          <div className="mb-3">
                              <label
                                  htmlFor="salary"
                                  className="block text-sm font-semibold text-cyan-700"
                              >
                                  Salario
                              </label>
                              <input
                                  className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  type="text"
                                  placeholder="$1.160.000 pesos/mes"
                                  name="salary"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.salary}
                              />
                              <p className="text-amber-600">{errors.salary && touched.salary && errors.salary}</p>
                          </div>



                          <div className="mb-2">
                              <label
                                  htmlFor="description"
                                  className="block text-sm font-semibold text-gray-800"
                              >
                                  Descripción de la oferta
                              </label>
                              <textarea
                                  className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  autoFocus
                                  type="text"
                                
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}

                              />
                              <p className="text-amber-600">{errors.description && touched.description && errors.description}</p>
                          </div>



                          <div className="mb-3">

                          
                            <label
                                  htmlFor="benefits"
                                  className="block text-sm font-semibold text-cyan-700"
                                >
                                  Beneficios
                            </label>

                            <FieldArray name="benefits">
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {values.benefits.length > 0 &&
                                        values.benefits.map((benefit, index) => (

                                          <div className="flex flex-row gap-0.5" key={index}>

                                            <div>
                                              <label 
                                                htmlFor={`benefits.${index}.benefit`}
                                                className="block text-sm font-semibold"
                                              >
                                                Beneficio
                                              </label>
                                              <Field
                                                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name={`benefits.${index}.benefit`}
                                                type="text"
                                              />
                                              <ErrorMessage
                                                name={`benefits.${index}.benefit`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>

                                            <div className="col">
                                              <button
                                                type="button"
                                                className="secondary"
                                                onClick={() => 
                                                    remove(index)
                                                }
                                              >
                                                <MdOutlineCancel/>
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      <button
                                        type="button"
                                        className=" text-cyan-700 font-bold underline"
                                        onClick={() => push({ benefit:'' })}
                                      >
                                        <MdOutlineAddBox/>
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>
                                <p className="text-amber-600">{errors.benefits && touched.benefits && errors.benefits}</p>
                          </div>

                  
                          <div className="mt-6">
                            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                              Agregar
                            </button>
                              
                          </div>


        
                        </form>
                      )}
                    </Formik>
                </div>
    

      </div>


    </>
  )


}


AddJob.propTypes = {
  company: PropTypes.object,
  idCompany: PropTypes.string
}

export default AddJob