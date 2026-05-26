import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "./PrimaryBtn";
import { ICONS } from "../layouts/ui/icons/LandingPage";

const SPECIALTIES = [
  "All Specializations",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Urology",
  "Gynecology",
  "Psychiatry",
  "Dentist",
  "General Physician",
];

function Icon({ name, className = "w-5 h-5", filled = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

function SearchField({ icon, label, children }) {
  return (
    <div className="p-3 rounded-xl bg-[#f3f3f3] transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-[#005dac]/10">
      <label className="block text-[10px] font-bold text-[#005dac] uppercase tracking-tighter mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Icon name={icon} className="w-[18px] h-[18px] text-[#414752] shrink-0" />
        {children}
      </div>
    </div>
  );
}

export default function SearchSection() {
  const navigate = useNavigate();

  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("All Specializations");
  const [condition, setCondition] = useState("");

  const handleSearch = () => {
    // Build query params — sirf woh bhejo jo filled hain
    const params = new URLSearchParams();

    // name ya condition dono "search" param mein jayenge
    // (backend $or se dono fields mein dhundta hai)
    const searchTerm = doctorName || condition;
    if (searchTerm) params.set("search", searchTerm);
    if (specialty && specialty !== "All Specializations") {
      params.set("specialty", specialty);
    }

    // /doctors page par navigate karo with query params
    navigate(`/doctors?${params.toString()}`);
  };

  // Enter press karne par bhi search ho
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <section className="px-10 -mt-12 relative z-20">
      <div
        className="max-w-[60rem] mx-auto bg-white p-4 lg:p-6 rounded-4xl border border-[#c1c6d4]/10"
        style={{ boxShadow: "0 20px 50px rgba(0,93,172,0.12)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr] gap-4">

          {/* Doctor Name */}
          <SearchField icon="person" label="Doctor Name">
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Dr. Ahmad Raza"
              className="bg-transparent border-none focus:ring-0 w-full p-0 text-sm font-medium text-[#1a1c1c] placeholder:text-[#717783] outline-none"
            />
          </SearchField>

          {/* Specialty */}
          <SearchField icon="stethoscope" label="Specialty">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full p-0 text-sm font-medium text-[#1a1c1c] outline-none"
            >
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </SearchField>

          {/* Search Button */}
          <PrimaryBtn className="rounded-xl py-4 text-sm" onClick={handleSearch}>
            <Icon name="search" className="w-5 h-5" />
            Search Now
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
