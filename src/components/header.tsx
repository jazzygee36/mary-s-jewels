import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // <- import useLocation
import Logo from "../assets/svg-img/logo.svg";
import Toggle from "../assets/svg-img/toggleIcon.svg";
import CloseToggle from "../assets/svg-img/close-icon.svg";

const leftNav = [
  { title: "About Us", path: "/" },
  { title: "Collections", path: "/collections" },
  { title: "Products", path: "/products" },
];

const rightNav = [
  { title: "Account", path: "/account" },
  { title: "Search", path: "/search" },
  { title: "Bag", path: "/bag" },
];

const Header = () => {
  const location = useLocation(); // <- get current route
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBackground = () => {
    // Example: homepage is transparent until scroll, other routes always dark
    if (location.pathname === "/home") {
      return scrolled ? "bg-[#4C0213] shadow-md text-white" : "bg-transparent text-white";
    }
    return "bg-[#4C0213] text-white";
  };

  return (
    <header
      className={`w-full px-4 md:px-10 py-4 fixed top-0 left-0 z-50 transition-all duration-300 ${getBackground()}`}
    >
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 items-center">
        <nav className="flex items-center gap-6 justify-start">
          {leftNav.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-sm md:text-base hover:opacity-70 transition"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="flex justify-center">
          <img src={Logo} alt="logo" />
        </div>

        <nav className="flex items-center gap-6 justify-end">
          {rightNav.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-sm md:text-base hover:opacity-70 transition"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between">
        <img src={Logo} alt="logo" className="w-[200px]" />

        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <img src={CloseToggle} alt="close" /> : <img src={Toggle} alt="toggle" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden mt-2 bg-white text-[#4C0213] rounded-xl p-4 space-y-4 h-screen w-full">
          {[...leftNav, ...rightNav].map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block font-semibold text-[18px] hover:opacity-70"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;