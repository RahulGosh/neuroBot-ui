import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaHistory, FaHospital, FaLock, FaShieldAlt, FaUserLock, FaUserShield } from 'react-icons/fa';
import { GiJusticeStar, GiPolicemanBadge } from 'react-icons/gi';

const SecurityTrustSection = () => {
  const securityImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "AES-256 encryption for all legal documents and communications.",
      icon: <FaLock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
    },
    {
      title: "Compliance Certified",
      description: "SOC 2 Type II, GDPR, HIPAA, and bar association standards.",
      icon: <GiJusticeStar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
    },
    {
      title: "Granular Access Controls",
      description: "Role-based permissions with matter-level security isolation.",
      icon: <FaUserShield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
    },
    {
      title: "Audit Logging",
      description: "Detailed activity tracking for all document access and changes.",
      icon: <FaHistory className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
    }
  ];

  const certifications = [
    { 
      name: 'SOC2', 
      icon: <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      name: 'GDPR', 
      icon: <FaUserLock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/30"
    },
    { 
      name: 'HIPAA', 
      icon: <FaHospital className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/30"
    },
    { 
      name: 'ISO27001', 
      icon: <FaGlobeAmericas className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />,
      color: "bg-teal-100 dark:bg-teal-900/30"
    },
    { 
      name: 'CJIS', 
      icon: <FaUserShield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900/30"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
            Legal-Grade Security & Trust
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protecting sensitive client data with enterprise-grade security measures 
            designed specifically for legal professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <img
              src={securityImage}
              alt="A lawyer reviewing secure digital documents on a tablet with lock icon overlay"
              className="w-full h-auto object-cover"
              style={{ minHeight: '280px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-3 md:p-4">
              <p className="text-white text-xxs sm:text-xs font-medium">
                All documents protected with bank-level security and attorney-client privilege safeguards
              </p>
            </div>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-12 text-center"
        >
          <h4 className="text-xxs sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 md:mb-4">
            Trusted Compliance Certifications
          </h4>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 h-10 md:h-12 w-20 md:w-28 flex flex-col items-center justify-center rounded-md shadow-sm px-2 py-1 md:px-3 md:py-2 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-base md:text-lg mb-0.5">{cert.icon}</span>
                <span className="text-xxs sm:text-xs font-medium">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;