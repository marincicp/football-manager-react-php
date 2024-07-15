import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};
