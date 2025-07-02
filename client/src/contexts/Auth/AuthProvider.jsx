import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import axios from "axios";

const buildMiniUser = (user) => {
  return {
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    emailVerified: user.emailVerified,
    accessToken: user.accessToken,
    uid: user.uid,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .post(
            "https://open-library-ten.vercel.app/api/jwt",
            { accessToken: currentUser.accessToken },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            setUser(buildMiniUser(currentUser));
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (userCredentials) => {
    return updateProfile(auth.currentUser, userCredentials);
  };

  const reloadUser = () => {
    return auth.currentUser.reload();
  };

  const getCurrentUser = () => {
    const user = auth.currentUser;
    return buildMiniUser(user);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const ctxValue = {
    user,
    loading,
    setUser,
    registerUser,
    googleSignIn,
    signInUser,
    updateUserProfile,
    reloadUser,
    getCurrentUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
