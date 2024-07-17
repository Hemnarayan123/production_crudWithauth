import { createContext, useState, useContext, useEffect } from "react";
import { ToastBar, toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const tokenGetLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    // toast.success("Sign In Success", {
    //   duration: 3000,
    // });
  };

  const isSignIn = !!token;

  const SignoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.error("You have been logged out",{
        duration: 3000,
      });
  };

  return (
    <AuthContext.Provider value={{token, tokenGetLocalStorage, isSignIn, SignoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
