import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { prefersReducedMotion } from '../../utils/performance';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  className = '',
  animationDelay = 0 
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const shouldAnimate = !prefersReducedMotion();

  if (!isIntersecting) {
    return <div ref={ref} className={`min-h-[200px] ${className}`} />;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldAnimate ? 0.6 : 0,
        delay: animationDelay 
      }}
    >
      {children}
    </motion.div>
  );
};

export default LazySection;