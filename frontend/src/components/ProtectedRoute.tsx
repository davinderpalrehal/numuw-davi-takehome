import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token");
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
