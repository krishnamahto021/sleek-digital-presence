
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../contexts/ThemeContext";
import * as THREE from "three";

const Shape = ({ position, color, size = 1, rotationSpeed = 0.01 }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Randomly choose a shape based on position */}
      {position[0] > 0 ? (
        <boxGeometry args={[size, size, size]} />
      ) : position[1] > 0 ? (
        <sphereGeometry args={[size * 0.7, 16, 16]} />
      ) : (
        <torusGeometry args={[size * 0.6, size * 0.2, 16, 32]} />
      )}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Shapes = () => {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const primaryColor = theme === "dark" ? "#7983E5" : "#4959E7";
  const secondaryColor = theme === "dark" ? "#52ACFF" : "#2F85E0";
  const accentColor = theme === "dark" ? "#E879F9" : "#D946EF";
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Shape position={[1.5, 0, 0]} color={primaryColor} size={0.7} rotationSpeed={0.01} />
      <Shape position={[-1, 0.8, -1]} color={secondaryColor} size={0.6} rotationSpeed={0.015} />
      <Shape position={[0, -1.2, 0.5]} color={accentColor} size={0.5} rotationSpeed={0.02} />
    </>
  );
};

const HeroAnimation = () => {
  return (
    <div className="h-[300px] w-full md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Shapes />
      </Canvas>
    </div>
  );
};

export default HeroAnimation;
