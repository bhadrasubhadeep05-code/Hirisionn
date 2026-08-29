import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { verifyOtp, forgetPassword, resetPassword } from '../services/user.api';
import PasswordInput from './PasswordInput';

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

const InfoAlert = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
      >
        <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
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
  email: "",
  otp: "",
  newPassword: "",
  confirmNewPassword: "",
  general: "",
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // ⚠ The reset JWT returned by /verify-otp lives in React state ONLY.
  // It is intentionally never written to localStorage / sessionStorage.
  const [resetToken, setResetToken] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------
  // Client-side validation mirroring the backend OTP recovery flow
  // (`BackEnd/controllers/otp.controller.js` email/OTP validation)
  // -------------------------------------------------------------
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const OTP_REGEX = /^\d{6}$/;
  const SPECIAL_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const PASSWORD_STRENGTH_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  // Robustly pull the validation error message out of an axios/network error.
  // The OTP controller responds with { error }, other endpoints use { message }.
  const getApiError = (err, fallback) =>
    err?.response?.data?.error || err?.response?.data?.message || err?.message || fallback;

  // Map a backend validation message back to the originating field
  const mapErrorToField = (msg) => {
    const m = (msg || "").toLowerCase();
    const mapped = {};
    const assign = (field, value) => { mapped[field] = value; };

    if (m.includes("token")) assign("general", msg); // expired / invalid reset JWT
    else if (m.includes("email")) assign("email", msg);
    else if (m.includes("otp") || m.includes("verification code")) assign("otp", msg);
    else if (m.includes("confirm password") || m.includes("passwords do not match")) assign("confirmNewPassword", msg);
    else if (m.includes("password")) assign("newPassword", msg);
    else assign("general", msg);
    return mapped;
  };

  // Step 1 → same email format rules as the OTP controller
  const validateEmail = () => {
    const errs = {};
    const email = formData.email.trim().toLowerCase();
    if (!email) errs.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) errs.email = "Please enter a valid email address";
    return errs;
  };

  // Step 2 → the backend expects a 6-digit numeric OTP
  const validateOtp = () => {
    const errs = {};
    const otp = formData.otp.trim();
    if (!otp) errs.otp = "OTP is required";
    else if (!OTP_REGEX.test(otp)) errs.otp = "OTP must be a 6-digit numeric code";
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

  // Step 1 → request an OTP for the registered email.
  // The endpoint replies 200 with a generic message (anti-enumeration),
  // so we advance to the OTP step regardless of whether the email exists.
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const errs = validateEmail();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
      return;
    }

    setIsLoading(true);
    setNotice("");
    try {
      const res = await forgetPassword({ email: formData.email.trim().toLowerCase() });
      setNotice(res.message || "If the email exists, an OTP has been sent.");
      setCurrentStep(2);
    } catch (err) {
      setFormErrors(() => ({
        ...initialErrors,
        ...mapErrorToField(getApiError(err, "Something went wrong. Please try again.")),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Resend the code from the OTP step without losing the entered email
  const handleResendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotice("");
    try {
      await forgetPassword({ email: formData.email.trim().toLowerCase() });
      setNotice("A new OTP has been sent to your email.");
    } catch (err) {
      setFormErrors((prev) => ({
        ...prev,
        general: getApiError(err, "Failed to resend the OTP. Please try again."),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 → verify the OTP; on success keep the reset JWT in state ONLY
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const errs = validateOtp();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyOtp({
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp.trim(),
      });

      // Short-lived reset token held in React state ONLY — it is never
      // persisted to localStorage / sessionStorage.
      setResetToken(res.resetToken);
      setNotice("");
      setCurrentStep(3);
    } catch (err) {
      setFormErrors(() => ({
        ...initialErrors,
        ...mapErrorToField(getApiError(err, "Invalid or expired OTP.")),
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
        resetToken, // ONLY in React state (from the /verify-otp response)
        newPassword: formData.newPassword,
      });
      
      // The reset token is single-use — wipe it from state immediately
      setResetToken(null);

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
              Recover your account with a one-time code sent to your email.
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
                  onSubmit={handleEmailSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <ErrorAlert message={formErrors.general} />

                  <div className="mb-4 rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-5">
                    <p className="text-sm font-medium text-slate-500">
                      Enter the email address linked to your account and we'll send you a one-time verification code.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass(formErrors.email)}
                    />
                    <FieldError msg={formErrors.email} />
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
                          Sending OTP...
                        </>
                      ) : (
                        'Send OTP →'
                      )}
                    </span>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-[#E8791E]" />
                  </motion.button>
                </motion.form>
              )}

              {currentStep === 2 && (
                <motion.form
                  key="step2"
                  onSubmit={handleOtpSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <ErrorAlert message={formErrors.general} />
                  <InfoAlert message={notice} />

                  <div className="mb-4 rounded-2xl border border-[#E8791E]/20 bg-[#E8791E]/10 p-5">
                    <p className="text-sm font-medium text-slate-700">
                      Enter the 6-digit code sent to{" "}
                      <span className="font-bold text-[#E8791E]">{formData.email}</span>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      name="otp"
                      required
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="••••••"
                      className={`${inputClass(formErrors.otp)} text-center text-2xl tracking-[0.5em]`}
                    />
                    <FieldError msg={formErrors.otp} />
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
                          'Verify OTP →'
                        )}
                      </span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-2 text-slate-500 transition-all text-sm font-medium hover:text-slate-700"
                      disabled={isLoading}
                    >
                      ← Go back
                    </button>

                    <p className="text-center text-sm font-medium text-slate-500">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isLoading}
                        className="font-bold text-[#E8791E] transition-all hover:underline hover:underline-offset-4"
                      >
                        Resend OTP
                      </button>
                    </p>
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
                    <PasswordInput
                      name="newPassword"
                      autoComplete="new-password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      error={formErrors.newPassword}
                    />
                    <FieldError msg={formErrors.newPassword} />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 block text-xs uppercase tracking-[0.25em] font-bold text-slate-500">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      name="confirmNewPassword"
                      autoComplete="new-password"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      error={formErrors.confirmNewPassword}
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
