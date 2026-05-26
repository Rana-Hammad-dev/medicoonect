import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

export default function MediConnect() {
  const [view, setView] = useState("login");

  return (
    <main
      className="h-screen overflow-hidden flex items-stretch"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* ── Left decorative panel (lg+) ── */}
      <section
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center overflow-hidden p-12"
        style={{ backgroundColor: "#d4e3ff" }}
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            alt="Medical Research Sanctuary"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
          />
        </div>

        <div className="relative z-10 max-w-xl text-center">
          <div
            className="mb-8 inline-flex items-center justify-center p-4 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(16px)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#005dac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <h1 className="text-5xl font-extrabold text-[#004786] mb-6 tracking-tight" style={{ fontFamily: "Manrope" }}>
            Enter Your Clinical Sanctuary.
          </h1>
          <p className="text-xl text-[#004786]/80 font-medium leading-relaxed">
            Designed for precision, built for empathy. MediConnect streamlines patient
            care through architectural data precision.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-4 text-left">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#005dac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "HIPAA Compliant",
                desc: "Military-grade encryption for all clinical records.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#005dac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Instant Sync",
                desc: "Real-time updates across all hospital nodes.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.4)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.4)" }}
              >
                <div className="mb-3">{icon}</div>
                <h4 className="font-bold text-[#1a1c1c]">{title}</h4>
                <p className="text-sm text-[#414752]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Right form panel ── */}
     <section className="w-full lg:w-1/2 overflow-y-auto flex items-start justify-center p-8 sm:p-12 md:p-24 py-12 bg-[#f9f9f9]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1a1c1c]" style={{ fontFamily: "Manrope" }}>
              MediConnect
            </span>
          </div>

          {view === "login" ? (
            <LoginForm onSwitch={() => setView("signup")} />
          ) : (
            <SignupForm onSwitch={() => setView("login")} />
          )}

          <footer className="mt-16 text-center space-y-4">
            <p className="text-xs text-[#414752]/60 font-medium">
              © 2024 MediConnect Systems. All clinical data encrypted via AES-256.
            </p>
            <div className="flex justify-center gap-6">
              {["Help Center", "Privacy Policy", "Status"].map((link) => (
                <a key={link} href="#" className="text-xs text-[#414752] hover:text-[#005dac] transition-colors font-semibold">
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}