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

// Enhanced Balloon Tag Component with Icons - Responsive
const BalloonTag = memo(({ text, delay = 0, direction, icon: Icon }) => {
  const positions = useMemo(() => {
    const pos = {
      topLeft: "sm:top-2 sm:left-2 top-[-40px] left-2",
      topRight: "sm:top-2 sm:right-2 top-[-40px] right-2",
      topCenter: "sm:top-2 left-1/2 -translate-x-1/2 top-[-40px]",
      bottomLeft: "sm:bottom-2 sm:left-2 bottom-[-40px] left-2",
      bottomRight: "sm:bottom-2 sm:right-2 bottom-[-40px] right-2",
      bottomCenter: "sm:bottom-2 left-1/2 -translate-x-1/2 bottom-[-40px]",
      middleLeft: "top-1/2 sm:left-2 left-1 -translate-y-1/2",
      middleRight: "top-1/2 sm:right-2 right-1 -translate-y-1/2",
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
        className="sm:px-4 sm:py-2 sm:rounded-xl px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 backdrop-blur-sm border border-[#0084FF]/30 text-white font-medium shadow-lg"
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
            <Icon className="w-3 h-3 text-[#0084FF] sm:w-3 sm:h-3" />
          </motion.div>
          <span className="text-sm font-semibold whitespace-nowrap sm:text-sm">
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
    const regex =
      /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
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

// Redesigned Customer Review Card Component - Updated Color Palette
const CustomerReviewCard = memo(({ review, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const youtubeEmbedUrl = useMemo(() => {
    return getYouTubeEmbedUrl(review.videoUrl);
  }, [review.videoUrl]);

  const isShorts = useMemo(() => {
    return isYouTubeShorts(review.videoUrl);
  }, [review.videoUrl]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 ${
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
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        {/* Video Section - Updated Colors */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-white/10 aspect-[9/16] max-w-[260px] mx-auto">
            {/* Video Container */}
            <div className="relative w-full h-full">
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
                    style={{
                      display: "block",
                      border: "none",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              ) : (
                // Fallback video container with play button
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 z-10 flex items-center justify-center"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.button
                        onClick={handlePlayClick}
                        className="backdrop-blur-[25px] bg-white/10 rounded-full p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center gap-2 px-4 py-2">
                          <div className="flex items-center justify-center w-6 h-6">
                            <FaPlay className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white">
                            Play
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Video Placeholder */}
                  <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center text-white">
                    <FaVideo className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="text-sm font-semibold text-gray-400">
                      Video Content
                    </p>
                    {isShorts && (
                      <p className="mt-1 text-xs text-gray-500">
                        YouTube Short
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* YouTube Shorts Badge */}
            {isShorts && (
              <motion.div
                className="absolute top-3 left-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-lg">
                  <FaVideo className="w-2.5 h-2.5 text-white" />
                  <span className="text-xs font-bold text-white">SHORTS</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Review Content - Updated Colors */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Rating and Name */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{review.name}</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-[#0084FF] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <motion.blockquote
              className="text-[15px] leading-relaxed text-gray-300 font-light"
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
          </div>

          {/* Results Metrics - Updated Colors */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {/* Views Result */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#0084FF]/20 flex items-center justify-center border border-[#0084FF]/30">
                <FaEye className="w-3 h-3 text-[#0084FF]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-300">
                  {review.views}
                </div>
              </div>
            </motion.div>

            {/* Subscribers Result */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#66B5FF]/20 flex items-center justify-center border border-[#66B5FF]/30">
                <FaUserPlus className="w-3 h-3 text-[#66B5FF]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-300">
                  {review.subscribers}
                </div>
              </div>
            </motion.div>
          </div>
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

  // Enhanced fallback data with proper structure
  const fallbackReviews = useMemo(
    () => [
      {
        id: 1,
        name: "Manny Calvo",
        profileImage: "",
        position: "Content Creator",
        quote:
          "Unforgettable video experience! Each edit was a masterpiece, and the seamless transitions made the final product even more special. Every frame told a story, creating a lasting impression",
        views: "100x Views",
        subscribers: "1M+ Subscriber",
        joined: "Mar 2024",
        results: "3 months",
        videoUrl: "https://youtu.be/Hjj5i_w6Iog?si=0sspqt-0XtpjIUZR",
        thumbnailUrl: "",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        profileImage: "",
        position: "Media Company",
        quote:
          "The viral editing techniques helped us grow our audience exponentially. Best investment we've made! Our engagement increased by 300% in just two months.",
        views: "2.5M+ Views",
        subscribers: "75K+ Subscribers",
        joined: "Feb 2024",
        results: "4 months",
        videoUrl: "https://youtube.com/shorts/xyz789short",
        thumbnailUrl: "",
      },
      {
        id: 3,
        name: "Mike Chen",
        profileImage: "",
        position: "Tech Startup",
        quote:
          "Our engagement rates skyrocketed after implementing their strategies. Absolutely phenomenal results! We went from 1K to 50K followers in 30 days.",
        views: "3.2M+ Views",
        subscribers: "120K+ Subscribers",
        joined: "Jan 2024",
        results: "5 months",
        videoUrl: "https://www.youtube.com/watch?v=regularvideoid",
        thumbnailUrl: "",
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        profileImage: "",
        position: "E-commerce Brand",
        quote:
          "The content strategy transformed our business. We're now getting consistent viral hits and our sales have increased by 400% month over month.",
        views: "5M+ Views",
        subscribers: "200K+ Subscribers",
        joined: "Dec 2023",
        results: "6 months",
        videoUrl: "https://youtu.be/anothershortsid",
        thumbnailUrl: "",
      },
    ],
    []
  );

  // Use fetched reviews or fallback - handle both array structures
  const displayReviews = useMemo(() => {
    if (reviews && reviews.length > 0) {
      return reviews.map((review) => ({
        id: review._id || review.id,
        name: review.name || review.customerName || "Customer",
        profileImage: review.profileImage || review.avatar || "",
        position: review.position || review.company || "Client",
        quote:
          review.quote ||
          review.testimonial ||
          review.content ||
          "Great service!",
        views: review.views || review.metrics?.views || "1M+ Views",
        subscribers:
          review.subscribers ||
          review.metrics?.subscribers ||
          "50K+ Subscribers",
        joined: review.joined || review.startDate || "2024",
        results: review.results || review.duration || "3 months",
        videoUrl: review.videoUrl || review.video || "",
        thumbnailUrl: review.thumbnailUrl || review.thumbnail || "",
      }));
    }
    return fallbackReviews;
  }, [reviews, fallbackReviews]);

  // Auto-advance slider
  React.useEffect(() => {
    if (displayReviews.length <= 1) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [displayReviews.length, isAnimating]);

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

  // Enhanced loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center max-w-4xl py-16 mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 mx-auto mb-4 border-4 border-[#0084FF] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-gray-400">Loading success stories...</p>
          <motion.p
            className="mt-2 text-xs text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparing amazing results for you
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Enhanced error state
  if (error && reviews.length === 0) {
    return (
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-6 border rounded-2xl bg-red-500/10 border-red-500/20">
          <p className="mb-2 text-sm text-red-400">Unable to load reviews</p>
          <p className="text-xs text-gray-400">Showing demo success stories</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      id="about"
    >
      {/* Responsive Section Title */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Hear what they're Saying about us
        </h2>
        <p className="max-w-2xl px-4 mx-auto text-sm text-gray-400 sm:text-base">
          See how businesses like yours achieved incredible growth with our
          viral content strategies
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons - Only show if there are multiple reviews */}
        {displayReviews.length > 1 && (
          <>
            <motion.button
              onClick={prevSlide}
              className="absolute z-20 flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 border border-gray-600 rounded-xl left-4 top-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0,0,0,0.8)",
                borderColor: "rgba(0, 132, 255, 0.5)",
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="w-4 h-4 text-white" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute z-20 flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 border border-gray-600 rounded-xl right-4 top-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0,0,0,0.8)",
                borderColor: "rgba(0, 132, 255, 0.5)",
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="w-4 h-4 text-white" />
            </motion.button>
          </>
        )}

        {/* Carousel Slides */}
        <div className="overflow-hidden rounded-3xl">
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
              <div key={review.id} className="flex-shrink-0 w-full px-4">
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
          <div className="flex justify-center mt-8 space-x-3">
            {displayReviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#0084FF] scale-125"
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
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#0084FF]"
                    layoutId="activeDot"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {displayReviews.length > 1 && (
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="px-3 py-1 text-xs text-gray-500 rounded-full bg-black/50 backdrop-blur-sm">
              {currentIndex + 1} / {displayReviews.length}
            </div>
          </motion.div>
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
        caption: "Average Engagement",
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
            {/* Responsive Main Title */}
            <motion.h1 className="px-4 mb-4 text-2xl font-bold leading-tight text-white sm:text-2xl md:text-4xl lg:text-5xl">
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
