import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import Footer from "../components/layouts/Footer";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const GRADIENT = { background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" };

const PATHS = {
  person:      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  calendar:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  check:       "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  info:        "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  chevRight:   "M9 5l7 7-7 7",
  star:        "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  stethoscope: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
};

function Icon({ name, className = "w-5 h-5", filled = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}
      fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24"
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name]} />
    </svg>
  );
}

const ALL_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-bold text-[#414752] uppercase tracking-[0.08em] mb-1.5">
      {children}
    </label>
  );
}

const inputCls = `w-full px-4 py-3 bg-[#f3f3f3] border-none rounded-xl text-[13px] text-[#1a1c1c] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#005dac]/20 placeholder:text-[#717783]`;

// ── Doctor Selector (shown when no doctor passed) ─────────────────────────────
function DoctorSelector({ onSelect }) {
  const [doctors,  setDoctors]  = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get("/doctors")
      .then(({ data }) => setDoctors(data.doctors || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? doctors.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())
      )
    : doctors;

  return (
    <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}>
      <h2 className="text-xl font-bold text-[#1a1c1c] mb-2">Select a Doctor</h2>
      <p className="text-sm text-[#414752] mb-6">Choose a specialist to book your appointment</p>

      {/* Search */}
      <div className="flex items-center gap-3 bg-[#f3f3f3] px-4 py-3 rounded-xl mb-6">
        <Icon name="search" className="w-4 h-4 text-[#005dac] shrink-0" />
        <input type="text" placeholder="Search by name or specialty..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-[#f9f9f9] rounded-xl">
              <div className="w-14 h-14 rounded-xl bg-slate-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-slate-400 py-8">No doctors found</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filtered.map((doc) => (
            <button key={doc._id} type="button" onClick={() => onSelect(doc)}
              className="w-full flex items-center gap-4 p-4 bg-[#f9f9f9] hover:bg-[#d4e3ff]/20 rounded-xl transition-all text-left group">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#d4e3ff] shrink-0">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1a1c1c] group-hover:text-[#005dac] transition-colors">{doc.name}</p>
                <p className="text-sm text-[#005dac]">{doc.specialty}</p>
                <p className="text-xs text-slate-400 truncate">{doc.hospital} · {doc.fee}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500 shrink-0">
                <Icon name="star" className="w-3.5 h-3.5" filled />
                <span className="text-xs font-bold">{doc.rating}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Doctor Info Card ──────────────────────────────────────────────────────────
function DoctorInfoCard({ doctor, onchange }) {
  if (!doctor) return null;
  return (
    <aside className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 relative" style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}>
        <div className="absolute top-4 right-4 bg-[#ffdbc7] text-[#311300] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Icon name="star" className="w-3 h-3 text-amber-600" filled />
          {doctor.rating}
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full border-4 border-[#eeeeee] mb-6 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#d4e3ff,#a5c8ff)" }}>
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
          </div>
          <h2 className="text-[22px] font-bold text-[#1a1c1c] mb-1">{doctor.name}</h2>
          <span className="text-[#005dac] font-semibold text-xs tracking-[0.1em] uppercase mb-5">
            {doctor.specialty} Specialist
          </span>
          <div className="w-full h-px bg-[#f3f3f3] mb-5" />
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {[doctor.specialty, "Consultation", "Verified"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#eeeeee] text-[#414752] text-[11px] rounded-full">{tag}</span>
            ))}
          </div>
          <div className="w-full space-y-3">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#414752]">Consultation Fee</span>
              <span className="font-bold text-[#1a1c1c]">{doctor.fee}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#414752]">Experience</span>
              <span className="font-medium text-[#005dac]">{doctor.experience}</span>
            </div>
          </div>
         
          {onchange && (
            <button type="button" onClick={onchange}
              className="mt-5 w-full py-2 text-sm font-bold text-[#005dac] bg-[#d4e3ff]/30 hover:bg-[#d4e3ff]/50 rounded-xl transition-all">
              ← Change Doctor
            </button>
          )}
        </div>
      </div>
      <div className="bg-[#005dac]/6 p-6 rounded-2xl flex gap-4 items-start">
        <div className="p-2 rounded-xl flex-shrink-0" style={GRADIENT}>
          <Icon name="info" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-[13px] text-[#1a1c1c] mb-1">Clinic Guidelines</h4>
          <p className="text-[12px] text-[#414752] leading-[1.7]">
            Please arrive 15 minutes early. Bring all current medications and previous records.
          </p>
        </div>
      </div>
    </aside>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ doctor, date, slot, email, onReset }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-16 flex flex-col items-center text-center gap-6"
      style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white"
        style={{ ...GRADIENT, boxShadow: "0 12px 32px rgba(0,93,172,0.3)" }}>
        <Icon name="check" className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-extrabold text-[#1a1c1c]">Appointment Confirmed!</h2>
      <p className="text-[#414752] text-[15px] leading-[1.7] max-w-md">
        Your appointment with <strong>{doctor}</strong> has been booked for{" "}
        <strong>{date}</strong> at <strong>{slot}</strong>.
        Confirmation sent to <strong>{email}</strong>.
      </p>
      <div className="flex gap-4 mt-2">
        <button onClick={onReset}
          className="px-9 py-4 text-white font-bold rounded-xl text-sm hover:opacity-90 active:scale-95"
          style={{ ...GRADIENT, boxShadow: "0 8px 24px rgba(0,93,172,0.25)" }}>
          Book Another
        </button>
        <button onClick={() => navigate("/dashboard")}
          className="px-9 py-4 bg-[#f3f3f3] text-[#1a1c1c] font-bold rounded-xl text-sm hover:bg-[#e8e8e8]">
          My Dashboard
        </button>
      </div>
    </div>
  );
}

const SectionHead = ({ icon, title, subtitle }) => (
  <div className="col-span-1 sm:col-span-2 pt-2">
    <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#1a1c1c]">
      <Icon name={icon} className="w-5 h-5 text-[#005dac]" />
      {title}
    </h3>
    <p className="text-[11px] text-[#717783] uppercase tracking-[0.1em] mt-1">{subtitle}</p>
  </div>
);

const SpinIcon = () => (
  <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ── Appointment Form ──────────────────────────────────────────────────────────
function AppointmentForm({ doctor, onChangeDoctor }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "",
    phone: "", gender: "Male", age: "",
    date: "", symptoms: "", consent: false,
  });
  const [selectedSlot,   setSlot]           = useState("");        // no default
  const [availableSlots, setAvailableSlots] = useState([]);        // empty until date picked
  const [loadingSlots,   setLoadingSlots]   = useState(false);
  const [loading,        setLoading]        = useState(false);
  const [submitted,      setSubmitted]      = useState(false);
  const [error,          setError]          = useState("");
  const [phoneError,     setPhoneError]     = useState("");         // phone validation

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  // ── Phone validation ───────────────────────────────────────────────────────
  const validatePhone = (val) => {
    if (!val) { setPhoneError("Phone number is required"); return false; }
    // International format: optional + then 7-15 digits (spaces/dashes allowed)
    const intlRegex = /^\+?[\d\s\-().]{7,20}$/;
    if (!intlRegex.test(val)) {
      setPhoneError("Enter a valid phone number (e.g. +923001234567 or 03001234567)");
      return false;
    }
    // Must have at least 7 actual digits
    const digitsOnly = val.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setPhoneError("Phone number must be 7–15 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e) => {
    set("phone", e.target.value);
    if (phoneError) validatePhone(e.target.value); // live re-validate after first error
  };

  // ── Slots fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!form.date || !doctor?._id) {
      setAvailableSlots([]);
      setSlot("");
      return;
    }
    setLoadingSlots(true);
    setSlot("");
    setAvailableSlots([]);
    API.get(`/doctors/${doctor._id}/slots?date=${form.date}`)
      .then(({ data }) => {
        setAvailableSlots(data.availableSlots || []);
        if (data.availableSlots?.length > 0)
          setSlot(data.availableSlots[0]);
      })
      .catch(() => {
        setAvailableSlots(ALL_SLOTS);
        setSlot(ALL_SLOTS[0]);
      })
      .finally(() => setLoadingSlots(false));
  }, [form.date, doctor?._id]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user)         { navigate("/auth"); return; }
    if (!doctor?._id)  { setError("Please select a doctor first."); return; }
    if (!validatePhone(form.phone)) return;          // ✅ phone check
    if (!selectedSlot) { setError("Please select a time slot."); return; }

    setLoading(true);
    try {
      await API.post("/appointments", {
        doctorId: doctor._id, date: form.date, slot: selectedSlot,
        symptoms: form.symptoms, patientPhone: form.phone,
        patientAge: form.age, patientGender: form.gender,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false); setError(""); setPhoneError("");
    setForm({ name: user?.name||"", email: user?.email||"", phone:"", gender:"Male", age:"", date:"", symptoms:"", consent:false });
    setSlot(""); setAvailableSlots([]);
  };

  if (submitted)
    return <SuccessScreen doctor={doctor?.name} date={form.date} slot={selectedSlot} email={form.email} onReset={reset} />;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12"
      style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}>

      {!user && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 font-medium">
          You need to{" "}
          <button onClick={() => navigate("/auth")} className="text-[#005dac] font-bold underline">login</button>
          {" "}to book an appointment.
        </div>
      )}

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">

        <SectionHead icon="person" title="Patient Information" subtitle="Demographics & Contact" />

        <div>
          <FieldLabel>Full Name</FieldLabel>
          <input type="text" required placeholder="John Doe" className={inputCls}
            value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <input type="email" required placeholder="john@example.com" className={inputCls}
            value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Phone Number</FieldLabel>
          <input type="tel" placeholder="+923001234567" required
            className={`${inputCls} ${phoneError ? "ring-2 ring-red-300 bg-red-50" : ""}`}
            value={form.phone}
            onChange={handlePhoneChange}
            onBlur={() => validatePhone(form.phone)} />
          {phoneError && (
            <p className="text-red-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {phoneError}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Gender</FieldLabel>
            <select className={inputCls} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div>
            <FieldLabel>Age</FieldLabel>
            <input type="number" placeholder="25" min={1} max={120} className={inputCls}
              value={form.age} onChange={(e) => set("age", e.target.value)} />
          </div>
        </div>

        <SectionHead icon="stethoscope" title="Appointment Details" subtitle="Doctor & Schedule" />

        <div>
          <FieldLabel>Selected Doctor</FieldLabel>
          <input readOnly value={doctor?.name || "No doctor selected"}
            className={`${inputCls} cursor-not-allowed text-[#717783]`} />
        </div>
        <div>
          <FieldLabel>Specialization</FieldLabel>
          <input readOnly value={doctor?.specialty || "—"}
            className={`${inputCls} cursor-not-allowed text-[#717783]`} />
        </div>
        <div>
          <FieldLabel>Preferred Date</FieldLabel>
          <input type="date" required className={inputCls} value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => set("date", e.target.value)} />
        </div>
        <div>
          <FieldLabel>{loadingSlots ? "Loading slots..." : "Available Time Slots"}</FieldLabel>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-red-500 font-medium mt-1">No slots available. Try another date.</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-1">
              {ALL_SLOTS.map((slot) => {
                const ok = availableSlots.includes(slot);
                return (
                  <button key={slot} type="button" onClick={() => ok && setSlot(slot)} disabled={!ok}
                    className={`px-4 py-2 rounded-lg text-[11px] font-semibold transition-all select-none
                      ${!ok ? "bg-[#f3f3f3] text-[#c1c6d4] line-through cursor-not-allowed" : ""}
                      ${ok && selectedSlot === slot ? "text-white shadow-md" : ""}
                      ${ok && selectedSlot !== slot ? "bg-[#eeeeee] text-[#414752] hover:bg-[#e2e2e2]" : ""}
                    `}
                    style={ok && selectedSlot === slot ? GRADIENT : {}}>
                    {slot}{!ok && " (Booked)"}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <FieldLabel>Describe Your Symptoms</FieldLabel>
          <textarea rows={4} placeholder="Briefly describe what you are experiencing..."
            className={`${inputCls} resize-none min-h-[90px]`}
            value={form.symptoms} onChange={(e) => set("symptoms", e.target.value)} />
        </div>

        {error && (
          <div className="col-span-1 sm:col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <div className="col-span-1 sm:col-span-2 pt-4 flex flex-col gap-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#005dac] shrink-0" />
            <span className="text-[12px] text-[#414752] leading-[1.75]">
              I consent to processing of my health data and agree to the{" "}
              <a href="#" className="text-[#005dac] font-semibold hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-[#005dac] font-semibold hover:underline">Privacy Policy</a>.
            </span>
          </label>
          <button type="submit" disabled={loading || !user || !doctor?._id}
            className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            style={{ ...GRADIENT, boxShadow: "0 8px 24px rgba(0,93,172,0.22)" }}>
            {loading ? <><SpinIcon /> Booking...</> : <><Icon name="calendar" className="w-5 h-5" /> Confirm Appointment</>}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Page Assembly ─────────────────────────────────────────────────────────────
export default function BookAppointment() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const passedDoc = location.state?.doctor;

  const [doctor,   setDoctor]   = useState(passedDoc || null);
  const [fetching, setFetching] = useState(false);
  const [showSelector, setShowSelector] = useState(!passedDoc);

  useEffect(() => {
    if (doctor && !doctor._id && doctor.name) {
      setFetching(true);
      API.get("/doctors", { params: { search: doctor.name } })
        .then(({ data }) => {
          if (data.doctors?.length > 0) setDoctor(data.doctors[0]);
        })
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, []);

  const handleDoctorSelect = (doc) => {
    setDoctor(doc);
    setShowSelector(false);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#005dac] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#414752] font-medium">Loading doctor info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]">
      <AfterLoginNav />-
      <main className="lg:px-18 pt-20 min-h-screen px-6 pb-16">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <header className="mt-10 mb-10">
            <nav className="flex items-center gap-1.5 text-[13px] text-[#414752] mb-4">
              <button onClick={() => navigate("/")} className="hover:text-[#005dac] transition-colors">Home</button>
              <Icon name="chevRight" className="w-3.5 h-3.5 opacity-50" />
              <button onClick={() => navigate("/doctors")} className="hover:text-[#005dac] transition-colors">Doctors</button>
              <Icon name="chevRight" className="w-3.5 h-3.5 opacity-50" />
              <span className="text-[#005dac] font-semibold">Book Appointment</span>
            </nav>
            <h1 className="text-4xl font-extrabold tracking-tight">Book an Appointment</h1>
          </header>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

            {/* Left — Doctor info OR selector */}
            <div className="lg:col-span-4">
              {showSelector || !doctor ? (
                <DoctorSelector onSelect={handleDoctorSelect} />
              ) : (
                <DoctorInfoCard
                  doctor={doctor}
                  onchange={() => setShowSelector(true)}
                />
              )}
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-8">
              <AppointmentForm
                doctor={showSelector ? null : doctor}
                onChangeDoctor={() => setShowSelector(true)}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}