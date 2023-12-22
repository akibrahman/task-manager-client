import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase.config";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authReloader, setAuthReloader] = useState(true);
  //! Auth State
  const auth = getAuth(app);
  useEffect(() => {
    const un = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email) {
        setUser(currentUser);
        setIsLoading(false);
        console.log(currentUser);
        axiosInstance.put(`/manage-users?email=${currentUser.email}`, {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => un();
  }, [auth, axiosInstance, authReloader]);
  //! Registration
  const registration = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //! Update
  const update = (name, photoUrl) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  //! Login
  const login = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! Google
  const googleProvider = new GoogleAuthProvider();
  const google = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //! Logout
  const logout = () => {
    setIsLoading(true);
    return signOut(auth);
  };
  //! Passing All
  const authInfo = {
    user,
    isLoading,
    setAuthReloader,
    authReloader,
    login,
    registration,
    update,
    google,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
