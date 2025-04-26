
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { track } from "../utils/analytics";

const Layout = ({ children }) => {
  useEffect(() => {
    // Track scroll events (throttled)
    let lastScrollY = window.scrollY;
    let timeout;

    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? "down" : "up";
        const scrollDistance = Math.abs(scrollY - lastScrollY);
        
        if (scrollDistance > 100) {
          track("scroll_event", {
            direction: scrollDirection,
            distance: scrollDistance,
            position: scrollY
          });
          lastScrollY = scrollY;
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
