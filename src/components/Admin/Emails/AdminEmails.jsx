import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  getAdminEmails,
  getEmailStats,
  getEmailById,
  syncAdminEmails,
} from "../../../services/emailService";
import EmailStats from "./EmailStats";
import EmailFilters from "./EmailFilters";
import EmailList from "./EmailList";
import EmailPagination from "./EmailPagination";
import EmailDetail from "./EmailDetail";
import { Mail, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

const AdminEmails = forwardRef(({ onEmailViewChange }, ref) => {
  // Independent loading states
  const [initialLoading, setInitialLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // Errors & notices
  const [error, setError] = useState(null);
  const [syncNotice, setSyncNotice] = useState(null);
  const [detailError, setDetailError] = useState(null);

  // Data states
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    count: 0,
  });

  // Filter & pagination parameters
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  // Selected email detail state
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Guard against React 18/19 StrictMode duplicate execution
  const initialSyncExecutedRef = useRef(false);
  const isSyncingRef = useRef(false);

  /**
   * Fetch paginated emails with current or overridden query parameters
   */
  const fetchEmails = useCallback(
    async ({
      pageOverride = page,
      categoryOverride = category,
      subCategoryOverride = subCategory,
    } = {}) => {
      setEmailsLoading(true);
      setError(null);
      try {
        const data = await getAdminEmails({
          page: pageOverride,
          limit,
          category: categoryOverride,
          subCategory: subCategoryOverride,
        });

        if (data && data.success) {
          setEmails(data.emails || []);
          setPagination({
            page: data.page || pageOverride,
            limit: data.limit || limit,
            total: data.total || 0,
            totalPages: data.totalPages || 1,
            count: data.count || 0,
          });
        } else {
          setEmails([]);
          setError(data?.message || "Failed to load emails.");
        }
      } catch (err) {
        console.error("Error fetching emails:", err);
        setError("Unable to load emails. Please try again.");
      } finally {
        setEmailsLoading(false);
      }
    },
    [page, category, subCategory, limit]
  );

  /**
   * Fetch aggregated email stats
   */
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const data = await getEmailStats();
      if (data && data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching email stats:", err);
      // Non-fatal: stats failure shouldn't crash the page
    } finally {
      setStatsLoading(false);
    }
  }, []);

  /**
   * Fetch single email by ID
   */
  const fetchSingleEmail = useCallback(async (id) => {
    if (!id) return;
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await getEmailById(id);
      if (data && data.success && data.email) {
        setSelectedEmail(data.email);
      } else {
        setDetailError(data?.message || "Email not found.");
      }
    } catch (err) {
      console.error("Error fetching email detail:", err);
      setDetailError("Unable to load this email. Please try again.");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  /**
   * Initial page load:
   * 1. syncAdminEmails()
   * 2. fetchEmails() + fetchStats()
   */
  useEffect(() => {
    if (initialSyncExecutedRef.current) return;
    initialSyncExecutedRef.current = true;

    let isMounted = true;

    const initialize = async () => {
      setInitialLoading(true);
      setSyncing(true);
      isSyncingRef.current = true;

      try {
        const syncRes = await syncAdminEmails();
        if (isMounted) {
          if (syncRes && syncRes.count > 0) {
            setSyncNotice({
              type: "success",
              message: `Synchronized ${syncRes.count} new email${
                syncRes.count > 1 ? "s" : ""
              } from Gmail.`,
            });
          } else {
            setSyncNotice({
              type: "info",
              message: "Inbox is up to date.",
            });
          }
        }
      } catch (syncErr) {
        console.warn("Initial Gmail sync warning/error:", syncErr);
        if (isMounted) {
          setSyncNotice({
            type: "warning",
            message:
              "Unable to synchronize with Gmail. Showing previously stored emails.",
          });
        }
      } finally {
        if (isMounted) {
          setSyncing(false);
          isSyncingRef.current = false;
        }
      }

      // Fetch emails and stats in parallel after sync attempt
      try {
        await Promise.all([
          fetchEmails({ pageOverride: 1, categoryOverride: "", subCategoryOverride: "" }),
          fetchStats(),
        ]);
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [fetchEmails, fetchStats]);

  /**
   * Filter / Pagination change handlers (do NOT sync Gmail)
   */
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSubCategory("");
    setPage(1);
    fetchEmails({
      pageOverride: 1,
      categoryOverride: newCategory,
      subCategoryOverride: "",
    });
  };

  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
    setPage(1);
    fetchEmails({
      pageOverride: 1,
      categoryOverride: category,
      subCategoryOverride: newSubCategory,
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchEmails({
      pageOverride: newPage,
      categoryOverride: category,
      subCategoryOverride: subCategory,
    });
    // Scroll to top of list smoothly
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setCategory("");
    setSubCategory("");
    setPage(1);
    fetchEmails({
      pageOverride: 1,
      categoryOverride: "",
      subCategoryOverride: "",
    });
  };

  /**
   * Manual Refresh button handler
   * Sync -> Fetch Emails -> Fetch Stats
   */
  const handleManualRefresh = async () => {
    if (syncing || isSyncingRef.current) return;
    setSyncing(true);
    isSyncingRef.current = true;
    setSyncNotice(null);

    try {
      const syncRes = await syncAdminEmails();
      if (syncRes && syncRes.count > 0) {
        setSyncNotice({
          type: "success",
          message: `Synchronized ${syncRes.count} new email${
            syncRes.count > 1 ? "s" : ""
          } from Gmail.`,
        });
      } else {
        setSyncNotice({
          type: "info",
          message: "Inbox is up to date. No new emails found.",
        });
      }
    } catch (syncErr) {
      console.warn("Manual sync error:", syncErr);
      setSyncNotice({
        type: "warning",
        message: "Unable to synchronize with Gmail at this moment.",
      });
    } finally {
      setSyncing(false);
      isSyncingRef.current = false;
    }

    // Refresh current email list view and stats
    await Promise.all([
      fetchEmails({
        pageOverride: page,
        categoryOverride: category,
        subCategoryOverride: subCategory,
      }),
      fetchStats(),
    ]);
  };

  /**
   * Email selection handlers
   */
  const handleSelectEmail = (emailId) => {
    setSelectedEmailId(emailId);
    fetchSingleEmail(emailId);
    onEmailViewChange?.(true);
  };

  const handleBackToList = () => {
    setSelectedEmailId(null);
    setSelectedEmail(null);
    setDetailError(null);
    onEmailViewChange?.(false);
  };

  useImperativeHandle(ref, () => ({
    goBackToList: handleBackToList,
    isViewingEmail: Boolean(selectedEmailId),
  }));

  // Full-page email loading screen on initial mount
  if (initialLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center py-24 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-[#22D3EE] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 animate-pulse">
            <Mail className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
          Loading Emails...
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-sm">
          Synchronizing your inbox and organizing recruitment emails
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notice Banner (auto dismissible or subtle alert) */}
      {syncNotice && (
        <div
          className={`flex items-center justify-between p-4 rounded-2xl border text-sm font-medium transition-all ${
            syncNotice.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : syncNotice.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {syncNotice.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            {syncNotice.type === "warning" && (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            {syncNotice.type === "info" && (
              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
            )}
            <span>{syncNotice.message}</span>
          </div>

          <button
            type="button"
            onClick={() => setSyncNotice(null)}
            className="text-xs font-semibold px-2 py-1 rounded hover:bg-black/5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content: Email Detail View OR Email Dashboard */}
      {selectedEmailId ? (
        <EmailDetail
          email={selectedEmail}
          detailLoading={detailLoading}
          detailError={detailError}
          onBack={handleBackToList}
          onRetry={() => fetchSingleEmail(selectedEmailId)}
        />
      ) : (
        <>
          {/* Category Statistics Cards */}
          <EmailStats
            stats={stats}
            statsLoading={statsLoading}
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />

          {/* Filter Bar */}
          <EmailFilters
            category={category}
            subCategory={subCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            onResetFilters={handleResetFilters}
            syncing={syncing}
            emailsLoading={emailsLoading}
            onRefresh={handleManualRefresh}
            stats={stats}
          />

          {/* Email List */}
          <EmailList
            emails={emails}
            emailsLoading={emailsLoading}
            error={error}
            onSelectEmail={handleSelectEmail}
            category={category}
            subCategory={subCategory}
            onRetry={() =>
              fetchEmails({
                pageOverride: page,
                categoryOverride: category,
                subCategoryOverride: subCategory,
              })
            }
          />

          {/* Pagination */}
          <EmailPagination
            page={pagination.page}
            limit={pagination.limit}
            total={pagination.total}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            disabled={emailsLoading}
          />
        </>
      )}
    </div>
  );
});

AdminEmails.displayName = "AdminEmails";

export default AdminEmails;
