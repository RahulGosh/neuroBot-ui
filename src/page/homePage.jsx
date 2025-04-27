import { useLocation } from 'react-router-dom';
import CTA from '../components/homePage/cta';
import FAQ from '../components/homePage/faq';
import Features from '../components/homePage/features';
import Hero from '../components/homePage/hero';
import HowItWorks from '../components/homePage/howItWorks';
import Footer from '../components/homePage/layout/footer';
import Header from '../components/homePage/layout/header';
import Testimonials from '../components/homePage/testimonials';
import { useTheme } from '../context/themeContext';
import Contact from './../components/homePage/contact';
import { useEffect } from 'react';

const HomePage = () => {
  const { darkMode, toggleTheme } = useTheme();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        // Small timeout to ensure page is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-header text-light-text dark:text-dark-text">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero id="" />
      <Features id="features-section" />
      <HowItWorks />
      <Testimonials />
      <FAQ id="faq" />
      <Contact id="contact" />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;