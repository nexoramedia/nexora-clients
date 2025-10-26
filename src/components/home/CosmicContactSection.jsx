import { motion } from "framer-motion";
import { FaClock, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import bg from "../../assets/bg.jpg";
import { useState } from "react";

export default function CosmicBookingSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div
      id="contact"
      className="relative min-h-screen py-16 overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Blurry Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[10px] z-0" />

      {/* Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 text-base font-medium tracking-widest text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
            BOOK DIRECTLY
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Reduced Title Size */}
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <span
              style={{
                background: "linear-gradient(45deg, #0084FF, #0066CC, #0099FF)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Book Your
            </span>
            <br />
            <span className="text-xl md:text-2xl">Session</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 mx-auto lg:grid-cols-3 max-w-7xl">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="relative h-full p-6 overflow-hidden border rounded-2xl border-blue-500/30 bg-gradient-to-br from-gray-900/60 to-blue-900/30 backdrop-blur-xl">
              {/* Card Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-md"
                style={{ backgroundColor: "#0084FF20" }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <FaRocket className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    Strategy Session
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4 text-blue-300">
                    <FaClock className="w-4 h-4" />
                    <span className="text-base">60 Minutes</span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="mb-6 text-sm leading-relaxed text-center text-gray-300">
                    Deep dive into your project with comprehensive planning and
                    roadmap creation. Perfect for startups and established
                    businesses.
                  </p>

                  {/* Features */}
                  <div className="mb-6 space-y-3">
                    {[
                      "Project Analysis",
                      "Strategy Planning",
                      "Roadmap Creation",
                      "Q&A Session",
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 text-blue-300"
                      >
                        <HiSparkles className="flex-shrink-0 w-3 h-3 text-blue-400" />
                        <span className="text-xs">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-auto text-center">
                  <span className="px-4 py-2 text-sm font-bold text-blue-400 rounded-full bg-blue-500/20">
                    FREE SESSION
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TidyCal Iframe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-gray-900/60 to-blue-900/30 backdrop-blur-xl p-1 h-[600px]">
              {/* Loading State */}
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
                    >
                      <HiSparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="mb-2 text-lg font-bold text-white">
                      Loading Calendar
                    </h3>
                    <p className="text-sm text-blue-300">
                      Preparing your booking experience...
                    </p>
                  </motion.div>
                </div>
              )}

              {/* TidyCal Iframe */}
              <iframe
                src="https://tidycal.com/nexoramedia123/60-minute-meeting"
                className="w-full h-full border-0 rounded-2xl"
                title="Book Your Strategy Session"
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                allow="camera; microphone; fullscreen;"
              />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-300">
            {[
              {
                icon: HiSparkles,
                text: "Instant Confirmation",
                color: "text-green-400",
              },
              { icon: FaClock, text: "Calendar Sync", color: "text-blue-400" },
              { icon: FaRocket, text: "Quick Setup", color: "text-cyan-400" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className={`w-3 h-3 ${item.color}`} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
