import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const BulletParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create particle
    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      const size = 1 + Math.random() * 2;
      const life = 60 + Math.random() * 120;

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size
      };
    };

    // Initialize particles
    const maxParticles = 50;
    for (let i = 0; i < maxParticles; i++) {
      particlesRef.current.push(createParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update life
        particle.life--;

        // Calculate opacity
        const opacity = particle.life / particle.maxLife;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = opacity;

        // Create gradient for bullet effect
        const gradient = ctx.createLinearGradient(
          particle.x - particle.size,
          particle.y - particle.size,
          particle.x + particle.size,
          particle.y + particle.size
        );
        gradient.addColorStop(0, 'hsl(152, 69%, 56%)');
        gradient.addColorStop(0.5, 'hsl(93, 50%, 68%)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size * 2,
          particle.size
        );

        // Add glow effect
        ctx.shadowColor = 'hsl(152, 69%, 56%)';
        ctx.shadowBlur = particle.size * 2;
        ctx.fillRect(
          particle.x - particle.size / 4,
          particle.y - particle.size / 4,
          particle.size / 2,
          particle.size / 2
        );

        ctx.restore();

        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Add new particles
      while (particles.length < maxParticles) {
        particles.push(createParticle());
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default BulletParticles;   