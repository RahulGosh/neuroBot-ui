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
      icon: <FaLock className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Compliance Certified",
      description: "SOC 2 Type II, GDPR, HIPAA, and bar association standards.",
      icon: <GiJusticeStar className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Granular Access Controls",
      description: "Role-based permissions with matter-level security isolation.",
      icon: <FaUserShield className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Audit Logging",
      description: "Detailed activity tracking for all document access and changes.",
      icon: <FaHistory className="w-6 h-6 text-amber-500" />
    }
  ];

  const certifications = [
    { 
      name: 'SOC2', 
      icon: <FaShieldAlt className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      name: 'GDPR', 
      icon: <FaUserLock className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/30"
    },
    { 
      name: 'HIPAA', 
      icon: <FaHospital className="w-6 h-6 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/30"
    },
    { 
      name: 'ISO27001', 
      icon: <FaGlobeAmericas className="w-6 h-6 text-teal-500" />,
      color: "bg-teal-100 dark:bg-teal-900/30"
    },
    { 
      name: 'CJIS', 
      icon: <FaUserShield className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900/30"
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
            Legal-Grade Security & Trust
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protecting sensitive client data with enterprise-grade security measures 
            designed specifically for legal professionals.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <img
              src={securityImage}
              alt="A lawyer reviewing secure digital documents on a tablet with lock icon overlay"
              className="w-full h-auto object-cover"
              style={{ minHeight: '300px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4 md:p-6">
              <p className="text-white text-xs md:text-sm font-medium">
                All documents protected with bank-level security and attorney-client privilege safeguards
              </p>
            </div>
          </motion.div>

          {/* Features List */}
          <div className="space-y-4 md:space-y-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start"
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-2 md:p-3 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <span className="text-lg">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg mb-1 text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-16 text-center"
        >
          <h4 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 md:mb-6">
            Trusted Compliance Certifications
          </h4>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 h-12 md:h-16 w-24 md:w-32 flex flex-col items-center justify-center rounded-lg shadow-md px-3 py-2 md:px-4 md:py-3 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-lg md:text-xl mb-1">{cert.icon}</span>
                <span className="text-xs md:text-sm font-medium">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;