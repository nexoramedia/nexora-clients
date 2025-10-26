import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Simple Stat Component without counter animation
const Stat = memo(({ value, suffix = "", isCenter = false, title }) => {
  return (
    <div
      className={`flex items-center gap-1 mb-4 h-[60px] relative ${
        isCenter ? "justify-center" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <span className="text-[2.5rem] font-bold text-white font-syne">
          {value}
          {suffix}
        </span>
      </div>
      {title && (
        <div className="flex items-center gap-2 ml-2">
          <span className="text-lg font-semibold text-white font-syne whitespace-nowrap">
            {title}
          </span>
        </div>
      )}
    </div>
  );
});

// Main Stats Section Component
const StatsSection = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      id: 1,
      value: 200,
      suffix: "%",
      title: "More Engagement",
      subtitle: "Viral Edits",
      delay: 0.2,
      position: "",
    },
    {
      id: 2,
      value: 5,
      suffix: "X",
      title: "More Reach",
      subtitle: "Strategic Distribution",
      delay: 0.4,
      position: "center",
      isCenter: true,
    },
    {
      id: 3,
      value: 50,
      suffix: "%",
      title: "More Leads",
      subtitle: "Automated Systems",
      delay: 0.6,
      position: "left",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="grid w-full grid-cols-1 gap-16 px-4 pb-20 mx-auto md:grid-cols-3 mt-25 max-w-7xl"
      style={{
        color: "rgba(255, 255, 255, 0.6)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          className={`stat-container ${
            stat.position === "center"
              ? "text-center"
              : stat.position === "left"
              ? "text-left"
              : "text-left"
          }`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={stat.delay}
        >
          <div className="feature-icon-box rounded-[25px] p-10 relative overflow-hidden">
            {/* Main Stat Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: stat.delay,
                ease: "easeOut",
              }}
            >
              <div
                className={`phone-stat flex flex-col ${
                  stat.isCenter ? "items-center" : "items-start"
                }`}
              >
                <div className="w-full counter-single-wrap">
                  <Stat
                    value={stat.value}
                    suffix={stat.suffix}
                    isCenter={stat.isCenter}
                    title={stat.title}
                  />
                </div>
                {/* Mobile title text */}
                <div
                  className="mt-2 text-sm font-medium phone-stat-text"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {stat.title}
                </div>
              </div>
            </motion.div>

            {/* Bottom Title */}
            <motion.div
              className="fade-in-move-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: stat.delay + 0.3,
              }}
            >
              <div className="mt-6 text-xl font-bold leading-tight text-white stat-bottom-title font-syne">
                {stat.subtitle}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Global Styles for custom fonts */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap");

        .font-syne {
          font-family: "Syne", sans-serif;
        }
      `}</style>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
