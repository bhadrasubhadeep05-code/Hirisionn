import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { register, completeProfile } from '../services/user.api';
import AppContext from '../context/AppContext';

const Register = () => {
  //setToken, use this in dev
 const {  fetchUser, ProfileComplete, formContext } = useContext(AppContext);
   const navigate = useNavigate();

  

   // If token exists already, start directly on Form 2 (profile completion), else show Form 1 (account creation)
   const [currentStep, setCurrentStep] = useState(formContext ? 1 : 2);

  // Update step when token changes after component mount (fix for async context loading)


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
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
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
      // setToken(res.token);
      // ✅ Immediately fetch user data after successful registration
      await fetchUser();
      
      if(res.succes){
        setCurrentStep(2); // Move to Form 2
      }
    } catch (err) {
      setError(err.message || "Registration failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForm2Submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
        navigate("/"); 
      }, 3000);
    } catch (err) {
      alert(err.message || "Profile submission failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipForm2 = () => {
    console.log("Profile form skipped");
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      navigate("/"); 
    }, 1500);
  };

  const goBackToForm1 = () => {
    setCurrentStep(1);
    setError("");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-12%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.18)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12)_0%,transparent_70%)] blur-3xl" />
        </div>

        <NavBar2 progress={currentStep} />

        <main className="flex-grow relative flex items-center justify-center px-4 py-20 mt-20">
          <div className="relative z-10 w-full max-w-2xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full border border-[#E8791E]/20 bg-[#E8791E]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E8791E] mb-5">
                {currentStep === 1 ? 'Create Account' : 'Complete Your Profile'}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A]">
                  {currentStep === 1 ? 'Create Account' : 'Complete Your Profile'}
                </span>
              </h1>
              <p className="text-slate-600 font-medium">
                {currentStep === 1
                  ? 'Join our elite network and start architecting your career.'
                  : 'Tell us a bit more about yourself (optional)'}
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep >= 1 ? 'bg-[#E8791E] text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                <div className={`h-1 w-16 rounded-full ${currentStep >= 2 ? 'bg-[#E8791E]' : 'bg-slate-200'}`} />
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep >= 2 ? 'bg-[#E8791E] text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              </div>
            </motion.div>

            <motion.div
              className="backdrop-blur-2xl bg-white/80 rounded-[2.5rem] p-8 md:p-12 border border-white/70 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.25)] relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F2A93C] via-[#E8791E] to-[#F2A93C] rounded-t-[3rem]" />

              <AnimatePresence mode="wait">
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
                    <div className="space-y-2">
                      <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNo"
                        required
                        value={formData.phoneNo}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Password</label>
                        <input
                          type="password"
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-5">
                      <p className="mb-4 text-sm font-medium text-slate-700">
                        These questions will be used for password recovery. Please remember your answers.
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Security Question 1</label>
                          <select
                            name="securityQuestion1"
                            required
                            value={formData.securityQuestion1}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent"
                          >
                            <option value="">Select a security question</option>
                            {securityQuestions.map((q, i) => (
                              <option key={i} value={q}>{q}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name="securityAnswer1"
                            required
                            value={formData.securityAnswer1}
                            onChange={handleChange}
                            placeholder="Your answer"
                            className="mt-2 w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Security Question 2</label>
                          <select
                            name="securityQuestion2"
                            required
                            value={formData.securityQuestion2}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent"
                          >
                            <option value="">Select a security question</option>
                            {securityQuestions.map((q, i) => (
                              <option key={i} value={q}>{q}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name="securityAnswer2"
                            required
                            value={formData.securityAnswer2}
                            onChange={handleChange}
                            placeholder="Your answer"
                            className="mt-2 w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-sm font-semibold text-center"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      disabled={isLoading}
                      className={`group relative w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl overflow-hidden ${isLoading ? 'bg-slate-500 cursor-not-allowed shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Continue →'
                        )}
                      </span>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E8791E]" />
                    </motion.button>
                  </motion.form>
                )}

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
                    <div className="mb-4 rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-4">
                      <p className="text-sm font-medium text-slate-700">
                        Already using your Name <strong>{formData.fullName}</strong> and Phone <strong>{formData.phoneNo}</strong> from account creation.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Experience Level</label>
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                      >
                        <option value="">Select Experience Level</option>
                        <option value="experienced">Experienced</option>
                        <option value="fresher">Fresher</option>
                      </select>
                    </div>

                    {formData.experienceLevel === 'experienced' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Current Job</label>
                          <input
                            type="text"
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Employer</label>
                          <input
                            type="text"
                            name="employer"
                            value={formData.employer}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Current CTC</label>
                          <input
                            type="text"
                            name="currentCTC"
                            value={formData.currentCTC}
                            onChange={handleChange}
                            placeholder="Annual Package"
                            className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    )}

                    {formData.experienceLevel === 'fresher' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Course</label>
                          <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="e.g. B.Tech CSE"
                            className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Domain</label>
                          <input
                            type="text"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            placeholder="Interested Field"
                            className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Highest Education</label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          placeholder="Qualification"
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">LinkedIn (Optional)</label>
                        <input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="Profile URL"
                          className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent focus:bg-white shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">Upload Resume (Optional)</label>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,application/pdf"
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8791E] focus:border-transparent"
                      />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                      <motion.button
                        type="submit"
                        whileHover={!isLoading && !submitted ? { scale: 1.02 } : {}}
                        whileTap={!isLoading && !submitted ? { scale: 0.98 } : {}}
                        disabled={isLoading || submitted}
                        className={`group relative w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl ${isLoading ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : submitted ? '✓ Submitted Successfully' : 'Complete Registration'}
                        </span>
                      </motion.button>

                      <button
                        type="button"
                        onClick={handleSkipForm2}
                        className="w-full py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                        disabled={isLoading || submitted}
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
                        className="rounded-2xl border-l-4 border-[#E8791E] bg-[#E8791E]/10 p-4 text-center text-slate-700 font-medium mt-4"
                      >
                        Welcome! Redirecting you to login...
                      </motion.div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="font-bold text-[#E8791E] transition-all hover:underline hover:underline-offset-4"
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
