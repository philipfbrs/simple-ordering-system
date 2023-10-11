import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../../pages/Auth/Login";
import { LoadingScreen } from "../../pages/LoadingScreen";

export const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);
 
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation("/");
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <>{children}</>;
};
