import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import AppContext from '../context/AppContext'
import video from '../assets/video9.mp4'
import NavBar2 from './NavBar2'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const insightSections = [
  {
    id: "salary",
    title: "Salary Benchmarking",
    insight: "2026 has seen a shift from 'Flat Salary' to 'Value-Based Compensation.'",
    data: "Hybrid roles now command a 15% premium over traditional on-site roles."
  },
  {
    id: "regional",
    title: "Regional Employment",
    insight: "While Tier-1 cities lead in volume, Tier-2 cities are seeing exponential growth.",
    data: "Ranchi and Gaya are seeing a 22% surge in 'Remote-First' hiring for tech and back-office operations."
  },
  {
    id: "talent",
    title: "Talent Mapping",
    insight: "Use 'Heat Maps' to identify where the highest density of specialized talent resides.",
    data: "Identifying talent pockets before competitors reduces sourcing costs by up to 30%."
  },
  {
    id: "careergrowth",
    title: "Career Progression",
    insight: "The 'Middle Management Gap' persists. Companies are accelerating leadership pipelines.",
    data: "High-Potential entry-level talent are now being fast-tracked into leadership within 18 months."
  },
  {
    id: "hiringchallenges",
    title: "Hiring Challenges",
    insight: "\"Ghosting\" and \"Time-to-Hire\" are the top 2026 hurdles.",
    data: "AI-driven screening and transparent feedback loops keep candidate engagement at 90%+."
  },
  {
    id: "futurework",
    title: "Future of Work",
    insight: "The 'Agentic AI' Era. Roles are shifting from executing tasks to managing AI agents.",
    data: "12% of Indian startups are trialing 4-day work weeks to combat burnout."
  },
  {
    id: "internshipconversion",
    title: "Internship Conversion",
    insight: "Structured internship programs deliver significantly better long-term retention.",
    data: "40% higher retention rate in the first 3 years compared to lateral hires."
  },
  {
    id: "campushiring",
    title: "Campus Hiring",
    insight: "Move away from 'Day 1' placement towards continuous evaluation models.",
    data: "Year-round 'Hack-a-Hiring' and project-based evaluation replaces traditional campus drives."
  },
  {
    id: "diversity",
    title: "Diversity & Inclusion",
    insight: "DEI is no longer a metric; it's a growth driver.",
    data: "Gender-diverse teams in Indian tech sectors reported 19% higher innovation revenue in 2025-26."
  },
  {
    id: "attrition",
    title: "Attrition Trends",
    insight: "\"Career Stagnation\" has overtaken \"Salary\" as the #1 reason for attrition.",
    data: "35% Lack of Growth | 30% Salary | 25% Work-Life Balance | 10% Other"
  },
  {
    id: "upskilling",
    title: "Upskilling Demand",
    insight: "60% of the current workforce requires reskilling by 2027.",
    data: "Highest demand: Prompt Engineering, Sustainable Tech, Cross-Platform Mobile Development."
  },
  {
    id: "jobseeker",
    title: "Job Seeker Behavior",
    insight: "The 'Meaningful Work' movement defines Gen Z career choices.",
    data: "78% prioritize social impact and ethical AI policies over higher pay with poor culture."
  }
]

const WorkForce = () => {
  const { ProfileComplete } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('salary')
    const heroRef = useRef(null);
  // View detection for scroll animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  
  // Section refs for intersection observer
  const sectionRefs = useRef({})
  
  // Track which section is in view for sidebar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    )

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <NavBar2 />

      {/* 1. Data-Pulse Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-[75vh] overflow-hidden md:mt-28"
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
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

        {/* Dark Overlay with Blur */}
        <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-lg"></div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h1 variants={fadeUp} className="text-white text-[clamp(1.8rem,5vw,3.2rem)] font-bold mb-6 max-w-5xl leading-tight">
            2026 Workforce Intelligence: Navigating the Future of Talent.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-xl max-w-3xl mx-auto mb-10">
            Real-time market trends, industry analysis, and skill mapping for the modern enterprise.
          </motion.p>

        </div>
      </motion.section>

      {/* 2. Insight Hub Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sticky Sidebar Navigation */}
        <div className="lg:w-1/4 bg-[#F8FAFC] p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-r border-gray-200">
          <div className="max-w-xs mx-auto">
            <h3 className="text-[#0F172A] font-bold text-lg mb-6">Table of Contents</h3>
            <nav className="space-y-1">
              {insightSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-[#22D3EE]/10 text-[#22D3EE] font-semibold border-l-4 border-[#22D3EE]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4">
          {insightSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={el => sectionRefs.current[section.id] = el}
              className={`py-16 px-6 lg:px-12 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
            >
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{section.icon}</span>
                  <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-[#0F172A]">
                    {section.title}
                  </h2>
                </div>
                
                <p className="text-gray-700 text-lg mb-4 leading-relaxed font-medium">
                  {section.insight}
                </p>
                
                <p className="text-[#818CF8] text-lg leading-relaxed">
                  {section.data}
                </p>

             
              </div>
            </section>
          ))}

          {/* Final Closing CTA */}
          <section className="py-20 px-6 lg:px-12 bg-[#0F172A]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
                Ready to leverage workforce intelligence for your organization?
              </h2>
              
              <motion.button
                whileHover={!ProfileComplete ? { scale: 1.08 } : {}}
                whileTap={!ProfileComplete ? { scale: 0.97 } : {}}
                onClick={() => navigate('/register')}
                disabled={ProfileComplete}
                className={`px-14 py-5 text-xl font-bold rounded-xl transition-all duration-300 ${
                  ProfileComplete
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-[#22D3EE] text-[#0F172A] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]'
                }`}
              >
                {ProfileComplete ? 'Register' : 'Already Registerd '}
              </motion.button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default WorkForce