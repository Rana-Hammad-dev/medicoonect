import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../layouts/ui/icons/LandingPage";
import API from "../../api/axios";

const GRADIENT = { background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" };

function Icon({ name, className = "w-5 h-5", filled = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}
      viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">

      <path d={ICONS[name]} />
    </svg>
  );
}

function DoctorCard({ doc }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/appointment", { state: { doctor: doc } });
  };

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-[#c1c6d4]/10 group hover:shadow-xl transition-all">
      {/* Photo */}
      <div className="relative h-50 overflow-hidden">

        <img src={doc.image} alt={doc.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
        {/* Rating pill */}
        <div className="absolute top-4 left-4 bg-white/70 px-3 py-1 rounded-full flex items-center gap-1"
          style={{ backdropFilter: "blur(8px)" }}>
          <Icon name="star" className="w-4 h-4 text-yellow-500" filled />
          <span className="text-sm text-[#1a1c1c] font-semibold">{doc.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-1 text-[#1a1c1c]">{doc.name}</h3>
        <p className="text-[#005dac] font-semibold mb-2 text-sm">{doc.specialty}</p>
        <div className="flex items-center gap-1 text-sm text-[#414752] mb-3">
          <Icon name="payment" className="w-4 h-4" />
          <span>{doc.fee}</span>
        </div>
        <button
          onClick={handleBook}
          className="w-full py-3 rounded-xl font-bold text-sm text-[#1a1c1c] bg-[#f3f3f3] transition-all hover:text-white"
          onMouseEnter={(e) => { Object.assign(e.currentTarget.style, GRADIENT); e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#f3f3f3"; e.currentTarget.style.color = "#1a1c1c"; }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

// Skeleton loader
function DoctorSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-24 bg-slate-100 rounded" />
        <div className="h-10 w-full bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

export default function DoctorsSection() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/doctors")
      .then(({ data }) => {
        // Show only first 4 on landing page
        setDoctors((data.doctors || []).slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="py-32 px-10 sm:px-18">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1a1c1c] mb-4">
              Meet Our Top Specialists
            </h2>
            <p className="text-[#414752] text-md">
              Highly rated practitioners ready to provide elite care.
            </p>
          </div>
          <button
            onClick={() => navigate("/doctors")}
            className="text-[#005dac] font-bold flex items-center gap-2 group text-sm">
            View All Doctors
            <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? [1, 2, 3, 4].map((i) => <DoctorSkeleton key={i} />)
            : doctors.map((doc) => (
              // ✅ Use _id (MongoDB) as key — always unique
              <DoctorCard key={doc._id} doc={doc} />
            ))
          }
        </div>
      </div>
    </section>
  );
}

