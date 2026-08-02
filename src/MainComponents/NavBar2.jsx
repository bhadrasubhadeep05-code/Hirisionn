import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/hirisionn-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { AnimatePresence, motion } from "motion/react";

const Chevron = ({ open }) => (
  <svg
    className={`h-4 w-4 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </svg>
);

const NavBar2 = () => {
  const { user, ProfileComplete, isPageLoading, startLoading, stopLoading } =
    useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPageLoading) return undefined;

    setProgress(10);

    const interval = setInterval(() => {
      setProgress((value) =>
        value >= 90 ? value : Math.min(value + Math.random() * 15, 90)
      );
    }, 200);

    return () => clearInterval(interval);
  }, [isPageLoading]);

  useEffect(() => {
    if (isPageLoading || progress === 0) return undefined;

    setProgress(100);

    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, [isPageLoading, progress]);

  useEffect(() => {
    window.addEventListener("startPageLoading", startLoading);
    window.addEventListener("stopPageLoading", stopLoading);

    return () => {
      window.removeEventListener("startPageLoading", startLoading);
      window.removeEventListener("stopPageLoading", stopLoading);
    };
  }, [startLoading, stopLoading]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const mainNavLinks = [
    
    {
      name: "About Us",
      type: "link",
      path: "/about-us",
    },
    {
      name: "What we Offer",
      type: "dropdown",
      id: "offers",
      options: [
        { label: "Our Career Services", type: "label" },
        { label: "Internship", path: "/internship" },
        { label: "Job Placements", path: "/job-placements" },
        {
          label: "Certification Cources",
          path: "/soft-skills-training",
        },
      ],
    },
     {
      name: "For Employees",
      type: "dropdown",
      id: "resources",
      options: [
        { label: "Job Placements", path: "/job-placements" },
         {
          label: "Certification Cources",
          path: "/soft-skills-training",
        },
      ],
    },
    {
      name: "For Student",
      type: "dropdown",
      id: "StudentResources",
      options: [
       { label: "Internship", path: "/internship" },
        { label: "Job Placements", path: "/job-placements" },
        { label: "Blogs", path: "/blog-page" },
        { label: "Videos Library", path: "/video-page" },
         {
          label: "Certification Cources",
          path: "/soft-skills-training",
        },
      ],
    },
    {
      name: "For Employers",
      type: "link",
      path: "/business-enquiry",
    },
    {
      name: "Create Your Resume",
      type: "link",
      path: "/resume-builder",
    },
    {
      name: "Contact Us",
      type: "link",
      path: "/contact-us",
    },
  ];

  const courseNavLinks = [
    { name: "Home", type: "link", path: "/" },
    {
      name: "About the Course",
      type: "link",
      path: "/soft-skills-training",
    },
    {
      name: "Curriculum",
      type: "link",
      path: "/soft-skills-training/curriculum",
    },
    {
      name: "Learning Outcomes",
      type: "link",
      path: "/soft-skills-training/outcomes",
    },
  ];

  const isTrainingPage = [
    "/soft-skills-training",
    "/soft-skills-training/curriculum",
    "/soft-skills-training/outcomes",
  ].includes(location.pathname);

  const navLinks = isTrainingPage ? courseNavLinks : mainNavLinks;

  const goTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const desktopLinkClass =
    "font-body text-sm font-bold tracking-[0.01em] text-[#12171B] transition-colors hover:text-[#E8791E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8791E]";

  return (
    <>
      <AnimatePresence>
        {(isPageLoading || progress > 0) && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-[1000] h-0.5 origin-left bg-gradient-to-r from-[#F2A93C] via-[#E8791E] to-[#F2A93C]"
          />
        )}
      </AnimatePresence>

      <nav className="fixed inset-x-0 top-0 z-[999] w-[100vw] border-b-2 border-[#ffffff] bg-[#F6F8F8] font-body text-[#12171B] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-[100vw] md:w-full md:max-w-[1440px] items-center px-4 sm:h-20 sm:px-8 xl:h-[104px] xl:px-14 2xl:px-20">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo("/")}
            className="shrink-0"
            aria-label="Go to home"
          >
            <img
              src={logo}
              alt="Hirisionn"
              className="h-9 w-auto object-contain sm:h-11 xl:h-16"
            />
          </motion.button>

          {/* Desktop navigation: visible only on large desktop screens */}
          <div className="ml-auto hidden items-center gap-5 xl:flex ">
            {navLinks.map((link) =>
              link.type === "dropdown" ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.id ? null : link.id
                      )
                    }
                    className={`${desktopLinkClass} inline-flex items-center gap-1.5`}
                    aria-expanded={openDropdown === link.id}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <Chevron open={openDropdown === link.id} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-[calc(100%+26px)] w-72 rounded-xl border border-[#D8E0E3] bg-[#1F2830] p-2 shadow-2xl"
                      >
                        {link.options.map((option) =>
                          option.type === "label" ? (
                            <p
                              key={option.label}
                              className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#F2A93C]"
                            >
                              {option.label}
                            </p>
                          ) : (
                            <button
                              key={option.label}
                              onClick={() => goTo(option.path)}
                              className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#CDD5D9] transition-colors hover:bg-white/[0.08] hover:text-white"
                            >
                              {option.label}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={() => goTo(link.path)}
                  className={desktopLinkClass}
                >
                  {link.name}
                </button>
              )
            )}
          </div>

          <div className="ml-auto flex items-center xl:ml-6">
            {user?.fullName && (
              <div className="mr-2 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    goTo(ProfileComplete ? "/profile" : "/register")
                  }
                  aria-label="Open profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F2A93C] to-[#E8791E] text-[#12171B] shadow-[0_8px_20px_-8px_rgba(232,121,30,0.7)] sm:h-11 sm:w-11"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </motion.button>
                <span className="mt-1 max-w-[90px] truncate text-center text-[10px] font-semibold leading-tight text-[#E8791E] sm:max-w-[110px] sm:text-xs">
                  {user.fullName}
                </span>
              </div>
            )}

            {!user?.fullName && (
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  goTo(ProfileComplete ? "/profile" : "/register")
                }
                aria-label="Open profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F2A93C] to-[#E8791E] text-[#12171B] shadow-[0_8px_20px_-8px_rgba(232,121,30,0.7)] sm:h-11 sm:w-11"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </motion.button>
            )}

            {/* Mobile and tablet menu button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setOpenDropdown(null);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D8E0E3] text-[#12171B] transition-colors hover:bg-[#E9EFF0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8791E] sm:ml-3 sm:h-11 sm:w-11 xl:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d={
                    isMobileMenuOpen
                      ? "m6 6 12 12M18 6 6 18"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-[#D8E0E3] bg-[#F6F8F8] xl:hidden"
            >
              <div className="space-y-1 px-4 py-4 sm:px-8 sm:py-5">
                {user?.fullName && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#F2A93C]/25 bg-[#FFF7ED] px-3 py-2 text-sm font-semibold text-[#E8791E]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F2A93C] to-[#E8791E] text-[#12171B]">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="truncate">{user.fullName}</span>
                  </div>
                )}

                {navLinks.map((link) =>
                  link.type === "dropdown" ? (
                    <div key={link.name}>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.id ? null : link.id
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-[#12171B] transition-colors hover:bg-[#E9EFF0]"
                        aria-expanded={openDropdown === link.id}
                      >
                        <span>{link.name}</span>
                        <Chevron open={openDropdown === link.id} />
                      </button>

                      <AnimatePresence>
                        {openDropdown === link.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 border-l-2 border-[#F2A93C] py-1">
                              {link.options
                                .filter((option) => option.type !== "label")
                                .map((option) => (
                                  <button
                                    key={option.label}
                                    onClick={() => goTo(option.path)}
                                    className="block w-full px-4 py-2.5 text-left text-sm text-[#4B5860] transition-colors hover:text-[#E8791E]"
                                  >
                                    {option.label}
                                  </button>
                                ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => goTo(link.path)}
                      className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-[#12171B] transition-colors hover:bg-[#E9EFF0] hover:text-[#E8791E]"
                    >
                      {link.name}
                    </button>
                  )
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default NavBar2;