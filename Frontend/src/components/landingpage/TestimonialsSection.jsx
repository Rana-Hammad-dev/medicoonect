import { ICONS } from "../layouts/ui/icons/LandingPage";
const TESTIMONIALS = [
  {
    quote:
      "MediConnect transformed how I manage my family's health. Finding a pediatrician was effortless, and the booking system is just incredibly fast.",
    name: "Ayesha",
    role: "Mother of two",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdCzeMCsbTSuiLGqZq_JtljUN7948PDO7SWOI7lvwXvDoOJPn8LUdO98rLxo2QUHgsPo1tQh7HzG_OFR7mASOBlHGt9mwQ-i4b6qlobi4m6WXM3HLJNZqP0ZSA_HYJzzS-ff36_cBcz0EirFQAYDSKzjaEK2h2HIkPqIAuwKkD_QsSwO15l3Eeu83YrsoKAVRSLVcaS4KljMoaiRToG3tSpmGGEBJFPswyUl-x4hyUDr07LLpLPBQ_zD8JGvhfyA_LcU4My89ldDX8",
  },
  {
    quote:
      "As a busy professional, I don't have time to wait on hold. MediConnect lets me find and book specialists in seconds. It's a game changer for healthcare.",
    name: "Ahmad Ali",
    role: "Tech Executive",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmLWuBZi9jNTngNIuubPVBn1kVArQAivO9f8HmrC3Waejmd6Yjte0k0_1_LF_W0T1d9CDPeC1bPU8kfxlw45Qevmz93r3bA5g4hOpEKuSjOX4WlP3btwYpis79R_Mk9rvZFEZd7FyuwxHQt86_qU16iT_0Wlh_aM2FuLISIWXTjqZ-TjW0vvhxrWVtwum1ytT7U8Y3dtLsph0iq6ZgfgL8LIGBDo2yz0YBEpaCMO0uY9Zr0I7bVeQjuoW53BoJ3q-R0IJHu4abuUQs",
  },
  {
    quote:
      "The security aspect was what sold me. Knowing my medical records are HIPAA-compliant and secure while having such a sleek UI is amazing.",
    name: "Sofia",
    role: "Medical Researcher",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN0CWWOnj9PlY5hArBce6lTLuSz5okDCBIhBgJ6Ql4mEketl9ch1iVX5R41dxSpb9kFiFWTvl5E5PZSlG5h06aY15Z2mU77AQI4gE5xbF4L_okSo8N7ZIo5DHD-VsHm07ME35z7-NUDdw39IWWSgnUR3UkzpDJs52L8t5H3JZt7JWIOPdPKoJuJHV_fCtc3q2sS31jquTo2bZxbJ23o51JGWnKcGyv3XiFIF4o3Jk3fB84w1dgZdM-mRYd6ltibUopTVYqtL9ptSE_",
  },
];
function StarsFilled({ count = 5 }) {
  return (
    <div className="flex gap-1 text-yellow-500">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="w-5 h-5" filled />
      ))}
    </div>
  );
}
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
      <path d={ICONS[name] || ICONS["search"]} />
    </svg>
  );
}
export default function TestimonialsSection() {
  return (
    <section className="py-32 px-10 sm:px-18 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1a1c1c] mb-6">
            Patient Success Stories
          </h2>
          <p className="text-[#414752] max-w-2xl mx-auto text-md leading-relaxed">
            Join the thousands who have found their sanctuary for healthcare
            management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map(({ quote, name, role, image }) => (
            <div
              key={name}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <StarsFilled />
                <p className="text-[#1a1c1c] font-medium italic leading-relaxed mt-6 mb-10 text-lg">
                  "{quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[#1a1c1c]">{name}</div>
                  <div className="text-sm text-[#414752]">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
