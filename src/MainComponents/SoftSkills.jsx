import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import NavBar2 from './NavBar2';

const courseHighlights = [
  {
    title: 'Industry-led curriculum',
    description: 'Learn from a practical, modern framework built around real hiring expectations.',
  },
  {
    title: 'Live mentor guidance',
    description: 'Get focused support as you build confidence, clarity, and communication for the workplace.',
  },
  {
    title: 'Career-ready outcomes',
    description: 'Develop the polished professional presence needed for interviews, internships, and growth.',
  },
  {
    title: 'Flexible learning flow',
    description: 'A structured experience designed to fit into your current schedule without losing momentum.',
  },
];

const SoftSkills = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-slate-800">
      <NavBar2 progress={1} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex min-h-[60vh] items-center justify-center bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24 md:mt-24 md:py-52"
      >
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300"
          >
            Certification course • coming soon
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Professional Certification for the Next Chapter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-[#AAB5BA]"
          >
            A future-ready certification experience designed to sharpen your skills, strengthen your confidence, and prepare you for meaningful career growth.
          </motion.p>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mx-auto w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              disabled={ProfileComplete}
              className={`rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-300 ${
                ProfileComplete
                  ? 'cursor-not-allowed bg-slate-700 text-slate-300'
                  : 'bg-[#E8791E] text-white shadow-[0_0_30px_rgba(232,121,30,0.25)] hover:-translate-y-1 hover:bg-[#F2A93C]'
              }`}
            >
              {ProfileComplete ? 'You have already registered' : 'Reserve Your Spot'}
            </button>
            <div className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-slate-100 backdrop-blur">
              Coming soon
            </div>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 md:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#E8791E]">Why this certification</p>
            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">
              Designed for professionals who want to stand out with purpose
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              This upcoming certification course is built to equip learners with the mindset, communication, and professional habits that employers now value most.
            </p>
            <p className="text-lg leading-8 text-slate-600">
              From confidence-building to career positioning, every part of the experience is shaped to create real readiness for interviews, internships, and long-term growth.
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -bottom-6 -left-6 h-full w-full rounded-[2rem] bg-[#E8791E]/10" />
            <div className="relative z-10 rounded-[2rem] border border-white bg-white p-8 shadow-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: 'Live', label: 'Learning experience' },
                  { value: 'Hands-on', label: 'Practice modules' },
                  { value: 'Career', label: 'Focused outcomes' },
                  { value: 'Expert', label: 'Guided support' },
                ].map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 text-center">
                    <div className="text-3xl font-bold text-[#E8791E]">{item.value}</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-6 inline-flex rounded-full bg-[#FDE7D3] px-3 py-1 text-sm font-semibold text-[#E8791E]">
              What you'll experience
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A]">
              A certification journey built for <span className="text-[#E8791E]">real-world growth</span>
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The course will help learners develop stronger professional presence, sharper communication, and better readiness for interviews and workplace expectations.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Structured modules focused on practical readiness</li>
              <li>• Confidence-building for presentations and interviews</li>
              <li>• Guidance that supports career clarity and momentum</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#0F172A] to-[#12171B] p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]"
          >
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-[#F2A93C]">
              Course highlights
            </div>
            <h3 className="text-2xl font-bold">
              Everything you need to step into <span className="text-[#F2A93C]">your next stage</span>
            </h3>
            <div className="mt-6 space-y-4">
              {courseHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24">
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.22)_0%,transparent_68%)] blur-[10px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Coming soon
          </div>
          <h2 className="max-w-3xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">
            Stay ready. The certification launch is just around the corner.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Be the first to know when the course opens for enrollment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SoftSkills;