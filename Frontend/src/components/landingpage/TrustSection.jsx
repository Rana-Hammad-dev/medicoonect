import { ICONS } from "../layouts/ui/icons/LandingPage";
const TRUST_BADGES = [
  { icon: "security", label: "HIPAA Compliant" },
  { icon: "encrypted", label: "AES-256 Encrypted" },
  { icon: "verified", label: "Vetted Experts" },
  { icon: "healing", label: "Patient-First Policy" },
];
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
export default function TrustSection() {
  return (
    <section className="py-8 px-10 sm:px-18">
      <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 border border-[#c1c6d4]/10 text-center shadow-sm">
        <h3 className="text-2xl font-extrabold text-[#1a1c1c] mb-12">
          Your Trust is Our Foundation
        </h3>
        <div
          className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-50 hover:opacity-100 transition-all"
          style={{ filter: "grayscale(1)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "grayscale(0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "grayscale(1)";
          }}
        >
          {TRUST_BADGES.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <Icon name={icon} className="w-12 h-12 text-[#005dac]" />
              <div className="text-xs font-bold uppercase tracking-widest text-[#414752]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
