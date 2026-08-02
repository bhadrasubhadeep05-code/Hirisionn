import React, { useState, useEffect } from 'react'
import { getAdminJobs } from '../services/admin.api'
import AdminJobCards from './AdminJobCard'

const ViewJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAdminJobs()
        setJobs(response.data || [])
      } catch (err) {
        console.error('Error fetching jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Manage Jobs</h1>
          <p className="text-slate-600 mb-6">View all job postings</p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs by title..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {searchTerm ? 'No jobs found matching your search' : 'No jobs found'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <AdminJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewJobs