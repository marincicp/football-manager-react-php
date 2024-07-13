import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [isLoading, setIsLoading] = useState(false);

  async function login(username, password) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Uspješno ste prijavljeni.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("user");
    <Navigate to="/login" />;
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
