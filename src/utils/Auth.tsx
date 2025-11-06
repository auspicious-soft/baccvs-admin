"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  token?: string;
};

const AuthContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  isLoading: boolean;
}>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = (u: User | null) => {
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
      localStorage.setItem("token", u?.token || "");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setUserState(u);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); // done reading from localStorage
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
