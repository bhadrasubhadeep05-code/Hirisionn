import Footer from "./Footer";
import NavBar2 from "./NavBar2";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import ProblemStatement from "./ProblemStatement";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const LandingPage = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const problemStatementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!problemStatementRef.current) return;

      const sectionTop = problemStatementRef.current.getBoundingClientRect().top;
      const triggerPoint = 100; // Show navbar when ProblemStatement is within 100px from top

      // Show navbar when ProblemStatement reaches the top area
      if (sectionTop <= triggerPoint) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white"
      >
        {/* Navbar - Fixed at top, only visible after ProblemStatement */}
        <AnimatePresence>
          {showNavbar && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 right-0 z-50"
            >
              <NavBar2 />
            </motion.div>
          )}
        </AnimatePresence>

        <Screen1 />

        <div ref={problemStatementRef}>
          <ProblemStatement />
        </div>

        <Screen2 />

        <Screen3 />

        <footer>
          <Footer />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;