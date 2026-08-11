import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// eslint-disable-next-line no-unused-vars -- motion is used in JSX below
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, CircleX, TriangleAlert, Info, X } from "lucide-react";

/* =============================================================================
   Reusable Toast Notification System
   -----------------------------------------------------------------------------
   Drop this provider once in main.jsx and then anywhere in your app you can do:

       import { useToast } from "./MainComponents/AlertNotification";
       const toast = useToast();
       toast.success("Saved successfully");
       toast.error("Something went wrong");
       toast.info("Please fill the form");
       toast.warning("Almost there!");

       // advanced:
       toast.show("Custom message", { type: "success", duration: 5000 });

   Works on both desktop and mobile - responsive and animated with Framer Motion.
   ============================================================================ */

const DEFAULT_DURATIONS = {
  success: 3200,
  error: 4200,
  info: 3200,
  warning: 3800,
};

const TOAST_CONFIG = {
  success: {
    icon: CircleCheck,
    iconWrap: "bg-emerald-100 text-emerald-600",
    accent: "bg-emerald-500",
    ring: "ring-emerald-200",
    title: "Success",
  },
  error: {
    icon: CircleX,
    iconWrap: "bg-rose-100 text-rose-600",
    accent: "bg-rose-500",
    ring: "ring-rose-200",
    title: "Error",
  },
  info: {
    icon: Info,
    iconWrap: "bg-sky-100 text-sky-600",
    accent: "bg-sky-500",
    ring: "ring-sky-200",
    title: "Info",
  },
  warning: {
    icon: TriangleAlert,
    iconWrap: "bg-amber-100 text-amber-600",
    accent: "bg-amber-500",
    ring: "ring-amber-200",
    title: "Warning",
  },
};

let toastCounter = 0;

const ToastContext = createContext(null);

// This module intentionally co-exports the ToastProvider component and the
// useToast() hook so consumers can import both from a single file.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export default function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 4,
  dark = false,
}) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  /* Remove a single toast and clear its timer ------------------------------- */
  const dismiss = useCallback((id) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* Remove every toast ------------------------------------------------------ */
  const dismissAll = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
    setToasts([]);
  }, []);

  /* Core push function ------------------------------------------------------- */
  const push = useCallback(
    (message, options = {}) => {
      const type = options.type || "info";
      const duration = options.duration ?? DEFAULT_DURATIONS[type] ?? 3200;
      const id = ++toastCounter;

      setToasts((prev) => {
        const next = [
          ...prev,
          { id, message, type, duration, title: options.title, dismissable: options.dismissable !== false },
        ];
        // Keep the stack capped at `maxToasts` (drop the oldest first).
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      timers.current[id] = setTimeout(() => dismiss(id), duration);

      // Return a small handle so callers can imperatively dismiss.
      return {
        id,
        dismiss: () => dismiss(id),
        update: (patch) =>
          setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))),
      };
    },
    [dismiss, maxToasts]
  );

  /* Pause / resume the auto-dismiss timer on hover -------------------------- */
  const pause = useCallback(
    (id) => {
      if (timers.current[id]) {
        clearTimeout(timers.current[id]);
        delete timers.current[id];
      }
    },
    []
  );

  const resume = useCallback(
    (id, duration) => {
      if (timers.current[id]) return;
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  /* Cleanup all timers on unmount ------------------------------------------- */
  useEffect(() => () => {
    Object.values(timers.current).forEach(clearTimeout);
  }, []);

  const api = useMemo(
    () => ({
      show: push,
      success: (message, opts) => push(message, { ...opts, type: "success" }),
      error: (message, opts) => push(message, { ...opts, type: "error" }),
      info: (message, opts) => push(message, { ...opts, type: "info" }),
      warning: (message, opts) => push(message, { ...opts, type: "warning" }),
      dismiss,
      dismissAll,
    }),
    [push, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <ToastStack
        toasts={toasts}
        position={position}
        dark={dark}
        onDismiss={dismiss}
        onPause={pause}
        onResume={resume}
      />
    </ToastContext.Provider>
  );
}
/* -----------------------------------------------------------------------------
   Toast stack container - responsive placement
-------------------------------------------------------------------------------- */
function ToastStack({ toasts, position, dark, onDismiss, onPause, onResume }) {
  const placements = {
    "top-right": "inset-x-4 top-4 sm:inset-x-auto sm:right-5 sm:top-5 sm:items-end",
    "top-center": "inset-x-4 top-4 items-center",
    "bottom-right": "inset-x-4 bottom-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end",
    "bottom-center": "inset-x-4 bottom-4 items-center",
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={`pointer-events-none fixed z-[9999] flex max-h-screen flex-col gap-3 overflow-hidden p-1 ${
        placements[position] || placements["top-right"]
      }`}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            dark={dark}
            onDismiss={onDismiss}
            onPause={onPause}
            onResume={onResume}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* -----------------------------------------------------------------------------
   A single toast card
-------------------------------------------------------------------------------- */
function ToastItem({ toast, dark, onDismiss, onPause, onResume }) {
  const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
  const Icon = config.icon;

  const surface = dark
    ? "bg-slate-900/95 text-white ring-white/15 shadow-2xl shadow-black/40"
    : "bg-white/95 text-slate-800 ring-slate-900/10 shadow-2xl shadow-black/20 backdrop-blur-sm";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      onMouseEnter={() => onPause(toast.id)}
      onMouseLeave={() => onResume(toast.id, toast.duration)}
      role="status"
      className={`pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl p-4 pr-10 ring-1 sm:w-[22rem] ${surface}`}
    >
      {/* left accent bar */}
      <span className={`absolute bottom-0 left-0 top-0 w-1 ${config.accent}`} />

      {/* icon chip */}
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ${config.iconWrap} ${config.ring}`}
      >
        <Icon className="h-5 w-5" />
      </span>

      {/* message */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-bold tracking-tight ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          {toast.title || config.title}
        </p>
        <p
          className={`mt-0.5 break-words text-sm leading-snug ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {toast.message}
        </p>
      </div>

      {/* dismiss button */}
      {toast.dismissable && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(toast.id)}
          className={`absolute right-2 top-2.5 flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
            dark
              ? "text-slate-400 hover:bg-white/10 hover:text-white"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
