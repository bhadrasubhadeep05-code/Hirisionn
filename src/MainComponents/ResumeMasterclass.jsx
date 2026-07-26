import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import resume from '../assets/ResumeProp.png';
import AppContext from '../context/AppContext';

const ResumeMasterclass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const navigate = useNavigate();
  const { ProfileComplete } = useContext(AppContext);

  const features = [
    {
      title: 'ATS-Proof',
      description: 'Built to pass through automated hiring systems with confidence.',
    },
    {
      title: 'Keyword Optimized',
      description: 'Aligned for modern roles across IT, HR, marketing, and more.',
    },
    {
      title: 'Expert Reviewed',
      description: 'Refined by professionals who know what hiring teams notice first.',
    },
  ];

  const handlePurchase = () => {
    if (!ProfileComplete) {
      navigate('/register');
      return;
    }

    setShowPaymentDialog(true);
  };

  const handleRazorpayPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-slate-800">
      <NavBar2 progress={1} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mt-24 flex min-h-[500px] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24"
      >
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Resume masterclass • premium service
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Your Career, Redesigned
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 max-w-2xl text-lg text-slate-300"
          >
            Stop getting ghosted by ATS. Get a resume that does more than list your experience—it tells your success story with clarity and confidence.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-medium text-[#F2A93C]"
          >
            Delivered to your email within 24 hours.
          </motion.p>
        </div>
      </motion.section>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#E8791E]">Why it matters</p>
              <h2 className="mt-3 text-3xl font-bold text-[#0F172A] md:text-4xl">
                Expertly tailored. ATS optimized. Career ready.
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600">
              Don’t leave your future to a generic template. Our experts manually craft your resume to highlight your strengths, sharpen your positioning, and align with the standards modern hiring teams expect.
            </p>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#E8791E]">Special launch offer</p>

              <div className="mb-6 flex items-end gap-4">
                <span className="text-xl text-slate-400 line-through">₹399</span>
                <span className="text-5xl font-bold text-[#E8791E]">₹199</span>
              </div>

              <p className="mb-6 text-sm text-slate-500">
                Get a professionally crafted, ATS-optimized resume designed by experts who understand what employers notice first.
              </p>

              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full rounded-full bg-[#E8791E] py-4 text-lg font-bold text-white shadow-[0_20px_50px_-12px_rgba(232,121,30,0.45)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#F2A93C] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing
                  </span>
                ) : 'Get My Expert Resume Now'}
              </button>
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-center">
                  <h3 className="font-bold text-[#0F172A]">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <div className="absolute -bottom-6 -left-6 h-full w-full rounded-[2rem] bg-[#E8791E]/10" />
            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-2xl">
              <img
                src={resume}
                alt="Professional Resume Preview"
                className="h-full w-full rounded-[1.5rem] object-cover shadow-xl transition-all duration-700 ease-out hover:scale-[1.01]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] backdrop-blur-md lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-slate-400 line-through">₹399</span>
          <span className="text-2xl font-bold text-[#E8791E]">₹199</span>
        </div>
        <button
          onClick={handlePurchase}
          className="w-full rounded-full bg-[#E8791E] py-4 font-bold text-white"
        >
          Get My Expert Resume
        </button>
      </div>

      {showPaymentDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl"
          >
            <button
              onClick={() => setShowPaymentDialog(false)}
              className="absolute right-6 top-6 text-slate-400 transition-colors hover:text-[#0F172A]"
            >
              ✕
            </button>

            <h3 className="mb-6 text-2xl font-bold text-[#0F172A]">Complete Your Purchase</h3>

            <div className="mb-6 rounded-xl bg-[#F8FAFC] p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-slate-600">Expert Resume Service</span>
                <span className="text-slate-400 line-through">₹399</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">Special Offer Price</span>
                <span className="text-3xl font-bold text-[#E8791E]">₹199</span>
              </div>
            </div>

            <button
              onClick={handleRazorpayPayment}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8791E] py-4 text-lg font-bold text-white transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(232,121,30,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay with Razorpay
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Secured by Razorpay. Your payment information is encrypted.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeMasterclass;