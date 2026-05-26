import { ICONS } from "../layouts/ui/icons/DoctorsIcons";

<<<<<<< HEAD
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
=======
const SPECIALIZATIONS = ["All Specializations", "Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics","Dentist" ,"Urology"];

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
>>>>>>> c979acf13661e67fe09222ef16871317c7f685d8
      <path d={ICONS[name]} />
    </svg>
  );
}
export default function SearchBar() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-1.5 w-[55vw] bg-[#f3f3f3] rounded-2xl">
        {/* Name search — 2 cols */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-slate-100">
          <Icon name="search" className="w-5 h-5 text-[#005dac] shrink-0" />
<<<<<<< HEAD
          <input
            type="text"
            placeholder="Search by doctor name or ID..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#1a1c1c] placeholder:text-[#717783]/60 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
=======
          <input type="text" placeholder="Search by doctor name or ID..." className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#1a1c1c] placeholder:text-[#717783]/60 outline-none" />
        </div>
        {/* Specialization */}
        <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-slate-100">
          <Icon name="stethoscope" className="w-5 h-5 text-[#005dac] shrink-0" />
          <select className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#1a1c1c] appearance-none cursor-pointer outline-none">
            {SPECIALIZATIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Location */}
      </div>

    </div>
  );
}
>>>>>>> c979acf13661e67fe09222ef16871317c7f685d8
