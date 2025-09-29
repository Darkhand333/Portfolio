import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Harish_D_Resume.pdf';
    link.click();
  };

  const navOpacity = scrollY > 50 ? 0.9 : 1;
  const navShadow = scrollY > 50 ? 'shadow-lg border-b border-border/50' : '';

  return (
    <>
      {/* Navbar (always pinned at top) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[1000] glass backdrop-blur-md transition-all duration-300 ${navShadow}`}
        style={{ backgroundColor: `rgba(15, 15, 30, ${navOpacity})` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-gradient cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              HΛЯIƧH D
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary neon-glow'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="h-0.5 bg-primary mt-1 rounded"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={16} />
                Resume
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-primary'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadResume}
                  className="btn-primary flex items-center gap-2 w-fit"
                >
                  <Download size={16} />
                  Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Spacer to push page content below navbar */}
      <div className="h-16 w-full" />
    </>
  );
};

export default Navigation;
