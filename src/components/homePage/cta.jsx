import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-10 px-4 md:px-8 bg-emerald-500 text-white text-center"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl font-bold mb-3"
      >
        Ready to Transform Your Writing?
      </motion.h2>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xs md:text-sm mb-4 max-w-2xl mx-auto"
      >
        Join thousands of users who are already enhancing their writing with NeuroBot
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link 
          to="/sign-up" 
          className="px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm bg-white text-emerald-500 rounded-md font-medium"
        >
          Get Started for Free
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CTA;