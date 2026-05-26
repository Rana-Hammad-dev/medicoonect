import TopNav from "../components/layouts/Navbar";
import { Link } from "react-router-dom";
import { ICONS } from "../components/layouts/ui/icons/LandingPage";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/landingpage/HeroSection";
import DoctorsSection from "../components/landingpage/DoctorsSection";
import PrimaryBtn from "../components/landingpage/PrimaryBtn";
import SearchSection from "../components/landingpage/SearchSection";
import HowItWorksSection from "../components/landingpage/HowItWorks";
import TestimonialsSection from "../components/landingpage/TestimonialsSection";
import TrustSection from "../components/landingpage/TrustSection";
import CTASection from "../components/landingpage/CTASection";
import Footer from "../components/layouts/Footer";

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

const FEATURES = [
  {
    icon: "event",
    bg: "bg-blue-50",
    iconColor: "text-[#005dac]",
    title: "Easy Appointment Booking",
    desc: "Book visits with your favorite doctors in under 60 seconds. No phone queues, no waiting.",
  },
  {
    icon: "verified",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    title: "Verified Doctors Only",
    desc: "Every professional on MediConnect is manually vetted for credentials and experience.",
  },
  {
    icon: "lock",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Secure Data Handling",
    desc: "Full HIPAA compliance ensuring your medical records and privacy are always protected.",
  },
  {
    icon: "clock",
    bg: "bg-blue-50",
    iconColor: "text-[#005dac]",
    title: "Real-Time Availability",
    desc: "Live calendar sync means you only see slots that are actually available right now.",
  },
];

// ─── Page Assembly ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const handleDoctorClick = (doc) => {
    navigate("appointment", {
      state: { doctor: doc },
    });
  };
  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c]">
      <TopNav />
      <main className="pt-12">
        <HeroSection />
        <SearchSection />
        <DoctorsSection onDoctorClick={handleDoctorClick} />
        <HowItWorksSection />
        <TestimonialsSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
