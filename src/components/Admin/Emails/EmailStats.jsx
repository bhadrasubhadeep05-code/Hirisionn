import React from "react";
import { Mail, Award, Briefcase, FolderArchive } from "lucide-react";

const EmailStats = ({ stats, statsLoading, selectedCategory, onSelectCategory }) => {
  const cards = [
    {
      id: "",
      label: "Total Emails",
      count: stats?.total,
      icon: Mail,
      color: "from-blue-600 to-indigo-600",
      activeRing: "ring-2 ring-indigo-500",
      bgLight: "bg-blue-50 text-blue-600",
      borderColor: "hover:border-indigo-300",
    },
    {
      id: "Tier 1",
      label: "Tier 1",
      count: stats?.categories?.["Tier 1"]?.count,
      subCategories: stats?.categories?.["Tier 1"]?.subCategories,
      icon: Award,
      color: "from-indigo-600 to-violet-600",
      activeRing: "ring-2 ring-indigo-500",
      bgLight: "bg-indigo-50 text-indigo-600",
      borderColor: "hover:border-indigo-300",
      description: "Placements & Campus Drives",
    },
    {
      id: "Tier 2",
      label: "Tier 2",
      count: stats?.categories?.["Tier 2"]?.count,
      subCategories: stats?.categories?.["Tier 2"]?.subCategories,
      icon: Briefcase,
      color: "from-emerald-600 to-teal-600",
      activeRing: "ring-2 ring-emerald-500",
      bgLight: "bg-emerald-50 text-emerald-600",
      borderColor: "hover:border-emerald-300",
      description: "Internships & Interviews",
    },
    {
      id: "Other",
      label: "Other",
      count: stats?.categories?.["Other"]?.count,
      icon: FolderArchive,
      color: "from-slate-600 to-zinc-700",
      activeRing: "ring-2 ring-slate-600",
      bgLight: "bg-slate-100 text-slate-600",
      borderColor: "hover:border-slate-300",
      description: "General & Uncategorized",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedCategory === card.id;

        return (
          <button
            key={card.label}
            type="button"
            onClick={() => onSelectCategory(card.id)}
            className={`group relative text-left rounded-2xl p-5 md:p-6 transition-all duration-300 bg-white/80 backdrop-blur-md border ${
              isSelected
                ? `${card.activeRing} border-transparent shadow-lg -translate-y-1`
                : `border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${card.borderColor}`
            }`}
          >
            {/* Top gradient highlight for selected */}
            {isSelected && (
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${card.color}`}
              />
            )}

            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {card.label}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${card.bgLight}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              {statsLoading && card.count === undefined ? (
                <div className="h-9 w-20 bg-slate-200 animate-pulse rounded-lg my-1" />
              ) : (
                <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {(card.count ?? 0).toLocaleString()}
                </p>
              )}

              {card.description && (
                <p className="mt-1 text-xs text-slate-500 font-medium truncate">
                  {card.description}
                </p>
              )}
            </div>

            {isSelected && (
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Active Filter
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default EmailStats;
