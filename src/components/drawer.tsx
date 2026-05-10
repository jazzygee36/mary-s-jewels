import { type ReactNode, useEffect } from "react";
import CloseIcon from "../assets/icons/close";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  width?: string;
}

const RightDrawer = ({
  isOpen,
  onClose,
  children,
  title,
  width,
}: RightDrawerProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        onClick={(e) => e.stopPropagation()} // ✅ prevents inner click closing
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-500 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${width || "w-[90%] md:w-[50%]"}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b pb-[20px] p-4 md:p-10">
            <h2 className="text-lg font-semibold">{title}</h2>

            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">{children}</div>
      </div>
    </>
  );
};

export default RightDrawer;
