import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CyberpunkNavigation from '../components/CyberpunkNavigation';
import CyberpunkHeroSection from '../components/CyberpunkHeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
// import CodingProfilesSection from '../components/CodingProfilesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const HarishPortfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'coding-profiles', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Cyberpunk Hero Section */}
      <CyberpunkHeroSection />
      
      {/* Pinned Navigation at Top */}
      <CyberpunkNavigation activeSection={activeSection} />
      
      {/* Main content with top padding to account for fixed hero */}
      <div className="relative z-30">
        {/* Spacer for hero section */}
        <div id="home" className="h-screen" />
        
        <main className="bg-background">
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-h-screen"
          >
            <AboutSection />
          </motion.section>

          <motion.section
            id="skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-h-screen"
          >
            <SkillsSection />
          </motion.section>

          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-h-screen"
          >
            <ProjectsSection />
          </motion.section>

          {/* <motion.section
            id="coding-profiles"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-h-screen"
          >
            <CodingProfilesSection />
          </motion.section> */}

          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-h-screen"
          >
            <ContactSection />
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HarishPortfolio;