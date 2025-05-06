import { motion } from 'framer-motion';

const steps = [
  {
    step: "1",
    title: "Document Upload",
    description: "Securely upload your legal documents in seconds",
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Our advanced algorithms review and process your documents",
  },
  {
    step: "3",
    title: "Expert Insights",
    description: "Receive comprehensive legal analysis and recommendations",
  }
];

const HowItWorks = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, when: "beforeChildren" }
        }
      }}
      className="py-10 md:py-14 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
    >
      <motion.div
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
          }
        }}
        className="text-center mb-6 md:mb-10"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-3">How LegalAssist Works</h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transform your legal workflow in just a few simple steps
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 }
              }
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-sm sm:text-base font-bold mb-2 sm:mb-3"
            >
              {step.step}
            </motion.div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">{step.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;