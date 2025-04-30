import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "How does LegalAssist differ from other legal tech solutions?",
    answer:
      "LegalAssist combines advanced natural language processing with legal expertise to provide more accurate document analysis than basic legal software. Our AI understands legal context and precedent to offer real-time, in-depth insights rather than just surface-level document processing.",
  },
  {
    question: "What security measures protect my legal documents?",
    answer:
      "We implement bank-level encryption for all legal documents in transit and at rest. Your content is never used for training our models without explicit consent, and we maintain strict compliance with GDPR, CCPA, and industry-specific regulations like HIPAA. Enterprise plans offer additional security controls including private cloud deployment options and client-matter segregation.",
  },
  {
    question: "Can LegalAssist handle specialized legal documentation?",
    answer:
      "Absolutely. LegalAssist has specialized modules for contract analysis, intellectual property documentation, compliance reporting, and litigation support. It can identify legal risks, suggest jurisdiction-specific language, and ensure regulatory compliance while maintaining professional legal standards.",
  },
  {
    question: "How does the platform handle multiple jurisdictions?",
    answer:
      "LegalAssist supports legal frameworks from 25+ countries with jurisdiction-specific expertise. The AI understands regional legal differences, precedent variations, and regulatory requirements. Premium users can access cross-jurisdictional analysis to compare legal implications across different regions.",
  },
  {
    question: "What integrations does LegalAssist offer?",
    answer:
      "We provide native integrations with major practice management systems, document management solutions, and e-discovery platforms including Clio, Relativity, and NetDocuments. Our API allows custom integration with any legal workflow, and secure webhooks enable automated processes with existing firm infrastructure.",
  },
  {
    question: "How does the pricing model work for law firms?",
    answer:
      "Firm plans offer scalable pricing based on active attorneys and paralegals, with volume discounts for larger practices. Enterprise plans include dedicated legal success managers, custom legal model training, and advanced matter analytics. All plans come with a 30-day money-back guarantee.",
  },
  {
    question: "Can I train LegalAssist on my firm's precedents and templates?",
    answer:
      "Yes, our Enterprise plan includes custom model training where you can upload previous case documents, standard templates, and firm-specific protocols. The AI will learn your firm's preferred legal approach, terminology, and formatting requirements within 2-3 weeks of training.",
  },
  {
    question: "How does LegalAssist handle confidentiality and attorney-client privilege?",
    answer:
      "LegalAssist was built with legal ethics at its core. Our system maintains strict data segregation, preserving attorney-client privilege. All data processing occurs in SOC 2 Type II certified environments, and we provide comprehensive audit logs for compliance verification. Our terms of service explicitly preserve privilege and confidentiality protections.",
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
      className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
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
