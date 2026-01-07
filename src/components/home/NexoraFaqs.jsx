import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import useApi from "../../hook/useApi";

const NexoraFaqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { get, loading, error, data } = useApi();
  const [faqs, setFaqs] = useState([]);

  // Fetch FAQs from API on component mount
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await get("/api/faqs");
        if (response && response.data && response.data.faqs) {
          setFaqs(response.data.faqs);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        // Fallback to original static FAQs
        setFaqs(originalFaqs);
      }
    };

    fetchFAQs();
  }, []);

  // Original static FAQs as fallback
  const originalFaqs = [
    {
      question: "How long does the video editing process typically take?",
      answer:
        "Our standard editing timeline is 3-5 business days for most projects. For rush projects, we offer expedited 24-48 hour delivery.",
    },
    {
      question: "Do you work with specific video formats or platforms?",
      answer:
        "We work with all major video formats and optimize content for YouTube, TikTok, Instagram, LinkedIn, and other social platforms.",
    },
    {
      question: "What's included in your content strategy service?",
      answer:
        "Our content strategy includes audience analysis, competitor research, content planning, scripting frameworks, and posting schedules.",
    },
    {
      question: "Can you help with video concept development and scripting?",
      answer:
        "Absolutely! We offer full-service scripting and concept development to create engaging video concepts that resonate with your audience.",
    },
    {
      question: "Do you offer ongoing support and optimization?",
      answer:
        "Yes, we provide continuous optimization based on performance analytics to ensure consistent growth over time.",
    },
    {
      question: "How do you ensure the videos align with our brand identity?",
      answer:
        "We maintain strict brand consistency through custom color grading, motion graphics, and editing styles that reflect your unique identity.",
    },
  ];

  // Use API data or fallback to original static FAQs
  const displayFaqs = faqs.length > 0 ? faqs : originalFaqs;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative px-4 py-20 overflow-hidden bg-black sm:px-6 lg:px-8"
    >
      {/* Simplified Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 bg-[#0084FF] rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-2 h-2 bg-[#66B5FF] rounded-full opacity-30"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0084FF]/5 via-transparent to-[#66B5FF]/5"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Simplified Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Reduced Main Title */}
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            <span className="bg-gradient-to-r from-white via-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
        </motion.div>

        {/* Loading State */}
        {loading && faqs.length === 0 && (
          <div className="flex justify-center mb-8">
            <div className="text-white">Loading FAQs...</div>
          </div>
        )}

        {/* Error State */}
        {error && faqs.length === 0 && (
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="text-red-400">Failed to load FAQs</div>
              <div className="text-sm text-gray-400">Using default FAQs</div>
            </div>
          </div>
        )}

        {/* Simplified FAQ Grid */}
        <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="cursor-pointer"
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg shadow-black/30 hover:shadow-[#0084FF]/10 transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative z-10 flex items-start justify-between w-full gap-4 px-6 py-4 text-left"
                >
                  {/* Question - Bold and Smaller */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold leading-tight text-white md:text-base">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Animated Chevron */}
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-5 h-5 text-[#66B5FF]"
                  >
                    <FaChevronDown className="w-full h-full" />
                  </motion.div>
                </button>

                {/* Answer with Minimal Text */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <motion.p
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-sm font-light leading-relaxed text-gray-300/80"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default NexoraFaqs;
