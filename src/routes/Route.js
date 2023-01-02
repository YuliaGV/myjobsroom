import { Navigate } from "react-router-dom";

const Protected = ({ user, children }) => {

  if (!user) {
    return <Navigate to="/" replace />;
  }else{

    if(!user.dataCompany?.role){
      return <Navigate to="/" replace />;
    }


}
  return children;
};


export default Protected;



