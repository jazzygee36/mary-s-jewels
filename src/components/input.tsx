import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface HomeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const HomeInput = forwardRef<HTMLInputElement, HomeInputProps>(
  ({ type, placeholder, label, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="text-[14px] font-geist text-[#303030] font-semibold">
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative mt-2">
          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className={clsx(
              "border border-[#D0D5DD] rounded-[7px] py-[11px] md:py-[16px] px-[18px] pr-[45px] w-full focus:outline-none  transition-all duration-300 placeholder:text-[#767676] placeholder:text-[14px] font-geist",
              className,
            )}
            {...rest}
          />

          {/* Password toggle */}
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
  },
);

HomeInput.displayName = "HomeInput";

export default HomeInput;
