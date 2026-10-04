import React from "react";
import { Clock, User, ChevronRight } from "lucide-react";
import { getCategoryBadgeStyle } from "./emailConstants";

/**
 * Format receivedAt date nicely
 */
const formatEmailDate = (dateStr) => {
  if (!dateStr) return "Unknown Date";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Unknown Date";
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Unknown Date";
  }
};

/**
 * Clean plain text snippet for email card preview
 */
const getBodySnippet = (body, maxLength = 160) => {
  if (!body) return "No preview available";
  // Replace newlines and excessive whitespace with a single space
  const cleaned = body.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + "…";
};

const EmailCard = ({ email, onSelect }) => {
  const senderName = email.from?.name?.trim();
  const senderEmail = email.from?.email?.trim();
  const displayName = senderName || senderEmail || "Unknown Sender";
  const displaySubject = email.subject?.trim() || "No Subject";
  const formattedDate = formatEmailDate(email.receivedAt);
  const snippet = getBodySnippet(email.body);
  const badgeStyle = getCategoryBadgeStyle(email.category);

  return (
    <div
      onClick={() => onSelect(email._id)}
      className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Category accent line on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${badgeStyle.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
        {/* Sender & Subject */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 truncate max-w-full">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-slate-800">{displayName}</span>
              {senderName && senderEmail && (
                <span className="text-slate-400 font-normal truncate">
                  &lt;{senderEmail}&gt;
                </span>
              )}
            </span>
          </div>

          <h3 className="text-base md:text-lg font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors line-clamp-1 break-words">
            {displaySubject}
          </h3>
        </div>

        {/* Date and Badges */}
        <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-start gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Badge */}
            {email.category && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                {email.category}
              </span>
            )}

            {/* Subcategory Badge (secondary treatment, omitted if null or empty) */}
            {email.subCategory && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {email.subCategory}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body preview */}
      <p className="text-sm text-slate-600 font-normal line-clamp-2 leading-relaxed break-words">
        {snippet}
      </p>

      {/* Footer subtle action indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="truncate">
          {email.to && email.to.length > 0
            ? `To: ${email.to.map((t) => t.email || t.name).join(", ")}`
            : "Direct Message"}
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View details
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export default EmailCard;
