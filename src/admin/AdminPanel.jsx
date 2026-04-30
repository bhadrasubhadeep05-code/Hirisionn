import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from '../MainComponents/NavBar2';
import Footer from '../MainComponents/Footer';

// Icons
const BlogIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const AudioIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const AdminPanel = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "View Blogs",
      count: "24",
      icon: <BlogIcon />,
      color: "from-[#818CF8] to-[#6366F1]",
      action: () => navigate('/admin/blogs'),
    },
    {
      title: "View Videos",
      count: "12",
      icon: <VideoIcon />,
      color: "from-[#22D3EE] to-[#06B6D4]",
      action: () => navigate('/admin/videos'),
    },
    {
      title: "View Audio",
      count: "8",
      icon: <AudioIcon />,
      color: "from-[#10B981] to-[#059669]",
      action: () => navigate('/admin/audios'),
    },
    {
      title: "All Users",
      count: "1,247",
      icon: <UsersIcon />,
      color: "from-[#10B981] to-[#059669]",
      action: () => navigate('/admin/users'),
    },
    {
      title: "View Job Posts",
      count: "38",
      icon: <BriefcaseIcon />,
      color: "from-[#F59E0B] to-[#D97706]",
      action: () => navigate('/admin/jobs'),
    },
    {
      title: "Internship Applicants",
      count: "0",
      icon: <BriefcaseIcon />,
      color: "from-[#EC4899] to-[#DB2777]",
      action: () => navigate('/admin/internships'),
    },
    {
      title: "Placement Applicants",
      count: "0",
      icon: <BriefcaseIcon />,
      color: "from-[#F97316] to-[#EA580C]",
      action: () => navigate('/admin/placements'),
    },
    {
      title: "Live Project Applicants",
      count: "0",
      icon: <BriefcaseIcon />,
      color: "from-[#8B5CF6] to-[#7C3AED]",
      action: () => navigate('/admin/live-project'),
    },
    {
      title: "Soft Skill Applicants",
      count: "0",
      icon: <BriefcaseIcon />,
      color: "from-[#06B6D4] to-[#0891B2]",
      action: () => navigate('/admin/soft-skill'),
    },
     
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />
      
      <main className="flex-grow relative px-4 py-20 mt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Manage content, users and job postings from one place.
            </p>
          </motion.div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onClick={card.action}
                className="cursor-pointer group"
              >
                <div className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
                  
                  <div className="flex flex-col gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    
                    <div>
                      <p className="text-4xl font-bold text-[#0F172A]">{card.count}</p>
                      <h3 className="text-lg font-semibold text-slate-600">{card.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {/* Create Blog Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/create-blog')}
              className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] text-left group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#818CF8] to-[#6366F1] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlusIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Create Blog</h3>
                  <p className="text-slate-500">Publish new article</p>
                </div>
              </div>
            </motion.button>

            {/* Create Video Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/create-video')}
              className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] text-left group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlusIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Create Video</h3>
                  <p className="text-slate-500">Upload new video</p>
                </div>
              </div>
            </motion.button>

            {/* Create Audio Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/create-audio')}
              className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] text-left group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlusIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Create Audio</h3>
                  <p className="text-slate-500">Upload new podcast</p>
                </div>
              </div>
            </motion.button>

            {/* Create Job Posting Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/create-job')}
              className="backdrop-blur-2xl bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] text-left group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#F59E0B] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlusIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Create Job Post</h3>
                  <p className="text-slate-500">Post new vacancy</p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Quick Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#EF4444] rounded-t-[3rem]" />
            
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Quick Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-[#818CF8]">98.5%</p>
                <p className="text-slate-500 font-medium">Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#22D3EE]">12.4K</p>
                <p className="text-slate-500 font-medium">Page Views</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#10B981]">421</p>
                <p className="text-slate-500 font-medium">New Users</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#F59E0B]">17</p>
                <p className="text-slate-500 font-medium">Applications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;
