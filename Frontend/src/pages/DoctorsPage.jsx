import { useState, useEffect } from "react";
import AfterLoginNav from "../components/layouts/AfterLoginNav.jsx";
import Footer from "../components/layouts/Footer";
import { ICONS } from "../components/layouts/ui/icons/DoctorsIcons.js";
import DoctorCard from "../components/doctorspage/DoctorCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/axios";

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// Skeleton loader for doctor cards
function DoctorSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="flex gap-4 items-start mb-6">
        <div className="w-24 h-24 rounded-2xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-5 w-32 bg-slate-300 rounded" />
          <div className="h-3 w-24 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-200 rounded" />
      </div>
      <div className="h-10 w-full bg-slate-200 rounded-xl" />
    </div>
  );
}

const SPECIALIZATIONS = [
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

export default function DoctorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialty, setSpecialty] = useState(
    searchParams.get("specialty") || "All Specializations",
  );

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (specialty !== "All Specializations") params.specialty = specialty;

        const { data } = await API.get("/doctors", { params });
        setDoctors(data.doctors);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(fetchDoctors, 400);
    return () => clearTimeout(timer);
  }, [search, specialty]);

  const handleDoctorClick = (doc) => {
    navigate("/appointment", { state: { doctor: doc } });
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c]">
      <AfterLoginNav />

      <main className="sm:px-18 pt-20 min-h-screen px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <section className="py-12 flex flex-col gap-8">
            <div>
              <h1
                className="text-4xl md:text-5xl font-extrabold text-[#1a1c1c] tracking-tight"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Search Specialists
              </h1>
              <p className="text-[#414752] text-lg max-w-2xl mt-2 leading-relaxed">
                Connect with verified medical professionals for your well-being.
              </p>
            </div>

            {/* Search bar */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-2 w-full lg:w-[55vw] bg-[#f3f3f3] rounded-2xl">
                {/* Name search */}
                <div className="lg:col-span-2 bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-slate-100">
                  <Icon
                    name="search"
                    className="w-5 h-5 text-[#005dac] shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search by doctor name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#1a1c1c] placeholder:text-[#717783]/60 outline-none"
                  />
                </div>
                {/* Specialty */}
                <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-slate-100">
                  <Icon
                    name="stethoscope"
                    className="w-5 h-5 text-[#005dac] shrink-0"
                  />
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#1a1c1c] appearance-none cursor-pointer outline-none"
                  >
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Results count */}
          {!loading && (
            <p className="text-sm text-[#414752] mb-6">
              Showing{" "}
              <span className="font-bold text-[#005dac]">{doctors.length}</span>{" "}
              doctors
              {specialty !== "All Specializations" && ` in ${specialty}`}
              {search && ` matching "${search}"`}
            </p>
          )}

          {/* Doctor grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              // Skeleton loading
              [1, 2, 3, 4].map((i) => <DoctorSkeleton key={i} />)
            ) : doctors.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-xl font-bold text-[#414752]">
                  No doctors found
                </p>
                <p className="text-sm text-[#717783] mt-2">
                  Try a different name or specialty
                </p>
              </div>
            ) : (
              doctors.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => handleDoctorClick(doc)}
                  className="cursor-pointer"
                >
                  <DoctorCard {...doc} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
