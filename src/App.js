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

import Navbar from "./components/Navbar";


import { AuthContextProvider,AuthContext } from './context/AuthContext';
import FavoritesContext from './context/FavoritesContext';

import useLocalStorage from './hooks/useLocalStorage';


import Protected from "./routes/Route";


function App() {


  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const {currentUser} = useContext(AuthContext)


  return (
    <AuthContextProvider>
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <div>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
   
            <Route path="/jobs" element={<Jobs/>} />
            <Route path="/job/:id" element={<JobDetail/>} />
            <Route path="/favoritejobs" element={<FavoriteJobs/>} />

            <Route path="/homecompany" element={<HomeCompany/>} />


            
            <Route path="/registercompany" element={<RegisterCompany/>} />
            <Route path="/logincompany" element={<LoginCompany/>} />




          </Routes>
        </Router>
        </div>
        </FavoritesContext.Provider>
    </AuthContextProvider>

  );
}

export default App;
