import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Eye, MessageCircle } from 'lucide-react';
import Realistic3DGun from './Realistic3DGun';
import CyberpunkParticles from './CyberpunkParticles';
import Interactive3DLaptop from './Interactive3DLaptop';

const CyberpunkHeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate opacity based on scroll
  const heroOpacity = Math.max(0.6, 1 - scrollY / 800);
  const parallaxOffset = scrollY * 0.2;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-screen z-20 pointer-events-none"
      style={{ opacity: heroOpacity }}
    >
      {/* Background with gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] animate-glow-pulse" />
      </div>

      {/* Particle System */}
      <CyberpunkParticles />

      {/* 3D Gun Background */}
      <Realistic3DGun parallaxOffset={parallaxOffset} />

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center pointer-events-auto">
        <div className="container-max mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
            
            {/* Profile Image with Holographic Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative inline-block"
            >
              <div className="relative w-32 h-32">
                {/* Rotating holographic ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-primary rounded-full shadow-neon" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-secondary rounded-full shadow-neon" />
                </div>
                
                {/* Profile image */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-glow bg-surface"
                >
                  <img
                    src="/images/harish-profile.png"
                    alt="Harish D Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">HD</div>';
                    }}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Cyberpunk Name with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <h1 className="cyberpunk-title text-6xl md:text-8xl font-bold tracking-wider mb-4">
                HΛЯIƧH D
              </h1>
              
              {/* Glitch overlay */}
              <div className="glitch-overlay">
                <span className="glitch-text">HΛЯIƧH D</span>
                <span className="glitch-text">HΛЯIƧH D</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-2"
            >
              <p className="text-2xl md:text-3xl text-primary font-mono tracking-wide">
                Building experiences with code & creativity
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-light">
                Passionate Developer | UI/UX Designer | Innovator
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="neon-button-primary flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary border border-primary/50 text-primary-foreground font-semibold tracking-wide"
              >
                <Download size={20} />
                Download Resume
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(var(--secondary) / 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="neon-button-secondary flex items-center gap-3 px-8 py-4 rounded-full bg-surface border-2 border-secondary/50 text-secondary font-semibold tracking-wide hover:bg-secondary/10"
              >
                <Mail size={20} />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-6 justify-center items-center mt-8"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
                className="w-12 h-12 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
                className="w-12 h-12 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
                className="w-12 h-12 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex justify-center mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-12 border-2 border-primary/50 rounded-full flex justify-center relative"
              >
                <motion.div
                  animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-primary rounded-full mt-2 shadow-neon"
                />
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkHeroSection;