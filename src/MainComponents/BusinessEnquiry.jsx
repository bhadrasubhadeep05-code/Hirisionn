import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar2 from "./NavBar2";
import { enquiry } from "../services/business.api";
import { useToast } from "./AlertNotification";
const BusinessEnquiry = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    designation: "",
    phone: "",
    location: "",
    enquiryFor: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const enquiryOptions = [
    "Human Resources (HR)",
    "Information Technology (IT)",
    "Marketing",
    "Sales",
    "Finance",
    "Retail",
    "General Staffing",
    "Business Process Outsourcing (BPO)",
    "Knowledge Process Outsourcing (KPO)",
    "Bachelor of Technology (B.Tech) Recruitment",
    "Bachelor of Engineering (B.E.) Recruitment",
    "Diploma (DIP) Talent Sourcing",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setIsSubmitting(true);

        const data = {
            fullname: formData.fullName,
            email: formData.email,
            organizationName: formData.organization,
            designation: formData.designation,
            phoneNumber: formData.phone,
            location: formData.location,
            enquiryFor: formData.enquiryFor,
            message: formData.message,
        };

        const res = await enquiry(data);

        console.log(res);
        toast.success(res.message);

    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
        setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3.5 text-[#0F172A] outline-none transition-all placeholder:text-slate-400 focus:border-[#E8791E] focus:bg-white focus:ring-4 focus:ring-[#E8791E]/10";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
      <NavBar2 progress={1} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 flex min-h-[52vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24 md:mt-24 md:py-36"
      >
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Tailored Workforce Solutions for Your Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-[#AAB5BA]"
          >
            Connect with our experts to bridge your organization's talent and
            skill gaps.
          </motion.p>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mx-auto mt-8 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
          />
        </div>
      </motion.section>

      {/* Form Section */}
      <div className="relative z-20 mx-auto -mt-16 max-w-5xl px-4 pb-24 md:-mt-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-2xl md:p-12"
        >
          <div className="absolute left-0 top-10 bottom-10 w-1 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
          <div className="mb-10 pl-4">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8791E]">Let&apos;s build together</p>
            <h2 className="text-3xl font-bold text-[#0F172A]">Tell us what your team needs</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">Share your requirements and our workforce specialists will get back to you with the right solution.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 2 Column Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="John Smith"
                />
              </div>

              {/* Email ID */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="john@gmail.com"
                />
              </div>

              {/* Organization Name */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="Acme Corporation"
                />
              </div>

              {/* Designation */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="Human Resources Manager"
                />
              </div>

              {/* Phone No */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Location */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={fieldClassName}
                  placeholder="Mumbai, India"
                />
              </div>
            </div>

            {/* Enquiry For - Full Width */}
            <div className="group md:col-span-2">
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                Enquiry For
              </label>
              <select
                name="enquiryFor"
                value={formData.enquiryFor}
                onChange={handleChange}
                className={fieldClassName}
              >
                <option value="">Select service category</option>
                {enquiryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message - Full Width */}
            <div className="group md:col-span-2">
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-[#E8791E]">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`${fieldClassName} resize-none`}
                placeholder="Tell us about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#F2A93C] to-[#E8791E] py-4 text-lg font-bold text-white shadow-lg shadow-[#E8791E]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E8791E]/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Enquiry
                  </span>
                ) : (
                  "Submit Enquiry"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessEnquiry;
