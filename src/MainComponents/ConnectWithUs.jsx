import React from "react";
import "../MainCss/ConnectWithUs.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const ConnectWithUs = () => {
  const navigate = useNavigate();

  return (
    <section className="connect-with-us">
      <div className="connect-bg-overlay" />
      
      <motion.div 
        className="connect-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="connect-content">
          <h2>Connect With Our Consultant</h2>
          <p className="tagline">
            Your career journey starts here. Let us guide you towards opportunities that build legacies.
          </p>
          
          <motion.button 
            className="connect-cta-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/register')}
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default ConnectWithUs;