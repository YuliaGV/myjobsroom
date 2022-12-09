import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import FavoriteJobs from './pages/FavoriteJobs'
import JobDetail from "./pages/JobDetail";
import HomeCompany from "./pages/HomeCompany";
import RegisterCompany  from "./pages/RegisterCompany";


import { AuthContextProvider,AuthContext } from './context/AuthContext';
import FavoritesContext from './context/FavoritesContext';


import useLocalStorage from './hooks/useLocalStorage';


function App() {


  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/home" />;
  };


  return (
    <AuthContextProvider>
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <div>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/jobs" element={<Jobs/>} />
            <Route path="/job/:id" element={<JobDetail/>} />
            <Route path="/favoritejobs" element={<FavoriteJobs/>} />

            <Route path="/homecompany" element={<HomeCompany/>} />
            <Route path="/registercompany" element={<RegisterCompany/>} />
          </Routes>
        </Router>
        </div>
        </FavoritesContext.Provider>
    </AuthContextProvider>

  );
}

export default App;
