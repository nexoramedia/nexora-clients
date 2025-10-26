import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ProcessSteps = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "We discuss your vision, goals, and video requirements.",
      color: "blue",
      pinImage:
        "https://framerusercontent.com/images/ceWoRGcAON0ADKDjPd9HhJlf0h4.png",
    },
    {
      number: "02",
      title: "Script & Storyboard",
      description:
        "Crafting compelling narratives and visual planning for your story.",
      color: "purple",
      pinImage:
        "https://framerusercontent.com/images/qfrgnhbit9GLh4NOTnKVvU.png",
    },
    {
      number: "03",
      title: "Footage Review",
      description: "Selecting the best shots and organizing your raw footage.",
      color: "blue",
      pinImage:
        "https://framerusercontent.com/images/ceWoRGcAON0ADKDjPd9HhJlf0h4.png",
    },
    {
      number: "04",
      title: "Editing & Effects",
      description:
        "Professional cutting, transitions, and visual enhancements.",
      color: "purple",
      pinImage:
        "https://framerusercontent.com/images/qfrgnhbit9GLh4NOTnKVvU.png",
    },
    {
      number: "05",
      title: "Final Delivery",
      description: "Quality check and delivering your polished final video.",
      color: "blue",
      pinImage:
        "https://framerusercontent.com/images/ceWoRGcAON0ADKDjPd9HhJlf0h4.png",
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
      y: 100,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: -6,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightCardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 6,
      transition: {
        duration: 0.8,
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
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col rounded-t-[5rem] text-left justify-center items-center w-full mx-auto py-16 gap-20 md:gap-32 bg-black"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-5 px-4 mx-auto text-center">
        {/* Enhanced Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 shadow-lg shadow-[#0084FF]/5">
          <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
          <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
            Our Process,
          </span>
          <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
        </div>

        {/* Smaller Main Title */}
        <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
          <span className="text-white ">Our strategy to get</span>
          <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
            you leads with content
          </span>
        </h1>
      </div>

      {/* Process Steps */}
      <div className="relative flex flex-col items-center justify-center w-full gap-16 p-4 md:p-16 md:gap-56">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
        </div>

        {/* Step 1 & 2 */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-20 md:flex-row md:gap-60">
          {/* Step 2 - Script & Storyboard */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:-rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[1].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#0084FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#0084FF]/10">
                <div className="space-y-2">
                  <div className="text-[#0084FF] caveat font-mono text-4xl font-bold mb-2">
                    {steps[1].number}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {steps[1].title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    {steps[1].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet, visible on desktop */}
          <div className="absolute z-10 w-96 h-48 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
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
                strokeWidth="4"
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

          {/* Step 1 - Consultation */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightCardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[0].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#66B5FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#66B5FF]/10">
                <div className="space-y-2">
                  <div className="text-[#66B5FF] caveat font-mono text-4xl font-bold mb-2">
                    {steps[0].number}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {steps[0].title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    {steps[0].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connector between sections - WIDER - Hidden on mobile/tablet */}
        <div className="absolute z-10 md:top-[25rem] top-[60rem] w-[32rem] h-80 transform md:rotate-[45deg] -rotate-[90deg] hidden md:block">
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
              strokeWidth="4"
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

      {/* Step 3 & 4 */}
      <div className="relative flex flex-col items-center justify-center w-full gap-16 p-4 md:p-16 md:gap-56">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-20 md:flex-row md:gap-60">
          {/* Step 4 - Editing & Effects */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:-rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[3].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#0084FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#0084FF]/10">
                <div className="space-y-2">
                  <div className="text-[#0084FF] caveat font-mono text-4xl font-bold mb-2">
                    {steps[3].number}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {steps[3].title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    {steps[3].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet */}
          <div className="absolute z-10 w-96 h-48 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
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
                strokeWidth="4"
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

          {/* Step 3 - Footage Review */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightCardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[2].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#66B5FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#66B5FF]/10">
                <div className="space-y-2">
                  <div className="text-[#66B5FF] caveat font-mono text-4xl font-bold mb-2">
                    {steps[2].number}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {steps[2].title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    {steps[2].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connector between sections - WIDER - Hidden on mobile/tablet */}
        <div className="absolute z-10 md:top-[25rem] top-[60rem] w-[32rem] h-80 transform md:rotate-[50deg] -rotate-[90deg] hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M10,100 Q200,150 390,100"
              stroke="url(#gradient4)"
              strokeWidth="4"
              strokeDasharray="10 10"
              fill="none"
              variants={connectorVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#66B5FF" />
                <stop offset="100%" stopColor="#0084FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Step 5 & Final Partner Card */}
      <div className="relative flex flex-col items-center justify-center w-full gap-16 p-4 md:p-16 md:gap-56">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-20 md:flex-row md:gap-60">
          {/* Final Partner Card */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:-rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[1].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#0084FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#0084FF]/10">
                <div className="space-y-2">
                  <div className="text-[#0084FF] caveat font-mono text-4xl font-bold mb-2">
                    06
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Your Video Partner
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    Your{" "}
                    <span className="text-[#0084FF] font-semibold">
                      all in one
                    </span>{" "}
                    video editing partner for continuous success
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet */}
          <div className="absolute z-10 w-96 h-48 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,100 Q200,50 390,100"
                stroke="url(#gradient5)"
                strokeWidth="4"
                strokeDasharray="10 10"
                fill="none"
                variants={connectorVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient
                  id="gradient5"
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

          {/* Step 5 - Final Delivery */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightCardVariants}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-[50px] border border-white/10 p-6 shadow-2xl shadow-black/30 md:w-80 w-72 transform md:rotate-6 rotate-0">
              <div className="absolute z-10 -top-12 right-12">
                <img src={steps[4].pinImage} alt="Pin" className="h-56" />
              </div>
              <div className="h-20"></div>
              <div className="relative from-[#66B5FF]/10 bg-gradient-to-t to-transparent rounded-3xl p-4 border border-[#66B5FF]/10">
                <div className="space-y-2">
                  <div className="text-[#66B5FF] caveat font-mono text-4xl font-bold mb-2">
                    {steps[4].number}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {steps[4].title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-gray-300/80 md:text-xl">
                    {steps[4].description}
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
