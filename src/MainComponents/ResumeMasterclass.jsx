import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import video from '../assets/video7.mp4';
import resume from '../assets/ResumeProp.png';
import AppContext from "../context/AppContext";

const ResumeMasterclass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const navigate = useNavigate();
  const { ProfileComplete } = useContext(AppContext);

  // This will come from your auth context/global state in production
 

  const features = [
    {
      title: "ATS-Proof",
      description: "Built to pass through automated hiring bots"
    },
    {
      title: "Keyword Optimized",
      description: "Aligned for IT, HR, Marketing, and all sectors"
    },
    {
      title: "Expert Reviewed",
      description: "Real human professionals polish your draft"
    }
  ];

  const handlePurchase = () => {
    // Check if user is authenticated and profile is complete
    if (!ProfileComplete) {
      navigate('/register');
      return;
    }

    // User is valid - open payment dialog
    setShowPaymentDialog(true);
  };

  const handleRazorpayPayment = () => {
    setIsLoading(true);
    // Razorpay integration will be initialized here
    // window.Razorpay(options)
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />
      
      {/* First Impression Hero Section */}
      <div className="relative h-[500px] overflow-hidden mt-24">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#0F172A]/65 backdrop-blur-md" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          
        

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Your Career, Redesigned
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mb-6"
          >
            Stop getting ghosted by ATS. Get a resume that doesn't just list your history—it tells your success story.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#22D3EE] font-medium"
          >
             Delivered to your email within 24 hours
          </motion.p>
        </div>
      </div>

      {/* Hidden Potential Split Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - The Pitch */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Expertly Tailored. ATS Optimized. Career Ready.
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Don't leave your future to a generic template. Our experts manually craft your resume to highlight your unique strengths and align with industry standards.
            </p>

            {/* Offer Box */}
            <div className="border-2 border-[#818CF8]/30 rounded-2xl p-8 bg-white shadow-xl">
              <p className="text-sm text-[#818CF8] uppercase tracking-wider mb-3">Special Launch Offer</p>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-slate-400 line-through text-xl">₹399</span>
                <span className="text-[#22D3EE] text-5xl font-bold">₹199</span>
              </div>

              <p className="text-slate-500 text-sm mb-6">
                Get a professionally crafted, ATS optimized resume designed by industry experts.
              </p>

              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full bg-[#22D3EE] text-[#0F172A] py-4 rounded-full font-bold text-lg shadow-xl
                          hover:shadow-[0_20px_50px_-12px_rgba(34,211,238,0.6)] hover:-translate-y-1
                          transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing
                  </span>
                ) : "Get My Expert Resume Now"}
              </button>
            </div>

            {/* Value Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="font-bold text-[#0F172A]">{feature.title}</h3>
                  <p className="text-xs text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - The Peek-a-Boo Resume */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative overflow-hidden"
          >
            <div className="relative h-[600px]">
              <img 
                src={resume}
                alt="Professional Resume Preview"
                className="absolute right-0 top-0 h-full object-cover drop-shadow-2xl 
                          transform rotate-3 translate-x-1/4 hover:rotate-0 hover:translate-x-0 
                          transition-all duration-700 ease-out"
              />
              
              {/* Glassmorphic Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/90 to-transparent backdrop-blur-sm flex items-center">
                <p className="text-[#0F172A] font-bold opacity-30 rotate-90 whitespace-nowrap text-xl">
                  Unlock Your Full Profile
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 line-through">₹399</span>
          <span className="text-[#22D3EE] text-2xl font-bold">₹199</span>
        </div>
        <button
          onClick={handlePurchase}
          className="w-full bg-[#22D3EE] text-[#0F172A] py-4 rounded-full font-bold shadow-lg"
        >
          Get My Expert Resume
        </button>
      </div>

      {/* Payment Modal Dialog */}
      {showPaymentDialog && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={() => setShowPaymentDialog(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-[#0F172A] transition-colors"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Complete Your Purchase</h3>
            
            <div className="bg-[#F8FAFC] rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">Expert Resume Service</span>
                <span className="text-slate-400 line-through">₹399</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0F172A]">Special Offer Price</span>
                <span className="text-[#22D3EE] text-3xl font-bold">₹199</span>
              </div>
            </div>

            <button
              onClick={handleRazorpayPayment}
              disabled={isLoading}
              className="w-full bg-[#22D3EE] text-[#0F172A] py-4 rounded-full font-bold text-lg shadow-xl
                        hover:shadow-[0_20px_50px_-12px_rgba(34,211,238,0.6)] transition-all duration-500
                        disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay with Razorpay
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-xs mt-4">
              Secured by Razorpay. Your payment information is encrypted.
            </p>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default ResumeMasterclass;