import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 md:px-8 lg:px-16 bg-emerald-500 text-white text-center"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6"
      >
        Ready to Transform Your Writing?
      </motion.h2>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-lg mb-8 max-w-2xl mx-auto"
      >
        Join thousands of users who are already enhancing their writing with NeuroBot
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link 
          to="/sign-up" 
          className="px-8 py-3 bg-white text-emerald-500 rounded-md font-medium inline-block"
        >
          Get Started for Free
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CTA;