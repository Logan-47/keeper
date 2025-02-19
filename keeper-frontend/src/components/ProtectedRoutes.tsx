import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/Auth/useAuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;