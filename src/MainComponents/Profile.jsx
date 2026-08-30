import React, { useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import Footer from "./Footer";
import { updateUser, logout } from "../services/user.api";
import AppContext from "../context/AppContext";

const Profile = () => {
  const { user, fetchUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    experienceLevel: "",
    job: "",
    employer: "",
    currentCTC: "",
    course: "",
    domain: "",
    education: "",
    linkedin: "",
    resume: null,
  });

  // Load user data into form when user context changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",

        experienceLevel: user.profile?.experienceLevel || "",
        job: user.profile?.job || "",
        employer: user.profile?.employer || "",
        currentCTC: user.profile?.currentCTC || "",
        course: user.profile?.course || "",
        domain: user.profile?.domain || "",
        education: user.profile?.education || "",
        linkedin: user.profile?.linkedin || "",

        resume: null,
      });
    }
  }, [user]);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const selectedFile = files[0];

      // Validate that file is PDF only
      if (selectedFile) {
        const isValidPDF = selectedFile.type === "application/pdf";

        if (!isValidPDF) {
          setError(
            "Only PDF files are allowed for resume. Please upload a valid PDF document.",
          );
          // Reset file input
          e.target.value = "";
          return;
        }
      }

      setFormData((prev) => ({ ...prev, [name]: selectedFile }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (error) setError("");
    if (success) setSuccess("");
  };

  const getJobStatusBadge = (status = "") => {
    const normalizedStatus = String(status || "")
      .trim()
      .toLowerCase();

    if (normalizedStatus === "shortlisted" || normalizedStatus === "sortlisted") {
      return {
        className: "bg-amber-100 text-amber-700",
        label: "⭐ Shortlisted",
      };
    }

    if (normalizedStatus === "selected") {
      return {
        className: "bg-emerald-100 text-emerald-700",
        label: "✅ Selected",
      };
    }

    if (normalizedStatus === "rejected") {
      return {
        className: "bg-red-100 text-red-700",
        label: "❌ Rejected",
      };
    }

    return {
      className: "bg-blue-100 text-blue-700",
      label: "📝 Applied",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitted(true);

      const data = {
        experienceLevel: formData.experienceLevel,
        job: formData.job,
        employer: formData.employer,
        currentCTC: formData.currentCTC,
        course: formData.course,
        domain: formData.domain,
        education: formData.education,
        linkedin: formData.linkedin,
      };

      // Add resume if selected
      if (formData.resume) {
        data.resume = await toBase64(formData.resume);
      }

      await updateUser(data);

      // Refresh user data
      await fetchUser();

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      // Show actual error message from backend if available
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-12%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12)_0%,transparent_70%)] blur-3xl" />
      </div>

      <NavBar2 progress={1} />

      <main className="flex-grow relative flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20 mt-14 sm:mt-20">
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center rounded-full border border-[#E8791E]/20 bg-[#E8791E]/10 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#E8791E] mb-5">
              My Profile
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A]">
                Manage Your Journey
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              View and manage your account details with clarity.
            </p>
          </motion.div>

          <motion.div
            className="backdrop-blur-2xl bg-white/80 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/70 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.25)] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F2A93C] via-[#E8791E] to-[#F2A93C] rounded-t-[3rem]" />

            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-2xl bg-[#0F172A] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-[#1e293b]"
              >
                {isEditing ? "✕ Cancel Edit" : "✏️ Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-4 sm:p-5">
                <h3 className="mb-4 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0F172A]">
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5 space-y-4 sm:space-y-5">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0F172A]">
                  Professional Background
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    >
                      <option value="">Select Level</option>
                      <option value="Fresher">Fresher (0-1 yrs)</option>
                      <option value="Junior">Junior (1-3 yrs)</option>
                      <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                      <option value="Senior">Senior (5+ yrs)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Current Role
                    </label>
                    <input
                      type="text"
                      name="job"
                      placeholder="e.g. Software Engineer"
                      value={formData.job}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Employer / Organization
                    </label>
                    <input
                      type="text"
                      name="employer"
                      placeholder="e.g. Tech Corp"
                      value={formData.employer}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Current CTC
                    </label>
                    <input
                      type="text"
                      name="currentCTC"
                      placeholder="e.g. ₹6,00,000 / annum"
                      value={formData.currentCTC}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5 space-y-4 sm:space-y-5">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0F172A]">
                  Education & Domain
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Highest Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      placeholder="e.g. B.Tech Computer Science"
                      value={formData.education}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Course / Specialization
                    </label>
                    <input
                      type="text"
                      name="course"
                      placeholder="e.g. Full Stack Web Development"
                      value={formData.course}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Industry Domain
                    </label>
                    <input
                      type="text"
                      name="domain"
                      placeholder="e.g. IT, FinTech, EdTech"
                      value={formData.domain}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5 space-y-4 sm:space-y-5">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0F172A]">
                  Links & Documents
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://www.linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Resume (PDF Only)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,application/pdf"
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full rounded-2xl border border-dashed border-slate-300 bg-[#F8FAFC] px-4 sm:px-5 py-3.5 sm:py-4 font-medium text-[#0F172A] transition-all duration-300 file:mr-4 file:rounded-xl file:border-0 file:bg-[#E8791E] file:px-3 sm:file:px-4 file:py-1.5 sm:file:py-2 file:font-semibold file:text-white hover:file:bg-[#F2A93C] focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 text-xs sm:text-sm"
                      />
                    </div>
                    {user?.profile?.resume?.url && !formData.resume && (
                      <p className="ml-1 text-xs text-slate-500">
                        Current Resume:{" "}
                        <a
                          href={user.profile.resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#E8791E] hover:underline break-all"
                        >
                          View Uploaded Resume
                        </a>
                      </p>
                    )}
                    {formData.resume && (
                      <p className="ml-1 text-xs text-emerald-600 font-semibold break-all">
                        Selected: {formData.resume.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-rose-500 text-xs sm:text-sm font-semibold text-center"
                  >
                    {error}
                  </motion.p>
                )}
                {success && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-emerald-600 text-xs sm:text-sm font-semibold text-center"
                  >
                    {success}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isEditing && (
                  <motion.button
                    key="saveButton"
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full rounded-2xl bg-[#0F172A] py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300"
                    disabled={submitted}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">
                      {submitted
                        ? "✓ Saving Changes..."
                        : "Save Profile Changes"}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8 space-y-4 sm:space-y-5">
              {/* Internship Applications */}
              {user?.internshipInterests &&
                Array.isArray(user.internshipInterests) &&
                user.internshipInterests.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl sm:rounded-[2rem] border border-white/50 bg-white/70 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#818CF8] to-[#6366F1]">
                        <span className="text-base sm:text-lg">🎓</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A]">
                          Internship Applications
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {user.internshipInterests.length} Application
                          {user.internshipInterests.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.internshipInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-xl border border-[#818CF8]/20 bg-[#818CF8]/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#4F46E5] break-words"
                        >
                          {interest.category || (typeof interest === 'string' ? interest : JSON.stringify(interest))}
                          {interest.status && interest.status !== "Not Applied" && (
                            <span className="ml-1.5 text-xs opacity-75 font-normal">
                              ({interest.status})
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* Job Applications */}
              {user?.jobPlacement?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl sm:rounded-[2rem] border border-white/50 bg-white/70 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4]">
                      <span className="text-base sm:text-lg">💼</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A]">
                        Job Applications
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {user.jobPlacement.length} Application
                        {user.jobPlacement.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {user.jobPlacement.map((job) => {
                      const jobStatusBadge = getJobStatusBadge(job.status);

                      return (
                        <div
                          onClick={() => navigate(`/job/${job.jobId}`)}
                          key={job._id || job.jobId}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:shadow-md hover:border-[#22D3EE]/50 hover:cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-semibold text-slate-800 break-words line-clamp-2">
                              {job.jobTitle || "Job Position"}
                            </h4>

                            <p className="text-xs text-slate-400 mt-1 truncate">
                              Job ID: {String(job.jobId)}
                            </p>
                          </div>

                          <span
                            className={`self-start sm:self-auto shrink-0 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold whitespace-nowrap ${jobStatusBadge.className}`}
                          >
                            {jobStatusBadge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Live Project */}
              {user?.liveProject && user.liveProject.applied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-2xl sm:rounded-[2rem] border border-white/50 bg-white/70 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6]">
                        <span className="text-base sm:text-lg">🚀</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A]">
                          Live Project
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500 truncate">
                          Real Industry Project Access
                        </p>
                      </div>
                    </div>
                    <span
                      className={`self-start sm:self-auto shrink-0 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold whitespace-nowrap ${
                        user.liveProject.status?.toLowerCase() === "fulfilled"
                          ? "bg-emerald-100 text-emerald-700"
                          : user.liveProject.status?.toLowerCase() === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.liveProject.status?.toLowerCase() === "fulfilled"
                        ? "✅ Fulfilled"
                        : user.liveProject.status?.toLowerCase() === "pending"
                          ? "⏳ Pending"
                          : "📝 Applied"}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Soft Skill Program */}
              {user?.softSkill && user.softSkill.applied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-2xl sm:rounded-[2rem] border border-white/50 bg-white/70 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#34D399] to-[#10B981]">
                        <span className="text-base sm:text-lg">⭐</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A]">
                          Soft Skill Program
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500 truncate">
                          Personality Development Program
                        </p>
                      </div>
                    </div>
                    <span
                      className={`self-start sm:self-auto shrink-0 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold whitespace-nowrap ${
                        user.softSkill.status?.toLowerCase() === "fulfilled"
                          ? "bg-emerald-100 text-emerald-700"
                          : user.softSkill.status?.toLowerCase() === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.softSkill.status?.toLowerCase() === "fulfilled"
                        ? "✅ Fulfilled"
                        : user.softSkill.status?.toLowerCase() === "pending"
                          ? "⏳ Pending"
                          : "📝 Applied"}
                    </span>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <motion.button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl shadow-red-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
