import React from "react";
import { RefreshCw, Filter, X } from "lucide-react";
import {
  EMAIL_CATEGORIES,
  getSubcategoriesForCategory,
} from "./emailConstants";

const EmailFilters = ({
  category,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
  onResetFilters,
  syncing,
  emailsLoading,
  onRefresh,
  stats,
}) => {
  const availableSubcategories = getSubcategoriesForCategory(category);
  const subCategoryCounts =
    category && stats?.categories?.[category]?.subCategories
      ? stats.categories[category].subCategories
      : {};

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm mb-6 transition-all">
      {/* Category Pills & Refresh row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            Category:
          </span>

          <button
            type="button"
            onClick={() => onCategoryChange("")}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
              category === ""
                ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/10"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            All Categories
          </button>

          {EMAIL_CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            const count = stats?.categories?.[cat]?.count;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{cat}</span>
                {count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {(category || subCategory) && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Refresh Button */}
        <div className="flex items-center gap-3">
          {emailsLoading && (
            <span className="text-xs text-slate-500 font-medium animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" />
              Updating list...
            </span>
          )}

          <button
            type="button"
            onClick={onRefresh}
            disabled={syncing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1E293B] hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-[#22D3EE]" : ""}`}
            />
            <span>{syncing ? "Syncing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Subcategory Pills (visible if Tier 1 or Tier 2 selected) */}
      {availableSubcategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Subcategory:
          </span>

          <button
            type="button"
            onClick={() => onSubCategoryChange("")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              subCategory === ""
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            All Subcategories
          </button>

          {availableSubcategories.map((sub) => {
            const isSelected = subCategory === sub;
            const count = subCategoryCounts[sub];

            return (
              <button
                key={sub}
                type="button"
                onClick={() => onSubCategoryChange(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{sub}</span>
                {count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmailFilters;
