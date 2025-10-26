import { motion } from "framer-motion";
import { FaHome, FaArrowLeft, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom"; // or your navigation method

const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 40px rgba(0, 132, 255, 0.4)",
  };

  const glowRingTransitions = [
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
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-gray-900">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0084FF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#0066CC]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Error Code */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="text-[#0084FF] text-lg md:text-xl font-medium tracking-widest flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5 text-[#0084FF]" />
            </motion.div>
            ERROR 404
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5 text-[#0084FF]" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="mb-4 font-black tracking-tighter text-8xl md:text-9xl"
            style={{
              background: "linear-gradient(45deg, #0084FF, #0066CC, #0099FF)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h2
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="max-w-2xl text-xl leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            The page you're looking for seems to have drifted into the digital
            void. Let's get you back on track with one of the options below.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-6 mb-8 sm:flex-row"
        >
          {/* Back Home Button */}
          <motion.div
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              to="/"
              className="relative px-8 py-4 bg-gradient-to-r from-[#0066CC] to-[#0084FF] rounded-xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden flex items-center gap-3"
            >
              {/* Glow Rings */}
              {glowRingTransitions.map((ring, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-xl bg-[#0084FF]/30"
                  animate={ring.animate}
                  transition={ring.transition}
                />
              ))}

              <span className="relative z-10 flex items-center">
                <FaHome className="w-5 h-5 mr-3" />
                Back to Home
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0055AA] to-[#0077DD]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>

          {/* Go Back Button */}
          <motion.button
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="relative px-8 py-4 bg-gray-800/80 backdrop-blur-sm border border-[#0084FF]/40 rounded-xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center">
              <FaArrowLeft className="w-5 h-5 mr-3" />
              Go Back
            </span>
            <motion.div
              className="absolute inset-0 bg-[#0084FF]/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Quick Navigation Hint */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 text-sm text-gray-400"
        >
          <FaRocket className="w-4 h-4 text-[#0084FF]" />
          Navigate back to safety
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-20 left-10 w-32 h-32 bg-[#0084FF]/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -top-20 right-10 w-40 h-40 bg-[#0066CC]/5 rounded-full blur-2xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
