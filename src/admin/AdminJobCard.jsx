import React from 'react';
import { useNavigate } from 'react-router-dom';


const formatDate = (dateStr) => {
  if (!dateStr) return "Rolling";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AdminJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { _id, jobTitle, location, CTC, deadLine, experience, jobType, industries, domain, active } = job;

  return (
    <div className="w-full rounded-[24px] border border-slate-700/40 bg-[linear-gradient(135deg,#112233_0%,#0F172A_45%,#16263A_100%)] p-5 text-white shadow-[0_18px_45px_rgba(2,6,23,0.28)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(2,6,23,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F2A93C]">Open role</p>
          <h3 className="mt-2 text-xl font-bold text-white">{jobTitle}</h3>
        </div>
        <span className="rounded-full border border-[#F2A93C]/30 bg-[#F2A93C]/10 px-3 py-1 text-xs font-semibold text-[#F2A93C]">
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience && (
          <span className="rounded-full border border-slate-600/40 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
            Exp: {experience} yrs
          </span>
        )}
        {jobType && (
          <span className="rounded-full border border-slate-600/40 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
            {jobType}
          </span>
        )}
        {industries && (
          <span className="rounded-full border border-slate-600/40 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
            {industries}
          </span>
        )}
         {domain && (
          <span className="rounded-full border border-slate-600/40 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
            {domain}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-700/60 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Location</span>
          <span className="font-semibold text-slate-100">{location}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">CTC</span>
          <span className="font-semibold text-slate-100">{CTC} LPA</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Apply till</span>
          <span className="font-semibold text-[#F2A93C]">{formatDate(deadLine)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/admin/job/${_id}`)}
        className="mt-6 w-full rounded-full bg-[#E8791E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F2A93C] hover:text-[#0F172A]"
      >
        View details
      </button>
    </div>
  );
};

export default AdminJobCards;