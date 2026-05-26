export default function GradientButton({ children, className = "" }) {
  return (
    <button
      type="submit"
      style={{ background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" }}
      className={`w-full text-white font-bold py-4 rounded-xl shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
