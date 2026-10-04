import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../MainComponents/NavBar2";
import Footer from "../../MainComponents/Footer";
import AdminEmails from "../../components/Admin/Emails/AdminEmails";
import { ArrowLeft, Mail } from "lucide-react";

const Emails = () => {
  const navigate = useNavigate();
  const adminEmailsRef = React.useRef(null);
  const [isViewingEmail, setIsViewingEmail] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />

      <main className="flex-grow relative px-4 py-20 mt-20">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {isViewingEmail ? (
              <button
                type="button"
                onClick={() => adminEmailsRef.current?.goBackToList()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 hover:text-indigo-600 shadow-sm font-semibold text-sm transition-all mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-indigo-600" />
                <span>Back to Emails</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/admin-panel")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Dashboard</span>
              </button>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] flex items-center gap-3">
                  <span className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                    <Mail className="w-6 h-6 md:w-7 md:h-7" />
                  </span>
                  <span>Email Management</span>
                </h1>
                <p className="mt-2 text-sm md:text-base font-medium text-slate-500">
                  {isViewingEmail
                    ? "Detailed message view and sender classification information."
                    : "Automated Gmail synchronization, categorization, and campus recruitment inbox."}
                </p>
              </div>
            </div>
          </div>

          {/* Admin Email Component */}
          <AdminEmails
            ref={adminEmailsRef}
            onEmailViewChange={setIsViewingEmail}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Emails;
