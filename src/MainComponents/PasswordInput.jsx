import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ---------------------------------------------------------------
// Shared styled helpers (highlight password fields with errors)
// ---------------------------------------------------------------
const inputBase =
  "w-full px-5 py-3.5 rounded-2xl bg-[#F8FAFC] border text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white shadow-sm";
const inputActive = " border-slate-200 focus:ring-[#E8791E]";
const inputError = " border-red-400 bg-red-50 focus:ring-red-400";
const inputClass = (hasError) => `${inputBase}${hasError ? inputError : inputActive}`;

// ---------------------------------------------------------------
// Password input with a show / hide (eye) toggle
// ---------------------------------------------------------------
const PasswordInput = ({ name, value, onChange, error, placeholder, autoComplete }) => {
  const [visible, setVisible] = useState(false);
  const inputId = `password-${name}`;

  return (
    <div className="relative">
      <input
        id={inputId}
        type={visible ? "text" : "password"}
        name={name}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass(error)} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        title={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors duration-200 hover:text-[#E8791E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]/40"
      >
        <AnimatePresence mode="wait" initial={false}>
          {visible ? (
            <motion.svg
              key="eye-off"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </motion.svg>
          ) : (
            <motion.svg
              key="eye"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default PasswordInput;