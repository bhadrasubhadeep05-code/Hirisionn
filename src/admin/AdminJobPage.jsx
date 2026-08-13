import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars -- motion is used extensively in JSX below
import { motion, AnimatePresence } from "framer-motion";
import { deleteJob, getApplicants, jobActiveToggel, stateController, updateJob } from "../services/admin.api";

/* ------------------------------------------------------------------ */
/*  Variants – spring physics for premium, fluid micro-interactions    */
/* ------------------------------------------------------------------ */
const pageContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const applicantCard = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const formatDate = (dateStr) => {
  if (!dateStr) return "Rolling";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDeadlineStatus = (deadLine) => {
  if (!deadLine) return { label: "Rolling", color: "text-emerald-400" };
  const daysLeft = Math.ceil((new Date(deadLine) - new Date()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return { label: "Expired", color: "text-rose-400" };
  if (daysLeft <= 7) return { label: `${daysLeft} days left`, color: "text-amber-400" };
  return { label: `${daysLeft} days left`, color: "text-emerald-400" };
};

const statusMeta = {
  Applied: {
    label: "Applied",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    dot: "bg-sky-400",
  },
  Selected: {
    label: "Selected",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Rejected: {
    label: "Rejected",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    dot: "bg-rose-400",
  },
  default: {
    label: "Not Applied",
    badge: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    dot: "bg-slate-400",
  },
};

const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ------------------------------------------------------------------ */
/*  Shared field options – reused by the Edit-job modal                */
/* ------------------------------------------------------------------ */
const editIndustryOptions = [
  "Information Technology",
  "Finance & Banking",
  "Healthcare & Pharma",
  "Education & EdTech",
  "Manufacturing",
  "Retail & E-Commerce",
  "Consulting",
  "Media & Entertainment",
  "Real Estate & Construction",
  "Logistics & Supply Chain",
  "Energy & Utilities",
  "Telecommunications",
  "Automotive",
  "FMCG",
  "Aerospace & Defense",
];

const editDomainOptions = [
  "Software Development",
  "Data Science & AI",
  "Cloud & DevOps",
  "Cybersecurity",
  "Product Management",
  "UI/UX Design",
  "Digital Marketing",
  "Sales & Business Development",
  "Human Resources",
  "Finance & Accounting",
  "Operations",
  "Customer Support",
  "Legal & Compliance",
  "Research & Development",
  "Content & Communications",
];

const editJobTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Remote",
  "Hybrid",
  "On-site",
];

const editEligibilityOptions = [
  "Bachelor's Degree (B.E/B.Tech/B.Sc/BCA)",
  "Master's Degree (M.E/M.Tech/M.Sc/MCA)",
  "MBA / PGDM",
  "Any Graduate",
  "Any Post Graduate",
  "Diploma Holders",
  "12th Pass",
  "Freshers (0-1 Years)",
  "Experienced Professionals",
];

const editExperienceOptions = ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12"];

// Fields rendered as a dropdown with a "Custom / Other" fallback.
const editSelectFields = {
  industries: editIndustryOptions,
  domain: editDomainOptions,
  jobType: editJobTypeOptions,
  eligibility: editEligibilityOptions,
  experience: editExperienceOptions,
};

// Convert a stored date to the yyyy-mm-dd format expected by <input type="date">.
const toDateInputValue = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/* ------------------------------------------------------------------ */
/*  Left Panel – Job Details                                           */
/* ------------------------------------------------------------------ */
const JobDetailsPanel = ({ job, loading, active, onToggleActive, toggling, onBack, onDelete, deleting, onEdit }) => {
  const deadline = formatDeadlineStatus(job?.deadLine);

  if (loading) {
    return (
      <motion.div
        variants={fadeUp}
        className="rounded-[24px] border border-slate-700/40 bg-[linear-gradient(135deg,#16263A_0%,#0F172A_55%,#112233_100%)] p-7 text-white shadow-[0_18px_45px_rgba(2,6,23,0.3)]"
      >
        <div className="space-y-4">
          <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-700/60" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-700/40" />
          <div className="h-32 animate-pulse rounded-xl bg-slate-700/30" />
          <div className="h-10 animate-pulse rounded-full bg-slate-700/30" />
        </div>
      </motion.div>
    );
  }

  if (!job) return null;

  const detailRows = [
    { label: "Location", value: job.location, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "CTC", value: `${job.CTC} LPA`, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Job Type", value: job.jobType, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Industry", value: job.industries, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { label: "Domain", value: job.domain, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Experience", value: `${job.experience} yrs`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Eligibility", value: job.eligibility, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  ];

  return (
    <motion.div
      variants={fadeUp}
      className="sticky top-24 rounded-[24px] border border-slate-700/40 bg-[linear-gradient(135deg,#16263A_0%,#0F172A_55%,#112233_100%)] p-7 text-white shadow-[0_18px_45px_rgba(2,6,23,0.3)]"
    >
      {/* Back button */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-800/40 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-[#F2A93C]/50 hover:text-[#F2A93C]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to jobs
        </button>

        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-[#F2A93C]/40 bg-[#F2A93C]/10 px-4 py-1.5 text-xs font-semibold text-[#F2A93C] transition hover:border-[#F2A93C]/70 hover:bg-[#F2A93C]/20"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit job
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300 transition hover:border-rose-400/60 hover:bg-rose-500/20 disabled:cursor-wait disabled:opacity-60"
        >
          {deleting ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4" />
            </svg>
          )}
          {deleting ? "Deleting..." : "Delete job"}
        </button>
      </div>

      {/* Active toggle */}
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-700/40 bg-slate-900/50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">Job Status</p>
          <p className={`text-xs font-medium ${active ? "text-emerald-400" : "text-rose-400"}`}>
            {active ? "Active – accepting applications" : "Inactive – applications closed"}
          </p>
        </div>

        <button
          onClick={onToggleActive}
          disabled={toggling}
          aria-pressed={active}
          aria-label="Toggle job active status"
          className={`relative h-8 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#F2A93C]/50 focus:ring-offset-2 focus:ring-offset-[#0F172A] ${
            active ? "bg-emerald-500/80" : "bg-slate-600/60"
          } ${toggling ? "cursor-wait opacity-60" : "cursor-pointer"}`}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ${
              active ? "right-1" : "left-1"
            }`}
          >
            {toggling ? (
              <svg className="h-3.5 w-3.5 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : active ? (
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.span>
        </button>
      </div>

      {/* Title */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F2A93C]">Open role</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight">{job.jobTitle}</h2>
        </div>
        <span className={`mt-1 shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${active ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-slate-600/40 bg-slate-800/50 text-slate-400"}`}>
          {active ? "Open" : "Closed"}
        </span>
      </div>

      {/* Deadline */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-700/40 bg-slate-900/40 px-4 py-3">
        <svg className={`h-5 w-5 ${deadline.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm text-slate-400">Apply by</span>
        <span className="ml-auto text-sm font-semibold text-white">{formatDate(job.deadLine)}</span>
        <span className={`text-xs font-bold ${deadline.color}`}>({deadline.label})</span>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">Description</h3>
        <p className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4 text-sm leading-relaxed text-slate-300">
          {job.jobDescription}
        </p>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-2.5">
        {detailRows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 text-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700/40 bg-slate-800/50 text-[#F2A93C]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={row.icon} />
              </svg>
            </span>
            <span className="text-slate-400">{row.label}</span>
            <span className="ml-auto text-right font-semibold text-slate-100">{row.value}</span>
          </div>
        ))}
        {job.formLink && (
          <div key="formLink" className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">Form Link</span>
            <a href={job.formLink} 
              target="_blank" 
              rel="noopener noreferrer" className="ml-auto text-right font-semibold text-slate-100">click me</a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Right Panel – Applicant Cards                                      */
/* ------------------------------------------------------------------ */
const ApplicantCard = ({ applicant, onStatusChange, updating }) => {
  const meta = statusMeta[applicant.status] || statusMeta.default;

  const handleStatusChange = (e) => {
    const nextState = e.target.value;
    if (nextState === applicant.status) return;
    onStatusChange(applicant.userId, nextState, applicant.fullName);
  };

  return (
    <motion.div
      variants={applicantCard}
      layout
      className="group rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_45px_rgba(15,23,42,0.12)]"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0F172A_0%,#1E3A5F_100%)] text-sm font-bold text-white ring-2 ring-[#F2A93C]/30">
            {initials(applicant.fullName)}
          </div>
          <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${meta.dot}`} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-bold text-[#0F172A]">{applicant.fullName}</h4>
          <p className="mt-0.5 truncate text-sm text-slate-500">{applicant.email}</p>
          <p className="mt-0.5 text-sm font-medium text-slate-600">{applicant.phoneNo}</p>
        </div>

        {/* Status badge */}
        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${meta.badge}`}>
          {meta.label}
        </span>
      </div>

      {/* Status control */}
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <label htmlFor={`status-${applicant.userId}`} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Status
        </label>
        <div className="relative flex-1">
          <select
            id={`status-${applicant.userId}`}
            value={applicant.status}
            onChange={handleStatusChange}
            disabled={updating}
            className={`w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 disabled:cursor-wait disabled:opacity-60 ${
              applicant.status === "Selected"
                ? "border-emerald-500/40 text-emerald-700 focus:ring-emerald-500/30"
                : applicant.status === "Rejected"
                ? "border-rose-500/40 text-rose-700 focus:ring-rose-500/30"
                : "border-slate-200 text-slate-700 focus:ring-[#F2A93C]/40"
            }`}
          >
            <option value="Applied">Applied</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {updating && (
          <svg className="h-5 w-5 shrink-0 animate-spin text-[#F2A93C]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Edit Job Modal                                                     */
/* ------------------------------------------------------------------ */
const EditJobModal = ({ job, saving, onSave, onClose }) => {
  // Pre-fill the form from the current job. Option-backed fields fall back to
  // a "Custom / Other" input when the stored value isn't one of the presets.
  const buildInitialState = (currentJob) => {
    const formData = {
      jobTitle: currentJob?.jobTitle || "",
      jobDescription: currentJob?.jobDescription || "",
      CTC: currentJob?.CTC ?? "",
      deadLine: toDateInputValue(currentJob?.deadLine),
      location: currentJob?.location || "",
      active: currentJob?.active ?? true,
       formLink: currentJob?.formLink || "",
    };
    const customValues = {};
    const showCustomInput = {};

    Object.entries(editSelectFields).forEach(([name, options]) => {
      const value = currentJob?.[name];
      if (options.includes(value)) {
        formData[name] = value;
        customValues[name] = "";
        showCustomInput[name] = false;
      } else {
        formData[name] = "";
        customValues[name] = value || "";
        showCustomInput[name] = true;
      }
    });

    return { formData, customValues, showCustomInput };
  };

  const [state, setState] = useState(() => buildInitialState(job));
  const { formData, customValues, showCustomInput } = state;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (value === "__custom__") {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, [name]: "" },
        customValues: { ...prev.customValues, [name]: "" },
        showCustomInput: { ...prev.showCustomInput, [name]: true },
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      customValues: { ...prev.customValues, [name]: "" },
      showCustomInput: { ...prev.showCustomInput, [name]: false },
    }));
  };

  const handleCustomInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      customValues: { ...prev.customValues, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saving) return;

    onSave({
      jobTitle: formData.jobTitle.trim(),
      jobDescription: formData.jobDescription.trim(),
      CTC: String(formData.CTC).trim(),
      deadLine: formData.deadLine,
      industries: showCustomInput.industries
        ? customValues.industries.trim()
        : formData.industries,
      location: formData.location.trim(),
      domain: showCustomInput.domain
        ? customValues.domain.trim()
        : formData.domain,
      jobType: showCustomInput.jobType
        ? customValues.jobType.trim()
        : formData.jobType,
      eligibility: showCustomInput.eligibility
        ? customValues.eligibility.trim()
        : formData.eligibility,
      experience: showCustomInput.experience
        ? customValues.experience.trim()
        : formData.experience,
      active: formData.active,
      formLink: formData.formLink,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F2A93C] focus:border-transparent focus:bg-white shadow-sm";
  const selectClass =
    "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F2A93C] focus:border-transparent focus:bg-white shadow-sm appearance-none cursor-pointer";
  const labelClass =
    "block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1";

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Edit job post"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-2xl rounded-[24px] border border-slate-700/40 bg-[#F8FAFC] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.5)] sm:p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8791E]">
              Admin
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A]">
              Edit job post
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Update details for{" "}
              <span className="font-semibold text-[#0F172A]">
                {job?.jobTitle}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Title & CTC */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Software Engineer"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>CTC (LPA)</label>
              <input
                type="text"
                name="CTC"
                value={formData.CTC}
                onChange={handleChange}
                required
                placeholder="e.g. 8"
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className={labelClass}>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the role, responsibilities and expectations…"
              className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1 h-[300px] w-[600px]"
            />
          </div>

          {/* Location & Deadline */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. Bengaluru"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Apply Deadline</label>
              <input
                type="date"
                name="deadLine"
                value={formData.deadLine}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Select fields with custom fallback */}
          {Object.entries(editSelectFields).map(([name, options]) => (
            <div key={name} className="space-y-2">
              <label className={labelClass}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleSelectChange}
                className={selectClass}
              >
                <option value="">-- Select {name} --</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="__custom__">Custom / Other</option>
              </select>
              {showCustomInput[name] && (
                <input
                  type="text"
                  name={name}
                  value={customValues[name]}
                  onChange={handleCustomInputChange}
                  placeholder={`Enter your desired ${name}`}
                  className={`${inputClass} mt-3`}
                />
              )}
            </div>
          ))}
           <div className="space-y-2">
              <label className={labelClass}>form link</label>
              <input
                type="url"
                name="formLink"
                value={formData.formLink}
                onChange={handleChange}
                placeholder="e.g. https://......"
                className={inputClass}
              />
            </div>

          {/* Active toggle */}
          <div
            className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white/60 px-5 py-4 shadow-sm transition hover:border-[#F2A93C]/40"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                formData: { ...prev.formData, active: !prev.formData.active },
              }))
            }
          >
            <div>
              <p className="text-sm font-bold text-[#0F172A]">Active Posting</p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                Toggle off to close applications
              </p>
            </div>
            <div
              aria-pressed={formData.active}
              className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ${
                formData.active ? "bg-emerald-500/80" : "bg-slate-300"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ${
                  formData.active ? "right-1" : "left-1"
                }`}
              >
                {formData.active ? (
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              className="flex-1 rounded-2xl bg-[#0F172A] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0F172A]/20 transition hover:bg-[#E8791E] hover:text-white disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving…
                </span>
              ) : (
                "Save changes"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};


/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
const AdminJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(false);
  const [deletingJob, setDeletingJob] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  /* Load applicants – used for status-change refresh & manual retry */
  const refreshApplicants = async () => {
    try {
      setError(null);
      const res = await getApplicants(id);
      // getApplicants returns the raw axios response, so data lives at res.data
      setApplicants(res.data?.data || []);
      setJobData(res.data?.jobData || null);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setError(err.response?.data?.message || "Failed to load job applicants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await getApplicants(id);
        if (!cancelled) {
          setApplicants(res.data?.data || []);
          setJobData(res.data?.jobData || null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching applicants:", err);
          setError(err.response?.data?.message || "Failed to load job applicants. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* Show a toast notification ------------------------------------------------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  /* Delete the job posting ------------------------------------------------------ */
  const handleDeleteJob = async () => {
    if (!jobData || deletingJob) return;

    const confirmed = window.confirm(`Delete the job "${jobData.jobTitle}"? This action cannot be undone.`);
    if (!confirmed) return;

    setDeletingJob(true);
    try {
      await deleteJob(jobData._id);
      showToast("Job deleted successfully", "success");
      navigate("/admin/jobs");
    } catch (err) {
      console.error("Error deleting job:", err);
      showToast(err.response?.data?.message || "Failed to delete job", "error");
    } finally {
      setDeletingJob(false);
    }
  };

  /* Toggle job active field ---------------------------------------------------- */
  const handleToggleActive = async () => {
    if (!jobData || toggling) return;
    setToggling(true);
    try {
      const nextState = !jobData.active;
      await jobActiveToggel({ id: jobData._id, state: nextState });
      setJobData((prev) => (prev ? { ...prev, active: nextState } : prev));
      showToast(`Job is now ${nextState ? "Active" : "Inactive"}`, "success");
    } catch (err) {
      console.error("Error toggling job:", err);
      showToast(err.response?.data?.message || "Failed to toggle job status", "error");
    } finally {
      setToggling(false);
    }
  };

  /* Update applicant status ------------------------------------------------------ */
  const handleUpdateJob = async (payload) => {
    if (!jobData || saving) return;
    setSaving(true);
    try {
      await updateJob(jobData._id, payload);
      showToast("Job updated successfully", "success");
      setEditing(false);
      await refreshApplicants();
    } catch (err) {
      console.error("Error updating job:", err);
      showToast(err.response?.data?.message || "Failed to update job", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (userId, state, fullName) => {
    setUpdatingId(userId);
    try {
      const res = await stateController({ id: userId, jobId: jobData?._id || id, state });
      console.log("State update response:", res);
      showToast(`${fullName} marked as ${state}`, "success");

      // Refresh to get the latest statuses from the server
      await refreshApplicants();
    } catch (err) {
      console.error("Error updating status:", err);
      showToast(err.response?.data?.message || `Failed to update ${fullName}'s status`, "error");

      // Revert the optimistic UI by re-fetching
      await refreshApplicants();
    } finally {
      setUpdatingId(null);
    }
  };

  /* Filtering --------------------------------------------------------------------- */
  const filteredApplicants = applicants.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const counts = {
    all: applicants.length,
    Applied: applicants.filter((a) => a.status === "Applied").length,
    Selected: applicants.filter((a) => a.status === "Selected").length,
    Rejected: applicants.filter((a) => a.status === "Rejected").length,
  };

  const filterTabs = [
    { key: "all", label: "All", color: "text-slate-600" },
    { key: "Applied", label: "Applied", color: "text-sky-500" },
    { key: "Selected", label: "Selected", color: "text-emerald-500" },
    { key: "Rejected", label: "Rejected", color: "text-rose-500" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageContainer}
      className="min-h-screen bg-[#F8FAFC] p-8 pt-24"
    >
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl ${
              toast.type === "error"
                ? "bg-rose-600 text-white"
                : "bg-[#0F172A] text-white"
            }`}
          >
            {toast.type === "error" ? (
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className="text-sm font-semibold">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-[#F2A93C]/50 hover:text-[#E8791E]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all jobs
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Job Applicants
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-500">
            {jobData
              ? `${jobData.jobTitle} — manage candidates & job status`
              : "Manage your job posting and its applicants"}
          </p>
        </motion.div>

        {/* Error state */}
        {error && !loading && (
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center rounded-[24px] border border-rose-200 bg-rose-50 px-8 py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-rose-700">Something went wrong</h2>
            <p className="mt-2 max-w-md text-sm text-rose-600">{error}</p>
            <button
              onClick={refreshApplicants}
              className="mt-6 rounded-full bg-[#E8791E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F2A93C] hover:text-[#0F172A]"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(360px,420px)_1fr]">
          {/* Left – Job Details */}
          <JobDetailsPanel
            job={jobData}
            loading={loading}
            active={jobData?.active}
            onToggleActive={handleToggleActive}
            toggling={toggling}
            onBack={() => navigate("/admin/jobs")}
            onDelete={handleDeleteJob}
            deleting={deletingJob}
            onEdit={() => setEditing(true)}
          />

          {/* Right – Applicants */}
          <motion.div variants={fadeUp} className="min-w-0">
            {/* Stats row */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {filterTabs.map((tab, idx) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 + idx * 0.05 }}
                  className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    filter === tab.key
                      ? "border-[#F2A93C] bg-[#0F172A] text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <p className={`text-2xl font-extrabold ${filter === tab.key ? "text-[#F2A93C]" : tab.color}`}>
                    {counts[tab.key] ?? 0}
                  </p>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${filter === tab.key ? "text-slate-300" : "text-slate-500"}`}>
                    {tab.label}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Applicant cards */}
            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
                        <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-100" />
                      </div>
                    </div>
                    <div className="mt-5 h-10 animate-pulse rounded-xl bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : filteredApplicants.length === 0 ? (
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-white/60 px-8 py-24 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-700">
                  {filter === "all" ? "No applicants yet" : `No ${filter} applicants`}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {filter === "all"
                    ? "Candidates who apply to this job will appear here."
                    : "Try selecting a different status filter."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={cardStagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <AnimatePresence mode="popLayout">
                  {filteredApplicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.userId}
                      applicant={applicant}
                      onStatusChange={handleStatusChange}
                      updating={updatingId === applicant.userId}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Job Modal */}
      <AnimatePresence>
        {editing && jobData && (
          <EditJobModal
            job={jobData}
            saving={saving}
            onSave={handleUpdateJob}
            onClose={() => setEditing(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminJobPage;