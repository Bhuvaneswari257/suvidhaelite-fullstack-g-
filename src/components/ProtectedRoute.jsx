import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { userRole } = useAuth();

  if (!userRole) return <Navigate to="/login" />;

  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
}