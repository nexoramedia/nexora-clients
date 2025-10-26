import React, { memo, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaChartLine,
  FaUsers,
  FaRocket,
  FaStar,
  FaEye,
  FaUserPlus,
  FaChevronLeft,
  FaChevronRight,
  FaPodcast,
  FaVideo,
  FaShareAlt,
  FaMagic,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useReviews } from "../../hook/useReview";
import StatsSection from "./StatsSection";

// Enhanced Balloon Tag Component with Icons
const BalloonTag = memo(({ text, delay = 0, direction, icon: Icon }) => {
  const positions = useMemo(() => {
    const pos = {
      topLeft: "top-2 left-2",
      topRight: "top-2 right-2",
      topCenter: "top-2 left-1/2 -translate-x-1/2",
      bottomLeft: "bottom-2 left-2",
      bottomRight: "bottom-2 right-2",
      bottomCenter: "bottom-2 left-1/2 -translate-x-1/2",
      middleLeft: "top-1/2 left-2 -translate-y-1/2",
      middleRight: "top-1/2 right-2 -translate-y-1/2",
    };
    return pos[direction] || pos.topCenter;
  }, [direction]);

  const balloonVariants = useMemo(() => {
    const baseVariants = {
      topLeft: {
        x: [0, -1, -2],
        y: [0, -1, -2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 5, 10],
      },
      topCenter: {
        x: [0, 0, 0],
        y: [0, -2, -3],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 0, 0],
      },
      topRight: {
        x: [0, 1, 2],
        y: [0, -1, -2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -5, -10],
      },
      bottomLeft: {
        x: [0, -1, -2],
        y: [0, 1, 2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -5, -10],
      },
      bottomCenter: {
        x: [0, 0, 0],
        y: [0, 2, 3],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 0, 0],
      },
      bottomRight: {
        x: [0, 1, 2],
        y: [0, 1, 2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 5, 10],
      },
      middleLeft: {
        x: [0, -2, -3],
        y: [0, 0, 0],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -3, -5],
      },
      middleRight: {
        x: [0, 2, 3],
        y: [0, 0, 0],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 3, 5],
      },
    };
    return baseVariants[direction] || baseVariants.topCenter;
  }, [direction]);

  const stringVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.4,
        delay: delay + 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getStringPath = () => {
    let endX = 0;
    let endY = 0;

    switch (direction) {
      case "topLeft":
        endX = -15;
        endY = -15;
        break;
      case "topCenter":
        endX = 0;
        endY = -20;
        break;
      case "topRight":
        endX = 15;
        endY = -15;
        break;
      case "bottomLeft":
        endX = -15;
        endY = 15;
        break;
      case "bottomCenter":
        endX = 0;
        endY = 20;
        break;
      case "bottomRight":
        endX = 15;
        endY = 15;
        break;
      case "middleLeft":
        endX = -25;
        endY = 0;
        break;
      case "middleRight":
        endX = 25;
        endY = 0;
        break;
      default:
        endX = 0;
        endY = -20;
    }

    return `M 0 0 Q ${endX / 2} ${endY / 2} ${endX} ${endY}`;
  };

  return (
    <motion.div
      className={`absolute ${positions} z-20`}
      initial={{
        opacity: 0,
        x: balloonVariants.x[0],
        y: balloonVariants.y[0],
        scale: balloonVariants.scale[0],
        rotateZ: balloonVariants.rotateZ[0],
      }}
      whileInView={{
        opacity: balloonVariants.opacity[2],
        x: balloonVariants.x[2],
        y: balloonVariants.y[2],
        scale: balloonVariants.scale[2],
        rotateZ: balloonVariants.rotateZ[2],
      }}
      whileHover={{
        scale: 1.1,
        y: balloonVariants.y[2] - 0.5,
        rotateZ: balloonVariants.rotateZ[2] + 2,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 60,
        damping: 12,
        mass: 0.8,
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        className="absolute top-0 -translate-x-1/2 -translate-y-full pointer-events-none left-1/2"
        width="30"
        height="30"
        style={{ marginTop: "-1px" }}
      >
        <motion.path
          d={getStringPath()}
          stroke="rgba(0, 132, 255, 0.3)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,2"
          variants={stringVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
      </svg>

      <motion.div
        className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 backdrop-blur-sm border border-[#0084FF]/30 text-white font-medium shadow-lg"
        whileHover={{
          background:
            "linear-gradient(135deg, rgba(0, 132, 255, 0.25), rgba(0, 102, 204, 0.25))",
          borderColor: "rgba(0, 132, 255, 0.5)",
          boxShadow: "0 6px 20px rgba(0, 132, 255, 0.25)",
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              y: [0, -1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center"
          >
            <Icon className="w-3 h-3 text-[#0084FF]" />
          </motion.div>
          <span className="text-sm font-semibold whitespace-nowrap">
            {text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Enhanced Compact Stat Cards
const StatCard = memo(({ icon: Icon, number, caption, delay = 0 }) => {
  return (
    <motion.div
      className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg border border-gray-700/50 hover:border-[#0084FF]/50 transition-all duration-500"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 border border-[#0084FF]/30 flex items-center justify-center group-hover:from-[#0084FF]/30 group-hover:to-[#0066CC]/30 transition-all duration-300"
          whileHover={{
            scale: 1.05,
            rotate: 5,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
        >
          <Icon className="w-3 h-3 text-[#0084FF] group-hover:text-[#66B5FF] transition-colors duration-300" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white mb-0.5">{number}</h3>
          <p className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

// YouTube URL handler for both regular videos and Shorts
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    // Extract video ID from various YouTube URL formats
    // Supports:
    // - youtu.be/Hjj5i_w6Iog (Shorts style)
    // - youtube.com/shorts/Hjj5i_w6Iog (Shorts)
    // - youtube.com/watch?v=Hjj5i_w6Iog (Regular)
    const regex =
      /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
      // Use the same embed URL format for both Shorts and regular videos
      // YouTube automatically handles the Shorts interface in embed
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;
    }
  } catch (error) {
    console.error("Error extracting YouTube embed URL:", error);
  }

  return null;
};

const isYouTubeShorts = (url) => {
  return url && (url.includes("/shorts/") || url.includes("youtu.be/"));
};

// Simple Customer Review Card Component
const CustomerReviewCard = memo(({ review, isActive }) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const youtubeEmbedUrl = useMemo(() => {
    return getYouTubeEmbedUrl(review.videoUrl);
  }, [review.videoUrl]);

  const isShorts = useMemo(() => {
    return isYouTubeShorts(review.videoUrl);
  }, [review.videoUrl]);

  return (
    <motion.div
      className={`bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      layout
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
    >
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Video Section - Optimized for Shorts */}
        <div className="relative flex items-center justify-center p-4">
          <motion.div
            className="relative overflow-hidden bg-black border-2 border-gray-700 rounded-2xl"
            style={{
              width: "260px",
              height: "460px",
              // Force vertical aspect ratio for Shorts-like appearance
              aspectRatio: "9/16",
            }}
            whileHover={{
              borderColor: "rgba(0, 132, 255, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Direct YouTube Embed - Loads directly */}
            {review.videoUrl && youtubeEmbedUrl ? (
              <div className="w-full h-full">
                <iframe
                  src={youtubeEmbedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${review.name}'s YouTube ${
                    isShorts ? "Short" : "Video"
                  }`}
                  // Important for mobile responsiveness
                  style={{
                    display: "block",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
              </div>
            ) : (
              // Simple fallback when no video URL
              <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center text-white bg-gradient-to-br from-gray-900 to-black">
                <FaPlay className="w-10 h-10 mb-3 text-[#0084FF]" />
                <p className="text-xs font-semibold">Video Content</p>
                {isShorts && (
                  <p className="mt-1 text-xs text-gray-400">YouTube Short</p>
                )}
              </div>
            )}

            {/* YouTube Shorts Badge */}
            {isShorts && (
              <motion.div
                className="absolute top-3 left-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-600 rounded-lg">
                  <FaVideo className="w-2.5 h-2.5 text-white" />
                  <span className="text-xs font-bold text-white">SHORTS</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Compact Review Content */}
        <div className="flex flex-col justify-center p-4">
          {/* Customer Info - Compact */}
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {review.profileImage ? (
              <motion.img
                src={review.profileImage}
                alt={review.name}
                className="w-8 h-8 rounded-lg border border-[#0084FF]/30"
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: {
                    duration: 0.3,
                  },
                }}
              />
            ) : (
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0084FF] to-[#0066CC] flex items-center justify-center text-white font-bold text-xs border border-[#0084FF]/30"
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                {getInitials(review.name)}
              </motion.div>
            )}
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">
                {review.name}
              </h3>
              <p className="text-xs text-gray-400">{review.position}</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <FaStar className="w-2 h-2 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Review Text - Compact */}
          <motion.blockquote
            className="mb-3 text-xs leading-relaxed text-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {review.quote}
          </motion.blockquote>

          {/* Compact Metrics */}
          <motion.div
            className="flex items-center gap-2 py-2 border-t border-gray-800"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Views */}
            <motion.div
              className="flex items-center gap-1.5"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-7 h-7 rounded-md bg-[#0084FF]/10 flex items-center justify-center border border-[#0084FF]/20">
                <FaEye className="w-3 h-3 text-[#0084FF]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {review.views}
                </div>
                <div className="text-xs text-gray-400">Views</div>
              </div>
            </motion.div>

            {/* Subscribers */}
            <motion.div
              className="flex items-center gap-1.5"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center justify-center border rounded-md w-7 h-7 bg-green-500/10 border-green-500/20">
                <FaUserPlus className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {review.subscribers}
                </div>
                <div className="text-xs text-gray-400">Subscribers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="flex items-center justify-between mt-2 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <span>Joined: {review.joined}</span>
            <span>Results: {review.results}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

// Enhanced Customer Reviews Carousel Component
const CustomerReviewsCarousel = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use the custom hook to fetch reviews
  const { reviews, loading, error } = useReviews();

  // Fallback data with your actual YouTube Shorts URL
  const fallbackReviews = useMemo(
    () => [
      {
        id: 1,
        name: "John Smith",
        profileImage: "",
        position: "Creative Agency",
        quote:
          "This service completely transformed our content strategy. We went from struggling to get views to consistently going viral!",
        views: "1M+",
        subscribers: "50K+",
        joined: "Mar 2024",
        results: "3 months",
        videoUrl: "https://youtu.be/Hjj5i_w6Iog?si=0sspqt-0XtpjIUZR", // Your YouTube Shorts URL
        thumbnailUrl: "",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        profileImage: "",
        position: "Media Company",
        quote:
          "The viral editing techniques helped us grow our audience exponentially. Best investment we've made!",
        views: "2.5M+",
        subscribers: "75K+",
        joined: "Feb 2024",
        results: "4 months",
        videoUrl: "https://youtube.com/shorts/xyz789short", // Example YouTube Shorts URL
        thumbnailUrl: "",
      },
      {
        id: 3,
        name: "Mike Chen",
        profileImage: "",
        position: "Tech Startup",
        quote:
          "Our engagement rates skyrocketed after implementing their strategies. Absolutely phenomenal results!",
        views: "3.2M+",
        subscribers: "120K+",
        joined: "Jan 2024",
        results: "5 months",
        videoUrl: "https://www.youtube.com/watch?v=regularvideoid", // Example regular YouTube URL
        thumbnailUrl: "",
      },
    ],
    []
  );

  // Use fetched reviews or fallback
  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  const nextSlide = useCallback(() => {
    if (isAnimating || displayReviews.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, displayReviews.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || displayReviews.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + displayReviews.length) % displayReviews.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, displayReviews.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || displayReviews.length === 0) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, displayReviews.length]
  );

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center max-w-6xl py-16 mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 mx-auto mb-3 border-4 border-[#0084FF] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-gray-400">Loading success stories...</p>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (error && reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-400">Showing demo success stories</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      id="about"
    >
      {/* Section Title */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          Hear what they're Saying about us
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-gray-400">
          See how businesses like yours achieved incredible results with our
          viral content strategies
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons - Only show if there are reviews */}
        {displayReviews.length > 1 && (
          <>
            <motion.button
              onClick={prevSlide}
              className="absolute z-20 flex items-center justify-center w-8 h-8 transition-all duration-300 -translate-y-1/2 border border-gray-600 rounded-lg left-2 top-1/2 bg-black/50 hover:bg-black/70"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0,0,0,0.7)",
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="w-3 h-3 text-white" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute z-20 flex items-center justify-center w-8 h-8 transition-all duration-300 -translate-y-1/2 border border-gray-600 rounded-lg right-2 top-1/2 bg-black/50 hover:bg-black/70"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0,0,0,0.7)",
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="w-3 h-3 text-white" />
            </motion.button>
          </>
        )}

        {/* Carousel Slides */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            {displayReviews.map((review, index) => (
              <div
                key={review._id || review.id}
                className="flex-shrink-0 w-full px-3"
              >
                <CustomerReviewCard
                  review={review}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Dots Indicator - Only show if there are multiple reviews */}
        {displayReviews.length > 1 && (
          <div className="flex justify-center mt-6 space-x-1.5">
            {displayReviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-lg transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#0084FF]"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  opacity: index === currentIndex ? 1 : 0.7,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

const AboutSection = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const balloons = useMemo(
    () => [
      { text: "Podcast", direction: "topLeft", delay: 0.2, icon: FaPodcast },
      { text: "Short Form", direction: "topRight", delay: 0.3, icon: FaVideo },
      {
        text: "Social Media",
        direction: "bottomLeft",
        delay: 0.4,
        icon: FaShareAlt,
      },
      {
        text: "Viral Edits",
        direction: "bottomRight",
        delay: 0.5,
        icon: FaMagic,
      },
    ],
    []
  );

  // Compact stats
  const stats = useMemo(
    () => [
      {
        icon: FaChartLine,
        number: "200% Growth",
        caption: "Engagement",
        delay: 0.8,
      },
      {
        icon: FaUserPlus,
        number: "5x More Reach",
        caption: "Strategic Distribution",
        delay: 0.7,
      },
      {
        icon: FaEye,
        number: "50% More Leads",
        caption: "Automated Systems",
        delay: 0.6,
      },
    ],
    []
  );

  return (
    <section
      id="about"
      className="relative flex items-center min-h-screen px-4 py-16 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0084FF]/10 rounded-full blur-[60px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0066CC]/5 rounded-full blur-[40px]"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative flex items-center justify-center mb-12">
          {balloons.map((balloon, index) => (
            <BalloonTag
              key={index}
              text={balloon.text}
              direction={balloon.direction}
              delay={balloon.delay}
              icon={balloon.icon}
            />
          ))}

          <motion.div
            ref={ref}
            className="relative z-30 mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Tired of boring video content
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                that doesn't stand out?
              </motion.span>
            </motion.h1>
          </motion.div>
        </div>

        <StatsSection stats={stats} />

        {/* Customer Reviews Carousel */}
        <div className="mb-8">
          <CustomerReviewsCarousel />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: "-50px" }}
        ></motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
