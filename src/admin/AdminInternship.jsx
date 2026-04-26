import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import NavBar2 from "../MainComponents/NavBar2";
import Footer from "../MainComponents/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const AdminInternship = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await api.get("/admin/internship-applicants");
      setApplicants(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplicants = filter === "all" 
    ? (applicants || []) 
    : (applicants || []).filter(user => 
        user.internshipInterests?.some(i => i.category === filter)
      );

  const getTotalCount = (category) => {
    if (!applicants || !Array.isArray(applicants)) return 0;
    return (applicants || []).reduce((count, user) => {
      return count + (user.internshipInterests?.filter(i => i.category === category).length || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col">
      <NavBar2 progress={1} />
      
      <main className="flex-grow px-4 py-20 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Internship Applicants
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              View all users who have applied for internships and their interested domains
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#22D3EE]">{getTotalCount("IT & Technology")}</p>
              <p className="text-slate-600 font-medium">IT & Technology Applications</p>
            </div>
            
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#818CF8]">{getTotalCount("Engineering")}</p>
              <p className="text-slate-600 font-medium">Engineering Applications</p>
            </div>
            
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#10B981]">{applicants?.length || 0}</p>
              <p className="text-slate-600 font-medium">Total Unique Users</p>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-8 flex-wrap"
          >
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "all" ? "bg-[#22D3EE] text-[#0F172A]" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              All Applications
            </button>
            <button 
              onClick={() => setFilter("IT & Technology")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "IT & Technology" ? "bg-[#22D3EE] text-[#0F172A]" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              IT & Technology
            </button>
            <button 
              onClick={() => setFilter("Engineering")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "Engineering" ? "bg-[#22D3EE] text-[#0F172A]" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              Engineering
            </button>
          </motion.div>

          {/* Applicants Table */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-2xl bg-white/70 rounded-2xl shadow-xl overflow-hidden border border-white/50"
          >
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading applicants...</div>
            ) : (filteredApplicants?.length || 0) === 0 ? (
              <div className="p-12 text-center text-slate-500">No applicants found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-[#0F172A] text-white">
                      <th className="px-6 py-4 text-left font-bold">User</th>
                      <th className="px-6 py-4 text-left font-bold">Email</th>
                      <th className="px-6 py-4 text-left font-bold">Category</th>
                      <th className="px-6 py-4 text-left font-bold">Domain</th>
                      <th className="px-6 py-4 text-left font-bold">Applied On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.map((user, idx) => (
                      user.internshipInterests?.map((interest, iidx) => (
                        filter !== "all" && interest.category !== filter ? null : (
                          <tr key={`${idx}-${iidx}`} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}>
                            <td className="px-6 py-4 font-semibold text-[#0F172A]">{user.fullName}</td>
                            <td className="px-6 py-4 text-slate-600">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                interest.category === "IT & Technology" 
                                  ? "bg-[#22D3EE]/20 text-[#06b6d4]" 
                                  : "bg-[#818CF8]/20 text-[#6366F1]"
                              }`}>
                                {interest.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-700">{interest.subCategory}</td>
                            <td className="px-6 py-4 text-slate-500 text-sm">
                              {new Date(interest.appliedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminInternship;