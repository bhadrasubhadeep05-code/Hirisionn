import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars -- motion is used extensively in JSX below
import { motion, AnimatePresence } from "framer-motion";
import NavBar2 from "../MainComponents/NavBar2";
import Footer from "../MainComponents/Footer";
import { bussiness } from "../services/admin.api";

/* ------------------------------------------------------------------ */
/*  Animation variants – spring physics for premium, fluid motion      */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const enquiryCard = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ------------------------------------------------------------------ */
/*  Reusable meta row (label + value)                                  */
/* ------------------------------------------------------------------ */
const MetaItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#6366F1] shadow-sm">
      <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </span>
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-0.5 break-words text-[15px] font-semibold text-[#0F172A]">{value}</p>
    </div>
  </div>
);

const META_ICONS = {
  building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  badge: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  email: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
};

/* ------------------------------------------------------------------ */
/*  Individual Enquiry Card — full data, clean & structured            */
/* ------------------------------------------------------------------ */
const EnquiryCard = ({ enquiry }) => (
  <motion.div
    variants={enquiryCard}
    layout
    className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.13)]"
  >
    {/* Top gradient accent bar */}
    <div className="h-1.5 w-full bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#EC4899]" />

    <div className="p-8">
      {/* Header — avatar + identity + service badge */}
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0F172A_0%,#1E3A5F_100%)] text-lg font-bold text-white shadow-lg ring-2 ring-[#6366F1]/30">
          {initials(enquiry.fullname)}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-xl font-bold text-[#0F172A]">{enquiry.fullname}</h4>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={META_ICONS.email} />
            </svg>
            <a href={`mailto:${enquiry.email}`} className="break-all hover:text-[#6366F1]">{enquiry.email}</a>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={META_ICONS.phone} />
            </svg>
            <a href={`tel:${enquiry.phoneNumber}`} className="hover:text-[#6366F1]">{enquiry.phoneNumber}</a>
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-4 py-1.5 text-sm font-bold text-[#6366F1]">
          {enquiry.enquiryFor}
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-dashed border-slate-200" />

      {/* Structured meta grid — all data fully visible */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <MetaItem
          icon={META_ICONS.building}
          label="Organization"
          value={enquiry.organizationName || "—"}
        />
        <MetaItem
          icon={META_ICONS.badge}
          label="Designation"
          value={enquiry.designation || "—"}
        />
        <MetaItem
          icon={META_ICONS.location}
          label="Location"
          value={enquiry.location || "—"}
        />
        <MetaItem
          icon={META_ICONS.calendar}
          label="Submitted On"
          value={formatDate(enquiry.createdAt)}
        />
      </div>

      {/* Message — full text, never truncated */}
      <div className="mt-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Message</p>
        <div className="mt-2 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5">
          <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-700">
            {enquiry.message || "No message provided."}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Main Page – Admin Business Enquiry                                 */
/* ------------------------------------------------------------------ */
const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);

  /* Load enquiries --------------------------------------------------- */
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await bussiness();
      // API returns { success, count, data: [...] }
      setEnquiries(res?.data || []);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError(err.response?.data?.message || "Failed to load business enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load – no synchronous setState before the first await
  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await bussiness();
        setEnquiries(res?.data || []);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        setError(err.response?.data?.message || "Failed to load business enquiries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, []);

  /* Show a toast notification ----------------------------------------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  /* Delete an enquiry (placeholder – extend when backend API exists) --- */
  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this enquiry? This action cannot be undone.");
    if (!confirmed) return;
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
    showToast("Enquiry deleted", "success");
  };

  /* Filtering ----------------------------------------------------------- */
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      enquiry.fullname?.toLowerCase().includes(q) ||
      enquiry.email?.toLowerCase().includes(q) ||
      enquiry.organizationName?.toLowerCase().includes(q) ||
      enquiry.location?.toLowerCase().includes(q) ||
      enquiry.enquiryFor?.toLowerCase().includes(q) ||
      enquiry.designation?.toLowerCase().includes(q) ||
      enquiry.message?.toLowerCase().includes(q)
    );
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.08 } },
      }}
      className="min-h-screen bg-[#F8FAFC] flex flex-col"
    >
      <NavBar2 progress={1} />
      <main className="flex-grow p-8 pt-24">

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl ${
              toast.type === "error"
                ? "bg-rose-600 text-white"
                : "bg-[#0F172A] text-white"
            }`}
          >
            {toast.type === "error" ? (
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className="text-sm font-semibold">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Business Enquiries
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-500">
            {loading
              ? "Loading enquiries…"
              : `${enquiries.length} ${enquiries.length === 1 ? "enquiry" : "enquiries"} received`}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeUp} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-2xl font-extrabold text-[#6366F1]">{enquiries.length}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Enquiries</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-2xl font-extrabold text-[#10B981]">
              {new Set(enquiries.map((e) => e.organizationName?.trim().toLowerCase()).filter(Boolean)).size}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Organizations</p>
          </div>
        </motion.div>

        {/* Search + refresh */}
        <motion.div variants={fadeUp} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, organization, service…"
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 shadow-sm transition-all focus:border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-[#818CF8]/20"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1E293B] hover:shadow-lg disabled:cursor-wait disabled:opacity-60"
          >
            <svg className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </motion.div>

        {/* Error state */}
        {error && !loading && (
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center rounded-[24px] border border-rose-200 bg-rose-50 px-8 py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-rose-700">Something went wrong</h2>
            <p className="mt-2 max-w-md text-sm text-rose-600">{error}</p>
            <button
              onClick={fetchEnquiries}
              className="mt-6 rounded-full bg-[#6366F1] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#818CF8]"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div className="h-1.5 rounded-t-[24px] bg-slate-200" />
                <div className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200" />
                      <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-5">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-12 animate-pulse rounded-xl bg-slate-100" />
                    ))}
                  </div>
                  <div className="mt-6 h-24 animate-pulse rounded-2xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-white/60 px-8 py-24 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-700">
              {searchTerm ? "No enquiries match your search" : "No enquiries yet"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Business enquiries submitted from the contact form will appear here."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={cardStagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry._id} className="relative">
                  <EnquiryCard enquiry={enquiry} />
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    aria-label={`Delete enquiry from ${enquiry.fullname}`}
                    className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 opacity-0 shadow-sm transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
                  >
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4" />
                    </svg>
                  </button>
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default AdminEnquiry;