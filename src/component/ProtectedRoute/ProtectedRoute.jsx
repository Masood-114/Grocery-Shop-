import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const isAuth = !!user;

  return isAuth ? children : <Navigate to="/login" replace />;
}
