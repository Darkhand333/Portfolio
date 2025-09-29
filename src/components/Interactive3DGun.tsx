import React, { useRef, useEffect } from 'react';
import { isLowEndDevice } from '../utils/performance';

const Interactive3DGun: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isLowEndDevice() || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = 300;
      canvas.height = 200;
    };
    resize();

    // Gun properties
    let rotation = 0;
    let targetRotation = 0;

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseRef.current = {
        x: e.clientX - centerX,
        y: e.clientY - centerY
      };
      
      targetRotation = Math.atan2(mouseRef.current.y, mouseRef.current.x);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Draw 3D gun
    const drawGun = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Gun barrel
      ctx.strokeStyle = '#79c1a7';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#79c1a7';
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.moveTo(-30, -5);
      ctx.lineTo(40, -5);
      ctx.lineTo(40, 5);
      ctx.lineTo(-30, 5);
      ctx.closePath();
      ctx.stroke();
      
      // Gun grip
      ctx.beginPath();
      ctx.moveTo(-30, -10);
      ctx.lineTo(-20, -10);
      ctx.lineTo(-20, 15);
      ctx.lineTo(-35, 15);
      ctx.lineTo(-35, 5);
      ctx.lineTo(-30, 5);
      ctx.closePath();
      ctx.stroke();
      
      // Gun sight
      ctx.beginPath();
      ctx.moveTo(35, -8);
      ctx.lineTo(35, -12);
      ctx.moveTo(32, -10);
      ctx.lineTo(38, -10);
      ctx.stroke();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Smooth rotation towards target
      const rotationDiff = targetRotation - rotation;
      rotation += rotationDiff * 0.1;
      
      // Add slight auto-rotation when not interacting
      if (Math.abs(rotationDiff) < 0.01) {
        rotation += 0.005;
      }
      
      drawGun();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isLowEndDevice()) {
    return (
      <div className="w-[300px] h-[200px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-primary/30">
        <div className="text-primary text-sm">🔫 Interactive Gun</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-primary/30 cursor-crosshair"
        style={{ filter: 'drop-shadow(0 0 20px rgba(121, 193, 167, 0.3))' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg pointer-events-none" />
    </div>
  );
};

export default Interactive3DGun;