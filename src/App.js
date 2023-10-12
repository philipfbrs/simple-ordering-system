import "./App.css";
import { Login } from "./pages/Auth/Login";
import { Layout } from "./component/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./component/context/JwtContext";
import { Dashboard } from "./pages/Dashboard";
import { MyCart } from "./pages/MyCart";
import { AuthGuard } from "./component/guard/AuthGuard";
import GuestGuard from "./component/guard/GuestGuard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestGuard children={<Login />} />} />
          <Route
            element={<AuthGuard children={<Layout />} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="/my-cart" element={<MyCart />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 