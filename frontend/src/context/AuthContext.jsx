import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.user.id, role: decoded.user.role });
    }
  }, []);

  const register = async (formData) => {
    const res = await api.post("/api/auth/register", formData);
    localStorage.setItem("token", res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser({ id: decoded.user.id, role: decoded.user.role });
  };

  const login = async (formData) => {
    const res = await api.post("/api/auth/login", formData);
    localStorage.setItem("token", res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser({ id: decoded.user.id, role: decoded.user.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
