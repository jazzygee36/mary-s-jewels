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
  className
}: HomeInputProps) => {
  return (
    <div className="w-full">
      <label className="text-[14px] font-geist text-[#303030]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className || "border border-[#D0D5DD] rounded-[7px] py-[11px] md:py-[16px] px-[18px] w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#4C0213]/50 transition-all duration-300 placeholder:text-[#767676] placeholder:text-[14px] font-geist"}
      />
    </div>
  );
};

export default HomeInput;
