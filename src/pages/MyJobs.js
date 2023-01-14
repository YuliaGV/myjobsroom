import { useContext, useState, useEffect } from "react";
import Navbar from '../components/Navbar'

import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { AuthContext } from "../context/AuthContext";

import { MdDeleteForever } from 'react-icons/md';

import Swal from 'sweetalert2'


const MyJobs = () => {
    

  const { currentUser } = useContext(AuthContext);


  const [jobList, setJobList] = useState([]);

  const [infoCompany, setInfoCompany] = useState({});

  
  useEffect(() => {

    const getData = async () => {
 
        try {

            const docRef = doc(db, "companies", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
              return
            }

            const querySnapshot = await getDocs(collection(db, "jobs"));
            setJobList(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).filter(job => docSnap.data().jobs.includes(job.id)) )
            setInfoCompany(docSnap.data())
           
            
        } catch (error) {
            console.log(error)
        }
    }
    getData()

  }, [currentUser])


  const removeJob = async (job) =>{
    

    const deleteData = async () => {
 
        try {

            await deleteDoc(doc(db, "jobs", job.id));

            const company = doc(db, "companies", currentUser.uid);

            await updateDoc(company, {
            jobs: infoCompany.jobs.filter(elem => elem !== job.id)
            });


            Swal.fire({
                title: 'La oferta ha sido eliminada',
                width: 600,
                padding: '3em',
                color: 'fff',
                
            })
    
        } catch (error) {
            console.log(error)
        }
    }
    deleteData()


  }


  return (
    <div>
        <Navbar currentElement="Panel de empresa" />

        <div className="container mx-auto text-center mt-8 mb-8">

            <h1 className = "font-semibold">Mis ofertas creadas</h1>


            { jobList.length > 0 ? (
                
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left text-gray-500 mt-8">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Título
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Fecha de creación
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Acciones
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>

                        {
                         jobList.map((job, index) => (
                            <tr class="bg-white border-b dark:bg-gray-50" key={index}>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {job.id}
                                </th>
                                <td class="px-6 py-4">
                                    {job.title}
                                </td>
                                <td class="px-6 py-4">
                                    {job.dateposted}
                                </td>
                               
                                <td class="px-6 py-4">
                                    <button className="bg-white text-cyan-600 font-bold rounded text-2xl" onClick={() => removeJob(job)}>
                                        <MdDeleteForever/>
                                    </button>
                                </td>
                            </tr>

                         ))

                        }

                        
                    </tbody>
                </table>
            </div>

            ):(
                <p>No tienes ofertas creadas en este momento</p>
            )}

        </div>

    </div>
  )
}

export default MyJobs