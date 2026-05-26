export default function GhostBtn({ children, className = "" }) {
  return (
    <button
      className={`bg-white border border-[#c1c6d4]/20 text-[#005dac] font-bold py-3 px-6
                  rounded-xl hover:bg-[#f3f3f3] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}