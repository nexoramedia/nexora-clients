import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProcessSteps = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Review & Direction",
      description:
        "I analyze the raw footage to identify the strongest moments, clear story flow, and what should be cut before editing starts.",
      color: "blue",
      pinImage:
        "https://framerusercontent.com/images/ceWoRGcAON0ADKDjPd9HhJlf0h4.png",
    },
    {
      number: "02",
      title: "Structure & Edit",
      description:
        "I tighten pacing, remove dead air, and edit with intention so the video stays clear, engaging, and easy to watch.",
      color: "purple",
      pinImage:
        "https://framerusercontent.com/images/qfrgnhbit9GLh4NOTnKVvU.png",
    },
    {
      number: "03",
      title: "Short-Form Cutdowns",
      description:
        "I turn long-form content into platform-native Shorts/Reels with strong hooks and clean captions.",
      color: "blue",
      pinImage:
        "https://framerusercontent.com/images/ceWoRGcAON0ADKDjPd9HhJlf0h4.png",
    },
    {
      number: "04",
      title: "Polish & Delivery",
      description:
        "I refine audio, timing, captions, and visuals so the final video feels professional and ready to publish.",
      color: "purple",
      pinImage:
        "https://framerusercontent.com/images/qfrgnhbit9GLh4NOTnKVvU.png",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stepProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, steps.length - 1]
  );

  useEffect(() => {
    const unsubscribe = stepProgress.on("change", (latest) => {
      setActiveStep(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [stepProgress]);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: -4,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const rightCardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 4,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const connectorVariants = {
    hidden: {
      pathLength: 0,
      strokeDashoffset: 1000,
    },
    visible: {
      pathLength: 1,
      strokeDashoffset: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col rounded-t-[3rem] text-left justify-center items-center w-full mx-auto py-12 gap-12 md:gap-20 bg-black"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center max-w-2xl gap-4 px-4 mx-auto text-center">
        {/* Smaller Main Title */}
        <h1 className="text-xl font-semibold md:text-3xl lg:text-4xl">
          <span className="text-white">How I Turn Raw Footage</span>
          <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-1">
            Into High-Retention Videos
          </span>
        </h1>
      </div>

      {/* Process Steps - Step 1 & 2 */}
      <div className="relative flex flex-col items-center justify-center w-full gap-10 p-4 md:p-8 md:gap-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full max-w-3xl gap-12 md:flex-row md:gap-40">
          {/* Step 2 - Structure & Edit */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[40px] border border-white/10 p-5 shadow-xl shadow-black/30 md:w-64 w-60 transform md:-rotate-4 rotate-0">
              <div className="absolute z-10 -top-10 right-10">
                <img src={steps[1].pinImage} alt="Pin" className="h-40" />
              </div>
              <div className="h-16"></div>
              <div className="relative from-[#0084FF]/10 bg-gradient-to-t to-transparent rounded-2xl p-3 border border-[#0084FF]/10">
                <div className="space-y-2">
                  <div className="text-[#0084FF] caveat font-mono text-3xl font-bold mb-1">
                    {steps[1].number}
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {steps[1].title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-gray-300/80 md:text-base">
                    {steps[1].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet, visible on desktop */}
          <div className="absolute z-10 w-72 h-36 transform md:top-4 md:rotate-[0deg] rotate-[70deg] hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,100 Q200,50 390,100"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="10 10"
                fill="none"
                variants={connectorVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0084FF" />
                  <stop offset="100%" stopColor="#66B5FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Step 1 - Review & Direction */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={rightCardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[40px] border border-white/10 p-5 shadow-xl shadow-black/30 md:w-64 w-60 transform md:rotate-4 rotate-0">
              <div className="absolute z-10 -top-10 right-10">
                <img src={steps[0].pinImage} alt="Pin" className="h-40" />
              </div>
              <div className="h-16"></div>
              <div className="relative from-[#66B5FF]/10 bg-gradient-to-t to-transparent rounded-2xl p-3 border border-[#66B5FF]/10">
                <div className="space-y-2">
                  <div className="text-[#66B5FF] caveat font-mono text-3xl font-bold mb-1">
                    {steps[0].number}
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {steps[0].title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-gray-300/80 md:text-base">
                    {steps[0].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connector between sections - Smaller */}
        <div className="absolute z-10 md:top-[18rem] top-[45rem] w-[24rem] h-60 transform md:rotate-[45deg] -rotate-[90deg] hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M10,100 Q200,150 390,100"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeDasharray="10 10"
              fill="none"
              variants={connectorVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#66B5FF" />
                <stop offset="100%" stopColor="#0084FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Process Steps - Step 3 & 4 */}
      <div className="relative flex flex-col items-center justify-center w-full gap-10 p-4 md:p-8 md:gap-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-3/4 left-1/3 w-1 h-1 bg-[#0084FF] rounded-full opacity-30 animate-ping"></div>
          <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-25 animate-bounce"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full max-w-3xl gap-12 md:flex-row md:gap-40">
          {/* Step 4 - Polish & Delivery */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[40px] border border-white/10 p-5 shadow-xl shadow-black/30 md:w-64 w-60 transform md:-rotate-4 rotate-0">
              <div className="absolute z-10 -top-10 right-10">
                <img src={steps[3].pinImage} alt="Pin" className="h-40" />
              </div>
              <div className="h-16"></div>
              <div className="relative from-[#0084FF]/10 bg-gradient-to-t to-transparent rounded-2xl p-3 border border-[#0084FF]/10">
                <div className="space-y-2">
                  <div className="text-[#0084FF] caveat font-mono text-3xl font-bold mb-1">
                    {steps[3].number}
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {steps[3].title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-gray-300/80 md:text-base">
                    {steps[3].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet */}
          <div className="absolute z-10 w-72 h-36 transform md:top-4 md:rotate-[0deg] rotate-[70deg] hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,100 Q200,50 390,100"
                stroke="url(#gradient3)"
                strokeWidth="3"
                strokeDasharray="10 10"
                fill="none"
                variants={connectorVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0084FF" />
                  <stop offset="100%" stopColor="#66B5FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Step 3 - Short-Form Cutdowns */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={rightCardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[40px] border border-white/10 p-5 shadow-xl shadow-black/30 md:w-64 w-60 transform md:rotate-4 rotate-0">
              <div className="absolute z-10 -top-10 right-10">
                <img src={steps[2].pinImage} alt="Pin" className="h-40" />
              </div>
              <div className="h-16"></div>
              <div className="relative from-[#66B5FF]/10 bg-gradient-to-t to-transparent rounded-2xl p-3 border border-[#66B5FF]/10">
                <div className="space-y-2">
                  <div className="text-[#66B5FF] caveat font-mono text-3xl font-bold mb-1">
                    {steps[2].number}
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {steps[2].title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-gray-300/80 md:text-base">
                    {steps[2].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
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

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default ProcessSteps;
