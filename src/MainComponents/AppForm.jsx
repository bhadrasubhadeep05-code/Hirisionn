import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AppForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experienceLevel: "",
    job: "",
    employer: "",
    currentCTC: "",
    course: "",
    domain: "",
    education: "",
    linkedin: "",
    resume: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setFormData((prev) => ({
        ...prev,
        resume: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (formData.experienceLevel === "experienced") {
      setFormData((prev) => ({
        ...prev,
        course: "",
        domain: "",
      }));
    } else if (formData.experienceLevel === "fresher") {
      setFormData((prev) => ({
        ...prev,
        job: "",
        employer: "",
        currentCTC: "",
      }));
    }
  }, [formData.experienceLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.4 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E0F2FE] py-16 px-4 sm:px-2">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#22D3EE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#818CF8]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">

        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            Connect with a Consultant
          </h1>
          <p className="text-lg text-[#4A5568]">
            Join thousands of professionals transforming their careers
          </p>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/40 rounded-3xl p-8 sm:p-12 border-2 border-[#22D3EE]/30 shadow-2xl shadow-[#0F172A]/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Name */}
              <motion.div variants={formFieldVariants} custom={0} initial="hidden" whileInView="visible">
                <label className="block text-sm font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={formFieldVariants} custom={1} initial="hidden" whileInView="visible">
                <label className="block text-sm font-semibold mb-3">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                />
              </motion.div>

              {/* Dropdown */}
              <motion.div className="sm:col-span-2" variants={formFieldVariants} custom={2} initial="hidden" whileInView="visible">
                <label className="block text-sm font-semibold mb-3">Experience Level</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                >
                  <option value="">Select Experience Level</option>
                  <option value="experienced">Experienced</option>
                  <option value="fresher">Fresher</option>
                </select>
              </motion.div>

              {/* EXPERIENCED */}
              {formData.experienceLevel === "experienced" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Current / Previous Job</label>
                    <input
                      type="text"
                      name="job"
                      placeholder="e.g. Software Engineer"
                      value={formData.job}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Current / Previous Employer</label>
                    <input
                      type="text"
                      name="employer"
                      placeholder="e.g. TCS, Infosys"
                      value={formData.employer}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Current CTC</label>
                    <input
                      type="text"
                      name="currentCTC"
                      placeholder="₹6,00,000"
                      value={formData.currentCTC}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                    />
                  </div>
                </>
              )}

              {/* FRESHER */}
              {formData.experienceLevel === "fresher" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Course</label>
                    <input
                      type="text"
                      name="course"
                      placeholder="e.g. B.Tech in CSE"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Domain</label>
                    <input
                      type="text"
                      name="domain"
                      placeholder="e.g. Web Development, Data Science"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                    />
                  </div>
                </>
              )}

              {/* Education */}
              <motion.div variants={formFieldVariants} custom={6} initial="hidden" whileInView="visible">
                <label className="block text-sm font-semibold mb-3">Highest Education</label>
                <input
                  type="text"
                  name="education"
                  placeholder="e.g. Bachelor of Technology"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                />
              </motion.div>

              {/* LinkedIn */}
              <motion.div variants={formFieldVariants} custom={7} initial="hidden" whileInView="visible">
                <label className="block text-sm font-semibold mb-3">LinkedIn (Optional)</label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                />
              </motion.div>

              {/* Resume */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-3">Upload Resume (Optional)</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-white/60 border-2 border-[#22D3EE]/20"
                />
              </div>

            </div>

            <motion.button
              type="submit"
              className="w-full py-4 px-8 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#22D3EE] to-[#818CF8]"
            >
              {submitted ? "✓ Submitted" : "Register Now"}
            </motion.button>

            {submitted && (
              <div className="p-4 bg-[#22D3EE]/20 border-l-4 border-[#22D3EE] rounded-lg">
                ✓ Thank you! A consultant will reach out to you soon.
              </div>
            )}

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AppForm;