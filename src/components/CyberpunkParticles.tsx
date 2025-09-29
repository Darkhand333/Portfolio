import React, { useRef, useEffect, useState } from 'react';
import { isLowEndDevice } from '../utils/performance';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const CyberpunkParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isClicking, setIsClicking] = useState(false);
  const [attractMode, setAttractMode] = useState(false);

  useEffect(() => {
    if (isLowEndDevice()) return;

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

    // Particle colors (cyberpunk theme)
    const colors = [
      'rgba(121, 193, 167, 0.8)', // Primary neon cyan
      'rgba(144, 212, 145, 0.8)', // Secondary neon green
      'rgba(79, 172, 254, 0.8)',  // Cyber blue
      'rgba(168, 85, 247, 0.8)',  // Neon purple
      'rgba(255, 255, 255, 0.6)'  // White accent
    ];

    // Create particle
    const createParticle = (): Particle => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 255,
        maxLife: 255,
        color,
        size: Math.random() * 3 + 1
      };
    };

    // Initialize particles
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 15000));
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    // Enhanced mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Create explosion effect
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = Math.random() * 5 + 3;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 255,
          maxLife: 255,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setAttractMode(!attractMode);
      }
    };

    // Touch interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchstart', handleTouchStart);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 30, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Enhanced mouse interaction - repel/attract particles
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = isClicking ? 200 : 150;
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const forceMultiplier = isClicking ? 1.5 : 0.5;
          
          if (attractMode) {
            // Attract mode
            particle.vx -= (dx / distance) * force * forceMultiplier;
            particle.vy -= (dy / distance) * force * forceMultiplier;
          } else {
            // Repel mode (default)
            particle.vx += (dx / distance) * force * forceMultiplier;
            particle.vy += (dy / distance) * force * forceMultiplier;
          }
        }

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary collision with wrap-around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update life
        particle.life -= 0.5;

        // Draw particle
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 100) {
            const opacity = (100 - distance2) / 100 * 0.3;
            ctx.globalAlpha = opacity * alpha;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (isLowEndDevice()) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-5">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-4 text-xs text-primary/60 font-mono">
        Click: Explode • Space: {attractMode ? 'Repel' : 'Attract'} Mode
      </div>
    </div>
  );
};

export default CyberpunkParticles;