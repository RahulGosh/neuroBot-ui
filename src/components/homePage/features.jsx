import { motion } from 'framer-motion';
import { 
  FaFileContract,
  FaSearch,
  FaFileSignature,
  FaCheckDouble,
  FaBalanceScale,
  FaUserFriends
} from 'react-icons/fa';
import { 
  GiArchiveResearch
} from 'react-icons/gi';

const features = [
  {
    title: "Document Analysis",
    description: "Automatically review and analyze legal documents for key clauses and risks.",
    icon: <FaFileContract className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
    color: "text-blue-500"
  },
  {
    title: "Case Research",
    description: "Quickly find relevant case law and precedents with AI-powered search.",
    icon: <GiArchiveResearch className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />,
    color: "text-indigo-500"
  },
  {
    title: "Contract Automation",
    description: "Generate and customize legal contracts with smart templates.",
    icon: <FaFileSignature className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />,
    color: "text-emerald-500"
  },
  {
    title: "Compliance Check",
    description: "Ensure documents meet current regulatory requirements automatically.",
    icon: <FaCheckDouble className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />,
    color: "text-teal-500"
  },
  {
    title: "Legal Drafting",
    description: "Create precise legal documents with AI-assisted drafting tools.",
    icon: <FaBalanceScale className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />,
    color: "text-amber-500"
  },
  {
    title: "Client Intake",
    description: "Streamline client onboarding with automated forms and analysis.",
    icon: <FaUserFriends className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
    color: "text-pink-500"
  },
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
      className="py-10 md:py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
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
        className="text-center mb-6 md:mb-12"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-3">Powerful Features</h2>
        <p className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          NeuroBot offers a comprehensive suite of tools to enhance your writing experience
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
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
      className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 md:mb-3">{feature.icon}</div>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">{feature.title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-300">{feature.description}</p>
    </motion.div>
  );
};

export default Features;