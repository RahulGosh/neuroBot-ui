import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'General Inquiry'
  });
  
  const [formStatus, setFormStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('loading');
    
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
          subject: 'General Inquiry'
        });
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };
  
  const contactMethods = [
    {
      icon: <FiMail className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />,
      title: 'Email',
      info: 'support@neurobot.ai',
      description: 'Our friendly team is here to help.'
    },
    {
      icon: <FiMapPin className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />,
      title: 'Office',
      info: '123 Innovation Street, San Francisco, CA 94107',
      description: 'Come say hello at our headquarters.'
    },
    {
      icon: <FiPhone className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm PST.'
    }
  ];
  
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };
  
  const contactMethodVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: index => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.2 * index,
        duration: 0.5
      } 
    })
  };
  
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: '#0d9488',
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };
  
  const inputVariants = {
    focus: { 
      boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)",
      borderColor: "#10B981"
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 md:py-16 px-4 md:px-8 lg:px-16"
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Get In Touch</h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about NeuroBot? Our team is here to help you.
        </p>
      </motion.div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Methods */}
        <div className="space-y-4 md:space-y-6">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-semibold mb-4 md:mb-6"
          >
            Contact Information
          </motion.h3>
          
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={contactMethodVariants}
              className="flex items-start p-4 md:p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 md:p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-3 md:mr-4 text-emerald-600 dark:text-emerald-400">
                {method.icon}
              </div>
              <div>
                <h4 className="font-medium text-base md:text-lg mb-1">{method.title}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm md:text-base font-medium">{method.info}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1">{method.description}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 md:mt-8 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <h4 className="font-medium text-base md:text-lg mb-2 md:mb-3">Business Hours</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 5:00 PM PST</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 2:00 PM PST</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Contact Form */}
        <motion.div
          variants={formVariants}
          className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Send us a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <motion.select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
              >
                <option className="dark:bg-gray-700" value="General Inquiry">General Inquiry</option>
                <option className="dark:bg-gray-700" value="Technical Support">Technical Support</option>
                <option className="dark:bg-gray-700" value="Feature Request">Feature Request</option>
                <option className="dark:bg-gray-700" value="Others">Others</option>
              </motion.select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
                placeholder="How can we help you?"
              />
            </div>
            
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              disabled={formStatus === 'loading'}
              className="w-full py-2 md:py-3 px-4 md:px-6 text-sm md:text-base bg-emerald-500 text-white rounded-lg font-medium transition-colors disabled:bg-emerald-400"
            >
              {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
            
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-2 md:p-3 text-xs md:text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-center"
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;