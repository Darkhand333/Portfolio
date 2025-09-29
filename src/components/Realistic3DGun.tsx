import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { isLowEndDevice } from '../utils/performance';

interface Gun3DProps {
  parallaxOffset: number;
}

const Gun3D: React.FC<Gun3DProps & { isInteracting?: boolean }> = ({ parallaxOffset, isInteracting }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { camera, mouse } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Enhanced auto rotation with interaction boost
    const rotationSpeed = isInteracting ? 0.02 : 0.005;
    meshRef.current.rotation.y += rotationSpeed;
    
    // Enhanced mouse interaction with smooth following
    const targetRotationX = mouse.y * (isInteracting ? 0.6 : 0.3);
    const targetRotationY = mouse.x * (isInteracting ? 0.6 : 0.3);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX + Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
      isInteracting ? 0.2 : 0.1
    );
    
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotationY * 0.5,
      0.1
    );
    
    // Parallax effect based on scroll
    meshRef.current.position.y = parallaxOffset * 0.001;
    
    // Enhanced floating animation with interaction scaling
    const floatIntensity = isInteracting ? 0.4 : 0.2;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * floatIntensity;
    
    // Interactive scaling effect
    const targetScale = isInteracting ? 1.2 : 1;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
  });

  // Fallback geometric gun if GLTF fails
  const GeometricGun = () => (
    <group ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
      {/* Gun body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 0.8]} />
        <meshStandardMaterial 
          color="#79c1a7"
          metalness={0.8}
          roughness={0.2}
          emissive="#79c1a7"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Gun barrel */}
      <mesh position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5]} />
        <meshStandardMaterial 
          color="#90d491"
          metalness={0.9}
          roughness={0.1}
          emissive="#90d491"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Gun grip */}
      <mesh position={[-1.2, -0.8, 0]}>
        <boxGeometry args={[0.8, 1.5, 0.6]} />
        <meshStandardMaterial 
          color="#79c1a7"
          metalness={0.7}
          roughness={0.3}
          emissive="#79c1a7"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Gun sight */}
      <mesh position={[0.5, 0.7, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshStandardMaterial 
          color="#4facfe"
          metalness={1}
          roughness={0}
          emissive="#4facfe"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Energy core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );

  return <GeometricGun />;
};

const Realistic3DGun: React.FC<Gun3DProps> = ({ parallaxOffset }) => {
  const [isInteracting, setIsInteracting] = useState(false);

  if (isLowEndDevice()) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 bg-gradient-primary rounded-lg flex items-center justify-center border border-primary/30 shadow-glow">
        <span className="text-primary text-lg">🔫</span>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-5 pointer-events-auto cursor-crosshair"
      style={{ 
        transform: `translateY(${parallaxOffset * 0.3}px)`,
        opacity: 0.7
      }}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.3} color="#79c1a7" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#90d491"
            castShadow
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#4facfe"
          />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
          
          {/* 3D Gun */}
          <Gun3D parallaxOffset={parallaxOffset} isInteracting={isInteracting} />
          
          {/* Contact shadows for depth */}
          <ContactShadows
            opacity={0.3}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#79c1a7"
          />
          
          {/* Enhanced Orbit controls for interaction */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            rotateSpeed={isInteracting ? 1.0 : 0.5}
            zoomSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Realistic3DGun;