interface ButtonProps {
  title: string;
  bg: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const HomeButton = ({
  title,
  bg,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      style={{ backgroundColor: bg }}
      onClick={onClick}
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
