import React, { useRef, useEffect, useState } from 'react';
import { isLowEndDevice } from '../utils/performance';

interface Interactive3DGunsProps {
  parallaxOffset?: number;
}

const Interactive3DGuns: React.FC<Interactive3DGunsProps> = ({ parallaxOffset = 0 }) => {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef({ left: 0, right: 0 });
  const targetRotationRef = useRef({ left: 0, right: 0 });

  useEffect(() => {
    if (isLowEndDevice()) return;

    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    
    if (!leftCanvas || !rightCanvas) return;

    const leftCtx = leftCanvas.getContext('2d');
    const rightCtx = rightCanvas.getContext('2d');
    
    if (!leftCtx || !rightCtx) return;

    // Set canvas sizes
    const setCanvasSize = () => {
      const size = Math.min(window.innerWidth * 0.15, 200);
      [leftCanvas, rightCanvas].forEach(canvas => {
        canvas.width = size;
        canvas.height = size;
      });
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = leftCanvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });

      if (!isDragging) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        targetRotationRef.current.left = Math.atan2(mouseY, mouseX) * 0.3;
        targetRotationRef.current.right = Math.atan2(mouseY, -mouseX) * 0.3;
      }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Draw futuristic gun
    const drawGun = (ctx: CanvasRenderingContext2D, rotation: number, isLeft: boolean) => {
      const canvas = ctx.canvas;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = canvas.width / 200;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation + parallaxOffset * 0.01);
      ctx.scale(scale, scale);

      // Create gradient for metallic effect
      const gradient = ctx.createLinearGradient(-50, -25, 50, 25);
      gradient.addColorStop(0, '#79c1a7');
      gradient.addColorStop(0.5, '#90d491');
      gradient.addColorStop(1, '#79c1a7');

      // Gun body with 3D effect
      ctx.strokeStyle = gradient;
      ctx.fillStyle = 'rgba(121, 193, 167, 0.1)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#79c1a7';
      ctx.shadowBlur = 15;

      // Main gun body
      ctx.beginPath();
      ctx.roundRect(-40, -15, 70, 30, 5);
      ctx.fill();
      ctx.stroke();

      // Gun barrel
      ctx.beginPath();
      ctx.roundRect(25, -8, 25, 16, 3);
      ctx.fill();
      ctx.stroke();

      // Gun grip
      ctx.beginPath();
      ctx.roundRect(-45, -12, 15, 35, 4);
      ctx.fill();
      ctx.stroke();

      // Trigger guard
      ctx.beginPath();
      ctx.arc(-25, 10, 8, 0, Math.PI);
      ctx.stroke();

      // Scope/sight
      ctx.beginPath();
      ctx.roundRect(-10, -20, 20, 8, 2);
      ctx.fill();
      ctx.stroke();

      // Energy core (glowing center)
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#90d491';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Side details
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#90d491';
      ctx.lineWidth = 2;
      
      // Side lines
      for (let i = -3; i <= 3; i += 2) {
        ctx.beginPath();
        ctx.moveTo(-35, i * 3);
        ctx.lineTo(15, i * 3);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Smooth rotation towards target
      rotationRef.current.left += (targetRotationRef.current.left - rotationRef.current.left) * 0.1;
      rotationRef.current.right += (targetRotationRef.current.right - rotationRef.current.right) * 0.1;

      // Auto-rotation when not interacting
      if (!isDragging) {
        rotationRef.current.left += 0.01;
        rotationRef.current.right -= 0.01;
      }

      drawGun(leftCtx, rotationRef.current.left, true);
      drawGun(rightCtx, rotationRef.current.right, false);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [parallaxOffset, isDragging]);

  if (isLowEndDevice()) {
    return (
      <>
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-10 w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center border border-primary/30 shadow-glow">
          <span className="text-primary text-sm">🔫</span>
        </div>
        <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-10 w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center border border-primary/30 shadow-glow">
          <span className="text-primary text-sm">🔫</span>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Left Gun */}
      <canvas
        ref={leftCanvasRef}
        className="fixed top-1/2 left-8 transform -translate-y-1/2 z-10 rounded-lg cursor-grab active:cursor-grabbing"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(121, 193, 167, 0.4))',
          transform: `translateY(calc(-50% + ${parallaxOffset}px))`
        }}
      />
      
      {/* Right Gun */}
      <canvas
        ref={rightCanvasRef}
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-10 rounded-lg cursor-grab active:cursor-grabbing"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(121, 193, 167, 0.4))',
          transform: `translateY(calc(-50% + ${parallaxOffset}px)) scaleX(-1)`
        }}
      />
    </>
  );
};

export default Interactive3DGuns;