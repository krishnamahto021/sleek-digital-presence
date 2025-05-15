
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../contexts/ThemeContext";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { Code, CodeXml, Terminal, FileJson, Github } from "lucide-react";

// Helper component for tech icons
const TechIcon = ({ position, icon, size = 1, rotationSpeed = 0.01 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  // Create a canvas texture for the icon
  const texture = React.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 256, 256);
      
      // This would be where we'd draw the icon, but we'll use Text instead
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.9}
        map={texture} 
      />
    </mesh>
  );
};

// Component for text labels
const TechLabel = ({ position, text, color }) => {
  return (
    <Text
      position={position}
      color={color}
      fontSize={0.4}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
      outlineOpacity={0.8}
    >
      {text}
    </Text>
  );
};

// Floating animation for tech icons
const FloatingIcon = ({ children, position, speed = 1 }) => {
  const group = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.1;
      group.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
};

const Shapes = () => {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const primaryColor = "#8A85FF";
  const secondaryColor = "#633BBC";
  const accentColor = "#E879F9";
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingIcon position={[1.5, 0, 0]} speed={0.8}>
        <TechLabel position={[0, 0, 0.1]} text="JS" color={primaryColor} />
      </FloatingIcon>
      
      <FloatingIcon position={[-1, 0.8, -1]} speed={1.2}>
        <TechLabel position={[0, 0, 0.1]} text="TS" color={secondaryColor} />
      </FloatingIcon>
      
      <FloatingIcon position={[0, -0.7, 0.5]} speed={1}>
        <TechLabel position={[0, 0, 0.1]} text="AWS" color={accentColor} />
      </FloatingIcon>
      
      <FloatingIcon position={[1, 0.5, -0.5]} speed={0.9}>
        <TechLabel position={[0, 0, 0.1]} text="GITHUB" color={primaryColor} />
      </FloatingIcon>

      {/* Atom icon (React) in the center-ish */}
      <mesh position={[0.5, 1, -1]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={primaryColor} />
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.3, 0.03, 16, 32]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI/2, Math.PI/4, 0]}>
          <torusGeometry args={[0.3, 0.03, 16, 32]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
      </mesh>
    </>
  );
};

const HeroAnimation = () => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Shapes />
      </Canvas>
    </div>
  );
};

export default HeroAnimation;
