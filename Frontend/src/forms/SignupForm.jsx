import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/layouts/FloatingInput";
import GradientButton from "../components/layouts/GradientButton";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Dentist",
  "Urology",
  "General Physician",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "ENT",
];

export default function SignupForm({ onSwitch }) {
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [fee, setFee] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data;
      if (role === "patient") {
        const res = await API.post("/auth/register", { name, email, password });
        data = res.data;
      } else {
        const res = await API.post("/auth/register-doctor", {
          name,
          email,
          password,
          specialty,
          experience,
          hospital,
          fee,
          ...(imagePreview && { image: imagePreview }),
        });
        data = res.data;
      }
      login(data.user, data.token);
      navigate(data.user.role === "doctor" ? "/doctor-dashboard" : "/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <header>
        <h2
          className="text-3xl font-bold text-[#1a1c1c] mb-2"
          style={{ fontFamily: "Manrope" }}
        >
          Create Clinical Account
        </h2>
        <p className="text-[#414752]">
          Join our network of healthcare excellence.
        </p>
      </header>

      <div className="space-y-2">
        <span className="text-sm font-semibold text-[#414752] uppercase tracking-wider">
          Select your Role
        </span>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "patient",
              label: "Patient",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#005dac]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              ),
            },
            {
              value: "doctor",
              label: "Doctor",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#005dac]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-3-3v6M5 20a7 7 0 1114 0H5z"
                  />
                </svg>
              ),
            },
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${role === value ? "bg-[#d4e3ff]/30 border-[#005dac]" : "border-[#c1c6d4]/30 hover:bg-[#f3f3f3]"}`}
            >
              {icon}
              <span className="text-sm font-bold mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <FloatingInput
          id="signup-name"
          label="Full Legal Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FloatingInput
          id="signup-email"
          label="Work/Personal Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingInput
          id="signup-password"
          label="Secure Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {role === "doctor" && (
          <>
            <div>
              <label className="block text-[11px] font-bold text-[#414752] uppercase tracking-wider mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#f3f3f3] border-2 border-dashed border-[#c1c6d4] flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-[#c1c6d4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="w-full py-2.5 px-4 bg-[#f3f3f3] rounded-xl text-sm font-semibold text-[#414752] hover:bg-[#e8e8e8] transition-all"
                  >
                    {imagePreview ? "Change Photo" : "Upload Photo"}
                  </button>
                  <p className="text-[10px] text-[#717783] mt-1">
                    JPG, PNG — max 2MB
                  </p>
                </div>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => setImagePreview("")}
                    className="text-red-400 hover:text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Specialty */}
            <div className="relative">
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
                className="peer w-full rounded-lg p-4 pt-6 text-[#1a1c1c] bg-[#f3f3f3] focus:bg-white outline-none border-none appearance-none"
              >
                <option value="">Select Specialty</option>
                {SPECIALTIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <label className="absolute left-4 top-2 text-[10px] font-bold text-[#005dac] uppercase tracking-wider">
                Specialty
              </label>
            </div>

            <FloatingInput
              id="exp"
              label="Experience (e.g. 5+ Years)"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <FloatingInput
              id="hosp"
              label="Hospital / Clinic Name"
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
            <FloatingInput
              id="fee"
              label="Consultation Fee (e.g. $100 - $200)"
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </>
        )}

        {error && (
          <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
            ❌ {error}
          </p>
        )}

        <div className="pt-2">
          <p className="text-xs text-[#414752] mb-4 leading-relaxed">
            By clicking create, you agree to our{" "}
            <a href="#" className="text-[#005dac] font-bold">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#005dac] font-bold">
              HIPAA Policy
            </a>
            .
          </p>
          <GradientButton type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Initialize Account"}
          </GradientButton>
        </div>
      </div>

      <p className="text-center text-[#414752] text-sm">
        Already have credentials?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#005dac] font-bold hover:underline"
        >
          Log In
        </button>
      </p>
    </form>
  );
}
