import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AppContext from "../context/AppContext";
import video from "../assets/video2.mp4";
import NavBar2 from "./NavBar2";

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
    transition: { staggerChildren: 0.15 },
  },
};

/* ---------------- Data ---------------- */
const skillPillars = [
  {
    title: "Communication",
    description:
      "Master verbal and written communication for professional environments.",
  },
  {
    title: "Emotional Intelligence",
    description:
      "Develop empathy, self-awareness, and relationship management skills.",
  },
  {
    title: "Leadership",
    description:
      "Learn to guide teams, make decisions, and inspire confidence.",
  },
  {
    title: "Time Management",
    description:
      "Prioritize tasks efficiently and maximize productivity in the workplace.",
  },
];

const SoftSkills = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();

  /* ✅ FIX: Proper refs */
  const heroRef = useRef(null);
  const stakesRef = useRef(null);
  const pillarsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const stakesInView = useInView(stakesRef, { once: true, amount: 0.2 });
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.15 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen font-body">
      <NavBar2 />

      {/* ================= HERO ================= */}
      <motion.section
        ref={heroRef}
        className="relative h-[75vh] overflow-hidden md:mt-28"
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-md" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            variants={fadeUp}
            className="text-white text-[clamp(1.5rem,4vw,2.8rem)] font-bold mb-8 uppercase tracking-widest max-w-4xl font-heading"
          >
            SOFT SKILLS & INTERVIEW SUCCESS TRAINING
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white text-xl mb-6">
            India reports an{" "}
            <span className="text-[#22D3EE] font-bold">82%</span> hiring difficulty rate.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-10"
          >
            Technical skills alone are no longer enough in today’s job market.
          </motion.p>

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
            {ProfileComplete ? "Already Registered" : "Register"}
          </motion.button>
        </div>
      </motion.section>

      {/* ================= STAKES ================= */}
      <motion.section
        ref={stakesRef}
        className="py-24 px-6"
        variants={staggerContainer}
        initial="hidden"
        animate={stakesInView ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#0F172A] font-heading">
              The Cost of Silence.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="pl-6 border-l-4 border-[#818CF8]"
          >
            <p className="text-gray-700 text-lg mb-6">
              Without soft skills, even strong candidates miss opportunities and
              stay stuck in low-growth roles.
            </p>

            <p className="text-gray-600 text-lg">
              Companies now prioritize communication over pure technical ability.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= PILLARS ================= */}
      <motion.section
        ref={pillarsRef}
        className="py-24 px-6 bg-white"
        variants={staggerContainer}
        initial="hidden"
        animate={pillarsInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#0F172A] font-heading">
              Pillars of Success
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillPillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white shadow-md rounded-xl p-8 border-t-4 border-[#22D3EE] hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 font-heading">
                  {pillar.title}
                </h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        ref={ctaRef}
        className="py-20 px-6 bg-[#0F172A]"
        variants={staggerContainer}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            className="text-white text-[clamp(1.7rem,4vw,2.5rem)] font-bold mb-8 font-heading"
          >
            Ready to secure your role in the 2026 market?
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
            {ProfileComplete ? "Already Registered" : "Register Now"}
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default SoftSkills;