import Icon from "./Icon";
import { Link } from "react-router-dom";
const navItems = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "person", label: "Profile" },
  { icon: "admin", label: "Admin" },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 z-40 overflow-y-auto hide-scrollbar border-r border-slate-100 flex-col p-4 pt-20 hidden lg:flex"
      style={{ backgroundColor: "#f8faff" }}
    >
      <nav className="flex-1 space-y-1">
        {navItems.map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-white text-blue-700 shadow-sm shadow-blue-500/10"
                : "text-slate-500 hover:bg-white/70 hover:text-slate-800 hover:translate-x-0.5"
            }`}
          >
            <Icon name={icon} className="w-[18px] h-[18px]" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-slate-200">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-white/70 rounded-xl text-sm font-medium transition-all"
        >
          <Icon name="help" className="w-[18px] h-[18px]" />
          <span>Help</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
        >
          <Icon name="logout" className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}