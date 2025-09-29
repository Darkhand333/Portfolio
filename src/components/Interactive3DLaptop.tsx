import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment, ContactShadows, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { isLowEndDevice } from '../utils/performance';

interface LaptopProps {
  isOpen: boolean;
  onToggle: () => void;
  mousePosition: { x: number; y: number };
}

const Laptop3D: React.FC<LaptopProps> = ({ isOpen, onToggle, mousePosition }) => {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (!laptopRef.current || !screenRef.current) return;

    // Smooth laptop rotation based on mouse
    const targetRotationY = mouse.x * 0.3;
    const targetRotationX = mouse.y * 0.1;
    
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopRef.current.rotation.y,
      targetRotationY,
      0.1
    );
    
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopRef.current.rotation.x,
      targetRotationX,
      0.1
    );

    // Animate screen opening/closing
    const targetScreenRotation = isOpen ? -Math.PI * 0.4 : 0;
    screenRef.current.rotation.x = THREE.MathUtils.lerp(
      screenRef.current.rotation.x,
      targetScreenRotation,
      0.1
    );

    // Floating animation
    laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  // Materials with realistic properties
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1,
  });

  const screenMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    metalness: 0.1,
    roughness: 0.9,
    emissive: isOpen ? '#001122' : '#000000',
    emissiveIntensity: isOpen ? 0.2 : 0,
  });

  const keyboardMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.3,
    roughness: 0.7,
  });

  return (
    <group 
      ref={laptopRef} 
      onClick={onToggle}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Laptop Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4, 0.2, 3]} />
        <primitive object={baseMaterial} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.05, 0.2]}>
        <boxGeometry args={[3.6, 0.05, 2.2]} />
        <primitive object={keyboardMaterial} />
      </mesh>

      {/* Individual Keys */}
      {Array.from({ length: 60 }).map((_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        const x = (col - 5.5) * 0.25;
        const z = (row - 2) * 0.25;
        
        return (
          <mesh key={i} position={[x, 0.1, z + 0.2]}>
            <boxGeometry args={[0.15, 0.02, 0.15]} />
            <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
          </mesh>
        );
      })}

      {/* Trackpad */}
      <mesh position={[0, 0.05, -0.8]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Screen Assembly */}
      <group ref={screenRef} position={[0, 0, -1.4]}>
        {/* Screen Back */}
        <mesh position={[0, 1.5, -0.05]}>
          <boxGeometry args={[4, 2.8, 0.1]} />
          <primitive object={baseMaterial} />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 1.5, 0.01]}>
          <boxGeometry args={[3.6, 2.4, 0.01]} />
          <primitive object={screenMaterial} />
        </mesh>

        {/* Screen Content when open */}
        {isOpen && (
          <Html
            position={[0, 1.5, 0.02]}
            transform
            distanceFactor={1.5}
            style={{
              width: '300px',
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              padding: '20px',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '12px',
              pointerEvents: 'none'
            }}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">HARISH D</h3>
              <p className="text-sm mb-2">Creative Developer</p>
              <div className="text-xs opacity-80">
                <p>React • TypeScript • Three.js</p>
                <p className="mt-2 animate-pulse">● System Online</p>
              </div>
            </div>
          </Html>
        )}

        {/* Apple Logo (when closed) */}
        {!isOpen && (
          <mesh position={[0, 2, -0.04]}>
            <circleGeometry args={[0.15]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
      </group>

      {/* LED Indicator */}
      <mesh position={[-1.8, 0.05, -1.4]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial 
          color={isOpen ? '#00ff00' : '#ff0000'}
          emissive={isOpen ? '#00ff00' : '#ff0000'}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

interface Interactive3DLaptopProps {
  parallaxOffset?: number;
}

const Interactive3DLaptop: React.FC<Interactive3DLaptopProps> = ({ parallaxOffset = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLowEndDevice()) {
    return (
      <div className="w-64 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-primary/30 shadow-glow">
        <div className="text-primary text-2xl">💻</div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-96 relative"
      style={{ 
        transform: `translateY(${parallaxOffset * 0.2}px)`,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Advanced Lighting Setup */}
          <ambientLight intensity={0.4} color="#79c1a7" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight
            position={[-3, 3, 3]}
            intensity={0.6}
            color="#4facfe"
          />
          <pointLight
            position={[3, -2, -2]}
            intensity={0.4}
            color="#90d491"
          />

          {/* Environment for realistic reflections */}
          <Environment preset="studio" />

          {/* 3D Laptop */}
          <Laptop3D 
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            mousePosition={mousePosition}
          />

          {/* Enhanced shadows */}
          <ContactShadows
            opacity={0.4}
            scale={8}
            blur={2}
            far={4}
            resolution={512}
            color="#79c1a7"
          />

          {/* Interactive controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={!isHovering}
            autoRotateSpeed={0.5}
            rotateSpeed={0.8}
            zoomSpeed={0.6}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>

      {/* Interaction Instructions */}
      <div className="absolute bottom-4 left-4 text-xs text-primary/70 font-mono space-y-1">
        <p>Click: {isOpen ? 'Close' : 'Open'} Laptop</p>
        <p>Drag: Rotate • Scroll: Zoom</p>
        <p className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-50'}`}>
          Status: {isOpen ? '● Online' : '○ Offline'}
        </p>
      </div>

      {/* Glowing border effect */}
      <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
        isHovering 
          ? 'shadow-[0_0_30px_rgba(121,193,167,0.3)] border border-primary/30' 
          : 'border border-primary/10'
      }`} />
    </div>
  );
};

export default Interactive3DLaptop;