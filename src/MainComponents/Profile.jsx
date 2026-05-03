import React, { useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { updateUser } from '../services/user.api';
import AppContext from '../context/AppContext';

const Profile = () => {
  const { user, fetchUser, setToken } = useContext(AppContext);
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
        const isValidPDF = selectedFile.type === 'application/pdf';
        
        if (!isValidPDF) {
          setError("Only PDF files are allowed for resume. Please upload a valid PDF document.");
          // Reset file input
          e.target.value = '';
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
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />
      
      <main className="flex-grow relative flex items-center justify-center px-4 py-20 mt-20">
        {/* --- STUDIO LIGHTING BACKGROUND --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                My Profile
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              View and manage your account details
            </p>
          </motion.div>

          {/* Glass-Morphism Profile Card */}
          <motion.div
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Metallic Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#22D3EE] rounded-t-[3rem]" />

            {/* Action Button */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 bg-[#0F172A] text-white hover:bg-[#1e293b]"
              >
                {isEditing ? "✕ Cancel Edit" : "✏️ Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Account Information Section */}
              <div className="bg-[#818CF8]/5 rounded-2xl p-5 border border-[#818CF8]/20">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] mb-4">Account Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phoneNo"
                      value={formData.phoneNo} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div className="bg-[#22D3EE]/5 rounded-2xl p-5 border border-[#22D3EE]/20">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] mb-4">Professional Details</h3>
                
                <div className="space-y-5">
                  {/* Experience Level */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Experience Level</label>
                    <select 
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="experienced">Experienced</option>
                      <option value="fresher">Fresher</option>
                    </select>
                  </div>

                  {/* Experience Level Fields */}
                  <AnimatePresence mode="wait">
                    {formData.experienceLevel === "experienced" && (
                      <motion.div
                        key="experienced"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      >
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Current Job</label>
                          <input 
                            type="text" 
                            name="job"
                            value={formData.job} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="e.g. Software Engineer"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Employer</label>
                          <input 
                            type="text" 
                            name="employer"
                            value={formData.employer} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Company Name"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Current CTC</label>
                          <input 
                            type="text" 
                            name="currentCTC"
                            value={formData.currentCTC} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Annual Package"
                          />
                        </div>
                      </motion.div>
                    )}

                    {formData.experienceLevel === "fresher" && (
                      <motion.div
                        key="fresher"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      >
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Course</label>
                          <input 
                            type="text" 
                            name="course"
                            value={formData.course} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="e.g. B.Tech CSE"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Domain</label>
                          <input 
                            type="text" 
                            name="domain"
                            value={formData.domain} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Interested Field"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Common Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Highest Education</label>
                      <input 
                        type="text" 
                        name="education"
                        value={formData.education} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Qualification"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">LinkedIn (Optional)</label>
                      <input 
                        type="text" 
                        name="linkedin"
                        value={formData.linkedin} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Profile URL"
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Upload / Update Resume</label>
                     <input 
                       type="file" 
                       name="resume"
                       accept=".pdf,application/pdf"
                       onChange={handleChange}
                       disabled={!isEditing}
                       className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
                     />
                    {user?.profile?.resume && !isEditing && (
                      <p className="text-xs text-slate-500 mt-1">
                        ✅ Resume already uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm font-semibold text-center"
                  >
                    {error}
                  </motion.p>
                )}
                {success && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-emerald-600 text-sm font-semibold text-center"
                  >
                    {success}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button - Only show when editing */}
              <AnimatePresence>
                {isEditing && (
                  <motion.button
                    key="saveButton"
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#22D3EE] to-[#818CF8] transition-all duration-300 shadow-xl"
                    disabled={submitted}
                  >
                    {submitted ? "✓ Saving Changes..." : "Save Profile Changes"}
                  </motion.button>
                )}
               </AnimatePresence>
               
             </form>

             {/* ==================== APPLICATION STATUS CARDS ==================== */}
             <div className="mt-8 space-y-5">
               
               {/* Internship Interests */}
               {user?.internshipInterests && Array.isArray(user.internshipInterests) && user.internshipInterests.length > 0 && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-6 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                 >
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#818CF8] to-[#6366F1] flex items-center justify-center">
                       <span className="text-lg">🎓</span>
                     </div>
                     <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">Internship Applications</h3>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {user.internshipInterests.map((interest, idx) => (
                       <span key={idx} className="inline-flex items-center px-4 py-2 rounded-xl bg-[#818CF8]/10 text-[#4F46E5] font-semibold text-sm border border-[#818CF8]/20">
                         {interest.category || interest}
                       </span>
                     ))}
                   </div>
                 </motion.div>
               )}

               {/* Job Placement */}
               {user?.jobPlacement && user.jobPlacement.applied && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-6 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center">
                         <span className="text-lg">💼</span>
                       </div>
                       <div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">Job Placement</h3>
                         <p className="text-xs text-slate-500 mt-0.5">Placement Program Application</p>
                       </div>
                     </div>
                     <span className={`px-4 py-2 rounded-xl font-bold text-sm ${user.jobPlacement.status.toLowerCase() === 'fulfilled' ? 'bg-emerald-100 text-emerald-700' : user.jobPlacement.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                       {user.jobPlacement.status.toLowerCase() === 'fulfilled' ? '✅ Fulfilled' : user.jobPlacement.status.toLowerCase() === 'pending' ? '⏳ Pending' : '📝 Applied'}
                     </span>
                   </div>
                 </motion.div>
               )}

               {/* Live Project */}
               {user?.liveProject && user.liveProject.applied && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-6 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] flex items-center justify-center">
                         <span className="text-lg">🚀</span>
                       </div>
                       <div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">Live Project</h3>
                         <p className="text-xs text-slate-500 mt-0.5">Real Industry Project Access</p>
                       </div>
                     </div>
                     <span className={`px-4 py-2 rounded-xl font-bold text-sm ${user.liveProject.status.toLowerCase() === 'fulfilled' ? 'bg-emerald-100 text-emerald-700' : user.liveProject.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                       {user.liveProject.status.toLowerCase() === 'fulfilled' ? '✅ Fulfilled' : user.liveProject.status.toLowerCase() === 'pending' ? '⏳ Pending' : '📝 Applied'}
                     </span>
                   </div>
                 </motion.div>
               )}

               {/* Soft Skill */}
               {user?.softSkill && user.softSkill.applied && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 }}
                   className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-6 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center">
                         <span className="text-lg">⭐</span>
                       </div>
                       <div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">Soft Skill Program</h3>
                         <p className="text-xs text-slate-500 mt-0.5">Personality Development Program</p>
                       </div>
                     </div>
                     <span className={`px-4 py-2 rounded-xl font-bold text-sm ${user.softSkill.status.toLowerCase() === 'fulfilled' ? 'bg-emerald-100 text-emerald-700' : user.softSkill.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                       {user.softSkill.status.toLowerCase() === 'fulfilled' ? '✅ Fulfilled' : user.softSkill.status.toLowerCase() === 'pending' ? '⏳ Pending' : '📝 Applied'}
                     </span>
                   </div>
                 </motion.div>
               )}

               {/* Logout Button */}
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 }}
                 className="mt-8"
               >
                 <motion.button
                   onClick={() => {
                    localStorage.clear();
                     setToken(null);
                     navigate("/login");
                   }}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#EF4444] to-[#DC2626] transition-all duration-300 shadow-xl shadow-red-500/20 overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
