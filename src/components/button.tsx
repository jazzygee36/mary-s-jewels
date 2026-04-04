interface ButtonProps {
  title: string;
  bg: string;
  className?: string;
}

const HomeButton = ({ title, bg, className }: ButtonProps) => {
  return (
    <button
      style={{ backgroundColor: bg }}
      className={`
        cursor-pointer
        transition-all
        duration-300
        ease-in-out
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        ${className || ""}
      `}
    >
      {title}
    </button>
  );
};

export default HomeButton;