import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ec_user");
    const token = localStorage.getItem("ec_token");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("ec_user");
      }
    }

    // If there is a token but no user, try to fetch current user
    if (token && !stored) {
      authService
        .me(token)
        .then((data) => {
          if (data && data.user) {
            localStorage.setItem("ec_user", JSON.stringify(data.user));
            setUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("ec_token");
          localStorage.removeItem("ec_user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("ec_token", token);
    localStorage.setItem("ec_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = (userData, token) => {
    // same shape as login: backend returns { user, token }
    localStorage.setItem("ec_token", token);
    localStorage.setItem("ec_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("ec_token");
    localStorage.removeItem("ec_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
