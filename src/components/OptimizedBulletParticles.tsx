import React, { useEffect, useRef, useCallback } from 'react';
import { isLowEndDevice, throttle } from '../utils/performance';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const OptimizedBulletParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Adjust particle count based on device performance
  const getParticleCount = () => {
    if (isLowEndDevice()) return 15;
    return window.innerWidth < 768 ? 25 : 50;
  };

  const createParticle = useCallback((): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('Canvas not found');

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random() * 100 + 50,
      maxLife: Math.random() * 100 + 50,
    };
  }, []);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      return particle;
    }).filter(particle => particle.life > 0);

    // Add new particles to maintain count
    const targetCount = getParticleCount();
    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push(createParticle());
    }
  }, [createParticle]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(121, 193, 167, ${alpha * 0.6})`;
      ctx.fill();

      // Draw connection lines (reduced for performance)
      if (Math.random() > 0.95) { // Only 5% chance to draw connections
        const nearbyParticles = particlesRef.current.filter(p => {
          const dx = p.x - particle.x;
          const dy = p.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 100 && p !== particle;
        });

        nearbyParticles.slice(0, 1).forEach(nearbyParticle => {
          const dx = nearbyParticle.x - particle.x;
          const dy = nearbyParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const lineAlpha = (1 - distance / 100) * alpha * 0.3;

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(nearbyParticle.x, nearbyParticle.y);
          ctx.strokeStyle = `rgba(121, 193, 167, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }
    });
  }, []);

  const animate = useCallback(() => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleMouseMove = throttle((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, 50);

  const handleResize = throttle(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 250);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create initial particles
    particlesRef.current = [];
    for (let i = 0; i < getParticleCount(); i++) {
      particlesRef.current.push(createParticle());
    }

    // Start animation
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, createParticle, handleMouseMove, handleResize]);

  if (isLowEndDevice()) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(121, 193, 167, 0.03) 0%, transparent 50%)'
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default OptimizedBulletParticles;