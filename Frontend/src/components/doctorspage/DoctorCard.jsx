import { ICONS } from "../layouts/ui/icons/LandingPage";
import { Link } from "react-router-dom";

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

export default function DoctorCard({
  name,
  specialty,
  badge,
  badgeColor,
  rating,
  experience,
  hospital,
  fee,
  image,
}) {
  return (
    <article
      className="bg-white rounded-2xl p-6 border h-full border-slate-100 
  group hover:bg-slate-50 transition-colors duration-200 
  flex flex-col"
      style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}
    >
      {/* Header: photo + name block */}
      <div className="flex gap-4 items-start mb-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col min-w-0">
          {/* Badge + star rating */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${badgeColor}`}
            >
              {badge}
            </span>
            <div className="flex items-center gap-1">
              {/* Filled gold star */}
              <svg
                className="w-3.5 h-3.5 text-amber-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-xs font-bold text-[#1a1c1c]">{rating}</span>
            </div>
          </div>
          <h3
            className="text-xl font-extrabold text-[#1a1c1c] leading-tight truncate"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {name}
          </h3>
          <p className="text-[#005dac] font-medium text-sm mt-0.5">
            {specialty}
          </p>
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-3 mb-8">
        {[
          { icon: "medical", text: experience },
          { icon: "hospital", text: hospital },
          { icon: "payment", text: fee },
        ].map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 text-[#414752] text-sm"
          >
            <Icon
              name={icon}
              className="w-[18px] h-[18px] shrink-0 opacity-60"
            />
            <span>{text}</span>
          </div>
        ))}
      </div>
      {/* Actions */}
      <div className="mt-auto">
        <Link to={"/appointment"}>
          <button
            className="py-3 w-full rounded-xl text-white text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            style={{ background: "var(--primary-gradient)" }}
          >
            Book Appointment
          </button>
        </Link>
      </div>
    </article>
  );
}
