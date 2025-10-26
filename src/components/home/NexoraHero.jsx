import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaArrowRight,
  FaVideo,
  FaRocket,
  FaChevronDown,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import {
  HiSparkles,
  HiCursorClick,
  HiArrowRight,
  HiPlay,
} from "react-icons/hi";
import { useVideo } from "../../hook/useVideo"; // Import your video hook

import bg from "../../assets/bg.jpg";

// YouTube URL handler for introduction videos
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

const isYouTubeUrl = (url) => {
  return url && (url.includes("youtube.com") || url.includes("youtu.be"));
};

// Enhanced Video Player with your desired style
const VideoPlayer = memo(() => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCentralButton, setShowCentralButton] = useState(true);

  // Use your video hook to fetch introduction videos - ALWAYS CALL HOOKS UNCONDITIONALLY
  const { videos, loading, error } = useVideo("introduction");

  // Get the first introduction video
  const introductionVideo = useMemo(() => {
    return videos && videos.length > 0 ? videos[0] : null;
  }, [videos]);

  // Check if it's a YouTube URL
  const youtubeEmbedUrl = useMemo(() => {
    return introductionVideo
      ? getYouTubeEmbedUrl(introductionVideo.videoUrl)
      : null;
  }, [introductionVideo]);

  const isYouTube = useMemo(() => {
    return introductionVideo ? isYouTubeUrl(introductionVideo.videoUrl) : false;
  }, [introductionVideo]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
        setShowCentralButton(false);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
        setShowCentralButton(true);
      }
    }
  }, []);

  const toggleMute = useCallback(
    (e) => {
      e?.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
      }
    },
    [isMuted]
  );

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    setVideoPlaying(false);
    setProgress(0);
    setShowCentralButton(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleLoadedData = useCallback(() => {
    setIsLoading(false);
  }, []);

  const seekVideo = useCallback((e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  }, []);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  }, []);

  // Fallback video source
  const fallbackVideoSource = useMemo(
    () => "https://assets.codepen.io/3364143/sample.mp4",
    []
  );

  const videoPoster = useMemo(
    () =>
      "data:image/gif,base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    []
  );

  const videoTransition = useMemo(
    () => ({
      delay: 1.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    }),
    []
  );

  const buttonTransition = useMemo(
    () => ({
      type: "spring",
      stiffness: 300,
      damping: 20,
    }),
    []
  );

  const glowRingTransitions = useMemo(
    () => [
      {
        animate: { scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] },
        transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
      },
      {
        animate: { scale: [1, 1.8, 1], opacity: [0.2, 0.4, 0.2] },
        transition: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        },
      },
    ],
    []
  );

  // Render YouTube iframe if we have a YouTube video
  const renderYouTubePlayer = () => (
    <>
      {/* YouTube Embed */}
      <div className="w-full h-full">
        <iframe
          src={youtubeEmbedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={"Introduction Video"}
          onLoad={() => setIsLoading(false)}
          style={{
            display: "block",
            border: "none",
            borderRadius: "12px",
          }}
        />
      </div>

      {/* YouTube Badge */}
      {isYouTube && (
        <div className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-sm font-mono z-20 backdrop-blur-sm text-[#0084FF] border border-[#0084FF]/50 flex items-center gap-2">
          <FaVideo className="text-[#0084FF]" />
          <span> INTRODUCTION_VIDEO</span>
        </div>
      )}
    </>
  );

  // Render regular video player
  const renderRegularVideoPlayer = () => (
    <>
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        className="object-cover w-full h-full"
        poster={videoPoster}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onLoadedData={handleLoadedData}
        onClick={handlePlayPause}
      >
        <source
          src={introductionVideo?.videoUrl || fallbackVideoSource}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Video Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-sm font-mono z-20 backdrop-blur-sm text-[#0084FF] border border-[#0084FF]/50 flex items-center gap-2"
      >
        <FaVideo className="text-[#0084FF]" />
        <span>{introductionVideo?.title || "INTRODUCTION_2025.MP4"}</span>
      </motion.div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={videoTransition}
      className="relative w-full max-w-4xl px-4 mx-auto mb-8"
    >
      <motion.div
        ref={containerRef}
        className="w-full h-[400px] lg:h-[500px] relative overflow-hidden rounded-2xl border border-[#0084FF]/40 shadow-2xl shadow-[#0084FF]/30 bg-black/80 backdrop-blur-sm cursor-pointer"
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(0, 132, 255, 0.6)",
          transition: { duration: 0.3 },
        }}
        onClick={youtubeEmbedUrl ? undefined : handlePlayPause}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-[#0084FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Video Content */}
        {youtubeEmbedUrl ? renderYouTubePlayer() : renderRegularVideoPlayer()}

        {/* Minimal Gradient Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 z-10 w-full h-20 pointer-events-none bg-gradient-to-b from-black/50 to-transparent" />

        {/* Central Play Button - Only show for non-YouTube videos or when not playing */}
        {!youtubeEmbedUrl && (
          <AnimatePresence>
            {showCentralButton && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={buttonTransition}
                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  {/* Pulsing Glow Rings */}
                  {glowRingTransitions.map((ring, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-full bg-[#0084FF]/30"
                      animate={ring.animate}
                      transition={ring.transition}
                    />
                  ))}

                  {/* Main Button */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#0066CC] via-[#0084FF] to-[#0099FF] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
                    <HiPlay className="w-10 h-10 text-white" />
                  </div>

                  {/* Text Label */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transform -translate-x-1/2 border rounded-full -bottom-12 left-1/2 bg-black/70 backdrop-blur-sm border-white/10"
                  >
                    <HiCursorClick className="w-4 h-4" />
                    Play
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Bottom Controls - Only for non-YouTube videos */}
        {!youtubeEmbedUrl && (
          <div className="absolute z-20 flex items-center gap-3 pointer-events-none bottom-4 left-4 right-4">
            {/* Progress Bar */}
            <div
              className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer pointer-events-auto"
              onClick={seekVideo}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center w-8 h-8 text-white transition-colors border rounded-full pointer-events-auto bg-black/60 border-white/20 hover:bg-black/80"
              >
                {isMuted ? (
                  <FaVolumeMute className="w-3 h-3" />
                ) : (
                  <FaVolumeUp className="w-3 h-3" />
                )}
              </button>

              <button
                onClick={handleFullscreen}
                className="flex items-center justify-center w-8 h-8 text-white transition-colors border rounded-full pointer-events-auto bg-black/60 border-white/20 hover:bg-black/80"
              >
                <FaExpand className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

// ===== User Avatars Component =====
const UserAvatars = memo(() => {
  // Profile images for avatars (using placeholder images)
  const users = useMemo(
    () => [
      {
        id: 1,
        bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
        profile:
          "https://i.postimg.cc/mkTDq6CZ/487239742-1354528409018334-6501910613559968407-n.jpg",
      },
      {
        id: 2,
        bg: "bg-gradient-to-r from-purple-500 to-pink-500",
        profile: "https://i.postimg.cc/j28s1qRv/channels4-profile-1.jpg",
      },
      {
        id: 3,
        bg: "bg-gradient-to-r from-green-500 to-emerald-500",
        profile: "https://i.postimg.cc/mDjRcZ1g/channels4-profile.jpg",
      },
      {
        id: 4,
        bg: "bg-gradient-to-r from-orange-500 to-red-500",
        profile: "https://i.postimg.cc/MZr2gFyt/unnamed.webp",
      },
      {
        id: 5,
        bg: "bg-gradient-to-r from-indigo-500 to-blue-500",
        profile:
          "https://i.postimg.cc/prm72PfN/482030877-1198505171700609-4335114017922048258-n.jpg",
      },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row"
    >
      {/* Mobile: Text above avatars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="block text-center md:hidden"
      >
        <p className="mb-1 text-lg font-semibold text-white">
          Loved by 500+ Businesses worldwide.
        </p>
        <p className="text-sm text-gray-300">Our Clients Speak for Us</p>
      </motion.div>

      {/* Avatars */}
      <div className="flex -space-x-3">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="relative group"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 border-white/20 ${user.bg} flex items-center justify-center text-white text-xs font-bold shadow-lg overflow-hidden`}
            >
              <img
                src={user.profile}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Text beside avatars */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="hidden text-left md:block"
      >
        <p className="mb-1 text-lg font-semibold text-white">
          Loved by 500+ Businesses worldwide.
        </p>
        <p className="text-sm text-gray-300">Our Clients Speak for Us</p>
      </motion.div>

      {/* Mobile: Additional text below avatars */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="block text-center md:hidden"
      >
        <p className="text-xs text-gray-400">
          Trusted by industry leaders worldwide
        </p>
      </motion.div>
    </motion.div>
  );
});

UserAvatars.displayName = "UserAvatars";

// ===== Smooth Text Animation =====
const AnimatedText = memo(
  ({ text, delay = 0, className = "", size = "md", color = "blue" }) => {
    const sizeClasses = useMemo(
      () => ({
        xl: "text-4xl md:text-6xl lg:text-7xl font-black",
        lg: "text-3xl md:text-5xl lg:text-6xl font-bold",
        md: "text-2xl md:text-4xl lg:text-5xl font-semibold",
        sm: "text-lg md:text-xl lg:text-2xl font-medium",
      }),
      []
    );

    const transitionConfig = useMemo(
      () => ({
        delay: delay,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }),
      [delay]
    );

    const hoverTransition = useMemo(
      () => ({
        duration: 0.3,
      }),
      []
    );

    const gradientStyles = useMemo(() => {
      if (color === "white") {
        return {
          background: "white",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
      }
      return {
        background: "linear-gradient(45deg, #0084FF, #0066CC, #0099FF)",
        backgroundSize: "200% 200%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
    }, [color]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionConfig}
        className={className}
      >
        <motion.span
          className={`inline-block ${sizeClasses[size]} tracking-tighter`}
          whileHover={{
            scale: 1.02,
            transition: hoverTransition,
          }}
          style={gradientStyles}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

// ===== Enhanced HeroSection =====
const HeroSection = memo(() => {
  const ctaButtonHover = useMemo(
    () => ({
      scale: 1.05,
      boxShadow: "0 0 40px rgba(0, 132, 255, 0.4)",
    }),
    []
  );

  const arrowAnimation = useMemo(
    () => ({
      x: [0, 5, 0],
    }),
    []
  );

  const arrowTransition = useMemo(
    () => ({
      duration: 1.5,
      repeat: Infinity,
    }),
    []
  );

  // Scroll to contact function
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <div
      className="relative flex flex-col justify-center w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      id="home"
    >
      {/* Very Blurry Overlay - background barely visible */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[20px] z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-20">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <AnimatedText
              text="Get More Qualified"
              color="white"
              delay={0.3}
              size="lg"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <AnimatedText
              text="Leads Through Video Content"
              delay={0.6}
              size="md"
            />
          </motion.div>
        </div>

        {/* Subtitle - Reduced description size */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-6 text-center"
        >
          <p className="text-base font-light leading-relaxed text-gray-200 md:text-lg">
            Transform raw footage into professional-grade videos in minutes.
            Experience the future of video editing with advanced processing and
            cinematic rendering.
          </p>
        </motion.div>

        {/* User Avatars Section */}
        <UserAvatars />

        {/* Single CTA Button - Updated with scroll to contact */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={ctaButtonHover}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 bg-gradient-to-r from-[#0066CC] to-[#0084FF] rounded-xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center">
              <FaRocket className="w-4 h-4 mr-2" />
              Book a Call
              <motion.span
                className="ml-2"
                animate={arrowAnimation}
                transition={arrowTransition}
              >
                <HiArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0055AA] to-[#0077DD]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Enhanced Video Player with your desired style */}
        <VideoPlayer />

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex flex-col items-center"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-[#0084FF] text-xs mb-2 tracking-widest font-light flex items-center gap-2"
            >
              <FaChevronDown className="w-2 h-2" />
              SCROLL TO EXPLORE
              <FaChevronDown className="w-2 h-2" />
            </motion.span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-[#0084FF] to-transparent"
              animate={{
                height: [12, 24, 12],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
