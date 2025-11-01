import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Simple Stat Component without counter animation
const Stat = memo(
  ({ value, suffix = "", isCenter = false, title, isMobile = false }) => {
    return (
      <div
        className={`flex items-center gap-1 mb-4 h-[50px] relative ${
          isCenter ? "justify-center" : "justify-start"
        } ${isMobile ? "md:justify-start" : ""}`}
      >
        <div className="flex items-center gap-1">
          <span className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-white font-syne">
            {value}
            {suffix}
          </span>
        </div>
        {title && (
          <div className="items-center hidden gap-2 ml-2 md:flex">
            <span className="text-base font-semibold text-white md:text-lg font-syne whitespace-nowrap">
              {title}
            </span>
          </div>
        )}
      </div>
    );
  }
);

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
      position: "right",
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
      className="grid w-full grid-cols-3 gap-4 px-4 pb-16 mx-auto mt-20 sm:gap-8 md:gap-12 max-w-7xl"
      style={{
        color: "rgba(255, 255, 255, 0.6)",
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          className={`stat-container ${
            stat.position === "center"
              ? "text-center"
              : stat.position === "right"
              ? "text-right"
              : "text-left"
          } ${
            index === stats.length - 1
              ? "md:flex md:flex-col md:justify-end"
              : ""
          } md:text-left`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={stat.delay}
        >
          <div
            className={`relative h-full overflow-hidden feature-icon-box md:p-6 lg:p-8 ${
              index === stats.length - 1
                ? "md:flex md:flex-col md:justify-end"
                : ""
            }`}
          >
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
                  stat.position === "center"
                    ? "items-center"
                    : stat.position === "right"
                    ? "items-end"
                    : "items-start"
                } ${
                  index === stats.length - 1 ? "md:items-end" : "md:items-start"
                }`}
              >
                <div className="w-full counter-single-wrap">
                  <Stat
                    value={stat.value}
                    suffix={stat.suffix}
                    isCenter={stat.isCenter}
                    title={stat.title}
                    isMobile={true}
                  />
                </div>
                {/* Mobile title text - hidden on mobile, shown on tablet and up */}
                <div
                  className={`mt-2 text-xs font-medium sm:text-sm md:hidden phone-stat-text ${
                    stat.position === "center"
                      ? "text-center"
                      : stat.position === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
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
              <div
                className={`hidden mt-4 text-sm font-bold leading-tight text-white md:block md:text-lg stat-bottom-title font-syne ${
                  stat.position === "center" ? "text-center" : "text-left"
                } ${index === stats.length - 1 ? "md:text-right" : ""}`}
              >
                {stat.subtitle}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
