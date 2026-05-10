interface ButtonProps {
  title: string;
  bg: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const HomeButton = ({
  title,
  bg,
  className,
  onClick,
  disabled,
  type
}: ButtonProps) => {
  return (
    <button
      style={{ backgroundColor: bg }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        cursor-pointer
        transition-all
        duration-300
        ease-in-out
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        ${className || ""}
      `}>
      {title}
    </button>
  );
};

export default HomeButton;
