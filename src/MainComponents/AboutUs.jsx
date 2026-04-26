import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import NavBar2 from './NavBar2';
import video from '../assets/video2.mp4';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('story');
  const { scrollYProgress } = useViewportScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const navigation = [
    { id: 'story', name: 'Our Story'  },
    { id: 'mission', name: 'Mission & Vision' },
    { id: 'milestones', name: 'Our Milestones' },
  ];

  const leadershipTeam = [
    {
      id: 1,
      name: "Rajesh Kumar",
      designation: "FOUNDER & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "OPERATIONS HEAD",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 3,
      name: "Arjun Patel",
      designation: "BUSINESS DIRECTOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  const stats = [
    { value: "2000+", label: "Students Empowered" },
    { value: "15+", label: "Industries Covered" },
    { value: "100%", label: "Expert Vetted Resumes" },
    { value: "15+", label: "States Covered" },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />
      
      {/* DNA Hero Section */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="relative h-[550px] overflow-hidden mt-24"
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

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            The Architecture of Ambition
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mb-8"
          >
            Hirisionn isn't just a platform; it’s a bridge between current potential and future reality.
          </motion.p>

          {/* Vertical Cyan Lead Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="w-0.5 bg-[#22D3EE]"
          />
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block w-1/5 sticky top-32 self-start">
            <h3 className="text-[#0F172A] font-bold text-lg mb-6">Our DNA</h3>
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 px-4 rounded-xl transition-all duration-300 group ${
                    activeSection === item.id 
                      ? 'bg-white shadow-md text-[#22D3EE] border-l-2 border-[#22D3EE]' 
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-32">
            
            {/* Our Story Section */}
            <section id="story" className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-[#0F172A]">Our Story</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Founded on the belief that talent is universal but opportunity is not, Hirisionn was built to decentralize success.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We started with a simple observation: exceptional candidates were being overlooked not for lack of skill, but for lack of presentation and access.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Lavender Shadow Layer */}
                  <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#818CF8]/10 rounded-3xl" />
                  
                  {/* Offset Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600"
                    alt="Hirisionn Team"
                    className="relative z-10 rounded-3xl shadow-2xl border-4 border-white transform -translate-y-6 translate-x-6"
                  />
                </motion.div>
              </div>
            </section>

            {/* Mission & Vision Section */}
            <section id="mission" className="scroll-mt-32">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#0F172A] text-center mb-16"
              >
                Mission & Vision
              </motion.h2>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Mission Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-l-[2rem] shadow-xl relative z-10"
                  >
                    <div className="absolute left-0 top-8 bottom-8 w-1 bg-[#22D3EE]" />
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4 pl-4">Our Mission</h3>
                    <p className="text-slate-600 pl-4">
                      To democratize access to professional opportunities by equipping every candidate with the tools, presentation, and confidence they deserve.
                    </p>
                  </motion.div>

                  {/* Vision Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-r-[2rem] shadow-xl -ml-4 mt-8 relative z-20"
                  >
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Our Vision</h3>
                    <p className="text-slate-600">
                      A world where your potential is the only currency that matters. Where geography, network, and background never limit what you can achieve.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Impact Stats Section */}
            <section className="bg-[#F8FAFC] py-16 -mx-4 px-4 md:-mx-8 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-[#22D3EE] mb-2">{stat.value}</div>
                    <div className="text-[#818CF8] text-sm uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </section>

           
            {/* Milestones Section */}
            <section id="milestones" className="scroll-mt-32">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#0F172A] text-center mb-12"
              >
                Our Milestones
              </motion.h2>
              
              <div className="space-y-8">
                {[
                  { year: "2023", event: "Hirisionn founded with a mission to democratize career opportunities" },
                  { year: "2024", event: "Launched resume services and helped first 100 candidates land roles" },
                  { year: "2025", event: "Reached multiple Industries and officially came into existence as a Manpower Solutions Provider" },
                  { year: "2026", event: "Inclusion of B-Schools, Universities and Colleges as client partners" },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-6 items-start"
                  >
                    <div className="text-2xl font-bold text-[#22D3EE] min-w-[80px]">{milestone.year}</div>
                    <div className="border-l-2 border-[#818CF8]/30 pl-6 py-2">
                      <p className="text-[#0F172A]">{milestone.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;