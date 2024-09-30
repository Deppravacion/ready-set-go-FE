import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const auth = sessionStorage.getItem("authtoken") ?? null;
  return auth ? <Outlet /> : <Navigate to='/signin' />;
};
