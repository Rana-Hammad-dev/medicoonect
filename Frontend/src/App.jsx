import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import DoctorsPage from "./pages/DoctorsPage";
import HospitalsPage from "./pages/Hospital";
import PatientDashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MediConnect from "./pages/AuthLayout";
import ForgotPassword from "./pages/ForgotPassword";

// Forms
import BookAppointment from "./forms/Appointment";
import ContactPage from "./forms/ContactUs";

// Layout
import ScrollToTop from "./components/layouts/ScrollToTop";
import {
  ProtectedRoute,
  DoctorRoute,
  AdminRoute,
} from "./components/layouts/ProtectedRoute";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    if (user.role === "doctor")
      return <Navigate to="/doctor-dashboard" replace />;
    if (user.role === "admin")
      return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Auth */}
        <Route
          path="/auth/*"
          element={
            <AuthGuard>
              <MediConnect />
            </AuthGuard>
          }
        />

        {/* Protected */}
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <DoctorRoute>
              <DoctorDashboard />
            </DoctorRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
              <div className="text-center">
                <h1 className="text-7xl font-extrabold text-[#005dac] mb-4">
                  404
                </h1>
                <p className="text-[#414752] text-lg mb-6">
                  Page not found. Support by 4-Idoits
                </p>
                <a
                  href="/"
                  className="px-6 py-3 text-white font-bold rounded-xl text-sm"
                  style={{
                    background: "linear-gradient(135deg,#005dac,#1976d2)",
                  }}
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
