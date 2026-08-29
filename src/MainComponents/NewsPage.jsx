import React, { useState, useEffect, useCallback, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar2 from "./NavBar2";
import NewsCard from "./NewsCard";
import { getNews } from "../services/news.api";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // Tracks whether the component is still mounted, so async updates that
  // resolve after an unmount are skipped.
  const mountedRef = useRef(true);

  // All setState calls live inside promise callbacks (.then/.catch/.finally),
  // which are never executed synchronously inside an effect — keeps the
  // react-hooks/set-state-in-effect lint rule happy.
  const loadNews = useCallback(() => {
    getNews()
      .then((response) => {
        if (!mountedRef.current) return;
        const items = Array.isArray(response) ? response : response?.news;
        setNews(items || []);
      })
      .catch(() => {
        if (!mountedRef.current) return;
        console.error("Error fetching news: feed request failed");
        setError("We couldn't load the latest business news right now. Please try again.");
      })
      .finally(() => {
        if (!mountedRef.current) return;
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadNews();

    return () => {
      mountedRef.current = false;
    };
  }, [loadNews]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    loadNews();
  };

  const normalizedQuery = query.trim().toLowerCase();
  // Support multi-word search with relevance ranking:
  //  - every token contributes a score (title hits weigh 3x body hits),
  //  - articles matching ANY token appear, ranked best-first,
  //  - so phrases like "MBA admissions" still surface the MBA story even when
  //    one word only appears in the URL, never returning an empty dead-end.
  const searchTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  // Live client-side search across all news fields returned by the backend.
  const filteredNews = searchTokens.length
    ? news
        .map((item) => {
          const title = String(item.title || "").toLowerCase();
          const body = [item.description, item.author, item.source]
            .filter(Boolean)
            .map((field) => String(field).toLowerCase());

          const score = searchTokens.reduce((acc, token) => {
            if (title.includes(token)) return acc + 3; // strongest signal
            if (body.some((field) => field.includes(token))) return acc + 1;
            return acc;
          }, 0);

          return { item, score };
        })
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.item)
    : news;

  const totalCount = news.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <NavBar2 />

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 flex min-h-[60vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24 md:mt-24 md:py-52"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8791E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8791E]" />
            </span>
            Global business pulse
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
          >
            Business News &amp; Insights
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#AAB5BA]"
          >
            A curated pulse of the global business world — markets, admissions,
            hiring and the trends shaping work.
          </motion.p>

          {/* Live Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            role="search"
            className="relative mx-auto w-full max-w-lg"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search business news..."
              aria-label="Search business news"
              className="w-full rounded-full border border-[#F2A93C]/40 bg-white/10 px-6 py-4 pr-14 text-white shadow-lg backdrop-blur-md transition-all placeholder-[#AAB5BA] focus:border-[#F2A93C] focus:shadow-[0_0_20px_rgba(242,169,60,0.2)] focus:outline-none"
            />

            {/* Clear button — only when a search term is active */}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#AAB5BA] transition-colors duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A93C]/60"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Search icon */}
            <svg
              className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F2A93C]"
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
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CONTENT SECTION ================= */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-8">
        {/* Section header row */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8791E]">
              Latest from the wire
            </p>
            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">
              Recent Stories
            </h2>
          </div>

          {/* Live count */}
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8791E] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E8791E]" />
            </span>
            <span className="text-sm font-semibold text-slate-500" aria-live="polite">
              {loading
                ? "Updating feed…"
                : searchTokens.length
                ? `${filteredNews.length} of ${totalCount} result${filteredNews.length === 1 ? "" : "s"}`
                : `${totalCount} ${totalCount === 1 ? "story" : "stories"}`}
            </span>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#E8791E]" />
          </div>
        ) : error ? (
          /* Error state with retry */
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE7D3]">
              <svg
                className="h-8 w-8 text-[#E8791E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#0F172A]">
              Something went wrong
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-6 rounded-full bg-[#E8791E] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#F2A93C] hover:text-[#0F172A]"
            >
              Try again
            </button>
          </div>
        ) : filteredNews.length === 0 ? (
          /* Empty / no search results */
          <div className="py-20 text-center text-slate-500">
            {normalizedQuery ? (
              <>
                No news found for <span className="font-semibold text-[#0F172A]">&ldquo;{query}&rdquo;</span>.
                Try a different search.
              </>
            ) : (
              "No news available right now. Check back soon."
            )}
          </div>
        ) : (
          /* Square card grid */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 md:gap-10">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="flex"
              >
                <NewsCard news={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;