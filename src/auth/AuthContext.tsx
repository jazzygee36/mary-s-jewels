import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  syncAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const syncAuth = () => {
    const token = sessionStorage.getItem("token");

    setAuth({
      user: null,
      isAuthenticated: !!token,
      isLoading: false,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    syncAuth();

    const handleStorage = () => syncAuth();

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
