import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import NavBar2 from "./NavBar2";
import Footer from "./Footer";
import { getJobById } from "../services/admin.api";
import {applyJob} from "../services/user.api"

const formatCTC = (ctc) => {
  if (!ctc) return "Not disclosed";
  const num = Number(ctc);
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} LPA`;
  return `₹${num.toLocaleString()}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Rolling";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startLoading, stopLoading, user } = useContext(AppContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = user._id;
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      startLoading();
      try {
        const response = await getJobById(id);
        setJob(response.data || response.job || response);
      } catch (err) {
        console.error("Failed to load job:", err);
        setError("Job not found or unavailable.");
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    fetchJob();
  }, [id]);

  const apply = async () => {
    try {
      const payload = { userId, id };
      const res = await applyJob(payload);
      if (res?.success) {
        alert("Applied Successfully");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong while applying. Please try again.";

      alert(`Failed to apply: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC]">
        <NavBar2 />
        <div className="flex items-center justify-center pt-40">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#E8791E]" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC]">
        <NavBar2 />
        <div className="mx-auto max-w-2xl px-4 pt-40 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]">Job not found</h2>
          <p className="mt-2 text-slate-500">{error || "This listing may have been removed."}</p>
          <button
            onClick={() => navigate("/job-placements")}
            className="mt-6 mr-4 rounded-full bg-[#E8791E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F2A93C]"
          >
            Browse all jobs
          </button>
        </div>
      </div>
    );
  }

  const {
    jobTitle,
    jobDescription,
    CTC,
    deadLine,
    domain,
    eligibility,
    experience,
    industries,
    location,
    jobType,
  } = job;

  const metaCards = [
    { label: "Experience", value: experience || "Not specified" },
    { label: "Location", value: location || "Not specified"},
    { label: "Job Type", value: jobType || "Not specified"},
    { label: "Domain", value: domain || "Not specified"},
    { label: "Industry", value: industries || "Not specified" },
    { label: "CTC", value: `${formatCTC(CTC)} LPA`},
    { label: "Apply by", value: formatDate(deadLine) },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800">
      <NavBar2 />

      {/* Hero Section */}
      <section className="relative mt-24 overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-16 md:py-24">
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/job-placements")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm transition hover:bg-white/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to listings
          </button>
          <div className="mb-4 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
            {jobType || "Open role"}
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">{jobTitle}</h1>
          <p className="mt-3 flex items-center gap-2 text-lg text-slate-300">
            <span>{location}</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#F2A93C] font-semibold">{formatCTC(CTC)}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            {/* Eligibility */}
            {eligibility && (
              <div className="mb-8 rounded-2xl border border-slate-200 bg-blue-50/40 px-5 py-4 md:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Eligibility</p>
                <p className="mt-1.5 font-medium text-slate-800">{eligibility}</p>
              </div>
            )}

            {/* Job Description */}
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">About the role</h2>
              <div className="mt-4 whitespace-pre-line rounded-2xl border border-slate-200 bg-white p-6 text-base leading-7 text-slate-700 shadow-sm md:p-8">
                {jobDescription || "No description provided for this position."}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28 space-y-6">
              {/* Apply Button */}
              <button onClick={()=>apply()} className="w-full rounded-2xl bg-gradient-to-r from-[#E8791E] to-[#F2A93C] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
                Apply now
              </button>

              {/* Job Details Meta Grid */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">Job details</h3>
                <div className="space-y-4">
                  {metaCards.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">{item.label}</p>
                        <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobPage;