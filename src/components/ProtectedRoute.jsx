import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
