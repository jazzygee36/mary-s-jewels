import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/svg-img/logo.svg";
import Toggle from "../assets/svg-img/toggleIcon.svg";
import CloseToggle from "../assets/svg-img/close-icon.svg";
import { useAppContext } from "../context/app-context";
import { useAuth } from "../auth/AuthContext";

type NavItem = {
  title: string;
  path: string;
  protected?: boolean;
  showCount?: boolean;
};

const leftNav: NavItem[] = [
  { title: "About Us", path: "#about" },
  { title: "Collections", path: "#collections" },
  { title: "Products", path: "#products" },
];

const rightNav: NavItem[] = [
  // { title: "Login", path: "/login" },
  { title: "Cart", path: "/order-summary" },
  { title: "My Orders", path: "/my-orders" },
];

const Header = () => {
  const { auth, syncAuth } = useAuth();
  const { cartItems } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleAuthClick = () => {
    if (auth.isAuthenticated) {
      sessionStorage.removeItem("token");

      syncAuth();

      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBackground = () => {
    if (location.pathname === "/home") {
      return scrolled
        ? "bg-[#4C0213] shadow-md text-white"
        : "bg-transparent text-white";
    }
    return "bg-[#4C0213] text-white";
  };

  return (
    <header
      className={`w-full px-4 md:px-10 py-4 fixed top-0 left-0 z-50 transition-all duration-300 ${getBackground()}`}
    >
      <div className="hidden md:grid grid-cols-3 items-center">
        <nav className="flex items-center gap-6 justify-start">
          {leftNav.map((item, index) => (
            <Link
              to={`/${item.path}`}
              key={index}
              // onClick={() => {
              //   navigate(`/${item.path}`);
              // }}
              className="text-sm md:text-base hover:opacity-70 transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <nav className="flex items-center gap-6 justify-end cursor-pointer bg-[#4C0216]">
          {rightNav.map((item, index) => {
            const isCart = item.title === "Cart";

            if (isCart) {
              return (
                <button
                  key={index}
                  onClick={() =>
                    navigate(auth.isAuthenticated ? item.path : "/login")
                  }
                  className="text-sm md:text-base hover:opacity-70 transition cursor-pointer bg-[#4C0216] text-white px-4 py-2 rounded"
                >
                  {item.title}
                  <span className=" text-sm font-medium text-white   rounded">
                    ({Array.isArray(cartItems) ? cartItems.length : 0})
                  </span>
                </button>
              );
            }

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="text-sm md:text-base hover:opacity-70 transition"
              >
                {item.title}
              </button>
            );
          })}

          {/* AUTH BUTTON */}
          <button
            onClick={handleAuthClick}
            className="text-sm md:text-base hover:opacity-70 transition bg-[#4C0216] text-white px-4 py-2 rounded"
          >
            {auth.isAuthenticated ? "Logout" : "Login"}
          </button>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[200px]" />
        </Link>

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
        <div className="md:hidden mt-2 bg-white text-[#4C0213] rounded-xl p-4 space-y-4 h-screen w-full">
          {[...leftNav, ...rightNav].map((item, index) => {
            const isBag = item.title === "Bag";

            if (isBag) {
              return (
                <button
                  key={index}
                  onClick={() =>
                    navigate(auth.isAuthenticated ? item.path : "/login")
                  }
                  className="block font-semibold text-[18px] hover:opacity-70 cursor-pointer bg-[#4C0216]"
                >
                  {item.title}
                  <span className="ml-2 text-sm">
                    ({cartItems?.length ?? 0})
                  </span>
                </button>
              );
            }

            return (
              <button
                key={index}
                onClick={() => {
                  navigate(`/${item.path}`);
                  setOpenMenu(false);
                }}
                className="block font-semibold text-[18px] hover:opacity-70"
              >
                {item.title}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
