import React, { useState, useContext } from "react";
import logo from "../assets/logoTeansparent.png";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

const NavBar2 = () => {
  const { user, ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Main Navigation (Default)
  const mainNavLinks = [
    { name: "Create Your Resume", type: "link", path: "/resume-builder" },
    { name: "About Us", type: "link", path: "/about-us" },
    { 
      name: "What we Offer", 
      type: "dropdown", 
      id: "offers", 
      options: [
        { label: "Our Career Services", type: "label" },
        { label: "Internship", path: "/internship" },
        { label: "Live Projects", path: "/live-projects" },
        { label: "Job Placements", path: "/job-placements" },
        { label: "Soft Skills & Interview Success Training", path: "/soft-skills-training" },
      ] 
    },
    { 
      name: "Resources", 
      type: "dropdown", 
      id: "resources", 
      options: [
        { label: "WorkForce Insights", path: "/workforce-insights" },
        { label: "Podcast Library", path: "/audio-library" },
        { label: "Blogs", path: "/blog-page" },
        { label: "Videos Library", path: "/video-page" },
        { label: "Industry Insights", path: "/industry-insights" },
      ] 
    },
    { name: "Business Enquiry", type: "link", path: "/business-enquiry" },
    { name: "Contact Us", type: "link", path: "/contact-us" },
  ];

  // Course Navigation (Training Page Only)
  const courseNavLinks = [
    { name: "Home", type: "link", path: "/" },
    { name: "About the Course", type: "link", path: "/soft-skills-training" },
    { name: "Curriculum", type: "link", path: "/soft-skills-training/curriculum" },
    { name: "Learning Outcomes", type: "link", path: "/soft-skills-training/outcomes" },
  ];

  // Detect if we are on Training page
  const isTrainingPage = location.pathname === '/soft-skills-training'|| location.pathname === '/soft-skills-training/curriculum'|| location.pathname === '/soft-skills-training/outcomes' ;
  
  // Select appropriate navigation set
  const navLinks = isTrainingPage ? courseNavLinks : mainNavLinks;

  return (
    <motion.nav
  className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white/90 backdrop-blur-md shadow-lg"
>
    
      {/* --- TOP HEADER SECTION --- */}
      <div className="relative h-24 md:h-24 w-full bg-white/80 backdrop-blur-md flex items-center justify-between md:justify-center px-4 md:px-12 border-b border-slate-200">
        
        {/* LEFT: Hamburger Menu (MOBILE ONLY) */}
        <button 
          className="md:hidden p-2 text-[#0F172A]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* CENTER LOGO - Same on desktop and mobile */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="md:static absolute left-[150px]  md:transform-none"
        >
          <img src={logo} alt="Logo" className="h-20 md:h-28 w-auto cursor-pointer object-contain" />
        </motion.div>

        {/* RIGHT: User Icon - Always on right edge */}
        <div className="absolute right-4 md:right-12 flex flex-col items-center gap-1">
          <motion.button
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#818CF8] flex items-center justify-center text-white shadow-lg border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => ProfileComplete? navigate("/profile"): navigate("/register")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </motion.button>
          {user?.fullName && (
            <span className="block text-xs font-semibold text-[#0F172A]">
              {user.fullName}
            </span>
          )}
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION STRIP (Desktop) --- */}
      <div className="hidden md:flex relative h-12 w-full bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] items-center justify-center gap-2 shadow-xl">
        {/* Metallic Glow line at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-100" />
        
        {navLinks.map((link) => (
          <div key={link.name} className="relative">
            {link.type === "dropdown" ? (
              <div 
                onMouseEnter={() => setOpenDropdown(link.id)}
                onMouseLeave={() => setOpenDropdown(null)}
                className="relative"
              >
                <button className="px-4 py-2 text-white/80 text-sm font-medium hover:text-[#22D3EE] transition-colors flex items-center gap-1">
                  {link.name}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.id ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {openDropdown === link.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-48 bg-white rounded-b-xl p-2 shadow-2xl border-t-2 border-[#22D3EE] z-50"
                    >
                      {link.options.map((opt) => (
                        opt.type === "label" ? (
                          <div 
                            key={opt.label}
                            className="w-full text-left px-4 py-2 text-[#0F172A] font-bold text-sm border-b border-slate-100 mb-1 cursor-default"
                          >
                            {opt.label}
                          </div>
                        ) : (
                          <button
                            key={opt.label}
                            onClick={() => navigate(opt.path)}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#22D3EE] rounded-lg transition-all text-sm font-semibold"
                          >
                            {opt.label}
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => navigate(link.path)}
                className="px-4 py-2 text-white/80 text-sm font-medium hover:text-[#22D3EE] transition-colors"
              >
                {link.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <div key={link.name} className="w-full">
                  {link.type === "dropdown" ? (
                    <div className="w-full">
                      <button 
                        onClick={() => toggleDropdown(link.id)}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-[#0F172A] font-semibold bg-slate-50"
                      >
                        {link.name}
                        <svg 
                          className={`w-5 h-5 transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 gap-1 mt-1"
                          >
                            {link.options.map((opt) => (
                              opt.type === "label" ? (
                                <div 
                                  key={opt.label}
                                  className="p-3 text-left text-[#0F172A] font-bold text-sm border-b border-slate-100 cursor-default"
                                >
                                  {opt.label}
                                </div>
                              ) : (
                                <button 
                                  key={opt.label}
                                  onClick={() => { navigate(opt.path); setIsMobileMenuOpen(false); }}
                                  className="p-3 text-left text-slate-500 hover:text-[#22D3EE] text-sm"
                                >
                                  {opt.label}
                                </button>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }}
                      className="w-full text-left p-3 rounded-lg text-[#0F172A] font-semibold bg-slate-50"
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar2;