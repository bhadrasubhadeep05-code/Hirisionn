import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from '../MainComponents/NavBar2';
import Footer from '../MainComponents/Footer';
import { adminLogin } from '../services/admin.api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNo: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phoneNo || !formData.password) {
      setError("Please enter both phone number and password!");
      return;
    }

    try {
      setSubmitted(true);
      const res = await adminLogin(formData);
      
      if(res.success || res.succes){
        // Store admin token in localStorage
        localStorage.setItem('adminToken', res.adminToken);
        localStorage.setItem('isAdmin', 'true');
        
        setTimeout(() => {
          setSubmitted(false);
          // On successful admin login navigate to admin dashboard
          navigate("/admin-panel"); 
        }, 2000);
      } else {
        setError(res.message || "Invalid admin credentials");
        setSubmitted(false);
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError("Login failed. Please try again.");
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
                Admin Login
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              Sign in to access administrator panel.
            </p>
          </motion.div>

          {/* Glass-Morphism Login Card */}
          <motion.div
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Admin Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#EF4444] rounded-t-[3rem]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Admin Phone Number */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Admin Phone Number</label>
                <input 
                  type="tel" name="phoneNo" required
                  value={formData.phoneNo} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-transparent focus:bg-white shadow-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Password</label>
                <input 
                  type="password" name="password" required
                  value={formData.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-transparent focus:bg-white shadow-sm"
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

              {/* Submit Button - Admin Style */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#EF4444] to-[#F59E0B] transition-all duration-300 shadow-xl shadow-[#EF4444]/20 overflow-hidden"
                disabled={submitted}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitted ? "Authenticating..." : "Admin Sign In"}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]" />
              </motion.button>
            </form>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;