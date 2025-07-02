import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import PacManSpinner from "./PacManSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  if (loading) return <PacManSpinner />;
  if (!user)
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }}></Navigate>
    );

  return children;
};

export default PrivateRoute;
