// public-route.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;

  return auth.isAuthenticated ? <Navigate to="/order-summary" /> : children;
};

export default PublicRoute;