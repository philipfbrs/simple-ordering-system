import "./App.css";
import { Login } from "./pages/Auth/Login";
import { Layout } from "./component/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./component/context/JwtContext";
import { Dashboard } from "./pages/Dashboard";
import { AuthGuard } from "./component/guard/AuthGuard";
import GuestGuard from "./component/guard/GuestGuard";
import { MyCart } from "./pages/MyCart";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard children={<Layout />} />}>
            <Route path="/" element={<AuthGuard children={<Dashboard />} />} />
            <Route
              path="/my-cart"
              element={<AuthGuard children={<MyCart />} />}
            />
          </Route>
          <Route path="/login" element={<GuestGuard children={<Login />} />} />
          <Route path="*" element={<Navigate to="/" replace />} />,
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
