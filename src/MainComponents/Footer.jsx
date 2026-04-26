import React from "react";
import { motion } from "motion/react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Interview Prep",
      links: ["Blog Articles", "Video Tutorials"]
    },
    {
      title: "Industries",
      links: ["Blog Articles", "Video Tutorials"]
    },
    {
      title: "Company",
      links: ["About Us", "Contact"]
    }
  ];

  const socialIcons = [
    {
      name: "Facebook",
      svg: (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9999 2.6665H19.9999C18.2318 2.6665 16.5361 3.36888 15.2859 4.61913C14.0356 5.86937 13.3333 7.56506 13.3333 9.33317V13.3332H9.33325V18.6665H13.3333V29.3332H18.6666V18.6665H22.6666L23.9999 13.3332H18.6666V9.33317C18.6666 8.97955 18.8071 8.64041 19.0571 8.39036C19.3072 8.14031 19.6463 7.99984 19.9999 7.99984H23.9999V2.6665Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: "Instagram",
      svg: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5834 5.4165H14.5917M5.83341 1.6665H14.1667C16.4679 1.6665 18.3334 3.53198 18.3334 5.83317V14.1665C18.3334 16.4677 16.4679 18.3332 14.1667 18.3332H5.83341C3.53223 18.3332 1.66675 16.4677 1.66675 14.1665V5.83317C1.66675 3.53198 3.53223 1.6665 5.83341 1.6665ZM13.3334 9.47484C13.4363 10.1684 13.3178 10.8767 12.9949 11.499C12.672 12.1213 12.161 12.626 11.5348 12.9412C10.9085 13.2564 10.1988 13.3662 9.50657 13.2548C8.81435 13.1434 8.17488 12.8166 7.67911 12.3208C7.18335 11.825 6.85652 11.1856 6.74514 10.4933C6.63375 9.80113 6.74347 9.09142 7.05869 8.46515C7.3739 7.83888 7.87857 7.32795 8.5009 7.00504C9.12323 6.68212 9.83154 6.56366 10.5251 6.6665C11.2325 6.77141 11.8875 7.10106 12.3932 7.60676C12.8989 8.11246 13.2285 8.7674 13.3334 9.47484Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      svg: (
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 16C35.1826 16 38.2348 17.2643 40.4853 19.5147C42.7357 21.7652 44 24.8174 44 28V42H36V28C36 26.9391 35.5786 25.9217 34.8284 25.1716C34.0783 24.4214 33.0609 24 32 24C30.9391 24 29.9217 24.4214 29.1716 25.1716C28.4214 25.9217 28 26.9391 28 28V42H20V28C20 24.8174 21.2643 21.7652 23.5147 19.5147C25.7652 17.2643 28.8174 16 32 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 18H4V42H12V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: "YouTube",
      svg: (
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0799 12.84C44.8423 11.8908 44.3585 11.0211 43.6772 10.3188C42.996 9.61648 42.1414 9.10637 41.1999 8.84C37.7599 8 23.9999 8 23.9999 8C23.9999 8 10.2399 8 6.79992 8.92C5.85842 9.18637 5.00388 9.69648 4.32262 10.3988C3.64135 11.1011 3.1575 11.9708 2.91992 12.92C2.29035 16.4111 1.98239 19.9526 1.99992 23.5C1.97748 27.0741 2.28546 30.6426 2.91992 34.16C3.18184 35.0797 3.67654 35.9163 4.35621 36.589C5.03589 37.2616 5.87756 37.7476 6.79992 38C10.2399 38.92 23.9999 38.92 23.9999 38.92C23.9999 38.92 37.7599 38.92 41.1999 38C42.1414 37.7336 42.996 37.2235 43.6772 36.5212C44.3585 35.8189 44.8423 34.9492 45.0799 34C45.7046 30.5352 46.0126 27.0207 45.9999 23.5C46.0224 19.9259 45.7144 16.3574 45.0799 12.84Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.4999 30.04L30.9999 23.5L19.4999 16.96V30.04Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-[#F8FAFC]">
      {/* Animated metallic background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#22D3EE] via-[#818CF8] to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#818CF8] via-[#22D3EE] to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative">
        {/* Top metallic border with glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#22D3EE]/60 to-transparent shadow-lg shadow-[#22D3EE]/20" />

        {/* Main content with backdrop blur */}
        <div className="bg-gradient-to-b from-white/40 via-[#F8FAFC]/60 to-[#0F172A]/10 backdrop-blur-2xl border-y border-[#22D3EE]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            {/* Top Section - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
              {/* Brand Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.02 }}>
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0F172A] to-[#22D3EE] bg-clip-text text-transparent mb-3">
                    Hirisonn
                  </h3>
                </motion.div>
                <p className="text-sm text-[#4A5568] leading-relaxed mb-6">
                  Connecting exceptional talent with career-defining opportunities in staffing and recruitment.
                </p>
                {/* Animated metallic bar */}
                <motion.div
                  className="h-1.5 bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#22D3EE] rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(34, 211, 238, 0.5)",
                      "0 0 20px rgba(34, 211, 238, 0.8)",
                      "0 0 10px rgba(34, 211, 238, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Links Sections */}
              {footerLinks.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
                >
                  <div className="group">
                    <h4 className="font-bold text-[#0F172A] text-sm uppercase tracking-widest mb-6 relative inline-block">
                      {section.title}
                      <motion.div
                        className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#22D3EE] to-[#818CF8]"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      />
                    </h4>
                    <ul className="space-y-3 mt-6">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <motion.a
                            href="#"
                            className="text-[#4A5568] hover:text-[#22D3EE] text-sm font-medium transition-all duration-300 flex items-center gap-2 group/link"
                            whileHover={{ x: 4 }}
                          >
                            <motion.span
                              className="w-1 h-1 rounded-full bg-[#22D3EE] opacity-0 group-hover/link:opacity-100"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            />
                            {link}
                          </motion.a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="font-bold text-[#0F172A] text-sm uppercase tracking-widest mb-6 relative inline-block">
                  Connect
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#22D3EE] to-[#818CF8]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {socialIcons.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      className="group/social relative h-14 rounded-xl bg-gradient-to-br from-[#22D3EE]/25 to-[#818CF8]/25 border-2 border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE] hover:text-white hover:border-[#22D3EE]/80 overflow-hidden transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -6 }}
                      whileTap={{ scale: 0.92 }}
                      title={social.name}
                    >
                      {/* Metallic shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/social:opacity-20"
                        animate={{ x: ["−100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#22D3EE]/30 to-[#818CF8]/30 opacity-0 group-hover/social:opacity-100 blur-xl"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center text-xl">
                        {social.svg}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#22D3EE]/30 to-transparent mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* Bottom Section */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xs sm:text-sm text-[#4A5568] font-medium">
                © <span className="text-[#0F172A] font-bold">Hirisonn</span>. All rights reserved.
              </p>

              <div className="flex items-center gap-6 text-xs sm:text-sm">
                {["Privacy Policy", "Terms", "Sitemap"].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <motion.a
                      href="#"
                      className="text-[#4A5568] hover:text-[#22D3EE] font-medium transition-all duration-300"
                      whileHover={{ scale: 1.07 }}
                    >
                      {item}
                    </motion.a>
                    {idx < 2 && <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#818CF8]" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom metallic border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#22D3EE]/60 to-transparent shadow-lg shadow-[#22D3EE]/20" />
      </div>
    </footer>
  );
};

export default Footer;
