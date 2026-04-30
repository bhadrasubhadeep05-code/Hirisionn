import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { register, completeProfile } from '../services/user.api';
import AppContext from '../context/AppContext';

const Register = () => {
 const { setToken, fetchUser, token } = useContext(AppContext);
   const navigate = useNavigate();

  

   // If token exists already, start directly on Form 2 (profile completion), else show Form 1 (account creation)
   const [currentStep, setCurrentStep] = useState(token ? 2 : 1);

  // Update step when token changes after component mount (fix for async context loading)
  React.useEffect(() => {
    if (token) {
      setCurrentStep(2);
    }
  }, [token]);

  const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // 👈 important
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};
  const [formData, setFormData] = useState({
    // Form 1 - Account Details
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    securityQuestion1: "",
    securityAnswer1: "",
    securityQuestion2: "",
    securityAnswer2: "",
    
    // Form 2 - Profile Details (AppForm fields - prefilled from Form 1)
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

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const securityQuestions = [
    "What was your first pet's name?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What city were you born in?",
    "What is your favorite movie?",
    "What was your first car?",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (error) setError(""); // Clear error when user types
  };

  const handleForm1Submit = async (e) => {
    e.preventDefault();
    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.securityQuestion1 || !formData.securityAnswer1 || !formData.securityQuestion2 || !formData.securityAnswer2) {
      setError("Please select and answer both security questions!");
      return;
    }

    const userData = {
      fullName: formData.fullName,
        email: formData.email,
    phoneNo: formData.phoneNo,
    password: formData.password, 
    confirmPassword: formData.confirmPassword,
    securityQuestion1: formData.securityQuestion1,
    securityAnswer1: formData.securityAnswer1,
    securityQuestion2:formData.securityQuestion2,
    securityAnswer2: formData.securityAnswer2
    }
    const res = await register(userData)
    setToken(res.token);
    // ✅ Immediately fetch user data after successful registration
    await fetchUser(res.token);
    
    if(res.succes){
      setCurrentStep(2); // Move to Form 2
    }
    
  };
  
  const handleForm2Submit = async (e) => {
    e.preventDefault();
    const base64 = await toBase64(formData.resume);
    const data = {
    experienceLevel: formData.experienceLevel,
    job: formData.job,
    employer: formData.employer,
    currentCTC: formData.currentCTC,
    course: formData.course,
    domain: formData.domain,
    education: formData.education,
    linkedin: formData.linkedin,
    resume: base64
    }
    const res = await completeProfile(data);
    alert(res.message);
    
    // Combine all data
    const completeUserData = {
      ...formData,
      name: formData.fullName,
      phone: formData.phoneNo
    };
    
    console.log("Complete User Data:", completeUserData);
    setSubmitted(true);
    
    // Redirect to login or dashboard after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      navigate("/login"); 
    }, 3000);
  };

  const handleSkipForm2 = () => {
    console.log("Profile form skipped");
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      navigate("/login"); 
    }, 1500);
  };

  const goBackToForm1 = () => {
    setCurrentStep(1);
    setError("");
  };

  return (
    <>
   

     
        <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
          <NavBar2 progress={currentStep} />
      
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
                {currentStep === 1 ? "Create Account" : "Complete Your Profile"}
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              {currentStep === 1 
                ? "Join our elite network and start architecting your career." 
                : "Tell us a bit more about yourself (optional)"}
            </p>
            
            {/* Progress Steps Indicator */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 1 ? 'bg-[#22D3EE] text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <div className={`w-16 h-1 rounded-full ${currentStep >= 2 ? 'bg-[#22D3EE]' : 'bg-slate-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 2 ? 'bg-[#22D3EE] text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            </div>
          </motion.div>

          {/* Glass-Morphism Card */}
          <motion.div
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Metallic Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#22D3EE] rounded-t-[3rem]" />

            <AnimatePresence mode="wait">
              {/* ========== FORM 1 - ACCOUNT REGISTRATION ========== */}
              {currentStep === 1 && (
                <motion.form 
                  key="form1"
                  onSubmit={handleForm1Submit} 
                  className="space-y-5"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Full Name</label>
                    <input 
                      type="text" name="fullName" required
                      value={formData.fullName} onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Email Address</label>
                    <input 
                      type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Phone Number</label>
                    <input 
                      type="tel" name="phoneNo" required
                      value={formData.phoneNo} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Password</label>
                      <input 
                        type="password" name="password" required
                        value={formData.password} onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Confirm Password</label>
                      <input 
                        type="password" name="confirmPassword" required
                        value={formData.confirmPassword} onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Security Questions */}
                  <div className="bg-[#818CF8]/5 rounded-2xl p-5 border border-[#818CF8]/20">
                    <p className="text-sm text-slate-600 mb-4 font-medium">
                      ⚠️ These questions will be used for password recovery. Please remember your answers!
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Security Question 1</label>
                        <select 
                          name="securityQuestion1" 
                          required
                          value={formData.securityQuestion1} 
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent"
                        >
                          <option value="">Select a security question</option>
                          {securityQuestions.map((q, i) => (
                            <option key={i} value={q}>{q}</option>
                          ))}
                        </select>
                        <input 
                          type="text" name="securityAnswer1" required
                          value={formData.securityAnswer1} onChange={handleChange}
                          placeholder="Your answer"
                          className="w-full mt-2 px-5 py-3.5 rounded-2xl bg-white/70 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Security Question 2</label>
                        <select 
                          name="securityQuestion2" 
                          required
                          value={formData.securityQuestion2} 
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent"
                        >
                          <option value="">Select a security question</option>
                          {securityQuestions.map((q, i) => (
                            <option key={i} value={q}>{q}</option>
                          ))}
                        </select>
                        <input 
                          type="text" name="securityAnswer2" required
                          value={formData.securityAnswer2} onChange={handleChange}
                          placeholder="Your answer"
                          className="w-full mt-2 px-5 py-3.5 rounded-2xl bg-white/70 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
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
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-[#0F172A] transition-all duration-300 shadow-xl shadow-[#0F172A]/20 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Continue →
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]" />
                  </motion.button>
                </motion.form>
              )}

              {/* ========== FORM 2 - PROFILE DETAILS (APP FORM) ========== */}
              {currentStep === 2 && (
                <motion.form 
                  key="form2"
                  onSubmit={handleForm2Submit} 
                  className="space-y-5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-[#22D3EE]/10 rounded-2xl p-4 mb-4 border border-[#22D3EE]/30">
                    <p className="text-sm text-slate-700 font-medium">
                      ✅ Already using your Name <strong>{formData.fullName}</strong> and Phone <strong>{formData.phoneNo}</strong> from account creation.
                    </p>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Experience Level</label>
                    <select 
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="experienced">Experienced</option>
                      <option value="fresher">Fresher</option>
                    </select>
                  </div>

                  {/* EXPERIENCED FIELDS */}
                  {formData.experienceLevel === "experienced" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Current Job</label>
                        <input 
                          type="text" name="job"
                          value={formData.job} onChange={handleChange}
                          placeholder="e.g. Software Engineer"
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Employer</label>
                        <input 
                          type="text" name="employer"
                          value={formData.employer} onChange={handleChange}
                          placeholder="Company Name"
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Current CTC</label>
                        <input 
                          type="text" name="currentCTC"
                          value={formData.currentCTC} onChange={handleChange}
                          placeholder="Annual Package"
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* FRESHER FIELDS */}
                  {formData.experienceLevel === "fresher" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Course</label>
                        <input 
                          type="text" name="course"
                          value={formData.course} onChange={handleChange}
                          placeholder="e.g. B.Tech CSE"
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Domain</label>
                        <input 
                          type="text" name="domain"
                          value={formData.domain} onChange={handleChange}
                          placeholder="Interested Field"
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Common Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Highest Education</label>
                      <input 
                        type="text" name="education"
                        value={formData.education} onChange={handleChange}
                        placeholder="Qualification"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">LinkedIn (Optional)</label>
                      <input 
                        type="text" name="linkedin"
                        value={formData.linkedin} onChange={handleChange}
                        placeholder="Profile URL"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Upload Resume (Optional)</label>
                    <input 
                      type="file" name="resume"
                      accept=".pdf,application/pdf"
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#22D3EE] to-[#818CF8] transition-all duration-300 shadow-xl"
                      disabled={submitted}
                    >
                      {submitted ? "✓ Submitted Successfully" : "Complete Registration"}
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleSkipForm2}
                      className="w-full py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                      disabled={submitted}
                    >
                      Skip for now →
                    </button>

                    <button
                      type="button"
                      onClick={goBackToForm1}
                      className="w-full py-2 text-slate-500 hover:text-slate-700 transition-all text-sm font-medium"
                    >
                      ← Go back to account details
                    </button>
                  </div>

                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#22D3EE]/20 border-l-4 border-[#22D3EE] rounded-lg text-center text-slate-700 font-medium mt-4"
                    >
                      ✓ Welcome! Redirecting you to login...
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-[#22D3EE] font-bold hover:underline underline-offset-4 transition-all"
                >
                  Sign In
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

          <Footer />
        </div>
    </>
  );
};

export default Register;
