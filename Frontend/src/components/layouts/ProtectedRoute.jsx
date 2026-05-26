import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Spinner while auth loads
function Spinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
            <div className="w-12 h-12 border-4 border-[#005dac] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

// Only logged-in users
export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/auth" replace />;
    return children;
}

// Only patients
export function PatientRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/auth" replace />;
    if (user.role !== "patient") return <Navigate to="/" replace />;
    return children;
}

// Only doctors
export function DoctorRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/auth" replace />;
    if (user.role !== "doctor") return <Navigate to="/" replace />;
    return children;
}

// Only admin
export function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/auth" replace />;
    if (user.role !== "admin") return <Navigate to="/" replace />;
    return children;
}