import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import useApi from "../../hook/useApi";

const ClientReviews = () => {
  const { get, loading, error, data } = useApi();
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from API on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await get("/api/reviews-without-video");
        if (response && response.data && response.data.reviews) {
          setReviews(response.data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  // Transform API data to match the new component structure
  const transformReviews = (apiReviews) => {
    return apiReviews.map((review) => ({
      name: review.name,
      review: review.quote,
      initials: review.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }));
  };

  // Use transformed API data or fallback to original static data
  const displayReviews =
    reviews.length > 0
      ? transformReviews(reviews)
      : [
          {
            name: "Alex Chen",
            review:
              "The video editing transformed our product launches into cinematic experiences. Engagement skyrocketed by 300%!",
            initials: "AC",
          },
          {
            name: "Sarah Martinez",
            review:
              "Working with this team felt like harnessing the power of a supernova. Truly out of this world creativity!",
            initials: "SM",
          },
          {
            name: "Marcus Johnson",
            review:
              "Turned our complex technical content into engaging visual stories that audiences love. Exceptional quality!",
            initials: "MJ",
          },
          {
            name: "Elena Rodriguez",
            review:
              "Lightning-fast delivery without compromising quality. Our social media presence has never been stronger!",
            initials: "ER",
          },
          {
            name: "David Kim",
            review:
              "The AI-powered editing and color grading took our content to professional cinematic levels. Absolutely stellar!",
            initials: "DK",
          },
          {
            name: "Jessica Wang",
            review:
              "From 4K production to multi-platform distribution, they handled everything seamlessly. Highly recommended!",
            initials: "JW",
          },
          {
            name: "Michael Brown",
            review:
              "The results-driven approach delivered measurable ROI. Our video performance metrics speak for themselves!",
            initials: "MB",
          },
          {
            name: "Olivia Taylor",
            review:
              "Exceptional attention to detail and creative vision. Every frame is perfectly crafted for maximum impact.",
            initials: "OT",
          },
        ];

  const marqueeReviews = [...displayReviews, ...displayReviews];

  return (
    <section
      id="reviews"
      className="relative px-4 py-10 overflow-hidden bg-black sm:px-6 lg:px-8"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          {/* Enhanced Badge */}

          {/* Main Title */}
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
            Real Results From
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              Creators I’ve Helped
            </span>
          </h1>
        </div>

        {/* Marquee Section */}
        <div className="relative py-12 overflow-hidden">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="flex space-x-5 animate-marquee-right">
              {marqueeReviews.slice(0, 8).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[360px]">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/40 hover:shadow-[#0084FF]/10 transition-all duration-300 h-full min-h-[200px] flex flex-col overflow-hidden"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0084FF]/5 to-[#66B5FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#0084FF]/20 rounded-tl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#66B5FF]/20 rounded-br-2xl"></div>

                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Name */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0084FF]/20 to-[#66B5FF]/10 shadow-lg shadow-[#0084FF]/10 flex items-center justify-center">
                            <span className="text-base font-bold text-white">
                              {review.initials}
                            </span>
                          </div>
                          {/* Pulsing dot indicator */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0084FF] rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#66B5FF] transition-colors duration-300">
                            {review.name}
                          </h3>
                        </div>
                      </div>

                      {/* Review Text with enhanced styling */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-5 h-5 text-[#0084FF]/40 group-hover:text-[#0084FF]/60 transition-colors duration-300" />
                        <p className="pl-6 pr-2 text-sm font-light leading-relaxed transition-colors duration-300 text-gray-300/90 group-hover:text-gray-200">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-5 h-5 text-[#66B5FF]/40 group-hover:text-[#66B5FF]/60 transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="flex space-x-5 animate-marquee-left">
              {marqueeReviews.slice(4, 12).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[360px]">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/40 hover:shadow-[#66B5FF]/10 transition-all duration-300 h-full min-h-[200px] flex flex-col overflow-hidden"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#66B5FF]/5 to-[#0084FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#66B5FF]/20 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#0084FF]/20 rounded-bl-2xl"></div>

                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Name */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#66B5FF]/20 to-[#0084FF]/10 shadow-lg shadow-[#66B5FF]/10 flex items-center justify-center">
                            <span className="text-base font-bold text-white">
                              {review.initials}
                            </span>
                          </div>
                          {/* Pulsing dot indicator */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#66B5FF] rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#0084FF] transition-colors duration-300">
                            {review.name}
                          </h3>
                        </div>
                      </div>

                      {/* Review Text with enhanced styling */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-5 h-5 text-[#66B5FF]/40 group-hover:text-[#66B5FF]/60 transition-colors duration-300" />
                        <p className="pl-6 pr-2 text-sm font-light leading-relaxed transition-colors duration-300 text-gray-300/90 group-hover:text-gray-200">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-5 h-5 text-[#0084FF]/40 group-hover:text-[#0084FF]/60 transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute top-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute bottom-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

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

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default ClientReviews;
