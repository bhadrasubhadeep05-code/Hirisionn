import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AppContext from "../context/AppContext";
import NavBar2 from "./NavBar2";
import { internshipUpdate } from "../services/user.api";
import { useToast } from "./AlertNotification";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const modalAnimation = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

/* ---------------- Category Data ---------------- */
const itCategories = [
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Fullstack Development",
  "Data Analyst",
  "AI",
  "ML",
  "Cyber Security",
];

const engineeringCategories = [
  "Mechanical",
  "Electrical",
  "Electronics",
  "Civil",
];

const internshipCategories = [
  {
    title: "IT & Technology",
    description:
      "Master modern programming languages, frameworks, and development workflows with real project experience.",
    hasCourseLink: true,
    hasSubCategories: true,
    subCategories: itCategories,
  },
  {
    title: "Management",
    description:
      "Develop leadership skills, strategic thinking, and business acumen in real corporate environments.",
    hasCourseLink: false,
  },
  {
    title: "Marketing",
    description:
      "Learn end-to-end marketing strategies, campaign management, and brand building techniques.",
    hasCourseLink: false,
  },
  {
    title: "Human Resources",
    description:
      "Gain expertise in talent acquisition, employee relations, and organizational development.",
    hasCourseLink: false,
  },
  {
    title: "Finance",
    description:
      "Work with financial analysis, budgeting, accounting systems, and investment planning processes.",
    hasCourseLink: false,
  },
  {
    title: "Digital Marketing",
    description:
      "Master SEO, social media marketing, paid advertising, analytics and conversion optimization.",
    hasCourseLink: false,
  },
  {
    title: "Engineering",
    description:
      "Apply technical engineering principles in real world projects across multiple industry domains.",
    hasCourseLink: false,
    hasSubCategories: true,
    subCategories: engineeringCategories,
  },
];

const Internship = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();

  // State for modal
  const [openModal, setOpenModal] = useState(null);
  const [loadingApply, setLoadingApply] = useState(null);

  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.3 });

  const handleCardClick = (category) => {
    if (category.hasSubCategories) {
      setOpenModal(category);
    }
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen font-body">
      <NavBar2 />

      {/* ================= HERO SECTION ================= */}
      <motion.section
        ref={heroRef}
        className="relative mt-16 flex min-h-[60vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24 md:mt-24 md:py-52"
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            variants={fadeUp}
            className="mx-auto max-w-4xl"
          >
            <h1 className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white font-heading">
              From Classroom Learning to Real-World Impact.
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-[clamp(1.1rem,2vw,1.3rem)] text-[#AAB5BA]">
              Gain hands-on experience, build in-demand skills, and launch your
              career with confidence.
            </p>
               <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 60 }}
                          transition={{ delay: 0.8, duration: 1.5 }}
                          className="mx-auto mt-8 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
                        />
        
          </motion.div>
        </div>
      </motion.section>

      {/* ================= EXPERTISE SECTION ================= */}
      <motion.section
        ref={gridRef}
        className="px-6 py-24"
        variants={staggerContainer}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#0F172A] mb-4 font-heading">
              Our Expertise
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from 7 specialized internship tracks designed to give you
              industry-ready experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internshipCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                onClick={() => handleCardClick(category)}
                className={`flex flex-col justify-between rounded-3xl border border-white bg-white p-8 shadow-md transition-all duration-300 hover:border-[#E8791E]/30 hover:shadow-xl ${
                  index === 6
                    ? "md:col-span-2 lg:col-span-1 lg:col-start-2"
                    : ""
                } ${category.hasSubCategories ? "cursor-pointer" : ""}`}
              >
                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4 font-heading">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {category.hasSubCategories && (
                    <p className="text-sm text-[#22D3EE] font-medium mb-4">
                      👆 Click to view all available categories
                    </p>
                  )}
                </div>

                <button
                  disabled={loadingApply === index}
                  onClick={
                    category.hasSubCategories
                      ? (e) => {
                          e.stopPropagation();
                          handleCardClick(category);
                        }
                      : async (e) => {
                          e.stopPropagation();

                          if (ProfileComplete) {
                            setLoadingApply(index);

                            try {
                              const res = await internshipUpdate({
                                category: category.title,
                              });

                              if (res.success === true) {
                                toast.success(
                                  `Successfully applied for ${category.title}!`,
                                );
                              }
                            } catch (err) {
                              toast.error(
                                err.response?.data?.message ||
                                  "Something went wrong",
                              );
                            } finally {
                              setLoadingApply(null);
                            }
                          } else {
                            navigate("/register");
                          }
                        }
                  }
                  className="rounded-xl bg-gradient-to-r from-[#F2A93C] to-[#E8791E] px-6 py-2.5 font-semibold text-white shadow-md shadow-[#E8791E]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingApply === index ? "Applying..." : "Apply"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= SUB CATEGORIES MODAL ================= */}
      <AnimatePresence>
        {openModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 border-b border-slate-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    {openModal.title} Categories
                  </h3>
                  <button
                    onClick={closeModal}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8791E]/10 text-[#E8791E] transition-colors hover:bg-[#E8791E]/20"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Select a category to apply for internship
                </p>
              </div>

              {/* Modal Body - Category List */}
              <div className="p-6 space-y-4">
                {openModal.subCategories.map((subCategory, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#E8791E]/5"
                  >
                    <span className="font-medium text-[#0F172A] text-lg">
                      {subCategory}
                    </span>
                    <button
                      disabled={loadingApply === idx}
                      onClick={async () => {
                        if (ProfileComplete) {
                          setLoadingApply(idx);
                          try {
                            const res = await internshipUpdate({
                              category: openModal.title,
                              subCategory: subCategory,
                            });

                            // Show success message
                            if (res.success === true) {
                              toast.success(`Successfully applied for ${subCategory}!`);
                            }
                            closeModal();
                          } catch (err) {
                            toast.error(err.response.data.message);
                          } finally {
                            setLoadingApply(null);
                          }
                        } else {
                          navigate("/register");
                        }
                      }}
                      className="rounded-xl bg-gradient-to-r from-[#F2A93C] to-[#E8791E] px-6 py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loadingApply === idx ? "Applying..." : "Apply"}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-slate-100 bg-white p-4">
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl border-2 border-[#E8791E]/20 py-3 font-semibold text-[#0F172A] transition-colors hover:bg-[#E8791E]/5"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER CTA SECTION ================= */}
      <motion.section
        ref={footerRef}
        className="relative flex min-h-[450px] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24"
        variants={staggerContainer}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
      >
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.22)_0%,transparent_68%)] blur-[10px]" />

        {/* CTA Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.h2
            variants={fadeUp}
            className="text-white text-[clamp(1.7rem,4vw,2.6rem)] font-bold mb-8 max-w-3xl font-heading"
          >
            Ready to sharpen your technical skills and become employable?
          </motion.h2>

          <motion.button
            variants={fadeUp}
            whileHover={!ProfileComplete ? { scale: 1.08 } : {}}
            whileTap={!ProfileComplete ? { scale: 0.97 } : {}}
            onClick={() => navigate("/register")}
            disabled={ProfileComplete}
            className={`px-12 py-5 text-xl font-bold rounded-xl transition-all duration-300 ${
              ProfileComplete
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#F2A93C] to-[#E8791E] text-white shadow-lg shadow-[#E8791E]/25 hover:-translate-y-1 hover:shadow-xl"
            }`}
          >
            {ProfileComplete ? "You have already registered" : "Register Now"}
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Internship;
