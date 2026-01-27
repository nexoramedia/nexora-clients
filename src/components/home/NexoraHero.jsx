import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaChevronDown,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { useVideo } from "../../hook/useVideo";
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
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&mute=0`; // Added autoplay=1 and mute=1
    }
  } catch (error) {
    console.error("Error extracting YouTube embed URL:", error);
  }
  return null;
};

const isYouTubeUrl = (url) => {
  return url && (url.includes("youtube.com") || url.includes("youtu.be"));
};

// YouTube-style Video Player
const VideoPlayer = memo(() => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCentralButton, setShowCentralButton] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Use your video hook to fetch introduction videos
  const { videos } = useVideo("introduction");

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

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let hideTimeout;
    if (videoPlaying && showControls) {
      hideTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(hideTimeout);
  }, [videoPlaying, showControls]);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current && !isYouTube) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log("Autoplay failed:", error);
            // Show play button if autoplay fails
            setShowCentralButton(true);
          });
          setVideoPlaying(true);
          setShowCentralButton(false);
        }
      }, 1000); // Delay autoplay by 1 second

      return () => clearTimeout(timer);
    }
  }, [isYouTube]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
        setShowCentralButton(false);
        setShowControls(true);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
        setShowCentralButton(true);
        setShowControls(true);
      }
    }
  }, []);

  const toggleMute = useCallback(
    (e) => {
      e?.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
        setShowControls(true);
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
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      // Auto-replay after 2 seconds
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setVideoPlaying(true);
          setShowCentralButton(false);
        }
      }, 2000);
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
      setShowControls(true);
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
    setShowControls(true);
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

  // Slightly larger YouTube-like aspect ratio (16:9)
  const youtubeAspectRatio = useMemo(
    () => ({
      container: "w-full max-w-5xl mx-auto px-4", // Changed from max-w-4xl to max-w-5xl for slightly larger size
      wrapper: "relative w-full",
      player: {
        base: "relative w-full overflow-hidden bg-black cursor-pointer rounded-xl shadow-2xl", // Changed to rounded-xl and shadow-2xl
        aspect: "aspect-video",
      },
    }),
    []
  );

  // Render YouTube iframe if we have a YouTube video
  const renderYouTubePlayer = () => (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        src={youtubeEmbedUrl}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Introduction Video"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );

  // Render regular video player with YouTube-like controls
  const renderRegularVideoPlayer = () => (
    <>
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
        poster={videoPoster}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onLoadedData={handleLoadedData}
        onClick={handlePlayPause}
        onMouseEnter={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
      >
        <source
          src={introductionVideo?.videoUrl || fallbackVideoSource}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* YouTube-style Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div
              className="relative w-full h-1.5 mb-3 rounded-full cursor-pointer bg-white/30 group"
              onClick={seekVideo}
            >
              <div
                className="absolute inset-0 h-full bg-red-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute w-3 h-3 -translate-y-1 -translate-x-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="flex items-center justify-center w-8 h-8 text-white transition-opacity hover:opacity-80"
                >
                  {videoPlaying ? (
                    <FaPause className="w-4 h-4" />
                  ) : (
                    <FaPlay className="w-4 h-4" />
                  )}
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center w-8 h-8 text-white transition-opacity hover:opacity-80"
                >
                  {isMuted ? (
                    <FaVolumeMute className="w-4 h-4" />
                  ) : (
                    <FaVolumeUp className="w-4 h-4" />
                  )}
                </button>

                {/* Time Display */}
                <div className="font-mono text-xs text-white">
                  {videoRef.current
                    ? `${Math.floor(
                        videoRef.current.currentTime / 60
                      )}:${Math.floor(videoRef.current.currentTime % 60)
                        .toString()
                        .padStart(2, "0")} / ${Math.floor(
                        videoRef.current.duration / 60
                      )}:${Math.floor(videoRef.current.duration % 60)
                        .toString()
                        .padStart(2, "0")}`
                    : "0:00 / 0:00"}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="flex items-center justify-center w-8 h-8 text-white transition-opacity hover:opacity-80"
                >
                  <FaExpand className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Play Button - Made slightly larger */}
      <AnimatePresence>
        {showCentralButton && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            onClick={handlePlayPause}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <div className="relative flex items-center justify-center w-16 h-16 bg-red-600 rounded-full shadow-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                <FaPlay className="w-6 h-6 ml-1 text-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={videoTransition}
      className={youtubeAspectRatio.container}
    >
      <div className={youtubeAspectRatio.wrapper}>
        <motion.div
          ref={containerRef}
          className={`${youtubeAspectRatio.player.base} ${youtubeAspectRatio.player.aspect}`}
          whileHover={{
            scale: isFullscreen ? 1 : 1.01,
            transition: { duration: 0.3 },
          }}
          onMouseEnter={() => !videoPlaying && setShowControls(true)}
          onMouseLeave={() => !videoPlaying && setShowControls(false)}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-900">
              <div className="w-8 h-8 border-red-600 rounded-full border-3 border-t-transparent animate-spin" />
            </div>
          )}

          {/* Video Content */}
          {youtubeEmbedUrl ? renderYouTubePlayer() : renderRegularVideoPlayer()}
        </motion.div>
      </div>
    </motion.div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

// ===== Smooth Text Animation =====
const AnimatedText = memo(
  ({ text, delay = 0, className = "", size = "md", color = "blue" }) => {
    const sizeClasses = useMemo(
      () => ({
        xl: "text-4xl md:text-6xl lg:text-7xl font-black",
        lg: "text-3xl md:text-5xl lg:text-6xl font-bold",
        md: "text-2xl md:text-4xl lg:text-5xl font-semibold",
        sm: "text-xl md:text-3xl lg:text-4xl font-semibold",
        xs: "text-lg md:text-2xl lg:text-3xl font-medium",
        xxs: "text-base md:text-xl lg:text-2xl font-medium",
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
          className={`inline-block ${sizeClasses[size]} tracking-tight`}
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

      {/* Content - Adjusted padding to move everything higher */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-20 pb-12 md:pt-28 md:pb-16">
        {/* Heading - Moved higher and made more compact */}
        <div className="mb-6 text-center">
          <div className="mb-3">
            <AnimatedText
              text="High-Retention YouTube & Short-Form Video Editing"
              color="white"
              delay={0.3}
              size="xs"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <AnimatedText
                text="Long-form videos, podcasts, and Shorts edited for clarity, pacing, and watch time."
                delay={0.6}
                size="xxs"
                className="mb-1"
              />
            </div>
          </motion.div>
        </div>

        {/* Single CTA Button - Moved higher */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={ctaButtonHover}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-[#0066CC] to-[#0084FF] rounded-full text-white font-semibold text-sm sm:text-base hover:shadow-xl transition-all group overflow-hidden flex items-center gap-2 shadow-lg"
          >
            <span className="relative z-10 flex items-center">
              Contact Now
              <motion.span
                className="ml-1.5"
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

        {/* YouTube-style Video Player - Slightly larger */}
        <div className="w-full mt-4 mb-8">
          <VideoPlayer />
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
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
              className="text-[#0084FF] text-xs mb-1.5 tracking-widest font-light flex items-center gap-1.5"
            >
              <FaChevronDown className="w-2 h-2" />
              SCROLL
              <FaChevronDown className="w-2 h-2" />
            </motion.span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-[#0084FF] to-transparent"
              animate={{
                height: [10, 20, 10],
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
