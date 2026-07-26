import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import NavBar2 from './NavBar2';
import JobCards from './JobCards';
const Placements = () => {
  const { ProfileComplete } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-slate-800">
      <NavBar2 progress={1} />

      <section className="relative mt-24 flex min-h-[60vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24">
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Job postings • coming soon
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Discover the next step in your career
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            A refined space for fresh opportunities, curated roles, and career-ready pathways that are being prepared for launch.
          </p>

          <div className="mx-auto h-16 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#E8791E]">Explore roles</p>
              <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">Choose the kind of opportunity you’re looking for</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We’re preparing a curated list of roles across industries and experience levels. For now, browse the filters below and stay tuned for launch.
              </p>
            </div>

            <div className="w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-5">
        

          
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[#E8791E]/40 bg-[#FFF7ED] px-8 py-16 text-center">
            <h3 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Coming soon</h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Our job listings are being prepared for launch. Once live, this section will become your gateway to the latest openings.
            </p>
            {/* <JobCards /> */}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24">
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.22)_0%,transparent_68%)] blur-[10px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 className="max-w-3xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">
            Stay ready. Fresh opportunities are on the way.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            When the listings go live, this page will become your direct gateway to the next role.
          </p>
          <button
            onClick={() => (ProfileComplete ? navigate('/profile') : navigate('/register'))}
            className="mt-8 rounded-full bg-[#E8791E] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#F2A93C]"
          >
            {ProfileComplete ? 'Go to profile' : 'Register now'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Placements;