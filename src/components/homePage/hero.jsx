import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiZap,
  FiLayers,
  FiCpu,
  FiActivity,
  FiFileText,
  FiSearch,
} from "react-icons/fi";

const Hero = ({ id }) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            when: "beforeChildren",
          },
        },
      }}
      className="py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between"
    >
      <motion.div
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
        }}
        className="md:w-1/2 mb-8 md:mb-0"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Transform Your Legal Practice with{" "}
        <span className="text-emerald-500">AI</span>
        </h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
        LexTech Pro empowers legal professionals with cutting-edge tools for document analysis, 
        case research, and contract automation - all in one secure platform.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/chat"
            className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-center font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.div}
          >
            Request Demo
            </Link>
          <Link
            to="#features-section"
            className="px-6 py-3 border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors text-center font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.div}
          >
            Explore Features
          </Link>
        </div>
      </motion.div>

      {/* Unique animated visual on the right */}
      <motion.div
        variants={{
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
        }}
        className="md:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-md">
          {/* Neural network visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 shadow-lg overflow-hidden"
          >
            {/* Animated CPU/neural processor visualization */}
            <div className="relative h-64">
              {/* Central CPU icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
              >
                <FiCpu size={80} />
              </motion.div>

              {/* Animated connection lines */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-emerald-300 to-blue-300 dark:from-emerald-600 dark:to-blue-500"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 40}%`,
                    width: `${30 + Math.random() * 40}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    width: ["0%", "60%", "0%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Pulse circles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`circle-${i}`}
                  className="absolute top-1/2 left-1/2 rounded-full bg-emerald-500 dark:bg-emerald-400"
                  style={{
                    width: 4,
                    height: 4,
                    opacity: 0.6,
                  }}
                  animate={{
                    scale: [0, 5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    delay: i * 0.5,
                  }}
                />
              ))}

              {/* Activity nodes with mini activity graphs */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`activity-${i}`}
                  className="absolute"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                  }}
                >
                  <FiActivity
                    className="text-blue-400 dark:text-blue-300"
                    size={12}
                  />
                </motion.div>
              ))}

              {/* Node dots */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`node-${i}`}
                  className="absolute rounded-full bg-emerald-400 dark:bg-emerald-300"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    width: 6,
                    height: 6,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Feature highlights */}
            <div className="mt-6 space-y-3">
              <motion.div
                className="flex items-center text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="mr-3 p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                  <FiZap className="text-emerald-500" />
                </div>
                <span>Instant AI-powered responses</span>
              </motion.div>

              <motion.div
                className="flex items-center text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <FiFileText className="text-blue-600" />
                </div>
                <span>Automated document analysis</span>
              </motion.div>

              <motion.div
                className="flex items-center text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="mr-3 p-2 bg-purple-100 dark:bg-purple-800 rounded-full">
                <FiSearch className="text-indigo-600" />
                </div>
                <span>Intelligent case research</span>

              </motion.div>
            </div>
          </motion.div>

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <p className="text-sm font-medium">Powered by:</p>
            <p className="text-xs text-emerald-500 font-bold">
              Neural Processing Engine
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
