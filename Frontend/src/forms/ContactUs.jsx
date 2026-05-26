import { useState } from "react";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import Footer from "../components/layouts/Footer";

import API from "../api/axios";

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
// ── Success Modal ─────────────────────────────────────────────────────────────
function SuccessModal({ name, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        {/* Modal card — stop propagation so clicking inside doesn't close */}
        <div
          className="relative bg-white rounded-3xl p-10 w-full max-w-md text-center"
          style={{
            boxShadow: "0 24px 64px rgba(0,93,172,0.18)",
            animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#717783] hover:bg-[#e8e8e8] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Animated checkmark circle */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)",
              boxShadow: "0 12px 32px rgba(0,93,172,0.3)",
              animation: "popIn 0.4s 0.15s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-extrabold text-[#1a1c1c] mb-2"
            style={{ fontFamily: "Manrope" }}
          >
            Message Sent!
          </h2>

          {/* Subtitle */}
          <p className="text-[#414752] text-sm leading-relaxed mb-2">
            Thank you, <span className="font-bold text-[#005dac]">{name}</span>!
            Your message has been received.
          </p>
          <p className="text-[#717783] text-sm leading-relaxed mb-8">
            Our clinical team will review your inquiry and get back to you
            within <span className="font-semibold text-[#1a1c1c]">2 hours</span>
            . For urgent matters, call{" "}
            <span className="font-semibold text-[#005dac]">
              +1 (888) 234-CLINIC
            </span>
            .
          </p>

          {/* Divider with info pills */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[
              { icon: "📋", text: "Inquiry Logged" },
              { icon: "⚡", text: "2hr Response" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f3f3] rounded-full"
              >
                <span className="text-sm">{icon}</span>
                <span className="text-xs font-semibold text-[#414752]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)",
              boxShadow: "0 8px 24px rgba(0,93,172,0.22)",
            }}
          >
            Got it, thanks!
          </button>
        </div>
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1);   }
        }
      `}</style>
    </>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/contact", form);
      setShowModal(true); // ✅ Show modal
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send message. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-[#f3f3f3] border-none outline-none text-[#1a1c1c] text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#005dac]/20 placeholder:text-[#717783]";

  const FieldLabel = ({ children }) => (
    <label className="block text-[11px] font-bold text-[#414752] uppercase tracking-[0.08em] mb-2">
      {children}
    </label>
  );

  return (
    <>
      {/* Success Modal */}
      {showModal && (
        <SuccessModal
          name={form.name || "there"}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-12"
        style={{ boxShadow: "0 12px 32px rgba(0,93,172,0.06)" }}
      >
        <h2
          className="font-bold text-3xl text-[#1a1c1c] mb-8"
          style={{ fontFamily: "Manrope" }}
        >
          Send us a message
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <input
                className={inputCls}
                type="text"
                placeholder="Dr. Julian Reed"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <input
                className={inputCls}
                type="email"
                placeholder="julian@mediconnect.hosp"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <FieldLabel>Subject</FieldLabel>
            <input
              className={inputCls}
              type="text"
              placeholder="Patient Inquiry"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          {/* Message */}
          <div>
            <FieldLabel>Message</FieldLabel>
            <textarea
              className={`${inputCls} resize-none`}
              rows={5}
              placeholder="How can our clinical team help you today?"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all
              bg-gradient-to-r from-[#005dac] to-[#1976d2] shadow-md
              ${loading ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg hover:opacity-90 active:scale-95"}`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

// ── Info Card ─────────────────────────────────────────────────────────────────
function InfoCard() {
  const contacts = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#005dac]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.2 3.6a1 1 0 01-.272 1.06l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a1 1 0 011.06-.272l3.6 1.2a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      line1: "+923000000000",
      line2: "Mon–Fri, 9am – 6pm",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#005dac]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16v12H4zM22 6l-10 7L2 6"
          />
        </svg>
      ),
      title: "Email",
      line1: "support@mediconnect.com",
      line2: "Reply within 2 hours",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#005dac]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-7-4.35-7-10a7 7 0 1114 0c0 5.65-7 10-7 10z"
          />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      ),
      title: "Office",
      line1: "Medical District, Lahore",
      line2: "Punjab, Pakistan",
    },
  ];

  return (
    <div className="rounded-2xl p-8 md:p-10 bg-[#f3f3f3]">
      <div className="flex flex-col gap-8">
        {contacts.map(({ icon, title, line1, line2 }) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 4px 12px rgba(0,93,172,0.08)" }}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-[#1a1c1c] text-base">{title}</h3>
              <p className="text-[#414752] font-medium mt-1 text-sm">{line1}</p>
              <p className="text-[#717783] text-xs mt-0.5">{line2}</p>
            </div>
          </div>
        ))}

        {/* Social links */}
        <div className="pt-6 border-t border-[#e8e8e8]">
          <p className="text-[11px] font-bold text-[#414752] uppercase tracking-widest mb-4">
            Join Our Community
          </p>
          <div className="flex gap-3">
            {[
              { label: "Facebook", Icon: FacebookIcon },
              { label: "Instagram", Icon: InstagramIcon },
              { label: "LinkedIn", Icon: LinkedInIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#414752] hover:text-[#005dac] hover:shadow-md transition-all shadow-sm"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Map Card ──────────────────────────────────────────────────────────────────
function MapCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: 240, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      onClick={() =>
        window.open(
          "https://maps.google.com/?q=Medical+District+North+Boston+MA",
          "_blank",
        )
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg,#c8d8e8 0%,#b0c4d8 30%,#dce8f0 60%,#c4d4e4 100%)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mapgrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#5a8099"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />
          <line
            x1="0"
            y1="85"
            x2="100%"
            y2="85"
            stroke="#7aacc0"
            strokeWidth="3"
          />
          <line
            x1="130"
            y1="0"
            x2="130"
            y2="100%"
            stroke="#7aacc0"
            strokeWidth="3"
          />
          <rect
            x="18"
            y="18"
            width="90"
            height="52"
            rx="3"
            fill="#98b5c6"
            opacity="0.55"
          />
          <rect
            x="145"
            y="103"
            width="105"
            height="48"
            rx="3"
            fill="#b0c8d6"
            opacity="0.65"
          />
        </svg>
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,93,172,0.12)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-5 py-3 rounded-full flex items-center gap-2 text-white font-bold text-sm"
          style={{
            background: "linear-gradient(135deg,#005dac,#1976d2)",
            boxShadow: "0 8px 32px rgba(0,93,172,0.4)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Open in Maps
        </div>
      </div>
    </div>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    {
      q: "How do I access my patient portal?",
      a: "Secure credentials are provided during your initial consultation. You can reset these via the login screen using your verified clinician email.",
    },
    {
      q: "What is your typical response time?",
      a: "Our clinical support team prioritizes critical inquiries within 2 hours. General administrative questions are resolved within one business day.",
    },
    {
      q: "Can I reschedule appointments online?",
      a: "Yes, the dashboard allows rescheduling up to 24 hours before your slot. For urgent changes, please call the clinic directly.",
    },
  ];

  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#005dac]">
          Inquiry Assistance
        </span>
        <h2
          className="text-3xl font-extrabold text-[#1a1c1c] mt-3"
          style={{ fontFamily: "Manrope" }}
        >
          Common Questions
        </h2>
        <p className="text-[#414752] mt-3 max-w-md mx-auto text-sm leading-relaxed">
          Quick answers to the questions our patients ask most frequently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {faqs.map(({ q, a }) => (
          <div
            key={q}
            className="bg-white rounded-2xl p-8 border border-[#f3f3f3]"
            style={{ boxShadow: "0 4px 16px rgba(0,93,172,0.04)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#d4e3ff] flex items-center justify-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#005dac]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-[#1a1c1c] text-base mb-3">{q}</h3>
            <p className="text-[#414752] text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <AfterLoginNav />
      <main className="px-6 sm:px-10 lg:px-18 py-32">
        {/* Hero */}
        <section className="max-w-7xl mx-auto text-center mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-[#005dac] bg-[#d4e3ff] px-4 py-1.5 rounded-full mb-4">
            Support &amp; Inquiries
          </span>
          <h1
            className="font-extrabold text-[#1a1c1c] tracking-tight mb-4"
            style={{ fontSize: "clamp(36px,5vw,56px)", fontFamily: "Manrope" }}
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-[#005dac] to-[#1976d2] bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-[#414752] text-lg max-w-xl mx-auto leading-relaxed">
            Whether you have questions about care, scheduling, or medical
            history — our clinical team is ready to assist.
          </p>
        </section>

        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mb-4">
          <ContactForm />
          <div className="lg:col-span-5 flex flex-col gap-6">
            <InfoCard />
            <MapCard />
          </div>
        </section>

        <div className="max-w-7xl mx-auto">
          <FAQSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
