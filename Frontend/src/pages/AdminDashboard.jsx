import { useEffect, useState } from "react";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import Icon from "../components/layouts/Icon";
import Sidebar from "../components/layouts/Sidebar";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const GRADIENT = { background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" };
const STATUS_STYLES = {
  pending:   "bg-amber-50 text-amber-700",
  confirmed: "bg-teal-50 text-teal-700",
  rejected:  "bg-red-50 text-red-600",
  completed: "bg-blue-50 text-blue-700",
};

function KpiCard({ icon, iconColor, bgColor, label, value, unit }) {
  return (
    <div className="bg-white p-6 rounded-2xl relative overflow-hidden" style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-8 -mt-8 ${bgColor}`} />
      <div className="relative z-10">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${bgColor}`}>
          <Icon name={icon} className={`w-5 h-5 ${iconColor}`} />
        </div>
        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
        <span className="text-3xl font-extrabold text-slate-800">
          {value ?? "--"}{unit && <span className="text-lg ml-1">{unit}</span>}
        </span>
      </div>
    </div>
  );
}

function DoctorsTable({ doctors }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1a1c1c]">Registered Doctors</h2>
        <span className="text-sm text-slate-400 font-medium">{doctors.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-bold">Doctor</th>
              <th className="px-6 py-3 text-left font-bold">Specialty</th>
              <th className="px-6 py-3 text-left font-bold">Hospital</th>
              <th className="px-6 py-3 text-left font-bold">Fee</th>
              <th className="px-6 py-3 text-left font-bold">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors.length === 0
              ? <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400">No doctors found</td></tr>
              : doctors.map((doc) => (
                <tr key={doc._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-[#d4e3ff] shrink-0">
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1c1c]">{doc.name}</p>
                        <p className="text-xs text-slate-400">{doc.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#005dac] font-medium">{doc.specialty}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.hospital}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.fee}</td>
                  <td className="px-6 py-4"><span className="text-amber-600 font-bold">⭐ {doc.rating}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsTable({ appointments }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1a1c1c]">All Appointments</h2>
        <span className="text-sm text-slate-400 font-medium">{appointments.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-bold">Patient</th>
              <th className="px-6 py-3 text-left font-bold">Doctor</th>
              <th className="px-6 py-3 text-left font-bold">Date & Slot</th>
              <th className="px-6 py-3 text-left font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.length === 0
              ? <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">No appointments yet</td></tr>
              : appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1a1c1c]">{appt.patientName}</p>
                    <p className="text-xs text-slate-400">{appt.patientEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#005dac] font-medium">{appt.doctor?.name || "—"}</p>
                    <p className="text-xs text-slate-400">{appt.doctor?.specialty}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600">{appt.date}</p>
                    <p className="text-xs text-slate-400">{appt.slot}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${STATUS_STYLES[appt.status] || "bg-slate-100 text-slate-600"}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats,        setStats]        = useState(null);
  const [activities,   setActivities]   = useState([]);
  const [doctors,      setDoctors]      = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeTab,    setActiveTab]    = useState("overview");

  useEffect(() => {
    Promise.all([
      API.get("/admin/stats"),
      API.get("/admin/doctors"),
      API.get("/admin/appointments"),
    ]).then(([s, d, a]) => {
      setStats(s.data.stats);
      setActivities(s.data.activities || []);
      setDoctors(d.data.doctors || []);
      setAppointments(a.data.appointments || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const TABS = ["overview", "doctors", "appointments"];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AfterLoginNav />
      <Sidebar />
      <main className="lg:ml-64 pt-20 px-6 lg:px-8 pb-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
            {user && (
              <p className="text-slate-500 mt-1">
                {user.name}
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">Admin</span>
              </p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? "text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100"}`}
              style={activeTab === tab ? GRADIENT : {}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[1,2,3,4].map((i) => <div key={i} className="bg-white p-6 rounded-2xl animate-pulse h-32" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <KpiCard icon="group"   iconColor="text-blue-600"   bgColor="bg-blue-50"   label="Total Patients"  value={stats?.patients} />
                <KpiCard icon="medical" iconColor="text-teal-600"   bgColor="bg-teal-50"   label="Doctors"         value={stats?.doctors} />
                <KpiCard icon="event"   iconColor="text-orange-500" bgColor="bg-orange-50" label="Appointments"    value={stats?.appointments} />
                <KpiCard icon="clock"   iconColor="text-slate-600"  bgColor="bg-slate-100" label="Avg Wait"        value={stats?.waitTime} unit="min" />
              </div>
            )}
            <div className="bg-white p-8 rounded-2xl" style={{ boxShadow: "0 2px 16px rgba(0,93,172,0.05)" }}>
              <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
              <div className="space-y-2">
                {activities.length === 0
                  ? <p className="text-sm text-slate-400">No recent activity</p>
                  : activities.map((a) => (
                    <div key={a._id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-sm">{a.name}</p>
                        <p className="text-xs text-slate-400">{a.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{a.time}</p>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[a.status?.toLowerCase()] || "bg-blue-50 text-blue-600"}`}>
                          {a.status}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}

        {activeTab === "doctors"      && <DoctorsTable      doctors={doctors} />}
        {activeTab === "appointments" && <AppointmentsTable appointments={appointments} />}

      </main>
    </div>
  );
}