
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../contexts/ThemeContext";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { Code, CodeXml, Terminal, FileJson, Github } from "lucide-react";

// Component for text labels with improved visibility
const TechLabel = ({ position, text, color, rotationSpeed = 0.01 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Clockwise rotation around the center
      groupRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        position={[0, 0, 0] as [number, number, number]}
        color={color}
        fontSize={0.5}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        outlineOpacity={0.8}
        fillOpacity={1}
      >
        {text}
      </Text>
    </group>
  );
};

// Central atom component with better aesthetics
const AtomComponent = ({ position = [0, 0, 0] as [number, number, number], color = "#8A85FF" }) => {
  const atomRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Different rotation speeds for visual interest
  useFrame(() => {
    if (atomRef.current) {
      atomRef.current.rotation.y += 0.005;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.01;
      ring1Ref.current.rotation.y += 0.005;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += 0.007;
      ring2Ref.current.rotation.z += 0.008;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += 0.006;
      ring3Ref.current.rotation.y -= 0.004;
    }
  });

  return (
    <group position={position} ref={atomRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.6, 0.04, 16, 64]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI/2, 0, 0] as [number, number, number]}>
        <torusGeometry args={[0.7, 0.04, 16, 64]} />
        <meshStandardMaterial 
          color="#E879F9" 
          emissive="#E879F9"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI/3, Math.PI/4] as [number, number, number]}>
        <torusGeometry args={[0.8, 0.04, 16, 64]} />
        <meshStandardMaterial 
          color="#633BBC" 
          emissive="#633BBC"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Electron particles */}
      <mesh position={[0.6 * Math.cos(0), 0.6 * Math.sin(0), 0] as [number, number, number]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
      </mesh>

      <mesh position={[0, 0.7 * Math.cos(0), 0.7 * Math.sin(0)] as [number, number, number]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
      </mesh>

      <mesh position={[0.8 * Math.sin(0), 0, 0.8 * Math.cos(0)] as [number, number, number]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
      </mesh>
    </group>
  );
};

// Rotating text orbits
const OrbitingTechLabels = () => {
  const { theme } = useTheme();
  
  // Theme-aware colors with increased visibility
  const primaryColor = "#9b87f5"; // Brighter purple
  const secondaryColor = "#E879F9"; // Pink
  const tertiaryColor = "#ffffff"; // White for maximum contrast
  
  return (
    <group>
      {/* Place tech labels in a circular pattern around the center */}
      <TechLabel 
        position={[2, 0, 0] as [number, number, number]} 
        text="JavaScript" 
        color={primaryColor} 
        rotationSpeed={0.008} 
      />
      
      <TechLabel 
        position={[1.4, 1.4, 0] as [number, number, number]} 
        text="TypeScript" 
        color={secondaryColor} 
        rotationSpeed={0.01} 
      />
      
      <TechLabel 
        position={[0, 2, 0] as [number, number, number]} 
        text="React" 
        color={primaryColor} 
        rotationSpeed={0.012} 
      />
      
      <TechLabel 
        position={[-1.4, 1.4, 0] as [number, number, number]} 
        text="Node.js" 
        color={secondaryColor} 
        rotationSpeed={0.009} 
      />
      
      <TechLabel 
        position={[-2, 0, 0] as [number, number, number]} 
        text="AWS" 
        color={tertiaryColor} 
        rotationSpeed={0.011} 
      />
      
      <TechLabel 
        position={[-1.4, -1.4, 0] as [number, number, number]} 
        text="MongoDB" 
        color={primaryColor} 
        rotationSpeed={0.007} 
      />
      
      <TechLabel 
        position={[0, -2, 0] as [number, number, number]} 
        text="Git" 
        color={secondaryColor} 
        rotationSpeed={0.013} 
      />
      
      <TechLabel 
        position={[1.4, -1.4, 0] as [number, number, number]} 
        text="Redux" 
        color={tertiaryColor} 
        rotationSpeed={0.01} 
      />
      
      {/* Central atom */}
      <AtomComponent position={[0, 0, 0] as [number, number, number]} />
    </group>
  );
};

const HeroAnimation = () => {
  const { theme } = useTheme();
  
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 8] as [number, number, number], fov: 50 }}>
        {/* Subtle background color */}
        <color attach="background" args={[theme === "dark" ? "#000000" : "#ffffff"]} />
        
        {/* Lighting to enhance visibility */}
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10] as [number, number, number]} intensity={1} />
        <pointLight position={[-10, -10, -10] as [number, number, number]} intensity={0.5} />
        
        <OrbitingTechLabels />
      </Canvas>
    </div>
  );
};

export default HeroAnimation;
