import { ICONS } from "../layouts/ui/icons/LandingPage";
import PrimaryBtn from "./PrimaryBtn";
import { Link } from "react-router-dom";
import GhostBtn from "./GhostBtn";
const HERO_AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCsAE7jjgwBQnielQ25Lh505DK7tG7nVYm_7V1LSfj7Y-zjEXgOEX5GSYTv15syOjr3y2JbZ__Q68AlgHuPR-nDw42e3gO-SyeFRxXWTRRQX9YJ9lHyoP-J7a2-HyNZh-Jjwe77pkeTLxZoX-xRjw8BfDkkT2b5AlH859GHo9ggdJFUNnxTzZ0PgQ9dmcTsug0zGgSkOUCeDMAEo39Drk1ElVNVUG15l5PY2t8ePfcEwZqXr-czcnWa_Z2ZuUGpz_nqeKanAQNUPi8V",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJdAOpfX7Itf-V_22ZI8k-4lqOxhYOmOGq6FPYm8byb57lSmtWPj4N823Wfz3y1XjoP81kcm0Bh4mNqAeozDyzpR0EKTEMlo9y9eq3iG1SYOX0S-9pcYESCnjd9XiK-NpgnsUiGxKVW0-AHBla-qPxoC5vs5PCeZh268H23U8gjBWDue43ItU4oPIZ2s5n_UdtY2h-rADAOTgwwr87M_p5ziqM14qOJQIpmpZS8gncEG9Y2v91qjeDhrukt3T_F2Zeh3JjFJnJad5I",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCsAE7jjgwBQnielQ25Lh505DK7tG7nVYm_7V1LSfj7Y-zjEXgOEX5GSYTv15syOjr3y2JbZ__Q68AlgHuPR-nDw42e3gO-SyeFRxXWTRRQX9YJ9lHyoP-J7a2-HyNZh-Jjwe77pkeTLxZoX-xRjw8BfDkkT2b5AlH859GHo9ggdJFUNnxTzZ0PgQ9dmcTsug0zGgSkOUCeDMAEo39Drk1ElVNVUG15l5PY2t8ePfcEwZqXr-czcnWa_Z2ZuUGpz_nqeKanAQNUPi8V",
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
const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA9rhny_4S01urhTNXRXvZqW8mewGxtOKgcS22QYBRcP-rztV7ozQVX2ZnHJY8WLLiXN8_yLAM2KeeXhAlsuRFTZg03wr5bFR88G7yEP-NxLP58O1x_avEw5szN2WAxsaIUZAsN0Na92Eln4u5jGKDpek-EuUJoES_3F70g2TiQSNFp0zXzA6X5x-zViI9Tx-WN9sXDViirnnO0QkNLPRyThsbDaVEhVksw44H_L21izvVqPi6Tp_tOGfS7FaUo2xryXaclFd3x62to";

export default function HeroSection() {
  return (
    <section className="relative px-10 sm:px-18 pt-16 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: copy */}
      <div className="space-y-8">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4e3ff] text-[#001c3a] rounded-full text-xs font-bold tracking-wider uppercase">
          <Icon name="verified" className="w-4 h-4" filled />
          Trusted by 2M+ Patients
        </div>

        <h1 className="text-3xl lg:text-5xl font-extrabold leading-[1.1] text-[#1a1c1c]">
          Your Health, <span className="text-[#005dac]">Simplified.</span> Book
          Trusted Doctors in Seconds.
        </h1>

        <p className="text-lg text-[#414752] max-w-xl leading-relaxed">
          Experience clinical excellence with our smart appointment system.
          Verified practitioners, secure data, and real-time availability at
          your fingertips.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to={"/appointment"}>
            <PrimaryBtn className="py-4 px-8 text-base shadow-lg">
              Book Appointment
              <Icon name="calendar" className="w-5 h-5" />
            </PrimaryBtn>
          </Link>
          <Link to={"/doctors"}>
            <GhostBtn className="py-4 px-8 text-base">
              Find Doctors
            </GhostBtn>
          </Link>
        </div>

        {/* Doctor avatars + count */}
        <div className="flex items-center gap-6 pt-4">
          <div className="flex -space-x-3">
            {HERO_AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Doctor ${i}`}
                className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm"
              />
            ))}
          </div>
          <p className="text-sm text-[#414752]">
            <span className="font-bold text-[#1a1c1c]">500+</span> Specialist
            Doctors Online
          </p>
        </div>
      </div>

      {/* Right: hero image */}
      <div className="relative flex justify-center">
        {/* Tilted bg blob */}
        <div className="absolute inset-0 bg-[#d4e3ff] rounded-[3rem] rotate-3 -z-10" />
        <img
          src={HERO_IMG}
          alt="Healthcare professional"
          className="rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl"
        />
        {/* HIPAA badge */}
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#c1c6d4]/10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <Icon name="security" className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-[#1a1c1c] text-sm">
              HIPAA Secured
            </div>
            <div className="text-xs text-[#414752]">
              Military-grade encryption
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
