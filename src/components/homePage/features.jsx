import { motion } from 'framer-motion';

const features = [
  {
    title: "Intelligent Conversation",
    description: "Engage in natural, flowing conversations with advanced AI responses.",
    icon: "💬"
  },
  {
    title: "Question Answering",
    description: "Receive accurate, detailed answers to your complex questions.",
    icon: "❓"
  },
  {
    title: "Personalized Responses",
    description: "Experience AI that adapts to your conversation style and preferences.",
    icon: "👤"
  },
  {
    title: "Content Generation",
    description: "Create stories, articles, and creative content with AI assistance.",
    icon: "✨"
  },
  {
    title: "Problem Solving",
    description: "Work through complex problems with step-by-step AI guidance.",
    icon: "🧩"
  },
  {
    title: "Learning Companion",
    description: "Study any subject with an AI that explains concepts clearly.",
    icon: "📚"
  }
];

const Features = ({id}) => {
  return (
    <motion.section 
    id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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
              damping: 10
            }
          }
        }} 
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          NeuroBot offers a comprehensive suite of tools to enhance your writing experience
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ feature, index }) => {
  return (
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
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-3xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
    </motion.div>
  );
};

export default Features;