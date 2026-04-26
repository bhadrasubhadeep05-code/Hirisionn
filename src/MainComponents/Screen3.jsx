import React from "react";
import "../MainCss/Screen3.css";
import { motion, useScroll, useTransform } from "motion/react";
import CountUp from "./CountUp";

import treeImg from "../assets/tree.png";

const Screen3 = () => {
  const { scrollYProgress } = useScroll();

    const bgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const treeScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  return (
    <section className="screen3">
      {/* DARK GRADIENT OVERLAY */}
      <motion.div
        className="screen3-bg"
        style={{ opacity: bgOpacity }}
      />

      {/* HERO STATEMENT */}
      <motion.div
        className="screen3-hero"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>Why Hirisionn?</h2>
        <p>“We don’t just fill seats; we foster legacies.”</p>
      </motion.div>

      {/* LEGACY TREE */}
      <motion.div
        className="legacy-tree"
        style={{ scale: treeScale }}
      >
        <img src={treeImg} alt="Legacy Tree" />
        <div className="particles" />
      </motion.div>

      {/* STATS GRID */}
      <div className="stats-grid">
        <div className="stat-card">
            <div>
            <CountUp to={950} suffix="+" />
            </div>
          <span>Professional Network</span>
        </div>

        <div className="stat-card">
           <div>
            <CountUp to={100} suffix="%" />
            </div>
          <span>Commitment to Quality</span>
        </div>

        <div className="stat-card">
           <div>
            <CountUp to={50} suffix="+" />
            </div>
          <span>Tier 1 Industry Associates</span>
        </div>
      </div>
    </section>
  );
};

export default Screen3;

