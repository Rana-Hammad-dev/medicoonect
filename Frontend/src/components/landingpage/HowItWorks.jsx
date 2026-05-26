const HOW_IT_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800";

const STEPS = [
  {
    n: 1,
    title: "Search for Your Doctor",
    desc: "Filter by specialty, location, or insurance to find the perfect medical match for your needs.",
  },
  {
    n: 2,
    title: "Select Your Preferred Time",
    desc: "View verified slots and pick a time that fits your busy schedule. No double-bookings, ever.",
  },
  {
    n: 3,
    title: "Instant Confirmation",
    desc: "Book your appointment instantly and receive a digital confirmation with all the details you need.",
  },
];
export default function HowItWorksSection() {
  return (
    <section className="py-24 px-10 sm:px-18 bg-[#eeeeee]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Steps */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1a1c1c] mb-10 leading-tight">
            Your Journey to Wellness in{" "}
            <span className="text-[#005dac]">3 Simple Steps</span>
          </h2>
          <div className="space-y-12">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-blue-500/20"
                  style={{ background: "var(--primary-gradient)" }}
                >
                  {n}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#1a1c1c]">
                    {title}
                  </h4>
                  <p className="text-[#414752] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image + badge */}
        <div className="relative">
          <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-[#c1c6d4]/10">
            <img
              src={HOW_IT_IMG}
              alt="App on phone"
              className="rounded-[2.5rem] w-full h-[500px] object-cover"
            />
          </div>
          {/* Rotating badge */}
          <div
            className="absolute -top-10 -right-10 text-white p-8 rounded-full w-40 h-40
                       flex flex-col items-center justify-center text-center rotate-12 shadow-xl border-4 border-white"
            style={{ backgroundColor: "#006493" }}
          >
            <div className="text-2xl font-black">60s</div>
            <div className="text-[10px] font-bold uppercase tracking-widest">
              To Book
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}