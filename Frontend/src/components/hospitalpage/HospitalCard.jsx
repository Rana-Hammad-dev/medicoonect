import { ICONS } from "../layouts/ui/icons/HospitalIcons";

const GRADIENT = {
  background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)",
};
function StarFilled({ className = "w-4 h-4" }) {
  return (
    <svg
      className={`${className} text-yellow-500 fill-current`}
      viewBox="0 0 24 24"
    >
      <path d={ICONS.star} />
    </svg>
  );
}
function RatingPill({ rating, size = "sm" }) {
  return (
    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1">
      <StarFilled className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className={`font-bold ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating}
      </span>
    </div>
  );
}
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
export default function HospitalCard({ hospital }) {
  return (
    <div
      className="bg-white rounded-3xl p-6 group flex flex-col h-full"
      style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}
    >
      {/* Image */}
      <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <RatingPill rating={hospital.rating} />
      </div>

      {/* Name + address */}
      <h3
        className="text-xl font-bold text-[#1a1c1c] mb-2"
        style={{ fontFamily: "Manrope,sans-serif" }}
      >
        {hospital.name}
      </h3>
      <p className="text-sm text-[#414752] flex items-center gap-1 mb-6">
        <Icon name="location" className="w-4 h-4 shrink-0 text-amber-500" />
        {hospital.address}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[#005dac] font-bold text-sm">
          {hospital.distance}
        </span>
        <button
          className="p-3 bg-[#f3f3f3] text-[#005dac] rounded-xl transition-all active:scale-90 hover:text-white"
          style={{ transition: "background 0.2s" }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, GRADIENT)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f3f3f3";
          }}
        >
          <Icon name="arrow" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
