import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../../pages/LoadingScreen";
import { useAuthContext } from "../hooks/useAuthContext";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  console.log("Test2")
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
