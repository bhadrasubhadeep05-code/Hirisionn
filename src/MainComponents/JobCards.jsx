import React from 'react';

const defaultJob = {
  title: 'Product Manager',
  preview: 'Own the product roadmap, collaborate with teams, and drive customer-focused growth in a fast-moving environment.',
  location: 'Bengaluru, India',
  ctc: '₹18 - 22 LPA',
  deadline: '31 Aug 2026',
};

const JobCards = ({ job = defaultJob }) => {
  const { title, preview, location, ctc, deadline } = job;

  return (
    <div className="w-full rounded-[24px] border border-slate-700/40 bg-[linear-gradient(135deg,#112233_0%,#0F172A_45%,#16263A_100%)] p-5 text-white shadow-[0_18px_45px_rgba(2,6,23,0.28)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(2,6,23,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F2A93C]">Open role</p>
          <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-[#F2A93C]/30 bg-[#F2A93C]/10 px-3 py-1 text-xs font-semibold text-[#F2A93C]">
          Active
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{preview}</p>

      <div className="mt-6 space-y-3 border-t border-slate-700/60 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Location</span>
          <span className="font-semibold text-slate-100">{location}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">CTC</span>
          <span className="font-semibold text-slate-100">{ctc}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Apply till</span>
          <span className="font-semibold text-[#F2A93C]">{deadline}</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-full bg-[#E8791E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F2A93C] hover:text-[#0F172A]">
        View details
      </button>
    </div>
  );
};

export default JobCards;