import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthLayout() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}
