import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar2 from "../MainComponents/NavBar2";
import Footer from "../MainComponents/Footer";
import { getInternships, getInternshipsFulfilled, fulfillInternship  } from "../services/admin.api";

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
      setLoading(true);
      
      // Fetch both pending and fulfilled applications
      const [appliedRes, fulfilledRes] = await Promise.all([
        getInternships(),
        getInternshipsFulfilled()
      ]);

      console.log("Applied:", appliedRes.users);
      console.log("Fulfilled:", fulfilledRes.users);
      
      // Combine both sets
      const applied = appliedRes.users || [];
      const fulfilled = fulfilledRes.users || [];
      
      // Merge and mark status
      const allUsers = [...applied, ...fulfilled];
      setApplicants(allUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get all applications with status
  const getAllApplications = () => {
    if (!applicants || !Array.isArray(applicants)) return [];
    const allApps = [];
    
    applicants.forEach(user => {
      user.internshipInterests?.forEach(interest => {
        allApps.push({
          user,
          interest
        });
      });
    });
    
    return allApps;
  };

  const totalApplications = getAllApplications().length;
  const appliedCount = getAllApplications().filter(app => app.interest.status === "Applied" ).length;
  const fulfilledCount = getAllApplications().filter(app => app.interest.status === "Fulfilled").length;
  console.log(getAllApplications())

  // Filter applications based on selected status
  const filteredApplications = getAllApplications().filter(app => {
    if (filter === "all") return true;
    if (filter === "applied") return app.interest.status === "Applied";
    if (filter === "fulfilled") return app.interest.status === "Fulfilled";
    return true;
  });

  const handleClick = async (id, category, subCategory) => {
    try {
      const res = await fulfillInternship({
        userId: id,
        category: category,
        subCategory: subCategory
      });

      console.log(res);
      alert(res.message);
      
      // Refresh applicants list after successful fulfillment
      fetchApplicants();
    } catch (err) {
      console.error("Error fulfilling internship:", err);
      alert(err.response?.data?.message || "Failed to fulfill internship. Please try again.");
    }
  }

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
              Manage and track internship application statuses
            </p>
          </motion.div>

          {/* Status Stats Cards */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#0F172A]">{totalApplications}</p>
              <p className="text-slate-600 font-medium">Total Applications</p>
            </div>
            
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#F59E0B]">{appliedCount}</p>
              <p className="text-slate-600 font-medium">Pending Applications</p>
            </div>
            
            <div className="backdrop-blur-2xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-lg">
              <p className="text-3xl font-bold text-[#10B981]">{fulfilledCount}</p>
              <p className="text-slate-600 font-medium">Fulfilled Applications</p>
            </div>
          </motion.div>

          {/* Status Filter Tabs */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-8 flex-wrap justify-center"
          >
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "all" ? "bg-[#0F172A] text-white" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              All Applications
            </button>
            <button 
              onClick={() => setFilter("applied")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "applied" ? "bg-[#F59E0B] text-white" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter("fulfilled")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "fulfilled" ? "bg-[#10B981] text-white" : "bg-white text-slate-600 hover:bg-gray-100"
              }`}
            >
              Fulfilled
            </button>
          </motion.div>

          {/* Applications Table */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-2xl bg-white/70 rounded-2xl shadow-xl overflow-hidden border border-white/50"
          >
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading applicants...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No applicants found for this status</div>
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
                      <th className="px-6 py-4 text-left font-bold">Status</th>
                      <th className="px-6 py-4 text-left font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app, idx) => (
                      <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}>
                        <td className="px-6 py-4 font-semibold text-[#0F172A]">{app.user.fullName}</td>
                        <td className="px-6 py-4 text-slate-600">{app.user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            app.interest.category === "IT & Technology" 
                              ? "bg-[#22D3EE]/20 text-[#06b6d4]" 
                              : "bg-[#818CF8]/20 text-[#6366F1]"
                          }`}>
                            {app.interest.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{app.interest.subCategory}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(app.interest.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {app.interest.status === "Fulfilled" ? (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                              Fulfilled
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                              Applied
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {app.interest.status === "Applied" ? (
                            <button
                              onClick={()=> handleClick(app.user._id, app.interest.category, app.interest.subCategory)} 
                              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            >
                              Full Fill
                            </button>
                          ) : (
                            <span className="text-slate-400 text-sm font-medium">Completed</span>
                          )}
                        </td>
                      </tr>
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