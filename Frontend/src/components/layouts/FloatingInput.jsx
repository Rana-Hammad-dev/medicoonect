export default function FloatingInput({
  id,
  label,
  type = "text",
  rightElement,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        required={required}
        value={value}
        onChange={onChange}
        className="peer w-full rounded-lg p-4 pt-6 text-[#1a1c1c] bg-[#f3f3f3] focus:bg-white focus:ring-0 focus:outline-none border-none transition-all"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-[#414752] pointer-events-none transition-all origin-left font-medium text-sm
          peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#005dac]
          peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-75"
      >
        {label}
      </label>
      {rightElement && (
        <div className="absolute right-4 top-5 text-[#414752] hover:text-[#005dac] cursor-pointer">
          {rightElement}
        </div>
      )}
    </div>
  );
}

