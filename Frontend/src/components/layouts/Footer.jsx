import { ICONS } from "./ui/icons/LandingPage";

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
export default function Footer() {
  const links = ["Privacy Policy", "Terms of Service", "HIPAA Compliance","Support By Idiots"];
  return (
    <footer className="bg-slate-100 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-10 sm:px-18 py-10 gap-6 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-lg font-bold text-slate-900" >MediConnect</div>
          <p className="text-slate-500 text-xs tracking-wide">© 2026 MediConnect. High-stakes clinical precision.</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a key={l} href="#" className="text-slate-500 text-xs tracking-wide hover:text-blue-700 transition-colors">
              {l}
            </a>
          ))}
        </div>

        {/* Icon buttons */}
        <div className="flex gap-3">
          {["globe", "support"].map((icon) => (
            <button
              key={icon}
              className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#005dac] hover:text-white transition-colors"
            >
              <Icon name={icon} className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}