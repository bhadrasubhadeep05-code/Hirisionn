import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AppContext from "../context/AppContext";
import NavBar2 from "./NavBar2";
import video from "../assets/video7.mp4";
import { softSkillsApply } from "../services/user.api";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/* ---------------- Data ---------------- */
const curriculumItems = [
  "Self-Awareness & Assessment",
  "Positive Attitude & Growth Mindset",
  "Communication (Verbal, Non-Verbal, Written)",
  "Emotional Intelligence & Relationships",
  "Time Management & Productivity",
  "Leadership & Team Collaboration",
  "Problem Solving & Critical Thinking",
  "Public Speaking and Interview Skills",
];

const Curriculum = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

  /* ✅ FIX: proper refs */
  const curriculumRef = useRef(null);
  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  
    const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
    const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  
  const curriculumInView = useInView(curriculumRef, {
    once: true,
    amount: 0.15,
  });

   const handleClick = async ()=>{
          try {
            setLoading(true)
          const res = await softSkillsApply({
            applied: true
          });
    
          alert(res.message);
    
        } catch (err) {
          alert(
            err.response?.data?.message ||
            "Something went wrong"
          );
        }
        finally{
          setLoading(false)
        }
      }

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
                   OUR CURRICULUM
                </motion.h1>
      
                <motion.p variants={fadeUp} className="text-white text-xl mb-6">
                  A comprehensive 8-step journey to professional mastery.
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
    

      {/* ================= GRID ================= */}
      <motion.section
        ref={curriculumRef}
        className="py-20 px-6"
        variants={staggerContainer}
        initial="hidden"
        animate={curriculumInView ? "visible" : "hidden"}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculumItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative bg-white border border-[#818CF8]/20 rounded-lg p-8 shadow-sm hover:border-[#22D3EE] hover:shadow-md transition-all overflow-hidden"
            >
              {/* Background Number */}
              <span className="absolute top-0 left-4 text-7xl font-black text-[#22D3EE]/15">
                {index + 1}
              </span>

              {/* Content */}
              <h3 className="relative z-10 text-lg md:text-xl font-semibold text-[#0F172A] font-heading">
                {item}
              </h3>
            </motion.div>
          ))}
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
                  Ready to start your journey to professional excellence?
                </motion.h2>
        <motion.button
                         variants={fadeUp}
                         onClick={() =>
                           ProfileComplete?
                           handleClick():
                        navigate("/register") }
                         className={`px-14 py-5 text-xl font-bold rounded-xl bg-[#22D3EE] text-[#0F172A]`}
                       >
                          {loading ? "Applying..." : "Apply"}
                       </motion.button>
              </div>
            </motion.section>
     
    </div>
  );
};

export default Curriculum;