import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AppContext from "../context/AppContext";
import video from "../assets/video4.mp4";
import NavBar2 from "./NavBar2";
import image from  "../assets/HandShake.png";
import CountUp from "./CountUp";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const countAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
  },
};

const Placements = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();

  /* ✅ FIX: Proper refs */
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const ctaRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, amount: 0.2 });
  const solutionInView = useInView(solutionRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen font-body">
      <NavBar2 />

      {/* ================= PROBLEM SECTION ================= */}
      <motion.section
        ref={problemRef}
        className="relative bg-[#0F172A] min-h-[80vh] flex items-center justify-center px-6 py-28 md:py-48"
        variants={staggerContainer}
        initial="hidden"
        animate={problemInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* 82% Circle */}
            <motion.div
              variants={countAnimation}
              className="flex justify-center"
            >
              <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px]">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="rgba(34,211,238,0.15)"
                    strokeWidth="12"
                    fill="transparent"
                  />

                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="#22D3EE"
                    strokeWidth="12"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 85}
                    strokeDashoffset={2 * Math.PI * 85 * 0.18}
                    initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 85 * 0.18 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl md:text-7xl font-black text-[#22D3EE] font-heading">
                    <CountUp to={82} suffix="%" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.h1
                variants={fadeUp}
                className="text-white text-[clamp(2rem,4vw,3.2rem)] font-bold mb-6 font-heading"
              >
                The Crisis: India's 82% Hiring Difficulty.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-gray-300 text-lg mb-6 leading-relaxed"
              >
                Organizations across India are struggling to find qualified
                candidates, slowing business growth and limiting opportunities.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-[#818CF8] text-lg font-medium"
              >
                The gap between education and industry requirements is the core issue.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path
              fill="#F8FAFC"
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120H0Z"
            />
          </svg>
        </div>
      </motion.section>

      {/* ================= SOLUTION ================= */}
      <motion.section
        ref={solutionRef}
        className="py-24 px-6"
        variants={staggerContainer}
        initial="hidden"
        animate={solutionInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-[#0F172A] text-[clamp(1.8rem,4vw,2.8rem)] font-bold mb-8 font-heading"
            >
              We Bridge Talent and Opportunity.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-700 text-lg mb-6">
              We connect skilled candidates with companies, enabling faster hiring and career growth.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              Our system ensures the right talent meets the right opportunity.
            </motion.p>
          </div>

          <motion.div variants={fadeUp}>
            <div className=" rounded-2xl  flex justify-center gap-6 text-2xl text-white">
             <img 
             src={image} 
             alt="handshake image"
             className="rounded-2xl shadow-lg shadow-[#0F172A]"
             />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        ref={ctaRef}
        className="relative h-[450px]"
        variants={staggerContainer}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        <video autoPlay muted loop className="absolute w-full h-full object-cover">
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            variants={fadeUp}
            className="text-white text-[clamp(1.7rem,4vw,2.5rem)] font-bold mb-8 font-heading"
          >
            Ready to take the next step in your career?
          </motion.h2>

          <motion.button
            variants={fadeUp}
            onClick={() => navigate("/register")}
            disabled={ProfileComplete}
            className={`px-14 py-5 text-xl font-bold rounded-xl ${
              ProfileComplete
                ? "bg-gray-600 text-gray-300"
                : "bg-[#22D3EE] text-[#0F172A]"
            }`}
          >
            {ProfileComplete
              ? "Already Registered"
              : "Register"}
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Placements;