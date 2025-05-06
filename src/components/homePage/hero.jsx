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
      className="py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between"
    >
      <motion.div
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
        }}
        className="md:w-1/2 mb-8 md:mb-0"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4"> {/* Adjusted to match header sizes */}
          Transform Your Legal Practice with{" "}
          <span className="text-emerald-500">AI</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base mb-6 text-gray-600 dark:text-gray-300"> {/* Matched dropdown text size */}
          LexTech Pro empowers legal professionals with cutting-edge tools for document analysis, 
          case research, and contract automation - all in one secure platform.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            to="/chat"
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-center font-medium text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.div}
          >
            Request Demo
          </Link>
          <Link
            to="#features-section"
            className="px-5 py-2.5 sm:px-6 sm:py-3 border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors text-center font-medium text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.div}
          >
            Explore Features
          </Link>
        </div>
      </motion.div>

      {/* Visual section */}
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
            className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 sm:p-8 shadow-lg overflow-hidden"
          >
            {/* Animated CPU/neural processor visualization */}
            <div className="relative h-56 sm:h-64">
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
                <FiCpu size={60} className="sm:w-20 sm:h-20" />
              </motion.div>

              {/* Feature highlights */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <motion.div
                  className="flex items-center text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mr-2 sm:mr-3 p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                    <FiZap className="text-emerald-500 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xxs sm:text-xs md:text-sm">Instant AI-powered responses</span> {/* Matched smallest text size */}
                </motion.div>

                <motion.div
                  className="flex items-center text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mr-2 sm:mr-3 p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                    <FiFileText className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xxs sm:text-xs md:text-sm">Automated document analysis</span>
                </motion.div>

                <motion.div
                  className="flex items-center text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="mr-2 sm:mr-3 p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-800 rounded-full">
                    <FiSearch className="text-indigo-600 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xxs sm:text-xs md:text-sm">Intelligent case research</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg"
          >
            <p className="text-xxs sm:text-xs font-medium">Powered by:</p> {/* Matched smallest text size */}
            <p className="text-xxs text-emerald-500 font-bold">
              Neural Processing Engine
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;