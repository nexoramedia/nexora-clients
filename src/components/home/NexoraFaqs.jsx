import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaRocket,
  FaVideo,
  FaEdit,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
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
        "Our standard editing timeline is 3-5 business days for most projects. For rush projects, we offer expedited 24-48 hour delivery. The exact timeline depends on video length, complexity, and the specific services required.",
      icon: FaVideo,
    },
    {
      question: "Do you work with specific video formats or platforms?",
      answer:
        "We work with all major video formats and optimize content for YouTube, TikTok, Instagram, LinkedIn, and other social platforms. We also provide platform-specific formatting and best practices to maximize engagement.",
      icon: FaRocket,
    },
    {
      question: "What's included in your content strategy service?",
      answer:
        "Our content strategy includes audience analysis, competitor research, content planning, scripting frameworks, posting schedules, and performance tracking. We create a customized roadmap to help you consistently attract your dream clients.",
      icon: FaChartLine,
    },
    {
      question: "Can you help with video concept development and scripting?",
      answer:
        "Absolutely! We offer full-service scripting and concept development. Our team will help you develop engaging video concepts, write conversion-focused scripts, and create storyboards that resonate with your target audience.",
      icon: FaEdit,
    },
    {
      question: "Do you offer ongoing support and optimization?",
      answer:
        "Yes, we provide continuous optimization based on performance analytics. We track your video metrics, A/B test thumbnails, and refine strategies to ensure consistent growth and lead generation over time.",
      icon: FaUsers,
    },
    {
      question: "How do you ensure the videos align with our brand identity?",
      answer:
        "We start with a comprehensive brand discovery session to understand your voice, style, and goals. Our team maintains strict brand consistency through custom color grading, motion graphics, and editing styles that reflect your unique identity.",
      icon: FaVideo,
    },
  ];

  // Transform API data to match component structure with icons
  const transformFAQs = (apiFaqs) => {
    const iconMap = {
      video: FaVideo,
      rocket: FaRocket,
      chart: FaChartLine,
      edit: FaEdit,
      users: FaUsers,
      default: FaVideo,
    };

    return apiFaqs.map((faq, index) => {
      // Use icon from API if available, otherwise use from original FAQs or default
      let icon = FaVideo;
      if (faq.icon && iconMap[faq.icon]) {
        icon = iconMap[faq.icon];
      } else if (originalFaqs[index] && originalFaqs[index].icon) {
        icon = originalFaqs[index].icon;
      }

      return {
        question: faq.question,
        answer: faq.answer,
        icon: icon,
      };
    });
  };

  // Use transformed API data or fallback to original static FAQs
  const displayFaqs = faqs.length > 0 ? transformFAQs(faqs) : originalFaqs;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative px-4 py-20 overflow-hidden bg-black sm:px-6 lg:px-8"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-[#0084FF] rounded-full opacity-20"
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
          className="absolute top-40 right-20 w-3 h-3 bg-[#66B5FF] rounded-full opacity-30"
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
        <motion.div
          className="absolute bottom-40 left-20 w-5 h-5 bg-[#0084FF] rounded-full opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0084FF]/5 via-transparent to-[#66B5FF]/5"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-xl border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084FF]/20 to-[#66B5FF]/20 blur-xl"></div>
            <div className="w-2 h-2 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-bold text-sm tracking-widest relative z-10">
              Any queries you have
            </span>
            <div className="w-2 h-2 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Reduced Main Title */}
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-white via-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent bg-size-200 animate-gradient">
              Questions you may Ask
            </span>
          </h1>
        </motion.div>

        {/* Loading State */}
        {loading && faqs.length === 0 && (
          <div className="flex justify-center mb-12">
            <div className="text-lg text-white">Loading FAQs...</div>
          </div>
        )}

        {/* Error State */}
        {error && faqs.length === 0 && (
          <div className="flex justify-center mb-12">
            <div className="text-center">
              <div className="mb-2 text-lg text-red-400">
                Failed to load FAQs
              </div>
              <div className="text-sm text-gray-400">Using default FAQs</div>
            </div>
          </div>
        )}

        {/* Enhanced FAQ Grid */}
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 hover:shadow-[#0084FF]/20 transition-all duration-500 overflow-hidden relative">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0084FF]/0 via-[#66B5FF]/0 to-[#0084FF]/0 group-hover:from-[#0084FF]/5 group-hover:via-[#66B5FF]/5 group-hover:to-[#0084FF]/5 transition-all duration-500"></div>

                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative z-10 flex items-start justify-between w-full gap-6 px-8 py-6 text-left"
                >
                  <div className="flex items-start flex-1 gap-5">
                    {/* Icon Container */}
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0084FF] to-[#66B5FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0084FF]/30 group-hover:shadow-[#0084FF]/50 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <faq.icon className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Question */}
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#66B5FF] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Animated Chevron */}
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-6 h-6 text-[#66B5FF] group-hover:text-[#0084FF] transition-colors duration-300 mt-1"
                  >
                    <FaChevronDown className="w-full h-full" />
                  </motion.div>
                </button>

                {/* Answer with Enhanced Animation */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="pl-17 border-l-2 border-[#0084FF]/40">
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base font-light leading-relaxed text-gray-300/90"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
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

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default NexoraFaqs;
