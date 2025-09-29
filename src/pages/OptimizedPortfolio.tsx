import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import OptimizedBulletParticles from '../components/OptimizedBulletParticles';
import SimpleLoadingScreen from '../components/SimpleLoadingScreen';
import { isLowEndDevice } from '../utils/performance';

// Lazy load components for better performance
const HeroSection = lazy(() => import('../components/HeroSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const SkillsSection = lazy(() => import('../components/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
// const CodingProfilesSection = lazy(() => import('../components/CodingProfilesSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const Footer = lazy(() => import('../components/Footer'));

// Fallback component for lazy loading
const SectionFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-primary">Loading...</div>
  </div>
);

const OptimizedPortfolio: React.FC = () => {
  const lowEndDevice = isLowEndDevice();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'coding-profiles', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleLoadingScreen />
      
      {/* Background Effects - Conditional rendering based on device performance */}
      {!lowEndDevice && <OptimizedBulletParticles />}
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} />
      
      {/* Main Content */}
      <main>
        <Suspense fallback={<SectionFallback />}>
          <div id="home">
            <HeroSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <div id="about">
            <AboutSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <div id="skills">
            <SkillsSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <div id="projects">
            <ProjectsSection />
          </div>
        </Suspense>
        
        {/* <Suspense fallback={<SectionFallback />}>
          <div id="coding-profiles">
            <CodingProfilesSection />
          </div>
        </Suspense> */}
        
        <Suspense fallback={<SectionFallback />}>
          <div id="contact">
            <ContactSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default OptimizedPortfolio;