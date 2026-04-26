import React, { useState, useContext, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { updateUser } from '../services/user.api';
import AppContext from '../context/AppContext';
import { motion  } from 'motion/react';

const Profile = () => {
  const { user, fetchUser } = useContext(AppContext);
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

  // Load user data into form when component mounts
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        experienceLevel: user.experienceLevel || "",
        job: user.job || "",
        employer: user.employer || "",
        currentCTC: user.currentCTC || "",
        course: user.course || "",
        domain: user.domain || "",
        education: user.education || "",
        linkedin: user.linkedin || "",
      }));
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
                    {user?.resume && !isEditing && (
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
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
