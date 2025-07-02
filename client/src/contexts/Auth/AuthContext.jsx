import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: {},
  loading: true,
  setUser() {},
  registerUser() {},
  googleSignIn() {},
  signInUser() {},
  updateUserProfile() {},
  reloadUser() {},
  getCurrentUser() {},
  signOutUser() {},
});

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
export { useAuthContext };
