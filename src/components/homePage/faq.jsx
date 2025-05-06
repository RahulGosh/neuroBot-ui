import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "What makes NeuroBot different from other AI writing assistants?",
    answer: "NeuroBot combines advanced natural language processing with domain-specific knowledge to provide more accurate and context-aware suggestions than generic writing tools."
  },
  {
    question: "How does NeuroBot ensure the quality of its outputs?",
    answer: "Our AI undergoes rigorous training with high-quality datasets and continuous feedback loops from expert users to maintain exceptional output standards."
  },
  {
    question: "Can NeuroBot help with academic writing?",
    answer: "Yes, NeuroBot has specialized modes for academic writing that can help with research papers, citations, and maintaining formal tone."
  },
  {
    question: "Is my data secure when using NeuroBot?",
    answer: "Absolutely. We use end-to-end encryption and never store your sensitive information beyond what's necessary for service operation."
  },
  {
    question: "How often is NeuroBot updated with new features?",
    answer: "We release major updates monthly, with smaller improvements and bug fixes deployed continuously."
  },
  {
    question: "Can I use NeuroBot for team collaboration?",
    answer: "Yes, our enterprise plan includes team features like shared workspaces and collaborative editing."
  },
  {
    question: "Does NeuroBot support multiple languages?",
    answer: "Currently we support English, Spanish, French, and German, with more languages coming soon."
  }
];

const FAQ = ({ id = "faq" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
      className="py-10 md:py-14 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
    >
      <motion.div
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 10,
            },
          },
        }}
        className="text-center mb-6 md:mb-10"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">Frequently Asked Questions</h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get answers about NeuroBot's advanced capabilities
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 },
              },
            }}
            viewport={{ once: true }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            <motion.button
              whileHover={{
                backgroundColor: isDarkMode
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(16, 185, 129, 0.05)",
              }}
              className="p-3 sm:p-4 w-full text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium text-xs sm:text-sm">{faq.question}</h3>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                className="text-emerald-500 text-lg sm:text-xl font-light ml-2"
              >
                +
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs text-gray-600 dark:text-gray-300">
                    {faq.answer}
                    {index === 2 && (
                      <div className="mt-1 sm:mt-2 text-xxs sm:text-xs text-emerald-600 dark:text-emerald-400">
                        Try our "Academic Mode" in the settings for specialized assistance.
                      </div>
                    )}
                    {index === 6 && (
                      <div className="mt-1 sm:mt-2 text-xxs sm:text-xs text-emerald-600 dark:text-emerald-400">
                        Contact sales for a custom demo of this feature.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6 md:mt-10"
      >
        <p className="text-xxs sm:text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
          Still have questions?
        </p>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          Contact Support
        </button>
      </motion.div>
    </motion.section>
  );
};

export default FAQ;