import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import { login } from '../services/user.api';
import AppContext from '../context/AppContext';
import PasswordInput from './PasswordInput';

// ---------------------------------------------------------------
// Shared input style helpers (highlight fields with errors)
// ---------------------------------------------------------------
const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white shadow-sm";
const inputActive = " border-slate-200 focus:ring-[#E8791E]";
const inputError = " border-red-400 bg-red-50 focus:ring-red-400";
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
  password: "",
  general: "",
};

const Login = () => {
  //setToken, use this in dev
  const { fetchUser } = useContext(AppContext);
  const navigate = useNavigate();

 

  const [formData, setFormData] = useState({
    phoneNo: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  // Validate a 10-digit phone number (mirrors the backend)
  const PHONE_REGEX = /^\d{10}$/;

  const validateLogin = () => {
    const errs = {};
    const phone = formData.phoneNo.trim();
    if (!phone) errs.phoneNo = "Phone number is required";
    else if (!PHONE_REGEX.test(phone)) errs.phoneNo = "Phone number must be 10 digits";
    if (!formData.password || !formData.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited + the general banner
    setFormErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation mirroring validateLogin
    const errs = validateLogin();
    if (Object.values(errs).some(Boolean)) {
      setFormErrors(() => ({ ...initialErrors, ...errs }));
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        phoneNo:formData.phoneNo,
        password: formData.password
      }
      const res = await login(data);
      // setToken(res.token);
      // localStorage.setItem("token", res.token);
      // ✅ Immediately fetch user data after login using the fresh token
      await fetchUser();
      
      if(res.succes){
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          // On successful login navigate to dashboard
          navigate("/"); 
        }, 2000);
      }else{
        // Wrong credentials — keep the message generic (don't reveal what failed)
        setFormErrors(() => ({
          ...initialErrors,
          general: "Invalid credentials, please try again",
        }));
      }
    } catch {
      // Never reveal whether the phone number exists or which field was wrong
      setFormErrors(() => ({
        ...initialErrors,
        general: "Invalid credentials, please try again",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-12%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.18)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12)_0%,transparent_70%)] blur-3xl" />
        </div>

        <NavBar2 progress={1} />

        <main className="flex-grow relative flex items-center justify-center px-4 py-20 mt-20">
          <div className="relative z-10 w-full max-w-lg">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full border border-[#E8791E]/20 bg-[#E8791E]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E8791E] mb-5">
                Get Access
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A]">
                  Welcome Back
                </span>
              </h1>
              <p className="text-slate-600 font-medium">
                Sign in to continue your journey with us.
              </p>
            </motion.div>

            <motion.div
              className="backdrop-blur-2xl bg-white/80 rounded-[2.5rem] p-8 md:p-12 border border-white/70 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.25)] relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F2A93C] via-[#E8791E] to-[#F2A93C] rounded-t-[3rem]" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <ErrorAlert message={formErrors.general} />

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.25em] font-bold text-slate-500 ml-1">
                    Phone Number
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

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.25em] font-bold text-slate-500 ml-1">
                    Password
                  </label>
                  <PasswordInput
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    error={formErrors.password}
                  />
                  <FieldError msg={formErrors.password} />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#E8791E] font-bold hover:underline underline-offset-4 transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  whileHover={!isLoading && !submitted ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && !submitted ? { scale: 0.98 } : {}}
                  disabled={isLoading || submitted}
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
                        Signing In...
                      </>
                    ) : submitted ? '✓ Success' : 'Sign In'}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E8791E] shadow-[0_0_10px_#E8791E]" />
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-[#E8791E] font-bold hover:underline underline-offset-4 transition-all"
                  >
                    Create Account
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

export default Login;