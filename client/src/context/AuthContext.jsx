
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    name: user.name || user.fullName,
    fullName: user.fullName || user.name,
  };
};

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("authToken");

  const [user, setUser] = useState(
    savedUser ? normalizeUser(JSON.parse(savedUser)) : null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(Boolean(savedToken));

  useEffect(() => {
    if (!savedToken) {
      return;
    }

    const timerId = setTimeout(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        const normalizedUser = normalizeUser(response.data?.user);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timerId);
  }, [savedToken]);

  const login = (userData, token) => {
    const normalizedUser = normalizeUser(userData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
