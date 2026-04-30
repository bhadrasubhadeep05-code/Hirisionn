import React from "react";
import { motion } from "framer-motion";
import NavBar2 from "./NavBar2";
import video from "../assets/contact.mp4";

const ContactUs = () => {


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />

      {/* Human Connection Hero Section */}
      <div className="relative h-[450px] overflow-hidden mt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#0F172A]/65 backdrop-blur-md" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Let's Build the Future Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl"
          >
            Direct lines to our leadership and global headquarters.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-16">
      

        

        {/* Headquarters Hub Section */}
        <div className="mt-24">
          <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-12">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Address & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-[#0F172A]">
                Our Office
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] mt-1 flex-shrink-0"
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
                    <p className="text-[#0F172A] font-medium">
                      First Floor, Seagull Apartment
                    </p>
                    <p className="text-[#0F172A] font-medium">
                      Above Reliance Smart, Sackhi, 831001
                    </p>
                    <p className="text-[#0F172A] font-medium">
                      Jamshedpur, Jharkhad, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] flex-shrink-0"
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
                  <p className="text-[#22D3EE] font-bold text-lg">
                    +91 7870320290
                  </p>
                </div>

                  <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] flex-shrink-0"
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
                  <p className="text-[#22D3EE] font-bold text-lg">
                    +91 7970777984
                  </p>
                </div>

                  <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] flex-shrink-0"
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
                  <p className="text-[#22D3EE] font-bold text-lg">
                    +91 9608704465
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] flex-shrink-0"
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
                  <p className="text-[#818CF8] font-medium">
                    info@hirisionn.com
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-[#22D3EE] flex-shrink-0"
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
                  <p className="text-[#818CF8] font-medium">
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
              className="aspect-video rounded-[2rem] overflow-hidden border-2 border-[#22D3EE]/30 shadow-2xl"
            >
        
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.8651941084745!2d86.20005137509733!3d22.807458479325206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3092db9b98b%3A0x77cd535dd459a553!2sSeagull%20Apartment%2C%20SNP%20Area%2C%20Ambagan%2C%20Sakchi%2C%20Jamshedpur%2C%20Jharkhand%20831001!5e0!3m2!1sen!2sin!4v1777119347986!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 2, filter: "grayscale(10%) contrast(1.2)" }}
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
