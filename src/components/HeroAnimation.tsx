
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../contexts/ThemeContext";
import * as THREE from "three";

// Individual shape component with rotation
const Shape = ({ 
  position, 
  color, 
  size = 1, 
  rotationSpeed = 0.01, 
  geometry = "box" 
}: { 
  position: [number, number, number],
  color: string, 
  size?: number,
  rotationSpeed?: number,
  geometry?: string
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "box" && <boxGeometry args={[size, size, size]} />}
      {geometry === "sphere" && <sphereGeometry args={[size * 0.7, 16, 16]} />}
      {geometry === "torus" && <torusGeometry args={[size * 0.6, size * 0.2, 16, 32]} />}
      {geometry === "cylinder" && <cylinderGeometry args={[size * 0.5, size * 0.5, size, 32]} />}
      {geometry === "cone" && <coneGeometry args={[size * 0.5, size, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[size * 0.7]} />}
      {geometry === "tetrahedron" && <tetrahedronGeometry args={[size * 0.8]} />}
      {geometry === "dodecahedron" && <dodecahedronGeometry args={[size * 0.6]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Code bracket shape
const CodeBracket = ({ position, color, size = 1, rotationSpeed = 0.01 }: { position: [number, number, number], color: string, size?: number, rotationSpeed?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[-size * 0.25, 0, 0]}>
        <boxGeometry args={[size * 0.1, size, size * 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[size * 0.25, 0, 0]}>
        <boxGeometry args={[size * 0.1, size, size * 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, size * 0.45, 0]}>
        <boxGeometry args={[size * 0.6, size * 0.1, size * 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -size * 0.45, 0]}>
        <boxGeometry args={[size * 0.6, size * 0.1, size * 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

// Database cylinder shape
const Database = ({ position, color, size = 1, rotationSpeed = 0.01 }: { position: [number, number, number], color: string, size?: number, rotationSpeed?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.5;
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[size * 0.5, size * 0.5, size, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, size * 0.2, 0]}>
        <torusGeometry args={[size * 0.5, size * 0.05, 16, 32]} />
        <meshStandardMaterial color={color === "#7983E5" ? "#6272D8" : color === "#52ACFF" ? "#4095EB" : "#C350DE"} />
      </mesh>
      <mesh position={[0, -size * 0.2, 0]}>
        <torusGeometry args={[size * 0.5, size * 0.05, 16, 32]} />
        <meshStandardMaterial color={color === "#7983E5" ? "#6272D8" : color === "#52ACFF" ? "#4095EB" : "#C350DE"} />
      </mesh>
    </group>
  );
};

// All the shapes collection - limited to 5 coding-related shapes
const Shapes = () => {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const primaryColor = theme === "dark" ? "#7983E5" : "#4959E7";
  const secondaryColor = theme === "dark" ? "#52ACFF" : "#2F85E0";
  const accentColor = theme === "dark" ? "#E879F9" : "#D946EF";
  const tertiaryColor = theme === "dark" ? "#10B981" : "#059669";
  const quaternaryColor = theme === "dark" ? "#F59E0B" : "#D97706";
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      {/* Limited to 5 coding-related shapes */}
      <CodeBracket position={[1.5, 0.5, 0]} color={quaternaryColor} size={0.8} rotationSpeed={0.015} />
      <Database position={[-1.5, 0, 0.5]} color={primaryColor} size={0.8} rotationSpeed={0.01} />
      <Shape position={[0, -1.2, 0.5]} color={accentColor} size={0.7} rotationSpeed={0.02} geometry="dodecahedron" />
      <Shape position={[-0.8, 1.2, -0.3]} color={tertiaryColor} size={0.7} rotationSpeed={0.025} geometry="octahedron" />
      <Shape position={[1.2, -0.8, -0.5]} color={secondaryColor} size={0.6} rotationSpeed={0.018} geometry="tetrahedron" />
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
