import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AppContext from "../context/AppContext";
import video from "../assets/video11.mp4";
import NavBar2 from "./NavBar2";
import { softSkillsApply } from "../services/user.api";

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



/* ---------------- Data ---------------- */
const benefitCards = [
  {
    title: "Students",
    description:
      "Undergraduate & Postgraduate students across all disciplines.",
  },
  {
    title: "Career Aspirants",
    description:
      "Job seekers and early-career professionals ready to level up.",
  },
  {
    title: "Future Leaders",
    description:
      "Individuals seeking unstoppable confidence and elite workplace conduct.",
  },
];

const LearningOutcomes = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();
      const [loading, setLoading] = useState(false)

  /* ✅ FIX: proper refs */
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });

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
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen">
      <NavBar2 />

      {/* ================= HERO ================= */}
      <motion.section
        ref={heroRef}
        className="relative h-[80vh] overflow-hidden md:mt-28"
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(20%)" }}
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            variants={fadeUp}
            className="text-white text-[clamp(1.8rem,5vw,3.2rem)] font-bold mb-8 max-w-4xl leading-tight"
          >
            Transform Your Potential into Professional Reality.
          </motion.h1>

      

          {/* ✅ FIX: merged animations properly */}
           <motion.button
                   variants={fadeUp}
                   onClick={() =>
                     ProfileComplete?
                     handleClick():
                  navigate("/register") }
                   className={`px-14 py-5 text-xl font-bold rounded-xl bg-[#22D3EE] text-[#0F172A]`}
                 >
                    {loading ? "Applying..." : "Apply Now"}
                 </motion.button>
        </div>
      </motion.section>

      {/* ================= BENEFITS ================= */}
      <motion.section
        ref={benefitsRef}
        className="py-24 px-6"
        variants={staggerContainer}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#0F172A] mb-4">
              Your Path to Success
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Designed for individuals who refuse to settle for average
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white/80 backdrop-blur-md border-b-4 border-[#22D3EE] rounded-xl p-10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{card.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <section className="bg-[#0F172A] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            Join thousands of professionals who have already transformed their careers
          </p>
        </div>
      </section>
    </div>
  );
};

export default LearningOutcomes;