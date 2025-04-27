import { motion } from 'framer-motion';
import { useState } from 'react';

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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: 'Email',
      info: 'support@neurobot.ai',
      description: 'Our friendly team is here to help.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: 'Office',
      info: '123 Innovation Street, San Francisco, CA 94107',
      description: 'Come say hello at our headquarters.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
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
      className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about NeuroBot? Our team is here to help you.
        </p>
      </motion.div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Methods */}
        <div className="space-y-6">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-semibold mb-6"
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
              className="flex items-start p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-4 text-emerald-600 dark:text-emerald-400">
                {method.icon}
              </div>
              <div>
                <h4 className="font-medium text-lg mb-1">{method.title}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">{method.info}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{method.description}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <h4 className="font-medium mb-3">Business Hours</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
          className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
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
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
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
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <motion.select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
              >
                <option className="dark:bg-gray-700" value="General Inquiry">General Inquiry</option>
                <option className="dark:bg-gray-700" value="Technical Support">Technical Support</option>
                <option className="dark:bg-gray-700" value="Feature Request">Feature Request</option>
                <option className="dark:bg-gray-700" value="Others">Others</option>
              </motion.select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none dark:text-white"
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
              className="w-full py-3 px-6 bg-emerald-500 text-white rounded-lg font-medium transition-colors disabled:bg-emerald-400"
            >
              {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
            
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-center"
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