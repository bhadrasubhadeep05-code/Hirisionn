import React from "react";

const EmailListSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-4 w-48 bg-slate-200 rounded-md animate-pulse" />
              </div>
              <div className="h-5 w-3/4 max-w-md bg-slate-200 rounded-md animate-pulse" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
              <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3.5 w-4/5 bg-slate-100 rounded animate-pulse" />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
            <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailListSkeleton;
