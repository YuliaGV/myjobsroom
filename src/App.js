import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import FavoriteJobs from './pages/FavoriteJobs'
import JobDetail from "./pages/JobDetail";
import HomeCompany from "./pages/HomeCompany";
import RegisterCompany  from "./pages/RegisterCompany";
import LoginCompany from "./pages/LoginCompany";


import Footer from "./components/Footer";
import MyJobs from "./pages/MyJobs";
import Profile from "./pages/Profile";


import Protected from "./routes/Route";


import { AuthContextProvider,AuthContext } from './context/AuthContext';
import FavoritesContext from './context/FavoritesContext';

import useLocalStorage from './hooks/useLocalStorage';



function App() {


  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const {currentUser} = useContext(AuthContext)


  return (

    <AuthContextProvider>

      <FavoritesContext.Provider value={{ favorites, setFavorites }}>

         
          <Router>


            <div className="min-h-screen">

            <Routes>

              <Route path="/" element={<Home/>} />
    
              <Route path="/jobs" element={<Jobs/>} />
              <Route path="/job/:id" element={<JobDetail/>} />
              <Route path="/favoritejobs" element={<FavoriteJobs/>} />

 

              <Route path="/registercompany" element={<RegisterCompany/>} />
              <Route path="/logincompany" element={<LoginCompany/>} />


              <Route path="/homecompany" element={
                <Protected user={currentUser}>
                  <HomeCompany/>
                </Protected>
              } />

              <Route path="/myjobscompany" element={
                <Protected user={currentUser}>
                  <MyJobs/>
                </Protected>
              } />


              <Route path="/profile" element={
                <Protected user={currentUser}>
                  <Profile/>
                </Protected>
              } />


            </Routes>


            <Footer/>


            </div>


          </Router>
          

        </FavoritesContext.Provider>

    </AuthContextProvider>

  );
}

export default App;
