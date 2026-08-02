import React from "react";
import NavBar2 from "../MainComponents/NavBar2";
import HirisionnHero from "./HirisionnHero";
import Marquee from "./Marquee";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from "locomotive-scroll";
import { useRef, useEffect } from "react";
import ProblemStatement from "./ProblemStatement";
import Offerings from "./Offerings";
import Stats from "./Stats";
import InternAndJobLanding from "./InternAndJobLanding";
import TraningLanding from "./TraningLanding";
import CorporatePage1 from "./CorporatePage1";
import CorporatePage2 from "./CorporatePage2";
import CorporatePage3 from "./CorporatePage3";
import FinalCta from "./FinalCta";
import Footer from "../MainComponents/Footer";

const LandingPage2 = () => {
  const scrollRef = useRef(null);
  const problemStatementRef = useRef(null);
  const statsRef = useRef(null);

useEffect(() => {
  const scroll = new LocomotiveScroll({
    el: scrollRef.current,
    smooth: true,
  });

  setTimeout(() => {
    scroll.resize();
  }, 100);

  return () => {
    scroll.destroy();
  };
}, []);

  return (
    <>
      <div data-scroll-container ref={scrollRef} className="bg-[#f6f9fb]">
        <NavBar2 />
        <HirisionnHero />
        <Marquee />
        <div ref={problemStatementRef}>
          <ProblemStatement />
        </div>
        <div ref={statsRef}>
          <Stats />
        </div>
        <Offerings />
        <InternAndJobLanding />
        <CorporatePage2 />
        <CorporatePage1 />
        <CorporatePage3 />
        <FinalCta />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage2;
