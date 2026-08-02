import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../MainComponents/NavBar2";
import Footer from "../MainComponents/Footer";
import { createJob } from "../services/admin.api";

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    CTC: "",
    deadLine: "",
    industries: "",
    location: "",
    domain: "",
    jobType: "",
    eligibility: "",
    experience: "",
    active: true,
  });

  // Dropdown option constants
  const industryOptions = [
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

  const domainOptions = [
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

  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Remote",
    "Hybrid",
    "On-site",
  ];

  const eligibilityOptions = [
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

  const experienceOptions = [
   "0-2", "2-4", "4-6", "6-8", "8-10", "10-12"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const jobPayload = {
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        CTC: Number(formData.CTC),
        deadLine: formData.deadLine,
        industries: formData.industries,
        location: formData.location,
        domain: formData.domain,
        jobType: formData.jobType,
        eligibility: formData.eligibility,
        experience: formData.experience,
        active: formData.active,
      };

      await createJob(jobPayload);

      alert("Job post created successfully!");

      // Reset form
      setFormData({
        jobTitle: "",
        jobDescription: "",
        CTC: "",
        deadLine: "",
        industries: "",
        location: "",
        domain: "",
        jobType: "",
        eligibility: "",
        experience: "",
        active: true,
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create job post");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm";
  const selectClass =
    "w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm appearance-none cursor-pointer";
  const labelClass =
    "block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1";

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />

      <main className="flex-grow relative flex items-start justify-center px-4 py-20 mt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Create Job Post
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              Post a new opening to attract top talent.
            </p>
          </motion.div>

          {/* Glass Form Card */}
          <motion.div
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#818CF8] rounded-t-[3rem]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  minLength={5}
                  maxLength={150}
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  className={inputClass}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className={labelClass}>Job Description</label>
                <textarea
                  name="jobDescription"
                  required
                  rows={6}
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting…"
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {/* CTC & Deadline — 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>CTC (in LPA)</label>
                  <input
                    type="number"
                    name="CTC"
                    required
                    min={0}
                    step="0.01"
                    value={formData.CTC}
                    onChange={handleChange}
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Application Deadline</label>
                  <input
                    type="date"
                    name="deadLine"
                    required
                    value={formData.deadLine}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  />
                </div>
              </div>

              {/* Industry & Location — 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Industry</label>
                  <select
                    name="industries"
                    required
                    value={formData.industries}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">-- Select industry --</option>
                    {industryOptions.map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, India / Remote"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Domain & Job Type — 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Domain</label>
                  <select
                    name="domain"
                    required
                    value={formData.domain}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">-- Select domain --</option>
                    {domainOptions.map((domain, index) => (
                      <option key={index} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Job Type</label>
                  <select
                    name="jobType"
                    required
                    value={formData.jobType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">-- Select job type --</option>
                    {jobTypeOptions.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Eligibility & Experience — 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>Eligibility</label>
                  <select
                    name="eligibility"
                    required
                    value={formData.eligibility}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">-- Select eligibility --</option>
                    {eligibilityOptions.map((eligibility, index) => (
                      <option key={index} value={eligibility}>
                        {eligibility}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Experience Required</label>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">-- Select experience --</option>
                    {experienceOptions.map((experience, index) => (
                      <option key={index} value={experience}>
                        {experience}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="space-y-2">
                <div
                  className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 hover:border-[#818CF8]/40"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      active: !prev.active,
                    }))
                  }
                >
                  <div>
                    <p className="font-bold text-[#0F172A]">Active Posting</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Toggle off to save as inactive draft
                    </p>
                  </div>

                  {/* Custom Toggle Switch */}
                  <div
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      formData.active ? "bg-[#818CF8]" : "bg-slate-300"
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                      animate={{ left: formData.active ? "calc(100% - 1.75rem)" : "0.25rem" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex-1 py-4 rounded-2xl font-bold text-lg text-slate-600 bg-white/70 border border-slate-200 transition-all duration-300"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex-1 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#818CF8] to-[#6366F1] transition-all duration-300 shadow-xl shadow-[#818CF8]/20 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">
                    {loading ? "Creating Job..." : "Create Job Post"}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateJob;