import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import NavBar2 from "./NavBar2";
import JobCards from "./JobCards";
import { getAllJobs } from "../services/admin.api";
import Footer from "./Footer";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const EXPERIENCE_RANGES = ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12"];
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Remote",
  "Hybrid",
  "On-site",
];

const Placements = () => {
  const { ProfileComplete, startLoading, stopLoading } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    experience: "",
    location: "",
    jobType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadingJobs = async () => {
      setLoading(true);
      startLoading();
      try {
        const response = await getAllJobs();
        console.log(response.data);
        setJobs(response.data || []);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    loadingJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (filters.experience) {
      result = result.filter((job) => job.experience === filters.experience);
    }
    if (filters.location) {
      result = result.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }
    if (filters.jobType) {
      result = result.filter(
        (job) => job.jobType?.toLowerCase() === filters.jobType.toLowerCase(),
      );
    }
    return result;
  }, [filters, jobs]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ experience: "", location: "", jobType: "" });
  };

  const hasActiveFilters =
    filters.experience || filters.location || filters.jobType;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#e9edf1] text-slate-800">
      <NavBar2 progress={1} />

      <section className="relative mt:20 md:mt-24 flex min-h-[50vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-28 md:px-6 md:py-20">
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Job postings
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Discover the next step in your career
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            A refined space for fresh opportunities, curated roles, and
            career-ready pathways.
          </p>
          <div className="mx-auto h-16 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row-reverse">
          {/* Filter Panel - Fixed on desktop, sticky bar on mobile */}
          <aside className="w-full shrink-0 h-fit top-10 sticky md:top-28 md:h-fit md:w-80">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">
                    Filters
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Narrow jobs by experience, state, and job type.
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-[#E8791E] hover:text-[#F2A93C] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="md:space-y-5 flex md:flex-col md:gap-0 gap-2">
                {/* Experience Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      handleFilterChange("experience", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#E8791E] focus:ring-1 focus:ring-[#E8791E]/30"
                  >
                    <option value="">All experience</option>
                    {EXPERIENCE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range} years
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="md:w-full w-[100px] rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#E8791E] focus:ring-1 focus:ring-[#E8791E]/30"
                  >
                    <option value="">All locations</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) =>
                      handleFilterChange("jobType", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#E8791E] focus:ring-1 focus:ring-[#E8791E]/30"
                  >
                    <option value="">All types</option>
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#FFF7ED] px-3 py-2.5 text-xs text-slate-600">
                <span className="font-semibold text-[#E8791E]">
                  {filteredJobs.length}
                </span>{" "}
                job{filteredJobs.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </aside>

          {/* Scrollable Job Cards Container */}
          <div
            className="flex-1 overflow-y-auto pr-0 sm:pr-2 lg:pr-4"
            style={{ maxHeight: "calc(100vh - 14rem)" }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#E8791E]" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="flex flex-col gap-5">
                {filteredJobs.map((job, index) => (
                  <JobCards key={job._id || index} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                <h3 className="text-xl font-bold text-[#0F172A]">
                  No jobs match your filters
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Try adjusting your filter selections to see more
                  opportunities.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 rounded-full bg-[#E8791E] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#F2A93C]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
