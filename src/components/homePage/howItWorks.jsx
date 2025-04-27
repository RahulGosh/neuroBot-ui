import { motion } from 'framer-motion';

const steps = [
  {
    step: "1",
    title: "Sign Up",
    description: "Create your free account in seconds",
    icon: "📝"
  },
  {
    step: "2",
    title: "Start Chatting",
    description: "Type or paste your text into the chat interface",
    icon: "💬"
  },
  {
    step: "3",
    title: "Get AI Assistance",
    description: "Receive instant suggestions and improvements",
    icon: "🤖"
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
          transition: {
            staggerChildren: 0.1,
            when: "beforeChildren"
          }
        }
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
              damping: 10
            }
          }
        }} 
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">How NeuroBot Works</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get started in just a few simple steps
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-2xl mb-4"
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;