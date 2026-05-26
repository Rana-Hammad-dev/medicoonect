export default function PrimaryBtn({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2
                  transition-all hover:opacity-95 active:scale-[0.98] ${className}`}
      style={{ background: "var(--primary-gradient)" }}
    >
      {children}
    </button>
  );
}

