import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
  FaYoutube,
  FaMobile,
  FaChartLine,
  FaShoppingCart,
  FaUser,
  FaFileAlt,
} from "react-icons/fa";
import { useVideo } from "../../hook/useVideo";

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

const isYouTubeUrl = (url) => {
  return url && (url.includes("youtube.com") || url.includes("youtu.be"));
};

// Category configuration
const videoCategories = [
  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    aspect: "horizontal",
  },
  {
    id: "shorts",
    name: "Shorts",
    icon: FaMobile,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    aspect: "vertical",
  },
  {
    id: "saas",
    name: "SaaS",
    icon: FaChartLine,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    aspect: "horizontal",
  },
  {
    id: "ads-vsl",
    name: "Ads & VSL",
    icon: FaShoppingCart,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    aspect: "horizontal",
  },
];

// Custom Video Player Component with YouTube support
const CustomVideoPlayer = ({ video, category }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Check if it's a YouTube URL
  const youtubeEmbedUrl = getYouTubeEmbedUrl(video.videoUrl);
  const isShorts = isYouTubeShorts(video.videoUrl);
  const isYouTube = isYouTubeUrl(video.videoUrl);

  // For YouTube videos, use iframe
  if (youtubeEmbedUrl) {
    return (
      <motion.div
        className={`relative cursor-pointer ${
          category.aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"
        } rounded-xl overflow-hidden border border-white/10 bg-black group select-none`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* YouTube Embed */}
        <div className="w-full h-full">
          <iframe
            src={youtubeEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${video.title} - YouTube ${isShorts ? "Short" : "Video"}`}
            onLoad={() => setIsLoading(false)}
            style={{
              display: "block",
              border: "none",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-[#0084FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* YouTube Shorts Badge */}
        {isShorts && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-600 rounded-md">
              <span className="text-xs font-bold text-white">SHORTS</span>
            </div>
          </div>
        )}

        {/* YouTube Badge */}
        {isYouTube && !isShorts && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded-md">
              <FaYoutube className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">YouTube</span>
            </div>
          </div>
        )}

        {/* Video Info */}
      </motion.div>
    );
  }

  // For regular video files, use the video element
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Basic protection
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();

    videoElement.addEventListener("contextmenu", handleContextMenu);
    videoElement.addEventListener("dragstart", handleDragStart);

    return () => {
      videoElement.removeEventListener("contextmenu", handleContextMenu);
      videoElement.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const seekVideo = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const getAspectClass = () => {
    return category.aspect === "vertical" ? "aspect-[9/16]" : "aspect-video";
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer ${getAspectClass()} rounded-xl overflow-hidden border border-white/10 bg-black group select-none`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-8 h-8 border-2 border-[#0084FF] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className="object-cover w-full h-full pointer-events-none"
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onLoadedData={handleLoadedData}
        loop={false}
        preload="metadata"
        onClick={togglePlay}
        controls={false}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer"
        onClick={seekVideo}
      >
        <div
          className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent">
        {/* Central Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 text-white border rounded-full pointer-events-auto bg-white/20 backdrop-blur-md border-white/30"
          >
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </div>

        {/* Bottom Control Buttons */}
        <div className="absolute flex items-center gap-2 pointer-events-none bottom-3 right-3">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-8 h-8 text-white border rounded-full pointer-events-auto bg-black/60 border-white/20"
          >
            {isMuted ? (
              <FaVolumeMute className="w-3 h-3" />
            ) : (
              <FaVolumeUp className="w-3 h-3" />
            )}
          </button>

          <button
            onClick={handleFullscreen}
            className="flex items-center justify-center w-8 h-8 text-white border rounded-full pointer-events-auto bg-black/60 border-white/20"
          >
            <FaExpand className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute pointer-events-none top-3 left-3 right-3">
        <div className="p-3 border rounded-lg bg-black/60 backdrop-blur-sm border-white/10">
          <h3 className="mb-1 text-sm font-semibold text-white">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-gray-300 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Play Indicator */}
      {isPlaying && (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 border border-[#0084FF]/30">
          <div className="flex items-center gap-1 text-[#0084FF] text-xs">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse" />
            <span>PLAYING</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Video Grid Component
const VideoGrid = ({ category, videos, loading }) => {
  const isShort = category.id === "shorts";

  if (loading) {
    return (
      <div className="mb-16">
        <div
          className={`grid grid-cols-1 ${
            isShort ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
          } gap-6`}
        >
          {[...Array(isShort ? 3 : 4)].map((_, index) => (
            <div
              key={index}
              className={`${
                category.aspect === "vertical"
                  ? "aspect-[9/16]"
                  : "aspect-video"
              } rounded-xl bg-gray-800/50 animate-pulse border border-white/10`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Empty state when no videos are found
  if (!videos || videos.length === 0) {
    return (
      <div className="py-16 mb-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 border rounded-full bg-gray-800/50 border-white/10">
            <FaYoutube className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">
            No Videos Available
          </h3>
          <p className="mb-6 text-gray-400">
            There are no videos in the {category.name} category yet.
          </p>
          <div className="text-sm text-gray-500">
            Check back later for new content.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div
        className={`grid grid-cols-1 ${
          isShort ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        } gap-6`}
      >
        {videos.map((video) => (
          <CustomVideoPlayer
            key={video._id}
            video={video}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const ProtectedVideoShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("youtube");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use the custom hook to fetch videos for the active category
  const { videos, loading, error } = useVideo(activeCategory);

  // Additional global protection
  useEffect(() => {
    const preventDevTools = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("keydown", preventDevTools);

    return () => {
      document.removeEventListener("keydown", preventDevTools);
    };
  }, []);

  const currentCategory = videoCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <section
      id="showreel"
      className="px-4 py-20 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header - Simplified without balloons */}
        <div
          ref={ref}
          className="relative flex items-center justify-center mb-8"
        >
          {/* Main Header Content */}
          <div className="relative z-30 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-[#0084FF]/30 mb-6">
              <span className="text-[#0084FF] font-medium text-sm">
                OUR WORK
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Some of our
              <br />
              <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
                featured projects
              </span>
            </h2>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center max-w-4xl gap-2 p-1 border bg-gray-900/50 backdrop-blur-sm rounded-xl border-white/10">
            {videoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {activeCategory === category.id && (
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.accentColor}`}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 text-center">
            <p className="text-gray-400">Showing demo content</p>
          </div>
        )}

        {/* Category Content */}
        <AnimatePresence mode="wait">
          <div key={activeCategory}>
            {currentCategory && (
              <VideoGrid
                category={currentCategory}
                videos={videos}
                loading={loading}
              />
            )}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProtectedVideoShowcase;
