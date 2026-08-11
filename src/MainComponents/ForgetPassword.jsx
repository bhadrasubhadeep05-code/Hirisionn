import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { verifyUserForReset, verifySecurityAnswers, resetPassword } from '../services/user.api';

// ---------------------------------------------------------------
// Shared input style helpers (highlight fields with errors)
// ---------------------------------------------------------------
const inputBase =
  "w-full rounded-2xl border bg-[#F8FAFC] px-5 py-3.5 font-medium text-[#0F172A] placeholder-slate-400 shadow-sm outline-none transition-all duration-300 focus:bg-white";
const inputActive = " border-slate-200 focus:border-[#E8791E] focus:ring-2 focus:ring-[#E8791E]/20";
const inputError = " border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20";
const inputClass = (hasError) => `${inputBase}${hasError ? inputError : inputActive}`;

// ---------------------------------------------------------------
// Reusable animated error components
// ---------------------------------------------------------------
const ErrorAlert = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
      >
        <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

const FieldError = ({ msg }) =>
  msg ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="ml-1 mt-1.5 text-xs font-semibold text-red-500"
    >
      {msg}
    </motion.p>
  ) : null;

const initialErrors = {
  phoneNo: "",
  securityAnswer1: "",
  securityAnswer2: "",
  newPassword: "",
  confirmNewPassword: "",
  general: "",
};

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
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [userQuestions, setUserQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------
  // Client-side validation mirroring the backend validation layer
  // (`BackEnd/middlewares/validateUser.js` reset-password validators)
  // -------------------------------------------------------------
  const PHONE_REGEX = /^\d{10}$/;
  const SPECIAL_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const PASSWORD_STRENGTH_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  // Robustly pull the validation error message out of an axios/network error
  const getApiError = (err, fallback) =>
    err?.response?.data?.message || err?.message || fallback;

  // Map a backend validation message back to the originating field
  const mapErrorToField = (msg) => {
    const m = (msg || "").toLowerCase();
    const mapped = {};
    const assign = (field, value) => { mapped[field] = value; };

    if (m.includes("phone")) assign("phoneNo", msg);
    else if (m.includes("answer 1")) assign("securityAnswer1", msg);
    else if (m.includes("answer 2")) assign("securityAnswer2", msg);
    else if (m.includes("confirm password") || m.includes("passwords do not match")) assign("confirmNewPassword", msg);
    else if (m.includes("password")) assign("newPassword", msg);
    else assign("general", msg);
    return mapped;
  };

  // Step 1 → validateVerifyUser (phone)
  const validatePhone = () => {
    const errs = {};
    const phone = formData.phoneNo.trim();
    if (!phone) errs.phoneNo = "Phone number is required";
    else if (!PHONE_REGEX.test(phone)) errs.phoneNo = "Phone number must be 10 digits";
    return errs;
  };

  // Step 2 → validateSecurityAnswers
  const validateAnswers = () => {
    const errs = {};
    if (!formData.securityAnswer1 || formData.securityAnswer1.trim().length < 2)
      errs.securityAnswer1 = "Security answer 1 must be at least 2 characters";
    if (!formData.securityAnswer2 || formData.securityAnswer2.trim().length < 2)
      errs.securityAnswer2 = "Security answer 2 must be at least 2 characters";
    return errs;
  };

  // Step 3 → validateResetPassword (strong password + confirm match)
  const validateNewPassword = () => {
    const errs = {};
    const password = formData.newPassword;
    if (!password) errs.newPassword = "New password is required";
    else if (password.length < 8) errs.newPassword = "New password must be at least 8 characters";
    else if (!PASSWORD_STRENGTH_REGEX.test(password) || !SPECIAL_REGEX.test(password))
      errs.newPassword = "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";

    if (!formData.confirmNewPassword) errs.confirmNewPassword = "Confirm password is required";
    else if (password && password !== formData.confirmNewPassword) errs.confirmNewPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited + the general banner
    setFormErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation mirroring validateVerifyUser
    const errs = validatePhone();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyUserForReset({ phoneNo: formData.phoneNo });
      setUserId(res.userId);
      setUserQuestions(res.securityQuestions.map(q => q.question));
      setCurrentStep(2);
    } catch (err) {
      setFormErrors(() => ({
        ...initialErrors,
        ...mapErrorToField(getApiError(err, "User not found with this phone number")),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();

    // Client-side validation mirroring validateSecurityAnswers
    const errs = validateAnswers();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
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
      setFormErrors(() => ({
        ...initialErrors,
        ...mapErrorToField(getApiError(err, "Security answers are incorrect")),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Client-side validation mirroring validateResetPassword
    const errs = validateNewPassword();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
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
      setFormErrors(() => ({
        ...initialErrors,
        ...mapErrorToField(getApiError(err, "Failed to reset password")),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-12%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12)_0%,transparent_70%)] blur-3xl" />
      </div>

      <NavBar2 progress={currentStep} />

      <main className="relative mt-16 flex flex-grow items-center justify-center overflow-hidden bg-[#F8FAFC] px-4 py-20 md:mt-24">
        <div className="relative z-10 w-full max-w-lg">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center rounded-full border border-[#E8791E]/20 bg-[#E8791E]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E8791E] mb-5">
              Account Recovery
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl">
              Reset Password
            </h1>
            <p className="text-slate-600 font-medium">
              Verify your identity to reset your password.
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep >= 1 ? 'bg-[#E8791E] text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <div className={`h-1 w-16 rounded-full ${currentStep >= 2 ? 'bg-[#E8791E]' : 'bg-slate-200'}`} />
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep >= 2 ? 'bg-[#E8791E] text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <div className={`h-1 w-16 rounded-full ${currentStep >= 3 ? 'bg-[#E8791E]' : 'bg-slate-200'}`} />
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${currentStep >= 3 ? 'bg-[#E8791E] text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.25)] backdrop-blur-2xl md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#F2A93C] via-[#E8791E] to-[#F2A93C]" />

            <AnimatePresence mode="wait">
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
                  <ErrorAlert message={formErrors.general} />

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Registered Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      required
                      value={formData.phoneNo}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass(formErrors.phoneNo)}
                    />
                    <FieldError msg={formErrors.phoneNo} />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    disabled={isLoading}
                    className={`group relative w-full overflow-hidden rounded-2xl py-4 text-lg font-bold text-white transition-all duration-300 shadow-xl ${isLoading ? 'cursor-not-allowed bg-slate-500 shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
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
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-[#E8791E]" />
                  </motion.button>
                </motion.form>
              )}

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
                  <ErrorAlert message={formErrors.general} />

                  <div className="mb-4 rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-5">
                    <p className="text-sm font-medium text-slate-700">
                      Please answer the security questions you selected during registration.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      {userQuestions[0]}
                    </label>
                    <input
                      type="text"
                      name="securityAnswer1"
                      required
                      value={formData.securityAnswer1}
                      onChange={handleChange}
                      placeholder="Your answer"
                      className={inputClass(formErrors.securityAnswer1)}
                    />
                    <FieldError msg={formErrors.securityAnswer1} />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      {userQuestions[1]}
                    </label>
                    <input
                      type="text"
                      name="securityAnswer2"
                      required
                      value={formData.securityAnswer2}
                      onChange={handleChange}
                      placeholder="Your answer"
                      className={inputClass(formErrors.securityAnswer2)}
                    />
                    <FieldError msg={formErrors.securityAnswer2} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      disabled={isLoading}
                      className={`group relative w-full overflow-hidden rounded-2xl py-4 text-lg font-bold text-white transition-all duration-300 shadow-xl ${isLoading ? 'cursor-not-allowed bg-slate-500 shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
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
                          'Verify Answers →'
                        )}
                      </span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-2 text-slate-500 transition-all text-sm font-medium hover:text-slate-700"
                    >
                      ← Go back
                    </button>
                  </div>
                </motion.form>
              )}

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
                  <ErrorAlert message={formErrors.general} />

                  <div className="mb-4 rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      Identity verified! Please set your new password.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={inputClass(formErrors.newPassword)}
                    />
                    <FieldError msg={formErrors.newPassword} />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      required
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={inputClass(formErrors.confirmNewPassword)}
                    />
                    <FieldError msg={formErrors.confirmNewPassword} />
                  </div>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border-l-4 border-[#E8791E] bg-[#E8791E]/10 p-4 text-center font-medium text-slate-700"
                    >
                      Password reset successful! Redirecting to login...
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      whileHover={!isLoading && !submitted ? { scale: 1.02 } : {}}
                      whileTap={!isLoading && !submitted ? { scale: 0.98 } : {}}
                      disabled={isLoading || submitted}
                      className={`group relative w-full rounded-2xl py-4 text-lg font-bold text-white transition-all duration-300 shadow-xl ${isLoading ? 'cursor-not-allowed bg-slate-400 shadow-none' : 'bg-[#0F172A] shadow-[#0F172A]/20'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resetting...
                          </>
                        ) : submitted ? '✓ Password Reset' : 'Reset Password'}
                      </span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-2 text-slate-500 transition-all text-sm font-medium hover:text-slate-700"
                      disabled={submitted}
                    >
                      ← Go back
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Remember your password?{' '}
                <button
                  onClick={goBackToLogin}
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
  );
};

export default ForgetPassword;
