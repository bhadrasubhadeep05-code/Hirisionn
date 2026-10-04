import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Mail,
  Users,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Code,
  FileText,
  ExternalLink,
} from "lucide-react";
import { getCategoryBadgeStyle } from "./emailConstants";

/**
 * Construct Gmail search URL targeting specific RFC822 Message-ID
 */
const getGmailMessageUrl = (messageId) => {
  if (!messageId) return null;
  return `https://mail.google.com/mail/u/0/#search/rfc822msgid:${encodeURIComponent(
    messageId
  )}`;
};

const formatDetailDate = (dateStr) => {
  if (!dateStr) return "Unknown Date";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Unknown Date";
    return d.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Unknown Date";
  }
};

const EmailDetail = ({
  email,
  detailLoading,
  detailError,
  onBack,
  onRetry,
}) => {
  const [viewMode, setViewMode] = useState("html"); // 'html' or 'text'
  const [copied, setCopied] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(500);
  const iframeRef = useRef(null);

  const hasHtml = Boolean(email?.html && email.html.trim().length > 0);

  // Auto-switch to plain text if no HTML
  useEffect(() => {
    if (!hasHtml) {
      setViewMode("text");
    } else {
      setViewMode("html");
    }
  }, [hasHtml, email?._id]);

  // Handle iframe content height resizing safely
  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const body = iframeRef.current.contentWindow.document?.body;
        const html = iframeRef.current.contentWindow.document?.documentElement;
        if (body && html) {
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          setIframeHeight(Math.max(height + 40, 400));
        }
      }
    } catch {
      // Cross-origin restriction fallback
      setIframeHeight(600);
    }
  };

  const handleCopyText = async () => {
    const textToCopy = email?.body || "";
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email text:", err);
    }
  };

  const handleOpenInGmail = () => {
    if (!email?.messageId) return;

    const gmailUrl = getGmailMessageUrl(email.messageId);
    if (!gmailUrl) return;

    try {
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Unable to open Gmail tab:", err);
    }
  };

  // 1. Loading state
  if (detailLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Emails
        </button>

        <div className="flex items-center gap-3 text-slate-500 mb-6">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
          <span className="text-base font-medium">Loading email details…</span>
        </div>

        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-2/3 bg-slate-200 rounded-lg" />
          <div className="h-4 w-1/3 bg-slate-100 rounded-md" />
          <div className="h-4 w-1/4 bg-slate-100 rounded-md" />
          <div className="h-px bg-slate-200 my-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-4 w-4/5 bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error state
  if (detailError) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-200 p-8 shadow-sm text-center">
        <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-rose-900 mb-2">
          Unable to load this email
        </h3>
        <p className="max-w-md mx-auto text-sm text-rose-600 mb-6">
          {detailError || "An error occurred while fetching the email details."}
        </p>

        <div className="flex items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Emails
          </button>
        </div>
      </div>
    );
  }

  if (!email) {
    return null;
  }

  const senderName = email.from?.name?.trim();
  const senderEmail = email.from?.email?.trim();
  const displayName = senderName || senderEmail || "Unknown Sender";
  const displaySubject = email.subject?.trim() || "No Subject";
  const formattedDate = formatDetailDate(email.receivedAt);
  const badgeStyle = getCategoryBadgeStyle(email.category);

  // Format recipients
  const recipients =
    email.to && email.to.length > 0
      ? email.to.map((r) => {
          if (r.name && r.email) return `${r.name} <${r.email}>`;
          return r.email || r.name || "Recipient";
        })
      : ["Undisclosed Recipient"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Emails</span>
          </button>

          {/* Action toggle buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Open in Gmail Button */}
            <button
              type="button"
              onClick={handleOpenInGmail}
              disabled={!email?.messageId}
              title={
                email?.messageId
                  ? "Open original email in Gmail"
                  : "Original Gmail message unavailable"
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all group"
            >
              <svg
                className="w-4 h-4 text-rose-600 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              <span>Open in Gmail</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {hasHtml && (
              <div className="inline-flex rounded-xl p-1 bg-slate-200/70 border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode("html")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                    viewMode === "html"
                      ? "bg-white text-indigo-700 shadow-sm font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Formatted (HTML)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("text")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                    viewMode === "text"
                      ? "bg-white text-indigo-700 shadow-sm font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Plain Text
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleCopyText}
              title="Copy plain text body"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subject */}
        <h1 className="text-xl md:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-4 break-words">
          {displaySubject}
        </h1>

        {/* Meta details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* From / Sender */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                From
              </p>
              <p className="text-sm font-bold text-slate-800 break-words">
                {displayName}
              </p>
              {senderName && senderEmail && (
                <p className="text-xs text-slate-500 break-all">{senderEmail}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Date Received
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* To / Recipients */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                To
              </p>
              <p className="text-sm font-medium text-slate-700 break-words">
                {recipients.join(", ")}
              </p>
            </div>
          </div>

          {/* Classification Badges */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Classification
              </p>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                {email.category && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}
                    />
                    {email.category}
                  </span>
                )}

                {email.subCategory && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {email.subCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Body Container */}
      <div className="p-6 md:p-8">
        {viewMode === "html" && hasHtml ? (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-inner">
            <div className="bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-200 flex items-center justify-between">
              <span>Sandboxed Email Viewer</span>
              <span className="text-[11px] text-slate-400">Scripts disabled for security</span>
            </div>
            {/* 
              Sandboxed iframe:
              - No allow-scripts (scripts are completely disabled to prevent XSS)
              - allow-popups allows links to open in a new tab
            */}
            <iframe
              ref={iframeRef}
              srcDoc={email.html}
              sandbox="allow-popups"
              title="Email HTML Content"
              onLoad={handleIframeLoad}
              style={{ height: `${iframeHeight}px`, minHeight: "400px" }}
              className="w-full border-0 bg-white"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
            <pre className="font-sans text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words selection:bg-indigo-100">
              {email.body?.trim() || "No text body content in this email."}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Back Button Bar */}
      <div className="p-6 md:p-8 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Emails</span>
          </button>

          <button
            type="button"
            onClick={handleOpenInGmail}
            disabled={!email?.messageId}
            title={
              email?.messageId
                ? "Open original email in Gmail"
                : "Original Gmail message unavailable"
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-sm font-semibold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <svg
              className="w-4 h-4 text-rose-600 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span>Open in Gmail</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5"
        >
          <span>Scroll to top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </div>
  );
};

export default EmailDetail;
