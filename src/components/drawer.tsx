import { type ReactNode, useEffect } from "react";
import CloseIcon from "../assets/icons/close";
// optional close icon from Heroicons

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
        className={`fixed w-full md:w-[50%] inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`p-2 md:p-10  fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${width} flex flex-col`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between  border-b">
            <h2 className="text-lg font-semibold">{title}</h2>

            <div onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default RightDrawer;
