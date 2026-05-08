import { Routes, Route } from "react-router";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ConfirmSignup from './pages/ConfirmSignup';
import DashboardPage from './pages/Dashboard';
import ProtectedRoute from "./routes/ProtectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/confirmar" element={<ConfirmSignup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}