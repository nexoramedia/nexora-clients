import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Calendar, TrendingUp, Target } from "lucide-react";
import { useVideo } from "../../hook/useVideo";

// YouTube URL handler
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^"&?\/\s]{11})/;
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

export default function CaseStudyCardLayout() {
  const containerRef = useRef(null);

  // Use the useVideo hook to fetch case study videos
  const { videos, loading, error } = useVideo("case-study");

  // Get the first video from the fetched videos
  const caseStudyVideo = videos && videos.length > 0 ? videos[0] : null;
  const youtubeEmbedUrl = caseStudyVideo
    ? getYouTubeEmbedUrl(caseStudyVideo.videoUrl)
    : null;

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

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
    <div id="case-study" className="px-4 py-16 sm:px-6 lg:px-8">
      {/* Title Section - Outside the card */}
      <div className="mb-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-[#0084FF]/30 mb-6">
          <span className="text-[#0084FF] font-medium text-sm">
            CASE STUDIES
          </span>
        </div>

        {/* Main Title - Reduced size */}
        <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Some solid
          <br />
          <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
            Case studies
          </span>
        </h1>
      </div>

      {/* Card */}
      <section className="max-w-6xl p-6 mx-auto text-white border shadow-2xl bg-gradient-to-br from-gray-900 to-black rounded-3xl md:p-8 border-white/10">
        {/* Header Section */}
        <div className="mb-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-white/5 border-white/10"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">
              CASE STUDY #01
            </span>
          </motion.div>

          {/* Inner Card Title - Reduced size */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl"
          >
            "With just 5,000 subscribers, Spencer now generates $350K per month"
          </motion.h2>
        </div>

        {/* Profile and Button Section - Updated for mobile responsiveness */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 border bg-white/5 rounded-2xl border-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/K8CtVxzT/1000023500.jpg"
                  alt="Shahorin Hasan"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#0084FF]"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full flex items-center justify-center border-2 border-gray-900">
                  <Star className="w-3 h-3 text-white" fill="currentColor" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Shahorin Hasan</h3>
                <p className="text-sm text-white/60">Founder & CEO</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">
                    Verified Success
                  </span>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <motion.button
              onClick={scrollToContact}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-auto bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-2xl p-4 md:p-6 font-bold hover:shadow-[0_0_40px_#0084FF] transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm md:text-base">Book Free Call</div>
                  <div className="text-xs text-white/80">Limited Spots</div>
                </div>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Content Grid - Adjusted gap for bigger video */}
        <div className="grid gap-10 my-12 lg:grid-cols-2 md:gap-16">
          {/* Left Column - Stats & Info */}
          <div className="space-y-8">
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid gap-6">
                {/* Revenue Growth */}
                <div className="p-6 border bg-white/5 rounded-2xl border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0084FF]/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#0084FF]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">250%</div>
                        <div className="text-sm text-white/60">
                          Revenue Growth
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                  </div>
                </div>

                {/* Ad Efficiency */}
                <div className="p-6 border bg-white/5 rounded-2xl border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#66B5FF]/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#66B5FF]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">200%</div>
                        <div className="text-sm text-white/60">
                          Ad Efficiency
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0084FF] to-[#66B5FF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 2, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Video - Made bigger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-end"
          >
            {/* Video Player - Made bigger */}
            <motion.div
              ref={containerRef}
              className="relative w-full overflow-hidden bg-gray-900 border-2 aspect-video rounded-2xl border-white/10 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Loading State */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="w-12 h-12 border-3 border-[#0084FF] border-t-transparent rounded-full animate-spin" />
                  <span className="ml-4 text-lg text-white">
                    Loading video...
                  </span>
                </div>
              )}

              {/* YouTube Embed */}
              {!loading && youtubeEmbedUrl && (
                <div className="w-full h-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Case Study Video"
                    style={{
                      borderRadius: "12px",
                    }}
                  />
                </div>
              )}

              {/* Fallback when no video available */}
              {!loading && !youtubeEmbedUrl && (
                <div className="flex items-center justify-center w-full h-full bg-gray-800">
                  <div className="p-10 text-center">
                    <div className="mb-4 text-xl text-gray-400">
                      No case study video available
                    </div>
                    <div className="text-base text-gray-500">
                      {error
                        ? "Error loading video"
                        : "Check back later for new case studies"}
                    </div>
                  </div>
                </div>
              )}

              {/* Fullscreen Button - Made bigger */}
              <button
                onClick={handleFullscreen}
                className="absolute flex items-center justify-center w-12 h-12 text-white transition-transform border rounded-full top-5 right-5 bg-black/70 border-white/30 backdrop-blur-sm hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>

              {/* Video Info Badge - Made bigger */}
              <div className="absolute top-5 left-5">
                <div className="px-4 py-2 text-base font-medium border rounded-lg bg-black/70 backdrop-blur-sm border-white/20">
                  Case Study Video
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
