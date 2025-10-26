import React from "react";
import {
  FaVideo,
  FaEdit,
  FaPhotoVideo,
  FaFilm,
  FaYoutube,
  FaMagic,
  FaRocket,
  FaPalette,
  FaCube,
  FaGlobe,
  FaMobile,
  FaRegGem,
  FaRegLightbulb,
} from "react-icons/fa";
import { FaWandSparkles } from "react-icons/fa6";
import { GiFilmSpool, GiVideoCamera } from "react-icons/gi";

const CoreServices = () => {
  // Updated services data with your requested services
  const services = [
    {
      icon: <FaYoutube className="w-6 h-6" />,
      title: "YouTube Videos",
      description:
        "Professional YouTube content creation with optimized formatting and audience engagement strategies",
    },
    {
      icon: <GiFilmSpool className="w-6 h-6" />,
      title: "Short Form Video",
      description:
        "Viral-optimized short content designed for maximum engagement and platform-specific formatting",
    },
    {
      icon: <FaCube className="w-6 h-6" />,
      title: "SaaS Video",
      description:
        "Professional software demonstration videos that showcase features and drive conversions",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Ad Creatives & VSLs",
      description:
        "High-converting video sales letters and advertising creatives designed to maximize ROI",
    },
    {
      icon: <FaVideo className="w-6 h-6" />,
      title: "Demo Videos",
      description:
        "Product demonstration videos that highlight key features and user benefits effectively",
    },
    {
      icon: <FaRegLightbulb className="w-6 h-6" />,
      title: "Podcasts",
      description:
        "Professional podcast production with crystal clear audio and engaging visual components",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Ad Creatives & VSLs",
      description:
        "Conversion-optimized video advertisements designed to drive results and maximize ROI",
    },
    {
      icon: <FaFilm className="w-6 h-6" />,
      title: "Reels Video",
      description:
        "Platform-specific Reels content with trending audio and engagement-driven editing techniques",
    },
  ];

  const marqueeServices = [...services, ...services];

  return (
    <section
      id="services"
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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
              Core services
            </span>
            <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Reduced Main Title */}
          <h1 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Types of work
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              ‍We do
            </span>
          </h1>
        </div>

        {/* Marquee Section */}
        <div className="relative py-12 overflow-hidden">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="flex space-x-5 animate-marquee-right">
              {marqueeServices.slice(0, 8).map((service, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* New Card Layout - Centered Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <div className="p-4 bg-gradient-to-br from-[#0084FF]/20 to-[#66B5FF]/10 rounded-2xl shadow-lg shadow-[#0084FF]/5 mb-4">
                        <div className="text-[#66B5FF]">{service.icon}</div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight text-white">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-[#0084FF] to-[#66B5FF] rounded-full mb-4"></div>

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-300/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="flex space-x-5 animate-marquee-left">
              {marqueeServices.slice(4, 12).map((service, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* New Card Layout - Centered Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <div className="p-4 bg-gradient-to-br from-[#66B5FF]/20 to-[#0084FF]/10 rounded-2xl shadow-lg shadow-[#66B5FF]/5 mb-4">
                        <div className="text-[#0084FF]">{service.icon}</div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight text-white">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-[#66B5FF] to-[#0084FF] rounded-full mb-4"></div>

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-300/80">
                        {service.description}
                      </p>
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

      {/* Enhanced Custom CSS */}
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

export default CoreServices;
