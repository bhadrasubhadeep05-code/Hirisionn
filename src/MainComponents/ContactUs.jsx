import React from "react";
import { motion } from "framer-motion";
import NavBar2 from "./NavBar2";

const ContactUs = () => {


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
      <NavBar2 progress={1} />

      {/* Human Connection Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-24 md:mt-24 md:py-52"
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)]" />
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.30)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px]" />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Let's Build the Future Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-[#AAB5BA]"
          >
            Direct lines to our leadership and global headquarters.
          </motion.p>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mx-auto mt-8 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
          />
        </div>
      </motion.section>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 md:px-8">
        {/* Headquarters Hub Section */}
        <div>
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            Contact Us
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center leading-relaxed text-slate-600">Whether you&apos;re looking for talent or exploring a partnership, our team is ready to help.</p>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Address & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative rounded-[2rem] border border-white bg-white p-8 shadow-xl md:p-10"
            >
              <div className="absolute bottom-10 left-0 top-10 w-1 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]" />
              <p className="mb-2 pl-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8791E]">Visit or call us</p>
              <h3 className="mb-8 pl-4 text-2xl font-bold text-[#0F172A]">
                Our Office
              </h3>

              <div className="space-y-6 pl-4">
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-6 w-6 flex-shrink-0 text-[#E8791E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-[#0F172A]">
                      First Floor, Seagull Apartment
                    </p>
                    <p className="font-medium text-[#0F172A]">
                      Above Reliance Smart, Sakchi, 831001
                    </p>
                    <p className="font-medium text-[#0F172A]">
                      Jamshedpur, Jharkhand, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#E8791E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="text-lg font-bold text-[#0F172A]">
                    +91 9296809431
                  </p>
                </div>

                  <div className="flex items-center gap-4">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#E8791E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="text-lg font-bold text-[#0F172A]">
                    +91 7970777984
                  </p>
                </div>

                 

                <div className="flex items-center gap-4">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#E8791E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="font-medium text-slate-600">
                    info@hirisionn.com
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#E8791E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium text-slate-600">
                    Mon - Sat: 10:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative aspect-video overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl"
            >
              <div className="pointer-events-none absolute -bottom-5 -left-5 z-10 h-full w-full rounded-[2rem] bg-[#E8791E]/15" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.8651941084745!2d86.20005137509733!3d22.807458479325206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3092db9b98b%3A0x77cd535dd459a553!2sSeagull%20Apartment%2C%20SNP%20Area%2C%20Ambagan%2C%20Sakchi%2C%20Jamshedpur%2C%20Jharkhand%20831001!5e0!3m2!1sen!2sin!4v1777119347986!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="relative z-20"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
