import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "How does NeuroBot differ from other AI writing tools?",
    answer:
      "NeuroBot combines advanced natural language processing with contextual understanding to provide more accurate suggestions than basic grammar checkers. Our AI adapts to your writing style and offers real-time, in-depth improvements rather than just surface-level corrections.",
  },
  {
    question: "What security measures protect my documents?",
    answer:
      "We use end-to-end encryption for all documents in transit and at rest. Your content is never used for training our models without explicit consent, and we comply with GDPR and CCPA regulations. Enterprise plans offer additional security controls and private cloud deployment options.",
  },
  {
    question: "Can NeuroBot help with technical or academic writing?",
    answer:
      "Absolutely. NeuroBot has specialized modes for technical documentation, academic papers, and research writing. It can format citations (APA, MLA, Chicago), suggest domain-specific terminology, and ensure proper technical tone while maintaining readability.",
  },
  {
    question: "How does the AI handle multiple languages?",
    answer:
      "NeuroBot supports 25+ languages with native-level proficiency. The AI understands linguistic nuances, idiomatic expressions, and cultural context. Premium users can access real-time translation between supported languages while preserving original meaning.",
  },
  {
    question: "What integrations does NeuroBot offer?",
    answer:
      "We provide native integrations with Google Docs, Microsoft Word, Chrome, Slack, and most CMS platforms. Our API allows custom integration with any platform, and webhooks enable automated workflows with tools like Zapier and Make.",
  },
  {
    question: "How does the pricing model work for teams?",
    answer:
      "Team plans offer scalable pricing based on active users, with volume discounts for larger organizations. Enterprise plans include dedicated support, custom model training, and advanced analytics. All plans come with a 30-day money-back guarantee.",
  },
  {
    question: "Can I train NeuroBot on my company's style guide?",
    answer:
      "Yes, our Enterprise plan includes custom model training where you can upload style guides, past documents, and branding materials. The AI will learn your preferred terminology, tone, and formatting requirements within 2-3 weeks of training.",
  },
  {
    question: "What's your policy on AI-generated content detection?",
    answer:
      "NeuroBot includes an authenticity scoring system that helps make AI-assisted content appear more human-like. However, we recommend always adding your unique perspective. We don't guarantee content will pass detection systems, as these tools evolve constantly.",
  },
];

const FAQ = ({ id = "faq" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");

      setIsDarkMode(prefersDark || hasDarkClass);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
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
      className="py-16 px-4 md:px-8 lg:px-16"
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
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get answers about NeuroBot's advanced capabilities
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4">
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
              className="p-5 w-full text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium text-lg">{faq.question}</h3>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                className="text-emerald-500 text-2xl font-light ml-4"
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
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 mt-2">
                    {faq.answer}
                    {index === 2 && (
                      <div className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
                        Try our "Academic Mode" in the settings for specialized
                        assistance.
                      </div>
                    )}
                    {index === 6 && (
                      <div className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
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
        className="text-center mt-12"
      >
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Still have questions?
        </p>
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          Contact Support
        </button>
      </motion.div>
    </motion.section>
  );
};

export default FAQ;
