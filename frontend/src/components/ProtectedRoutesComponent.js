import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const ProtectedRoutesComponent = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h2>asd</h2>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesComponent;
