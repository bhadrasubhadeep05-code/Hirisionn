import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { verifyUserForReset, verifySecurityAnswers, resetPassword } from '../services/user.api';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [resetToken, setResetToken] = useState(null);
  const [formData, setFormData] = useState({
    phoneNo: "",
    securityQuestion1: "",
    securityAnswer1: "",
    securityQuestion2: "",
    securityAnswer2: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phoneNo) {
      setError("Please enter your registered phone number!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyUserForReset({ phoneNo: formData.phoneNo });
      setUserId(res.userId);
      setUserQuestions(res.securityQuestions.map(q => q.question));
      setCurrentStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "User not found with this phone number");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.securityAnswer1 || !formData.securityAnswer2) {
      setError("Please answer both security questions!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifySecurityAnswers({
        userId,
        answer1: formData.securityAnswer1,
        answer2: formData.securityAnswer2
      });
      setResetToken(res.resetToken);
      setCurrentStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Security answers are incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);
    try {
      setSubmitted(true);
      await resetPassword({
        resetToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmNewPassword
      });
      
      setTimeout(() => {
        setSubmitted(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setSubmitted(false);
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={currentStep} />
      
      <main className="flex-grow relative flex items-center justify-center px-4 py-20 mt-20">
        {/* --- STUDIO LIGHTING BACKGROUND --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Reset Password
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              Verify your identity to reset your password.
            </p>

            {/* Progress Steps Indicator */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 1 ? 'bg-[#22D3EE] text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <div className={`w-16 h-1 rounded-full ${currentStep >= 2 ? 'bg-[#22D3EE]' : 'bg-slate-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 2 ? 'bg-[#22D3EE] text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <div className={`w-16 h-1 rounded-full ${currentStep >= 3 ? 'bg-[#22D3EE]' : 'bg-slate-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= 3 ? 'bg-[#22D3EE] text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
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
              {/* ========== STEP 1: PHONE VERIFICATION ========== */}
              {currentStep === 1 && (
                <motion.form 
                  key="step1"
                  onSubmit={handlePhoneSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Registered Phone Number</label>
                    <input 
                      type="tel" name="phoneNo" required
                      value={formData.phoneNo} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
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
                        "Continue →"
                      )}
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]" />
                  </motion.button>
                </motion.form>
              )}

              {/* ========== STEP 2: SECURITY QUESTIONS ========== */}
              {currentStep === 2 && (
                <motion.form 
                  key="step2"
                  onSubmit={handleSecuritySubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-[#818CF8]/5 rounded-2xl p-5 border border-[#818CF8]/20 mb-4">
                    <p className="text-sm text-slate-600 font-medium">
                      📋 Please answer the security questions you selected during registration.
                    </p>
                  </div>

                  {/* Security Question 1 */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">{userQuestions[0]}</label>
                    <input 
                      type="text" name="securityAnswer1" required
                      value={formData.securityAnswer1} onChange={handleChange}
                      placeholder="Your answer"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
                  </div>

                  {/* Security Question 2 */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">{userQuestions[1]}</label>
                    <input 
                      type="text" name="securityAnswer2" required
                      value={formData.securityAnswer2} onChange={handleChange}
                      placeholder="Your answer"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
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

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      disabled={isLoading}
                      className={`group relative w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl overflow-hidden ${isLoading ? 'bg-slate-500 cursor-not-allowed shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          "Verify Answers →"
                        )}
                      </span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-2 text-slate-500 hover:text-slate-700 transition-all text-sm font-medium"
                    >
                      ← Go back
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ========== STEP 3: NEW PASSWORD ========== */}
              {currentStep === 3 && (
                <motion.form 
                  key="step3"
                  onSubmit={handlePasswordReset} 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-[#22D3EE]/10 rounded-2xl p-4 mb-4 border border-[#22D3EE]/30">
                    <p className="text-sm text-slate-700 font-medium">
                      ✅ Identity verified! Please set your new password.
                    </p>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">New Password</label>
                    <input 
                      type="password" name="newPassword" required
                      value={formData.newPassword} onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Confirm New Password</label>
                    <input 
                      type="password" name="confirmNewPassword" required
                      value={formData.confirmNewPassword} onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                    />
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

                  {/* Success Message */}
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#22D3EE]/20 border-l-4 border-[#22D3EE] rounded-lg text-center text-slate-700 font-medium"
                    >
                      ✓ Password reset successful! Redirecting to login...
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      whileHover={!isLoading && !submitted ? { scale: 1.02 } : {}}
                      whileTap={!isLoading && !submitted ? { scale: 0.98 } : {}}
                      disabled={isLoading || submitted}
                      className={`group relative w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl ${isLoading ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#22D3EE] to-[#818CF8]'}`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Resetting...
                        </span>
                      ) : submitted ? "✓ Password Reset" : "Reset Password"}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-2 text-slate-500 hover:text-slate-700 transition-all text-sm font-medium"
                      disabled={submitted}
                    >
                      ← Go back
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Remember your password?{' '}
                <button 
                  onClick={goBackToLogin}
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
  );
};

export default ForgetPassword;
