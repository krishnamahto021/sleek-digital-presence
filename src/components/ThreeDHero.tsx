
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

// Animated mesh component
const AnimatedSphere = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  const { theme } = useTheme();
  
  // Colors for light/dark themes
  const color = theme === 'light' ? '#1976d2' : '#4dd0e1';
  const emissive = theme === 'light' ? '#1565c0' : '#00bcd4';

  // Animate the mesh on each frame
  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
  });
  
  return (
    <Sphere ref={mesh} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color={color}
        emissive={emissive}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Main Three.js component
const ThreeDHero = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4dd0e1" />
        <AnimatedSphere />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDHero;
