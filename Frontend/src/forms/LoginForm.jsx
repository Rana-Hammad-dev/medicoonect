import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloatingInput from "../components/layouts/FloatingInput";
import GradientButton from "../components/layouts/GradientButton";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function LoginForm({ onSwitch }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password, role });
      login(data.user, data.token);

      if (data.user.role === "admin") navigate("/dashboard");
      else if (data.user.role === "doctor") navigate("/doctor-dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
      <header>
        <h2
          className="text-3xl font-bold text-[#1a1c1c] mb-2"
          style={{ fontFamily: "Manrope" }}
        >
          Welcome Back
        </h2>
        <p className="text-[#414752]">
          Please enter your clinical credentials to continue.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {["patient", "doctor"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`py-2 rounded-xl text-sm font-bold border-2 transition-all capitalize ${
              role === r
                ? "border-[#005dac] bg-[#d4e3ff]/30 text-[#005dac]"
                : "border-[#c1c6d4]/30 text-[#414752] hover:bg-[#f3f3f3]"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <FloatingInput
          id="login-email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingInput
          id="login-password"
          label="Password"
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightElement={
            <button type="button" onClick={() => setShowPass((v) => !v)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPass ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.956 9.956 0 016.21 2.16M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.86-.67 1.67-1.17 2.4M3 3l18 18"
                  />
                )}
              </svg>
            </button>
          }
        />
        {error && (
          <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#005dac] hover:text-[#1976d2]"
          >
            Forgot Password?
          </Link>
        </div>

        <GradientButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Access Sanctuary"}
          {!loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          )}
        </GradientButton>
      </div>

      <p className="text-center text-[#414752] text-sm">
        New practitioner?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#005dac] font-bold hover:underline"
        >
          Create an account
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
