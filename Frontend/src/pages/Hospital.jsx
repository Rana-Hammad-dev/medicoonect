import { useState, useMemo } from "react";
import AfterLoginNav from "../components/layouts/AfterLoginNav";
import Footer from "../components/layouts/Footer";
import HospitalCard from "../components/hospitalpage/HospitalCard";
import { HOSPITALS } from "../data/hospitals";
import { ICONS } from "../components/layouts/ui/icons/HospitalIcons";

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
const SPECIALTIES = [
  "All",
  "General",
  "Pediatric",
  "Surgical",
  "Rehabilitation",
  "Diagnostics",
];

export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let list = [...HOSPITALS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q),
      );
    }

    if (specialty !== "All") {
      list = list.filter((h) => h.type === specialty);
    }

    if (sortBy === "rating") {
      list = list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance") {
      list = list.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
      );
    }

    const seen = new Set();
    return list.filter((h) => {
      if (seen.has(h.name)) return false;
      seen.add(h.name);
      return true;
    });
  }, [search, specialty, sortBy]);

  const clearAll = () => {
    setSearch("");
    setSpecialty("All");
    setSortBy("default");
  };
  const hasFilter = search || specialty !== "All" || sortBy !== "default";

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]">
      <AfterLoginNav />

      <main className="pt-24 pb-12 px-6 sm:px-10 lg:px-18">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
              style={{ fontFamily: "Manrope,sans-serif" }}
            >
              Hospital Search
            </h1>
            <p className="text-[#414752] max-w-xl">
              Find top-rated hospitals and clinics near you.
            </p>
          </div>

          {/* Search + Filter bar */}
          <div
            className="bg-white rounded-2xl p-3 lg:mx-42 mb-8 flex flex-col sm:flex-row gap-3"
            style={{ boxShadow: "0 4px 24px rgba(0,93,172,0.07)" }}
          >
            {/* Search */}
            <div className="flex-1 flex items-center gap-3 bg-[#f3f3f3] px-4 py-3 rounded-xl">
              <Icon name="search" className="w-5 h-5 text-[#005dac] shrink-0" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Specialty */}
            <div className="flex items-center gap-2 bg-[#f3f3f3] px-4 py-3 rounded-xl">
              <Icon
                name="specialty"
                className="w-5 h-5 text-[#005dac] shrink-0"
              />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="bg-transparent outline-none text-sm appearance-none cursor-pointer pr-2"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 bg-[#f3f3f3] px-4 py-3 rounded-xl">
              <Icon name="sort" className="w-5 h-5 text-[#005dac] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none text-sm appearance-none cursor-pointer pr-2"
              >
                <option value="default">Default</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#414752]">
              Showing{" "}
              <span className="font-bold text-[#005dac]">
                {filtered.length}
              </span>{" "}
              hospital{filtered.length !== 1 ? "s" : ""}
              {search && (
                <span>
                  {" "}
                  for "<strong>{search}</strong>"
                </span>
              )}
            </p>
            {hasFilter && (
              <button
                onClick={clearAll}
                className="text-xs font-bold text-[#005dac] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl">
              <p className="text-xl font-bold text-slate-400">
                No hospitals found
              </p>
              <p className="text-sm text-slate-400 mt-1 mb-4">
                Try a different search
              </p>
              <button
                onClick={clearAll}
                className="text-sm font-bold text-[#005dac] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((h) => (
                <HospitalCard key={h.id + h.name} hospital={h} />
              ))}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
