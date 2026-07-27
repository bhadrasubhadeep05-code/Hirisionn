import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar2 from './NavBar2';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('story');

  const navigation = [
    { id: 'story', name: 'Our Story'  },
    { id: 'mission', name: 'Mission & Vision' },
    { id: 'milestones', name: 'Our Milestones' },
  ];

  // const leadershipTeam = [
  //   {
  //     id: 1,
  //     name: "Rajesh Kumar",
  //     designation: "FOUNDER & CEO",
  //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Sharma",
  //     designation: "OPERATIONS HEAD",
  //     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  //   },
  //   {
  //     id: 3,
  //     name: "Arjun Patel",
  //     designation: "BUSINESS DIRECTOR",
  //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  //   }
  // ];

  const stats = [
    { value: "2500+", label: "Successful Placement" },
    { value: "250+", label: "Hiring Partner" },
    { value: "3000+", label: "Internships Facilitated" },
    { value: "10+", label: "States Covered" },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC]">
      <NavBar2 progress={1} />
      
      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] min-h-[60vh] flex items-center justify-center px-6 py-24 md:mt-24 mt-16 md:py-52"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
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
            className="text-lg text-[#AAB5BA] max-w-2xl mx-auto mb-8"
          >
            Hirisionn isn't just a platform; it's a bridge between current potential and future reality.
          </motion.p>

          {/* Vertical Orange Lead Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E] mx-auto"
          />
        </div>
      </motion.section>

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
                      ? 'bg-white shadow-md text-[#E8791E] border-l-2 border-[#E8791E]' 
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
                  {/* Orange Shadow Layer */}
                  <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#E8791E]/10 rounded-3xl" />
                  
                  {/* Offset Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600"
                    alt="Hirisionn Team"
                    className="relative z-10 rounded-3xl shadow-2xl border-4 border-white transform -translate-y-6 translate-x-0"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mission Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-l-[2rem] shadow-xl relative z-10"
                  >
                    <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4 pl-4">Our Mission</h3>
                    <p className="text-slate-600 pl-4">
                      To democratize access to professional opportunities by equipping every candidate with the tools, presentation, and confidence they deserve.
                    </p>
                  </motion.div>

                  {/* Vision Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-l-[2rem] shadow-xl relative z-10 "
                  >
                    <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4 pl-4">Our Vision</h3>
                    <p className="text-slate-600 pl-4">
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
                    <div className="text-4xl md:text-5xl font-bold text-[#E8791E] mb-2">{stat.value}</div>
                    <div className="text-[#F2A93C] text-sm uppercase tracking-wider">{stat.label}</div>
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
                  { year: "2023", event: "Hirisionn was founded with a mission to democratize career opportunities" },
                  { year: "2024", event: "Launched resume services and helped first 100 candidates land roles" },
                  { year: "2025", event: "Reached multiple Industries and officially came into existence as a Manpower Solutions Provider" },
                  { year: "2026", event: "Inclusion of Corporates,  B-Schools, Universities and Colleges as client partners" },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-6 items-start"
                  >
                    <div className="text-2xl font-bold text-[#E8791E] min-w-[80px]">{milestone.year}</div>
                    <div className="border-l-2 border-[#F2A93C]/30 pl-6 py-2">
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