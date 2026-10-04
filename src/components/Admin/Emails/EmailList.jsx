import React from "react";
import EmailCard from "./EmailCard";
import EmailListSkeleton from "./EmailListSkeleton";
import { Mail, AlertCircle, RefreshCw, SearchX } from "lucide-react";

const EmailList = ({
  emails = [],
  emailsLoading,
  error,
  onSelectEmail,
  category,
  subCategory,
  onRetry,
}) => {
  // 1. Initial or full loading without existing emails
  if (emailsLoading && emails.length === 0) {
    return <EmailListSkeleton count={6} />;
  }

  // 2. Error state
  if (error && !emailsLoading && emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/60 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-rose-900 mb-1">
          Unable to load emails
        </h3>
        <p className="max-w-md text-sm text-rose-600 mb-6">
          {error || "An error occurred while fetching emails. Please check your connection and try again."}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        )}
      </div>
    );
  }

  // 3. Empty state (request finished, zero emails)
  if (!emailsLoading && emails.length === 0) {
    const isFiltered = Boolean(category || subCategory);

    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-12 md:p-16 text-center backdrop-blur-md shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
          {isFiltered ? (
            <SearchX className="h-8 w-8 text-slate-400" />
          ) : (
            <Mail className="h-8 w-8 text-slate-400" />
          )}
        </div>

        <h3 className="text-lg font-bold text-[#0F172A] mb-1">
          {isFiltered
            ? "No emails match the selected filters."
            : "No emails found."}
        </h3>

        <p className="max-w-md text-sm text-slate-500 mb-4">
          {isFiltered
            ? `There are currently no emails classified under ${
                category ? `"${category}"` : ""
              } ${subCategory ? `• "${subCategory}"` : ""}. Try adjusting or resetting your filters.`
            : "Your inbox currently has no synchronized emails. Click Refresh above to check Gmail."}
        </p>
      </div>
    );
  }

  // 4. Render email cards (with subtle opacity if loading in background)
  return (
    <div className="relative">
      {emailsLoading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-2xl z-10 flex items-start justify-center pt-8 pointer-events-none transition-opacity duration-200">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A] text-white text-xs font-semibold shadow-lg">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#22D3EE]" />
            <span>Updating emails...</span>
          </div>
        </div>
      )}

      <div
        className={`space-y-4 transition-opacity duration-200 ${
          emailsLoading ? "opacity-60" : "opacity-100"
        }`}
      >
        {emails.map((email) => (
          <EmailCard
            key={email._id}
            email={email}
            onSelect={onSelectEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
