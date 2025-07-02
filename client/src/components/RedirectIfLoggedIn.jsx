import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  if (user) return <Navigate to={location?.state?.from || "/"}></Navigate>;
  return children;
};

export default RedirectIfLoggedIn;
