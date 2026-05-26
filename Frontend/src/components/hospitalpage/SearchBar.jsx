import { ICONS } from "../layouts/ui/icons/HospitalIcons";

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

export default function SearchBar() {
  return (
    <section className="max-w-7xl mx-auto mb-12 px-4">
      <div
        className="relative p-1 bg-white rounded-2xl flex items-center gap-2 border border-slate-100"
        style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}
      >
        {/* Location input */}
        <div className="flex-1 flex items-center gap-3 px-3 sm:px-4">
          <Icon name="location" className="w-5 h-5 text-[#005dac] shrink-0" />
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full py-3 sm:py-4 bg-transparent outline-none text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-slate-100 hidden sm:block" />

        {/* Specialty input */}
        <div className="flex-1 hidden sm:flex items-center gap-3 px-4">
          <Icon name="specialty" className="w-5 h-5 text-[#005dac]" />
          <input
            type="text"
            placeholder="Specialty..."
            className="w-full py-4 bg-transparent outline-none text-sm placeholder:text-slate-400"
          />
        </div>

        {/* CTA BUTTON */}
        <button
          className="flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 rounded-xl text-white font-bold text-sm transition-all active:scale-95 shrink-0"
          style={{ background: "var(--primary-gradient)" }}
        >
          {/* 📱 Mobile icon */}
          <span className="sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          {/* 💻 Desktop text */}
          <span className="hidden sm:inline">
            Find Hospitals
          </span>
        </button>
      </div>
    </section>
  );
}