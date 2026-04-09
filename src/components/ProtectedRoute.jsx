import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";

export default function ProtectedRoute({ children, roles }) {
  const { userRole, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Loading your profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md">
          <ErrorAlert
            message={error}
            variant="error"
          />
        </div>
      </div>
    );
  }

  if (!userRole) return <Navigate to="/login" />;

  if (roles && !roles.includes(userRole)) {
    const redirectMap = {
      admin: "/admin",
      user: "/user",
      professional: "/professional",
      support: "/support"
    };

    return <Navigate to={redirectMap[userRole] || "/"} />;
  }

  return children;
}