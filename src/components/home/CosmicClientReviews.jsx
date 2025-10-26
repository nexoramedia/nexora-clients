import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
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
        // Fallback to empty array - you could show an error message instead
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  // Transform API data to match the original component structure
  const transformReviews = (apiReviews) => {
    return apiReviews.map((review) => ({
      name: review.name,
      position: review.position,
      rating: 5, // Default rating since it's not in your schema
      review: review.quote,
      initials: review.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      // Keep the original structure exactly as it was
    }));
  };
  // Use transformed API data or fallback to original static data
  const displayReviews =
    reviews.length > 0
      ? transformReviews(reviews)
      : [
          {
            name: "Alex Chen",
            position: "Marketing Director, TechNova",
            rating: 5,
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
            position: "CEO, QuantumLabs",
            rating: 5,
            review:
              "Turned our complex technical content into engaging visual stories that audiences love. Exceptional quality!",
            initials: "MJ",
          },
          {
            name: "Elena Rodriguez",
            position: "Social Media Manager, CosmicBrands",
            rating: 5,
            review:
              "Lightning-fast delivery without compromising quality. Our social media presence has never been stronger!",
            initials: "ER",
          },
          {
            name: "David Kim",
            position: "Brand Manager, NebulaSoft",
            rating: 5,
            review:
              "The AI-powered editing and color grading took our content to professional cinematic levels. Absolutely stellar!",
            initials: "DK",
          },
          {
            name: "Jessica Wang",
            position: "Content Director, StellarTech",
            rating: 5,
            review:
              "From 4K production to multi-platform distribution, they handled everything seamlessly. Highly recommended!",
            initials: "JW",
          },
          {
            name: "Michael Brown",
            position: "VP Marketing, GalaxyEnterprises",
            rating: 5,
            review:
              "The results-driven approach delivered measurable ROI. Our video performance metrics speak for themselves!",
            initials: "MB",
          },
          {
            name: "Olivia Taylor",
            position: "Creative Lead, UniverseStudios",
            rating: 5,
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
        {/* Header Section - EXACTLY AS ORIGINAL */}
        <div className="mb-10 text-center">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
              Feedback
            </span>
            <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Reduced Main Title */}
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            How we
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              Benefit Our Clients
            </span>
          </h1>
        </div>

        {/* Marquee Section - EXACTLY AS ORIGINAL */}
        <div className="relative py-12 overflow-hidden">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="flex space-x-5 animate-marquee-right">
              {marqueeReviews.slice(0, 8).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Info - EXACTLY AS ORIGINAL */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#0084FF]/20 to-[#66B5FF]/10 rounded-xl shadow-lg shadow-[#0084FF]/5 flex-shrink-0">
                          <div className="text-sm font-bold text-white">
                            {review.initials}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-bold tracking-tight text-white">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {review.position}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating - EXACTLY AS ORIGINAL */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-400">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text - EXACTLY AS ORIGINAL */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-4 h-4 text-[#0084FF]/30" />
                        <p className="pl-4 text-sm font-light leading-relaxed text-gray-300/80">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-4 h-4 text-[#0084FF]/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="flex space-x-5 animate-marquee-left">
              {marqueeReviews.slice(4, 12).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#66B5FF]/20 to-[#0084FF]/10 rounded-xl shadow-lg shadow-[#66B5FF]/5 flex-shrink-0">
                          <div className="text-sm font-bold text-white">
                            {review.initials}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-bold tracking-tight text-white">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {review.position}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-400">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-4 h-4 text-[#66B5FF]/30" />
                        <p className="pl-4 text-sm font-light leading-relaxed text-gray-300/80">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-4 h-4 text-[#66B5FF]/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Gradient Overlays - Perfectly blended with black background */}
          <div className="absolute top-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute top-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute bottom-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>

      {/* Enhanced Custom CSS - EXACTLY AS ORIGINAL */}
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
