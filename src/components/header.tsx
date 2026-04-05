import { useState } from "react";
import Logo from "../assets/svg-img/logo.svg";
import Toggle from "../assets/svg-img/toggleIcon.svg";
import CloseToggle from "../assets/svg-img/close-icon.svg";

const leftNav = [
  { title: "About Us", path: "#" },
  { title: "Collections", path: "#" },
  { title: "Products ", path: "#" },
];

const rightNav = [
  { title: "Account", path: "#" },
  { title: "Search", path: "#" },
  { title: "Bag", path: "#" },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="w-full text-white px-4 md:px-10 py-4 absolute top-0 left-0 z-50">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 items-center">
        {/* Left Nav */}
        <nav className="flex items-center gap-6 justify-start">
          {leftNav.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-sm md:text-base hover:opacity-70 transition">
              {item.title}
            </a>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center">
          {/* <h1 className="text-xl md:text-2xl font-bold tracking-[0.3em]">SE</h1> */}
          <img src={Logo} alt="logo" />
        </div>

        {/* Right Nav */}
        <nav className="flex items-center gap-6 justify-end">
          {rightNav.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-sm md:text-base hover:opacity-70 transition">
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between">
        {/* Logo */}
        <img src={Logo} alt="logo" className="w-[200px] md:w-auto" />

        {/* Toggle */}
        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (
            <img src={CloseToggle} alt="close" />
          ) : (
            <img src={Toggle} alt="toggle" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden mt-2 bg-white text-black backdrop-blur-md rounded-xl p-4 space-y-4 h-screen w-full">
          {[...leftNav, ...rightNav].map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block text-black text-[#4C0213] font-semibold text-[18px] font-geists  hover:opacity-70">
              {item.title}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
