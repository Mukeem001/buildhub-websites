import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  logoutUser,
  type User,
} from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(
    getCurrentUser()
  );

  const login = (user: User) => setUser(user);

  useEffect(() => {
    const handleInvalidation = () => {
      setUser(null);
    };

    const handleSessionChanged = () => {
      setUser(getCurrentUser());
    };

    const handleStorage = () => setUser(getCurrentUser());

    window.addEventListener("auth:session-invalidated", handleInvalidation);
    window.addEventListener("auth:session-changed", handleSessionChanged);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth:session-invalidated", handleInvalidation);
      window.removeEventListener("auth:session-changed", handleSessionChanged);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("AuthProvider missing");
  return ctx;
};