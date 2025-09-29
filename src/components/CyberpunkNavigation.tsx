import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface CyberpunkNavigationProps {
  activeSection: string;
}

const CyberpunkNavigation: React.FC<CyberpunkNavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Harish-D-Resume.pdf';
    link.download = 'Harish-D-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'coding-profiles', label: 'Coding Profiles' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'backdrop-blur-md bg-background/80' : 'bg-transparent'
      }`}
      style={{
        borderBottom: '1px solid hsl(var(--primary) / 0.2)',
        boxShadow: isScrolled ? '0 4px 20px hsl(var(--primary) / 0.1)' : 'none'
      }}
    >
      <div className="container-max mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo with Glitch Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <button
              onClick={() => scrollToSection('home')}
              className="cyberpunk-title text-2xl font-bold tracking-wider text-primary hover:text-secondary transition-colors duration-300"
            >
              HΛЯIƧH D
            </button>
            
            {/* Glitch overlay */}
            <div className="glitch-overlay-small pointer-events-none">
              <span className="glitch-text-small">HΛЯIƧH D</span>
              <span className="glitch-text-small">HΛЯIƧH D</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-mono text-sm tracking-wide transition-all duration-300 hover:text-primary group ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
                
                {/* Neon underline animation */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    activeSection === item.id ? 'w-full shadow-neon' : 'w-0 group-hover:w-full'
                  }`}
                />
                
                {/* Hover glow effect */}
                <span className="absolute inset-0 bg-primary/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
              </motion.button>
            ))}
            
            {/* Resume Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px hsl(var(--primary) / 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="neon-button-primary flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary border border-primary/50 text-primary-foreground font-semibold text-sm tracking-wide"
            >
              <Download size={16} />
              Resume
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
          >
            <span className="block w-6 h-0.5 bg-primary mb-1.5 shadow-neon" />
            <span className="block w-6 h-0.5 bg-primary mb-1.5 shadow-neon" />
            <span className="block w-6 h-0.5 bg-primary shadow-neon" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default CyberpunkNavigation;