import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar2 from "./NavBar2";
import { enquiry } from "../services/business.api";
const BusinessEnquiry = () => {
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
        alert(res.message);

    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Something went wrong");
    } finally {
        setIsSubmitting(false);
    }
};
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />

      {/* Hero Section */}

      <div className="relative h-[400px] overflow-hidden mt-24">
        <div className="absolute inset-0 bg-[#0F172A] backdrop-blur-md" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Tailored Workforce Solutions for Your Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl"
          >
            Connect with our experts to bridge your organization's talent and
            skill gaps.
          </motion.p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 pb-24 -mt-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 hover:shadow-[0_35px_60px_-15px_rgba(34,211,238,0.15)] transition-all duration-500"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 2 Column Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="John Smith"
                />
              </div>

              {/* Email ID */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="john@gmail.com"
                />
              </div>

              {/* Organization Name */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="Acme Corporation"
                />
              </div>

              {/* Designation */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="Human Resources Manager"
                />
              </div>

              {/* Phone No */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Location */}
              <div className="group">
                <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A]"
                  placeholder="Mumbai, India"
                />
              </div>
            </div>

            {/* Enquiry For - Full Width */}
            <div className="group md:col-span-2">
              <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                Enquiry For
              </label>
              <select
                name="enquiryFor"
                value={formData.enquiryFor}
                onChange={handleChange}
                className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A] bg-transparent"
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
              <label className="block text-sm text-[#818CF8] uppercase tracking-wider mb-2 group-focus-within:text-[#22D3EE] transition-colors">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border-b border-slate-200 py-3 focus:border-[#22D3EE] outline-none transition-colors text-[#0F172A] resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#22D3EE] text-[#0F172A] py-5 rounded-full font-bold text-lg shadow-xl
                          hover:shadow-[0_20px_50px_-12px_rgba(34,211,238,0.5)] hover:-translate-y-1
                          transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
