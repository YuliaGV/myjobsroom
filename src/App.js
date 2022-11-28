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



import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {


  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/home" />;
  };


  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/favoritejobs" element={<FavoriteJobs/>} />
        <Route path="/job/:id" element={<JobDetail/>} />
  

      </Routes>
    </Router>


    </div>

  );
}

export default App;
