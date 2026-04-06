import { useNavigate } from "react-router-dom";

interface BackArrowProps {
  className?: string;
}

const BackArrow = ({ className }: BackArrowProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className={`flex items-center gap-4 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer">
        <rect width="40" height="40" rx="20" fill="#F4F6F9" />

        <path
          opacity="0.4"
          d="M17.77 16.5199L22.82 20.3099V25.9199C22.82 26.8799 21.66 27.3599 20.98 26.6799L15.8 21.5099C15.4012 21.1105 15.1772 20.5693 15.1772 20.0049C15.1772 19.4405 15.4012 18.8993 15.8 18.4999L17.77 16.5199Z"
          fill="#61656A"
        />

        <path
          d="M22.82 14.0799V20.3099L17.77 16.5199L20.98 13.3099C21.66 12.6399 22.82 13.1199 22.82 14.0799Z"
          fill="#61656A"
        />
      </svg>
    </div>
  );
};

export default BackArrow;
