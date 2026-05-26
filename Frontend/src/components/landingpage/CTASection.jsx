import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-8 px-10 sm:px-30">
      <div
        className="max-w-7xl mx-auto rounded-[4rem] p-8 lg:p-12 text-center text-white relative overflow-hidden"
        style={{ background: "var(--primary-gradient)" }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0, rgba(255,255,255,.05) 1px, transparent 0, transparent 50%)",
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative z-10 space-y-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
            Get the care you deserve today.
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join over 2 million patients who trust MediConnect for their medical
            appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={"/appointment"}>
              <button className="bg-white text-[#005dac] font-extrabold py-3 px-8 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl text-lg">
                Book Now
              </button>
            </Link>
            <Link to={"/contactus"}>
              <button className="bg-white/10 border border-white/30 text-white font-extrabold py-3 px-8 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
