import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const GRADIENT = { background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" };

const inputCls = "w-full px-4 py-3 bg-[#f3f3f3] rounded-xl text-sm text-[#1a1c1c] outline-none focus:bg-white focus:ring-2 focus:ring-[#005dac]/20 transition-all placeholder:text-slate-400";

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-bold text-[#414752] uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}

function SpinIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step,        setStep]        = useState(1);
  const [email,       setEmail]       = useState("");
  const [name,        setName]        = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  // Password strength
  const getStrength = (p) => {
    if (!p)         return { label: "",         color: "bg-slate-200", w: "0%"   };
    if (p.length < 6) return { label: "Too short", color: "bg-red-400",   w: "25%"  };
    if (p.length < 8) return { label: "Weak",      color: "bg-orange-400",w: "50%"  };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p))
                    return { label: "Fair",      color: "bg-yellow-400",w: "75%"  };
    return          { label: "Strong",    color: "bg-teal-500",   w: "100%" };
  };
  const strength = getStrength(newPassword);

  // ── Step 1: Verify identity ──
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/password/verify-identity", { email, name });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Reset password ──
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPass) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      await API.post("/password/reset-local", { email, name, newPassword });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={GRADIENT}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-[#1a1c1c]" style={{ fontFamily: "Manrope" }}>
            MediConnect
          </span>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ boxShadow: "0 4px 24px rgba(0,93,172,0.08)" }}>

          {/* Step indicators */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s ? "text-white" : "bg-[#f3f3f3] text-slate-400"
                  }`} style={step >= s ? GRADIENT : {}}>
                    {step > s
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      : s
                    }
                  </div>
                  <span className={`text-xs font-semibold ${step === s ? "text-[#005dac]" : "text-slate-400"}`}>
                    {s === 1 ? "Verify Identity" : "New Password"}
                  </span>
                  {s < 2 && <div className="w-6 h-px bg-slate-200 mx-1" />}
                </div>
              ))}
            </div>
          )}

          {/* ── STEP 1: Verify Identity ── */}
          {step === 1 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-[#1a1c1c] mb-1" style={{ fontFamily: "Manrope" }}>
                  Forgot Password?
                </h2>
                <p className="text-[#414752] text-sm leading-relaxed">
                  Enter your registered email and full name to verify your identity.
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <FieldLabel>Registered Email</FieldLabel>
                  <input type="email" required placeholder="your@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputCls} />
                </div>

                <div>
                  <FieldLabel>Full Name (as registered)</FieldLabel>
                  <input type="text" required placeholder="John Doe"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className={inputCls} />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Must match the name you used during signup exactly.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 mt-2"
                  style={{ ...GRADIENT, boxShadow: "0 8px 24px rgba(0,93,172,0.22)" }}>
                  {loading ? <><SpinIcon /> Verifying...</> : "Verify Identity →"}
                </button>
              </form>
            </>
          )}

          {/* ── STEP 2: New Password ── */}
          {step === 2 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-[#1a1c1c] mb-1" style={{ fontFamily: "Manrope" }}>
                  Set New Password
                </h2>
                <p className="text-[#414752] text-sm">
                  Identity verified. Now create a strong new password.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-4">

                {/* New password */}
                <div>
                  <FieldLabel>New Password</FieldLabel>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required
                      placeholder="Min. 6 characters"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-3 text-[#414752] hover:text-[#005dac] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {showPass
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.956 9.956 0 016.21 2.16M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7M3 3l18 18" />
                        }
                      </svg>
                    </button>
                  </div>
                  {/* Strength bar */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-slate-400">Strength</span>
                        <span className={`text-[10px] font-bold ${
                          strength.label === "Strong" ? "text-teal-600" :
                          strength.label === "Fair"   ? "text-yellow-600" : "text-red-500"
                        }`}>{strength.label}</span>
                      </div>
                      <div className="h-1 bg-[#f3f3f3] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                          style={{ width: strength.w }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required
                      placeholder="Repeat password"
                      value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                      className={`${inputCls} pr-10 ${
                        confirmPass && newPassword !== confirmPass ? "ring-2 ring-red-200" : ""
                      }`} />
                    {confirmPass && (
                      <div className="absolute right-3 top-3">
                        {newPassword === confirmPass
                          ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        }
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => { setStep(1); setError(""); }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-[#414752] bg-[#f3f3f3] hover:bg-[#e8e8e8] transition-all">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
                    style={{ ...GRADIENT, boxShadow: "0 8px 24px rgba(0,93,172,0.22)" }}>
                    {loading ? <><SpinIcon /> Resetting...</> : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#1a1c1c] mb-2" style={{ fontFamily: "Manrope" }}>
                Password Reset!
              </h2>
              <p className="text-[#414752] text-sm mb-6">
                Your password has been updated successfully. You can now login with your new password.
              </p>
              <button onClick={() => navigate("/auth")}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
                style={{ ...GRADIENT, boxShadow: "0 8px 24px rgba(0,93,172,0.22)" }}>
                Go to Login
              </button>
            </div>
          )}

          {/* Back to login */}
          {step < 3 && (
            <div className="mt-6 text-center">
              <Link to="/auth"
                className="text-sm text-[#414752] hover:text-[#005dac] transition-colors flex items-center justify-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}