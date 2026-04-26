import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AppContext from "../context/AppContext";
import video from "../assets/video2.mp4";
import NavBar2 from "./NavBar2";

/* ---------------- Animation Variants ---------------- */
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
      staggerChildren: 0.2,
    },
  },
};

/* ---------------- Data ---------------- */
const comparisonData = [
  {
    aspect: "Nature",
    liveProject: "Short-term, task-based",
    internship: "Long-term, structured",
  },
  {
    aspect: "Focus",
    liveProject: "Solving a specific problem",
    internship: "Overall skill & role exposure",
  },
  {
    aspect: "Duration",
    liveProject: "Days to Weeks",
    internship: "Weeks to Months",
  },
  {
    aspect: "Work Style",
    liveProject: "Project-oriented",
    internship: "Job-like experience",
  },
  {
    aspect: "Supervision",
    liveProject: "Result-focused guidance",
    internship: "Continuous mentorship",
  },
];

const LiveProjects = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();

  /* ---------------- FIXED ERROR ----------------
     useInView requires refs, not direct object syntax
  ---------------------------------------------- */

  const heroRef = useRef(null);
  const tableRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.2,
  });

  const tableInView = useInView(tableRef, {
    once: true,
    amount: 0.15,
  });

  const ctaInView = useInView(ctaRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen font-body">
      <NavBar2 />

      {/* ================= HERO HEADER ================= */}
      <motion.section
        ref={heroRef}
        className="relative bg-[#0F172A] min-h-[60vh] flex items-center justify-center px-6 py-24 md:py-52"
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            className="text-white text-[clamp(2.2rem,5vw,3.5rem)] font-bold mb-6 leading-tight font-heading"
          >
            Bridge the Gap with Live Projects.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-[clamp(1.1rem,2vw,1.35rem)] max-w-3xl mx-auto"
          >
            Work on real business challenges with actual data and industry
            deadlines.
          </motion.p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#F8FAFC"
              fillOpacity="1"
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            />
          </svg>
        </div>
      </motion.section>

      {/* ================= COMPARISON TABLE ================= */}
      <motion.section
        ref={tableRef}
        className="py-24 px-6"
        variants={staggerContainer}
        initial="hidden"
        animate={tableInView ? "visible" : "hidden"}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#0F172A] mb-3 font-heading">
              The Confusion! <span className="text-[#22D3EE]">?</span>
            </h2>

            <p className="text-gray-600 text-lg">
              Understand the difference before you choose
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                {/* Header */}
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    <th className="px-8 py-5 text-left font-bold text-lg">
                      Aspect
                    </th>
                    <th className="px-8 py-5 text-center font-bold text-lg">
                      Live Project
                    </th>
                    <th className="px-8 py-5 text-center font-bold text-lg">
                      Internship
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.aspect}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                      } border-b border-gray-100`}
                    >
                      <td className="px-8 py-5 font-semibold text-[#818CF8] text-lg">
                        {row.aspect}
                      </td>
                      <td className="px-8 py-5 text-center text-gray-700">
                        {row.liveProject}
                      </td>
                      <td className="px-8 py-5 text-center text-gray-700">
                        {row.internship}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= APPLY BUTTON SECTION ================= */}
      <motion.section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.button
            variants={fadeUp}
            whileHover={!ProfileComplete ? { scale: 1.08 } : {}}
            whileTap={!ProfileComplete ? { scale: 0.97 } : {}}
            onClick={() => navigate("/register")}
            disabled={ProfileComplete}
            className={`w-full py-4 px-8 text-xl font-bold rounded-xl transition-all duration-300 ${
              ProfileComplete
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#22D3EE] text-[#0F172A] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]"
            }`}
          >
            {ProfileComplete
              ? "You have already registered"
              : "Apply For Live Projects"}
          </motion.button>
        </div>
      </motion.section>

      {/* ================= CTA VIDEO SECTION ================= */}
      <motion.section
        ref={ctaRef}
        className="relative h-[450px] overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md"></div>

        {/* CTA Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h2
            variants={fadeUp}
            className="text-white text-[clamp(1.7rem,4vw,2.5rem)] font-bold mb-8 max-w-3xl font-heading"
          >
            Ready to work on real industry projects?
          </motion.h2>

          <motion.button
            variants={fadeUp}
            whileHover={!ProfileComplete ? { scale: 1.08 } : {}}
            whileTap={!ProfileComplete ? { scale: 0.97 } : {}}
            onClick={() => navigate("/register")}
            disabled={ProfileComplete}
            className={`px-14 py-5 text-xl font-bold rounded-xl transition-all duration-300 ${
              ProfileComplete
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#22D3EE] text-[#0F172A] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]"
            }`}
          >
            {ProfileComplete
              ? "You have already registered"
              : "Apply Now"}
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default LiveProjects;