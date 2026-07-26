import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import NavBar2 from './NavBar2'


const stats = [
  { value: '60M+', label: 'Enterprises' },
  { value: '3M+', label: 'Formal companies' },
  { value: '100%', label: 'Career-led support' },
  { value: '1', label: 'Right match' },
]

const ManPower = () => {
  const { ProfileComplete } = useContext(AppContext)
  const navigate = useNavigate()

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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Where Ambition Meets Opportunity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-[#AAB5BA]"
          >
            Hirisionn helps people and organizations connect with purpose, speed, and confidence in a market filled with possibility.
          </motion.p>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mx-auto w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
          />

        
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
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#E8791E]">Opportunity landscape</p>
            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">
              Built for the scale of modern careers
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              India is home to a vast and growing talent ecosystem, but opportunity still needs direction, presentation, and access.
            </p>
            <p className="text-lg leading-8 text-slate-600">
              We turn that scale into a more personal, more meaningful match between people and the roles they are meant to grow into.
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
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 text-center">
                    <div className="text-3xl font-bold text-[#E8791E]">{stat.value}</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.25em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <section id="connect" className="mt-20 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-6 inline-flex rounded-full bg-[#FDE7D3] px-3 py-1 text-sm font-semibold text-[#E8791E]">
              For professionals
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A]">
              Build momentum with <span className="text-[#E8791E]">the right match</span>
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Unlock opportunities faster with guidance that understands your ambition and helps you stand out with confidence.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Career-driven positioning and support</li>
              <li>• Access to roles aligned with your growth</li>
              <li>• A stronger path from application to onboarding</li>
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
              For organizations
            </div>
            <h3 className="text-2xl font-bold">
              Find talent that fits your <span className="text-[#F2A93C]">future</span>
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Bring in people who are ready to contribute, grow, and make an impact with your team.
            </p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>• Skilled candidates aligned to your needs</li>
              <li>• Flexible staffing and permanent hiring support</li>
              <li>• Stronger hiring outcomes with less friction</li>
            </ul>
          </motion.div>
        </section>
      </div>

      <section className="relative flex min-h-[450px] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24">
        
       
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.22)_0%,transparent_68%)] blur-[10px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 className="max-w-3xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">
            Take one confident step closer to your next breakthrough.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            The right opportunity is waiting. Let’s make the connection.
          </p>
        </div>
      </section>
    </div>
  )
}

export default ManPower