import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

// ── Status badge colors ───────────────────────────────────────────────────────
const STATUS_STYLES = {
  pending:   "bg-amber-50  text-amber-700  border border-amber-200",
  confirmed: "bg-teal-50   text-teal-700   border border-teal-200",
  rejected:  "bg-red-50    text-red-700    border border-red-200",
  completed: "bg-blue-50   text-blue-700   border border-blue-200",
};

const GRADIENT = { background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" };

// ── Small icon helper ─────────────────────────────────────────────────────────
function Icon({ path, className = "w-5 h-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  check:    "M5 13l4 4L19 7",
  x:        "M6 18L18 6M6 6l12 12",
  person:   "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  stethoscope: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-4 border-b border-slate-100">
      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded" />
        <div className="h-3 w-48 bg-slate-100 rounded" />
      </div>
      <div className="h-6 w-20 bg-slate-200 rounded-full" />
    </div>
  );
}

// ── Single appointment row ────────────────────────────────────────────────────
function AppointmentRow({ appointment, onStatusChange }) {
  const [updating, setUpdating] = useState(false);

  const update = async (status) => {
    setUpdating(true);
    try {
      await API.patch(`/appointments/${appointment._id}`, { status });
      onStatusChange(appointment._id, status);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const isPending = appointment.status === "pending";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 text-sm font-bold"
          style={GRADIENT}>
          {appointment.patientName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-[#1a1c1c] text-sm">{appointment.patientName}</p>
          <p className="text-xs text-slate-400">{appointment.patientEmail}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Icon path={ICONS.calendar} className="w-3 h-3" />
              {appointment.date}
            </span>
            <span className="flex items-center gap-1">
              <Icon path={ICONS.clock} className="w-3 h-3" />
              {appointment.slot}
            </span>
            {appointment.patientGender && (
              <span className="capitalize">{appointment.patientGender}</span>
            )}
            {appointment.patientAge && (
              <span>{appointment.patientAge} yrs</span>
            )}
          </div>
          {appointment.symptoms && (
            <p className="text-xs text-slate-400 mt-1 max-w-xs truncate">
              💬 {appointment.symptoms}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize ${STATUS_STYLES[appointment.status]}`}>
          {appointment.status}
        </span>

        {isPending && (
          <div className="flex gap-2">
            <button
              onClick={() => update("confirmed")}
              disabled={updating}
              title="Confirm"
              className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
            >
              <Icon path={ICONS.check} className="w-4 h-4" />
            </button>
            <button
              onClick={() => update("rejected")}
              disabled={updating}
              title="Reject"
              className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
            >
              <Icon path={ICONS.x} className="w-4 h-4" />
            </button>
            <button
              onClick={() => update("completed")}
              disabled={updating}
              title="Mark Completed"
              className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 text-xs font-bold"
            >
              ✓✓
            </button>
          </div>
        )}

        {appointment.status === "confirmed" && (
          <button
            onClick={() => update("completed")}
            disabled={updating}
            className="px-3 py-1 text-[11px] font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("all");

  useEffect(() => {
    if (user && user.role !== "doctor") {
      navigate("/");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const { data } = await API.get("/appointments/doctor");
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filtered = filter === "all"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  const stats = {
    total:     appointments.length,
    pending:   appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AfterLoginNav />

      <main className="pt-24 pb-16 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1a1c1c]">Doctor Dashboard</h1>
            {user && (
              <p className="text-slate-500 mt-1">
                Welcome, <span className="font-bold text-[#005dac]">{user.name}</span>
                {user.specialty && (
                  <span className="text-slate-400"> · {user.specialty}</span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total",     value: stats.total,     color: "text-[#005dac]", bg: "bg-blue-50",   icon: ICONS.calendar },
            { label: "Pending",   value: stats.pending,   color: "text-amber-600", bg: "bg-amber-50",  icon: ICONS.clock },
            { label: "Confirmed", value: stats.confirmed, color: "text-teal-600",  bg: "bg-teal-50",   icon: ICONS.check },
            { label: "Completed", value: stats.completed, color: "text-slate-600", bg: "bg-slate-100", icon: ICONS.stethoscope },
          ].map(({ label, value, color, bg, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm"
              style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon path={icon} className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm" style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1a1c1c]">Patient Appointments</h2>

            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "completed", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    filter === tab
                      ? "text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                  style={filter === tab ? GRADIENT : {}}
                >
                  {tab}
                  {tab !== "all" && (
                    <span className="ml-1 opacity-70">
                      ({appointments.filter((a) => a.status === tab).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <Icon path={ICONS.calendar} className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No {filter !== "all" ? filter : ""} appointments yet</p>
              </div>
            ) : (
              filtered.map((appt) => (
                <AppointmentRow
                  key={appt._id}
                  appointment={appt}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
