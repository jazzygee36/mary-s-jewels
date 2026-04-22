import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface HomeInputProps {
  type: string;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const HomeInput = ({
  type,
  placeholder,
  value,
  label,
  onChange,
  className,
}: HomeInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label className="text-[14px] font-geist text-[#303030]">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={
            className ||
            "border border-[#D0D5DD] rounded-[7px] py-[11px] md:py-[16px] px-[18px] pr-[45px] w-full focus:outline-none focus:ring-2 focus:ring-[#4C0213]/50 transition-all duration-300 placeholder:text-[#767676] placeholder:text-[14px] font-geist"
          }
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeInput;