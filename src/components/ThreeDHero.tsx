
import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

// Animated shape component
const AnimatedBox = () => {
  const meshRef = useRef(null);
  const { theme } = useTheme();
  
  // Colors for light/dark themes
  const color = theme === 'light' ? '#1976d2' : '#4dd0e1';

  return (
    <Box ref={meshRef} args={[1.5, 1.5, 1.5]} scale={[1, 1, 1]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};

// Main Three.js component
const ThreeDHero = () => {
  return (
    <div className="canvas-container relative w-full h-full absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-90"></div>
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-primary/20 animate-pulse filter blur-xl"></div>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <AnimatedBox />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default ThreeDHero;
