import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Content Creator",
    content: "NeuroBot has revolutionized my writing process. It's like having an AI assistant that understands exactly what I need.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Director",
    content: "Our team's productivity increased by 40% after implementing NeuroBot for content creation.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The code documentation feature saves me hours every week. Highly recommended for developers!",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "University Professor",
    content: "My students' writing quality improved dramatically after I recommended NeuroBot.",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Journalist",
    content: "The fastest and most accurate writing assistant I've ever used for news articles.",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 6,
    name: "Olivia Martinez",
    role: "Blogger",
    content: "I can now produce twice as much content in half the time thanks to NeuroBot.",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

const Testimonials = () => {
  const controls = useAnimation();
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const singleSetWidth = testimonials.length * (288 + 24); // card width (w-72) + margin (mx-3)
    setWidth(singleSetWidth);
    setDuration(testimonials.length * 5);
    
    controls.start({
      x: [`0px`, `-${singleSetWidth}px`],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        }
      }
    });
  }, [controls, duration]);

  return (
    <motion.section 
      className="py-10 md:py-14 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">What Our Users Say</h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Trusted by thousands of users worldwide
        </p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="overflow-hidden" ref={carousel}>
          <motion.div 
            className="flex"
            animate={controls}
            style={{ width: width * 2 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={`first-${testimonial.id}`}
                className="flex-shrink-0 w-64 sm:w-72 mx-2 sm:mx-3 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <motion.img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold">{testimonial.name}</h4>
                    <p className="text-xxs sm:text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
            
            {testimonials.map((testimonial) => (
              <motion.div 
                key={`second-${testimonial.id}`}
                className="flex-shrink-0 w-64 sm:w-72 mx-2 sm:mx-3 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <motion.img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold">{testimonial.name}</h4>
                    <p className="text-xxs sm:text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
      </div>
    </motion.section>
  );
};

export default Testimonials;