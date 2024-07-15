import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { loginService, logoutService } from "../services/apiLogin";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [isLoading, setIsLoading] = useState(false);

  async function login(username, password) {
    setIsLoading(true);
    try {
      const data = await loginService(username, password);
      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Uspješno ste prijavljeni.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutService();
      setUser(null);
      sessionStorage.removeItem("user");
      <Navigate to="/login" />;
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context == undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

AuthContextProvider.propTypes = {
  children: PropTypes.array,
};
