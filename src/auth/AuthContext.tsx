import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<{
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
} | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    setAuth({
      user: null,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
