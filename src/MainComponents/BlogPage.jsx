import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion';
import Card from './Card'
import Video from '../assets/video3.mp4'
import NavBar2 from './NavBar2'
import { getAllOtherBlogs } from '../services/blog.api';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Blog Categories Data
  const categories = [
    { id: 1, name: "All", description: "View all articles", isLive: false },
    { id: 2, name: "HR", description: "Career & workplace advice", isLive: true },
    { id: 3, name: "Marketing", description: "Brand & growth strategies", isLive: false },
    { id: 4, name: "Finance", description: "Compensation & budgeting", isLive: true },
    { id: 5, name: "Digital", description: "Digital transformation", isLive: false },
    { id: 6, name: "Retail", description: "Retail industry insights", isLive: false },
    { id: 7, name: "International Affairs", description: "Global market updates", isLive: true },
    { id: 8, name: "Advertisement", description: "Advertising best practices", isLive: false },
    { id: 9, name: "Mechanical", description: "Mechanical engineering", isLive: false },
    { id: 10, name: "Electronics", description: "Electronics guides", isLive: true },
    { id: 11, name: "Electrical", description: "Electrical engineering", isLive: false },
    { id: 12, name: "Civil", description: "Civil infrastructure", isLive: false },
    { id: 13, name: "Automation", description: "Process automation", isLive: true },
    { id: 14, name: "AI", description: "Artificial Intelligence", isLive: true },
    { id: 15, name: "IT", description: "Technology & development", isLive: true },
  ];

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllOtherBlogs(page);
      setBlogs(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filter blogs based on selected category
  const filteredBlogs = blogs;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 />
      
      {/* Visionary Hero Section */}
      <section className="relative h-80 md:h-96 overflow-hidden my-20 md:my-36">
        {/* Blurred Background Video/Image */}
        <div className="absolute inset-0">
          <video autoPlay muted loop className="absolute w-full h-full object-cover">
                   <source src={Video} type="video/mp4" />
                 </video>
          <div className="absolute inset-0 bg-[#0F172A]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Voices of the Future Workforce
          </h1>
          <p className="text-white/80 max-w-2xl mb-8 leading-relaxed">
            Modern employees seek more than just a job—they value balance, inclusion, and innovation. We keep you ahead of the trends redefining how organizations operate.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-md">
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-[#22D3EE]/50 text-white placeholder:text-white/50 outline-none focus:border-[#22D3EE] transition-colors"
            />
            
          </div>
        </div>
      </section>

      {/* Blog Content Layout */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 self-start">
              <h3 className="text-[#0F172A] font-bold text-lg mb-6">Blog Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden ${
                      activeCategory === category.id 
                        ? 'bg-white shadow-md' 
                        : 'bg-transparent hover:bg-white/50'
                    }`}
                  >
                    {activeCategory === category.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22D3EE] rounded-l-xl" />
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div>
                        <p className={`font-medium transition-colors ${activeCategory === category.id ? 'text-[#0F172A] font-bold' : 'text-slate-700 hover:text-[#22D3EE]'}`}>
                          {category.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                      </div>
                      {category.isLive && (
                        <span className="ml-auto flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#22D3EE] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]"></span>
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog Cards Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No blogs found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredBlogs.map((blog) => (
                    <Card 
                      key={blog._id || blog.id}
                      id={blog._id || blog.id}
                      title={blog.title}
                      img={blog.thumbnail.url }
                      itm={blog}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <span className="text-slate-600 font-medium">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>

    </div>
  )
}

export default BlogPage