import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  } else if (!user) {
    return <Navigate to="/login"></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;
