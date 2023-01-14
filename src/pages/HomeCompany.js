import { useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


import { AuthContext } from "../context/AuthContext";
import AddJob from "./AddJob";

const HomeCompany = () => {
  
  const { currentUser } = useContext(AuthContext);

  const [infoCompany, setInfoCompany] = useState({});


  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        try {
          const docRef = doc(db, "companies", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setInfoCompany(docSnap.data());
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [currentUser]);
  

  return (
    <div>
      <Navbar currentElement="Panel de empresa" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:container md:mx-auto text-center mt-8 mb-8">
        <div className="mx-0">
          {currentUser  && (
            <div>
              <AddJob company={infoCompany} idCompany={currentUser.uid}/>
            </div>
          )}

          {!currentUser  && (
            <div>
              <h2 className="font-bold">
                Cientos de empresas confían hoy en MyJobsRoom para sus procesos
                de reclutamiento
              </h2>
              <p className="mt-8">
                MyJobsRoom ofrece un servicio completamente gratuito
              </p>

              <Link to="/registercompany">
                <span className="mt-2 underline">Regístrate ahora</span>
              </Link>

              <p>
                Si ya tienes una cuenta,{" "}
                <Link to="/logincompany">
                  <span className="mt-2 underline">Inicia sesión</span>
                </Link>
              </p>
            </div>
          )}
        </div>


        <div className="mx-0 mt-8">

        {currentUser  && (

               <Link className="leading-snug hover:opacity-75 rounded" to='/myjobscompany/'>
               
                    <span className="text-center uppercase text-cyan-700 underline font-bold text-md">Ver mis ofertas creadas</span>
                
                </Link>
         

        )}

        </div>


     
      </div>
    </div>
  );
};

export default HomeCompany;
