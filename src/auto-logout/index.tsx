import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AutoLogoutProviderProps {
  children: React.ReactNode;
}

const AutoLogoutProvider = ({ children }: AutoLogoutProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 15 Minutes in milliseconds (15 * 60 * 1000)
  const INACTIVITY_TIMEOUT = 1 * 60 * 1000;

  const handleLogout = () => {
    // Clear out the session token
    sessionStorage.removeItem("token");

    // Capture the current path so they can return here after logging back in
    const currentPath = location.pathname + location.search;

    // Direct them to login page with the redirect context
    if (!location.pathname.includes("/login")) {
      navigate(
        `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`,
      );
    }
  };

  const resetTimer = () => {
    // Clear the existing countdown timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Don't track inactivity if the user isn't even logged in
    const token = sessionStorage.getItem("auth_token");
    if (!token) return;

    // Start a fresh 15-minute countdown
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // List of native window events that prove the user is actively working
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    // Attach listeners to reset the timer on any user interaction
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize the very first timer when the component mounts
    resetTimer();

    // Clean up event listeners and timers when the component unmounts
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]); // Re-evaluate when navigating to reset tracking fresh per page

  return <>{children}</>;
};

export default AutoLogoutProvider;
