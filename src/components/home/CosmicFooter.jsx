import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowUp,
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFilm,
  FaVideo,
  FaLightbulb,
  FaPuzzlePiece,
  FaTimes,
  FaQuoteLeft,
  FaStar,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { HiSparkles, HiKey } from "react-icons/hi";
import logo from "../../assets/main-log.png";
import { useAuth } from "../../hook/useAuth";
import { FaX } from "react-icons/fa6";

// ===== Back to Top Button =====
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-xl text-white shadow-2xl backdrop-blur-sm border border-[#0084FF]/30"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-4 h-4" />
    </motion.button>
  );
};

// ===== Success Quote Modal =====
const SuccessModal = ({ isOpen, onClose, quote, riddleNumber }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="relative w-full max-w-md p-6 border rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute p-2 text-gray-400 transition-colors top-4 right-4 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
              >
                <FaStar className="text-xl text-white" />
              </motion.div>

              <h3 className="mb-4 text-xl font-bold text-white">
                Riddle {riddleNumber} Solved!
              </h3>

              {/* Updated Quote Section - Larger and More Focused */}
              <div className="p-5 mb-5 rounded-xl bg-gradient-to-r from-[#0084FF]/15 to-[#0066CC]/15 border border-[#0084FF]/25">
                <FaQuoteLeft className="inline w-5 h-5 mb-3 text-[#0084FF] opacity-60" />
                <p className="text-lg font-medium leading-relaxed text-white">
                  {quote}
                </p>
              </div>

              <motion.button
                onClick={onClose}
                className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl hover:shadow-lg hover:shadow-[#0084FF]/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Next Riddle
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ===== 100+ Creative Quotes =====
const getRandomQuote = () => {
  const quotes = [
    "🌞 A bright mind can outshine even the darkest day!",
    "🚀 Your next step could be the one that changes everything!",
    "🌈 Let today be the canvas for your boldest colors!",
    "✨ You’re stronger than the challenges trying to slow you down!",
    "🔥 Every spark of effort lights a bigger fire within you!",
    "🌟 Small progress becomes big success when you stay consistent!",
    "💡 Your ideas matter — let them breathe and grow!",
    "🎉 Celebrate the tiny wins; they build the huge victories!",
    "🍃 A calm mind creates the loudest brilliance!",
    "🚦 Don’t wait for perfect conditions — green lights appear when you move!",
    "🎯 Purpose fuels power!",
    "💫 Every sunrise brings a new chance to rewrite your story!",
    "🌊 Let your creativity flow; it always finds its way forward!",
    "🔮 Your potential is bigger than you imagine!",
    "🧩 Every challenge has a piece of your growth hidden inside it!",
    "⚡ One moment of courage can start a lifetime of momentum!",
    "🌱 Growth starts quietly, then suddenly blooms!",
    "🦋 Transformations begin with tiny choices!",
    "🌔 Even half-light is enough to keep moving!",
    "🔥 When passion leads, greatness follows!",
    "🚀 One brave idea can lift you higher than a thousand fears!",
    "🧠 Your imagination is a universe — explore it boldly!",
    "🕊️ Peace creates the space where genius lives!",
    "🌻 You never know who you’re inspiring just by being yourself!",
    "💎 Shine gently or shine boldly — just shine!",
    "✨ Your uniqueness is your superpower!",
    "🎵 Life has rhythm — trust the beat you’re meant to follow!",
    "🔧 You can build something extraordinary with the tools you already have!",
    "🎨 Your mind is a studio — create something breathtaking!",
    "🌠 Dreams turn into reality when courage meets action!",
    "🌄 Today holds the promise of new beginnings!",
    "🔥 Let ambition warm you, not burn you!",
    "🧭 Follow the direction that excites your soul!",
    "🎒 Every experience packs a lesson you can carry forward!",
    "🌟 Your strength shows most when you don’t notice it!",
    "🎈 Hope lifts heavier weights than fear!",
    "🛠️ You’re building a masterpiece, one decision at a time!",
    "🌬️ Let go of what slows you — breathe in what grows you!",
    "💫 Good things start with a shift in mindset!",
    "🪄 Magic happens when you trust the process!",
    "🚀 You’re closer than you think!",
    "🌼 Kindness nourishes creativity!",
    "📘 Every page you turn makes your story richer!",
    "🔥 Use challenges as fuel, not obstacles!",
    "🧠 Think big, start small, act now!",
    "✨ Your light makes the world brighter — let it shine out!",
    "🌈 Your best moments are still ahead of you!",
    "🎯 Focus and faith create unstoppable momentum!",
    "💡 A fresh perspective can open locked doors!",
    "🌙 Even in darkness, your vision can glow!",
    "🎉 Celebrate how far you’ve already come!",
    "🦁 Be brave enough to be yourself loudly!",
    "🌱 Every skill started as a seed of curiosity!",
    "⚡ Creativity grows in the space you give it!",
    "🦢 Grace and grit make a powerful team!",
    "🧩 The missing piece is often courage!",
    "🎇 Let your ideas burst into color!",
    "🌀 Progress is rarely straight — keep going anyway!",
    "🧘 A quiet mind hears the loudest inspiration!",
    "🌙 Trust the journey, even when the map is unclear!",
    "🔮 Your vision is a preview of your future greatness!",
    "✨ Don’t dim your sparkle to fit into the shadows!",
    "🌊 Rise with the waves, don’t fear them!",
    "🎯 Your focus turns dreams into destinations!",
    "🔥 Keep your spark alive — it becomes a flame!",
    "🚀 Your dreams deserve committed effort!",
    "🌟 You carry galaxies of possibility inside you!",
    "🎨 Make today your masterpiece!",
    "💫 Progress is progress — fast or slow!",
    "🦋 Every change is a chance to grow wings!",
    "🧡 Love what you do and your energy will multiply!",
    "🌞 Let positivity be your morning coffee!",
    "🎵 Your rhythm is unique — dance to it!",
    "🪁 Let your hopes fly higher than your fears!",
    "🔥 Be passionately curious — it leads somewhere beautiful!",
    "💡 A single idea can brighten the whole day!",
    "🌱 Start where you are and watch how far you can go!",
    "🌈 You are the creator of your own rainbow!",
    "💎 Let pressure polish you, not break you!",
    "🎬 Your life is a film — make the scenes unforgettable!",
    "🚦 Move forward even if the path is unfamiliar!",
    "🧠 Your brain is a fountain — keep it flowing!",
    "🌟 Don’t just chase stars — become one!",
    "🎯 You’re capable of more than you realize!",
    "🛤️ Every step in the right direction counts!",
    "🔥 Your passion is a compass — follow it!",
    "🌄 Keep climbing — the view gets better!",
    "✨ Believe in the version of you that’s trying to grow!",
    "🌊 Let inspiration wash over you!",
    "🌟 You bring color to the world just by being in it!",
    "🔮 Your future self is cheering for you!",
    "🎉 Joy is fuel — let it guide you!",
    "💫 You’re writing a beautiful story, page by page!",
    "⚡ Bold actions bring bright results!",
    "🌻 You’re blooming exactly where you need to!",
    "🚀 Push past comfortable — that’s where growth begins!",
    "🎨 Make mistakes; they’re brushstrokes of genius!",
    "🌈 Your happiness is worth investing in!",
    "✨ Shine today — the world needs your light!",
    "🌟 You are capable, creative, and endlessly powerful!",
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
};

// ===== Video Editing Riddle Challenge =====
const VideoEditingRiddleChallenge = ({ onAdminAccessGranted }) => {
  const [gameState, setGameState] = useState("intro");
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [solvedRiddles, setSolvedRiddles] = useState([]);

  const videoEditingRiddles = [
    {
      riddle:
        "I fill empty spaces with emotion, turning silence into feeling. Without me, a video feels empty. What am I?",
      answer: "sound",
      hint: "It brings scenes to life.",
    },
    {
      riddle:
        "I bend time with a smooth touch. Fast becomes slow, and slow becomes fast. What am I?",
      answer: "ramping",
      hint: "A word related to changing clip speed.",
    },
    {
      riddle:
        "I paint mood without a brush. Warm, cold, dark, bright—I decide the feeling of every frame. What am I?",
      answer: "grading",
      hint: "It's what happens after correcting colors.",
    },
    {
      riddle:
        "I follow movement like a loyal shadow, keeping effects locked to every step. What am I?",
      answer: "tracking",
      hint: "VFX depends on me to stay accurate.",
    },
    {
      riddle:
        "I hold clips like time itself, letting you cut, move, and shape the story. What am I?",
      answer: "timeline",
      hint: "Your entire edit lives on me.",
    },

    // ✅ SECRET ADMIN RIDDLE (unchanged)
    {
      riddle:
        "I start in your memory and end in your mind. Only you know the pattern I follow. To everyone else, I’m just noise. What am I?",
      answer: import.meta.env.VITE_RIDDLE_ANSWER,
      hint: "think of a private sequence or pattern that begins with a memory and finishes as a mental tag — a short phrase, name, rhythm, or ordering only you would immediately recognize.",
      isSecret: true,
    },

    // ✅ NEW RIDDLES (single-word answers)
    {
      riddle:
        "I’m the moment between moments, softening a cut or sharpening it when needed. What am I?",
      answer: "transition",
      hint: "Used between two clips.",
    },
    {
      riddle:
        "I turn chaos into order. Clips, sounds, and graphics all sit inside me neatly. What am I?",
      answer: "bin",
      hint: "Editors use me to stay organized.",
    },
    {
      riddle:
        "I show the future of your edit before anyone else sees it. What am I?",
      answer: "preview",
      hint: "You watch me every time you press play.",
    },
    {
      riddle:
        "I give your edits flow. Without me, everything feels off-beat. What am I?",
      answer: "rhythm",
      hint: "It controls the pacing of your cuts.",
    },
  ];

  const startChallenge = () => {
    setGameState("playing");
    setCurrentRiddle(0);
    setUserAnswer("");
    setHintsUsed(0);
    setShowHint(false);
    setSolvedRiddles([]);
  };

  const checkAnswer = () => {
    const current = videoEditingRiddles[currentRiddle];
    const isCorrect =
      userAnswer.trim().toLowerCase() === current.answer.toLowerCase();

    if (isCorrect) {
      setSolvedRiddles([...solvedRiddles, currentRiddle]);

      // Show success modal with random quote
      setCurrentQuote(getRandomQuote());
      setShowSuccessModal(true);

      if (current.isSecret) {
        // Secret riddle solved - grant admin access after modal closes
        setTimeout(() => {
          onAdminAccessGranted();
        }, 1000);
      }
    } else {
      // Simple error message without modal
      setUserAnswer("");
      setTimeout(() => {
        // Clear any previous messages
      }, 2000);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setUserAnswer("");
    setShowHint(false);

    if (videoEditingRiddles[currentRiddle].isSecret) {
      // Admin access will be granted via the timeout in checkAnswer
      return;
    }

    // Move to next riddle if not the last one
    if (currentRiddle < videoEditingRiddles.length - 1) {
      setCurrentRiddle(currentRiddle + 1);
    } else {
      // All riddles completed
      setGameState("completed");
    }
  };

  const useHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
  };

  const skipRiddle = () => {
    if (currentRiddle < videoEditingRiddles.length - 1) {
      setCurrentRiddle(currentRiddle + 1);
      setUserAnswer("");
      setShowHint(false);
    }
  };

  const endChallenge = () => {
    setGameState("completed");
  };

  const restartChallenge = () => {
    setGameState("intro");
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="p-6 border rounded-2xl bg-gray-800/30 border-gray-700/50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-3 p-4 mb-4 rounded-2xl bg-gradient-to-r from-[#0084FF]/20 to-[#0066CC]/20"
              >
                <FaPuzzlePiece className="text-[#0084FF] text-xl" />
                <HiKey className="text-[#0084FF] text-xl" />
                <FaLightbulb className="text-[#0084FF] text-xl" />
              </motion.div>

              <h3 className="mb-3 text-xl font-bold text-white">
                Editor's Mind Challenge
              </h3>
              <p className="mb-4 text-gray-300">
                Test your creative thinking with video editing riddles! Solve
                them all to discover something special.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="p-3 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/20">
                  <div className="font-semibold text-[#0084FF]">
                    {videoEditingRiddles.length} Riddles
                  </div>
                  <div className="text-gray-400">Creative Fun</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0066CC]/10 border border-[#0066CC]/20">
                  <div className="font-semibold text-[#0066CC]">
                    100+ Quotes
                  </div>
                  <div className="text-gray-400">Inspirational Rewards</div>
                </div>
              </div>

              <motion.button
                onClick={startChallenge}
                className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl hover:shadow-lg hover:shadow-[#0084FF]/25"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Creative Journey
              </motion.button>
            </div>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-5 border rounded-2xl bg-gray-800/30 border-gray-700/50"
          >
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-[#0084FF]/20 border border-[#0084FF]/30">
                  <span className="text-sm font-semibold text-[#0084FF]">
                    Riddle {currentRiddle + 1}/{videoEditingRiddles.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-400">
                <FaLightbulb className="text-[#0084FF]" />
                <span>Hints: {3 - hintsUsed}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 mb-5 bg-gray-700 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${
                    ((currentRiddle + 1) / videoEditingRiddles.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Riddle */}
            <div className="mb-5">
              <div className="p-4 border rounded-xl bg-gray-700/30 border-gray-600/30">
                <p className="text-lg leading-relaxed text-gray-200">
                  {videoEditingRiddles[currentRiddle].riddle}
                </p>
              </div>
            </div>

            {/* Hint */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 mb-4 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/20"
              >
                <p className="text-sm text-[#0084FF]">
                  💡 {videoEditingRiddles[currentRiddle].hint}
                </p>
              </motion.div>
            )}

            {/* Answer Input */}
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Type your creative answer..."
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-[#0084FF] focus:ring-1 focus:ring-[#0084FF]"
              />

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  onClick={checkAnswer}
                  className="flex-1 px-4 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl hover:shadow-lg hover:shadow-[#0084FF]/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Answer
                </motion.button>

                {!showHint && hintsUsed < 3 && (
                  <motion.button
                    onClick={useHint}
                    className="px-4 py-3 font-semibold text-gray-300 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-gray-600/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaLightbulb className="inline w-4 h-4 mr-2" />
                    Hint
                  </motion.button>
                )}
              </div>

              {/* Skip or End Button */}
              <div className="flex gap-2">
                {currentRiddle < videoEditingRiddles.length - 1 ? (
                  <motion.button
                    onClick={skipRiddle}
                    className="flex-1 py-2 text-sm text-gray-500 transition-colors hover:text-gray-400"
                    whileHover={{ y: -1 }}
                  >
                    Skip this riddle →
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={endChallenge}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium text-gray-400 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 hover:text-gray-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTimes className="w-3 h-3" />
                    Finish Challenge
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "completed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 text-center border rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#0066CC]/10 border-[#0084FF]/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-4 text-4xl"
            >
              🎉
            </motion.div>

            <h3 className="mb-3 text-2xl font-bold text-white">
              Amazing Journey!
            </h3>

            <p className="mb-4 text-gray-300">
              You've completed {solvedRiddles.length} out of{" "}
              {videoEditingRiddles.length} creative riddles! Your video editing
              knowledge is impressive.
            </p>

            <div className="p-4 mb-4 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/20">
              <p className="text-sm text-[#0084FF]">
                <FaQuoteLeft className="inline w-3 h-3 mr-2 opacity-50" />
                {getRandomQuote()}
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={restartChallenge}
                className="flex-1 px-4 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl hover:shadow-lg hover:shadow-[#0084FF]/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Play Again
              </motion.button>

              <motion.button
                onClick={() => setGameState("intro")}
                className="flex-1 px-4 py-3 font-semibold text-gray-300 transition-all duration-300 bg-gray-700/50 rounded-xl hover:bg-gray-600/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        quote={currentQuote}
        riddleNumber={currentRiddle + 1}
      />
    </div>
  );
};

// ===== Simplified Cosmic Footer =====
export default function CosmicFooter() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, user, logout } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);

  const socials = [
    {
      icon: FaX,
      href: "https://x.com/ShahorinH4802",
      color: "#1DA1F2",
      label: "Twitter",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/nexora-pro-123ba7353/",
      color: "#0077B5",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/shahorinhasan",
      color: "#E4405F",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#showreel" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll to any section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const navbarHeight = 64;
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const handleQuickLinkClick = (href) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  const handleAdminAccessGranted = () => {
    setShowAdminLogin(true);
    setShowChallenge(false);
  };

  const handleAdminLogin = () => {
    window.location.href = "/login";
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleLogout = async () => {
    await logout();
  };

  const handlePortfolioClick = () => {
    window.open("https://mahimshahriar.com", "_blank", "noopener,noreferrer");
  };

  const startChallenge = () => {
    setShowChallenge(true);
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0084FF]/50 to-transparent" />

        {/* Floating Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0084FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 py-12 mx-auto">
        {/* Main Content */}
        <div className="grid gap-8 mb-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Logo" className="h-20 w-34" />
            </motion.div>

            <p className="text-sm text-gray-400">
              Next-generation video editing and creative solutions for the
              digital universe.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 transition-all duration-300 rounded-lg bg-gray-800/50 hover:bg-gray-700/50"
                >
                  <social.icon
                    className="w-4 h-4"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="flex items-center gap-2 font-semibold text-white">
              <HiSparkles className="w-4 h-4 text-[#0084FF]" />
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-gray-400 hover:text-[#0084FF] text-sm transition-colors duration-300 text-left"
                  whileHover={{ x: 5 }}
                  onClick={() => handleQuickLinkClick(link.href)}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Admin Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="flex items-center gap-2 font-semibold text-white">
              <FaUserShield className="w-4 h-4 text-[#0084FF]" />
              {isAuthenticated ? "Admin Panel" : "Creative Challenge"}
            </h4>

            {isAuthenticated ? (
              // Logged In State
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-gray-800/30 border-gray-700/50">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || user?.email || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email || "Welcome back!"}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={handleDashboard}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-lg hover:shadow-lg hover:shadow-[#0084FF]/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTachometerAlt className="w-4 h-4" />
                    Dashboard
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              </div>
            ) : showAdminLogin ? (
              // Admin Login Button (after secret riddle solved)
              <div className="space-y-3">
                <div className="p-3 text-center rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <p className="text-sm text-green-300">
                    🔮 Secret Discovered! Special access unlocked.
                  </p>
                </div>
                <motion.button
                  onClick={handleAdminLogin}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserShield className="w-4 h-4" />
                  Enter Special Access
                </motion.button>
              </div>
            ) : showChallenge ? (
              // Video Editing Riddle Challenge (when active)
              <VideoEditingRiddleChallenge
                onAdminAccessGranted={handleAdminAccessGranted}
              />
            ) : (
              // Start Challenge Button (initial state)
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Test your creative thinking with fun video editing riddles.
                  Discover hidden surprises!
                </p>
                <motion.button
                  onClick={startChallenge}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-[#0084FF] to-[#0066CC] hover:shadow-lg hover:shadow-[#0084FF]/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPuzzlePiece className="w-4 h-4" />
                  Start Creative Challenge
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800/50">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <span>© {currentYear} Nexora Studio. All rights reserved.</span>
              <span className="hidden text-gray-500 md:inline">|</span>
              <motion.button
                onClick={handlePortfolioClick}
                className="transition-all duration-300 hover:text-[#0084FF] hover:scale-105"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Crafted by{" "}
                <span className="font-semibold text-white">
                  Md Mahim Shahriar
                </span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />

      {/* Floating Accents */}
      <motion.div
        className="absolute bottom-1/4 left-10 w-2 h-2 bg-[#0084FF]/40 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-1 h-1 bg-[#0066CC]/30 rounded-full blur-sm"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </footer>
  );
}
