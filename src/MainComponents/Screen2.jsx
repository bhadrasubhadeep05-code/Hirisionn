import React from "react";
import "../MainCss/Screen2.css";
import { motion, useScroll, useTransform } from "motion/react";

import kingImg from "../assets/king.png";
import circuitImg from "../assets/circuite.png";
import compassImg from "../assets/visual.png";

const Screen2 = () => {
  const { scrollYProgress } = useScroll();

  // Parallax depth for images
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="screen2">

      {/* ROW 1 */}
      <div className="section-row">
        <motion.div
          className="text-block"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Executive Search</h2>
          <p>
            Elite leadership acquisition for organizations shaping industries
            and defining market direction.
          </p>
        </motion.div>

        <motion.div
          className="image-block"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: imageY }}
        >
          <img src={kingImg} alt="Executive Search" />
        </motion.div>
      </div>

      {/* ROW 2 */}
      <div className="section-row reverse">
        <motion.div
          className="image-block"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: imageY }}
        >
          <img src={circuitImg} alt="Technology & Innovation" />
        </motion.div>

        <motion.div
          className="text-block"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Technology & Innovation</h2>
          <p>
            Bridging exceptional tech talent with visionary products and
            future-driven organizations.
          </p>
        </motion.div>
      </div>

      {/* ROW 3 */}
      <div className="section-row">
        <motion.div
          className="text-block"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Curated Career Guidance</h2>
          <p>
            Precision mentorship and insight for professionals navigating
            high-impact career paths.
          </p>
        </motion.div>

        <motion.div
          className="image-block"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: imageY }}
        >
          <img src={compassImg} alt="Career Guidance" />
        </motion.div>
      </div>

    </div>
  );
};

export default Screen2;
