import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const GRADIENT = {
  background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)",
};

const STATUS_STYLES = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  confirmed: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  rejected: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  completed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};

function Icon({ path, className = "w-5 h-5" }) {
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
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  calendar:
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  plus: "M12 4v16m8-8H4",
  doctor: "M9 12h6m-3-3v6M5 20a7 7 0 1114 0H5z",
  empty:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
};

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 relative overflow-hidden"
      style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full -mr-6 -mt-6 ${bg} opacity-60`}
      />
      <div className="relative z-10">
        <div
          className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}
        >
          <Icon path={icon} className={`w-5 h-5 ${color}`} />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function AppointmentCard({ appointment }) {
  const s = STATUS_STYLES[appointment.status] || STATUS_STYLES.pending;
  const doc = appointment.doctor;
  return (
    <div
      className="bg-white rounded-2xl p-6 hover:shadow-md transition-all"
      style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#d4e3ff] shrink-0">
            {doc?.image ? (
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#005dac] font-bold text-xl">
                {doc?.name?.charAt(0) || "D"}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-[#1a1c1c]">{doc?.name || "Doctor"}</p>
            <p className="text-sm text-[#005dac] font-medium">
              {doc?.specialty}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{doc?.hospital}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize border ${s.bg} ${s.text} ${s.border} shrink-0`}
        >
          {appointment.status}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Icon path={ICONS.calendar} className="w-4 h-4 text-[#005dac]" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Icon path={ICONS.clock} className="w-4 h-4 text-[#005dac]" />
          <span>{appointment.slot}</span>
        </div>
        {appointment.symptoms && (
          <div className="col-span-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2 mt-1">
            💬 {appointment.symptoms}
          </div>
        )}
      </div>
      {doc?.fee && (
        <div className="mt-3 flex justify-between items-center text-sm">
          <span className="text-slate-400">Consultation Fee</span>
          <span className="font-bold text-[#1a1c1c]">{doc.fee}</span>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="h-px bg-slate-100 mb-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-3 bg-slate-100 rounded" />
        <div className="h-3 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    API.get("/appointments/mine")
      .then(({ data }) => setAppointments(data.appointments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);
  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AfterLoginNav />
      <main className="pt-24 pb-16 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1a1c1c]">
              My Dashboard
            </h1>
            {user && (
              <p className="text-slate-500 mt-1">
                Welcome back,{" "}
                <span className="font-bold text-[#005dac]">{user.name}</span> 👋
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/doctors")}
            className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all"
            style={GRADIENT}
          >
            <Icon path={ICONS.plus} className="w-4 h-4" />
            Book New Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={ICONS.calendar}
            label="Total"
            value={stats.total}
            color="text-[#005dac]"
            bg="bg-blue-50"
          />
          <StatCard
            icon={ICONS.clock}
            label="Pending"
            value={stats.pending}
            color="text-amber-600"
            bg="bg-amber-50"
          />
          <StatCard
            icon={ICONS.check}
            label="Confirmed"
            value={stats.confirmed}
            color="text-teal-600"
            bg="bg-teal-50"
          />
          <StatCard
            icon={ICONS.doctor}
            label="Completed"
            value={stats.completed}
            color="text-slate-600"
            bg="bg-slate-100"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["all", "pending", "confirmed", "completed", "rejected"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${filter === tab ? "text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100"}`}
                style={filter === tab ? GRADIENT : {}}
              >
                {tab}
                {tab !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({appointments.filter((a) => a.status === tab).length})
                  </span>
                )}
              </button>
            ),
          )}
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="bg-white rounded-2xl p-16 text-center"
            style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}
          >
            <Icon
              path={ICONS.empty}
              className="w-16 h-16 text-slate-200 mx-auto mb-4"
            />
            <p className="text-lg font-bold text-slate-400">
              {filter === "all"
                ? "No appointments yet"
                : `No ${filter} appointments`}
            </p>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Book your first appointment with one of our specialists
            </p>
            <button
              onClick={() => navigate("/doctors")}
              className="px-6 py-3 text-white font-bold rounded-xl text-sm"
              style={GRADIENT}
            >
              Find a Doctor
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
