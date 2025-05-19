import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "../contexts/ThemeContext";
import * as THREE from "three";
import { motion } from "framer-motion";

// Interactive shape with hover effects
const Shape = ({ position, color, size = 1, rotationSpeed = 0.01 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation speed increases when hovered
  const speed = hovered ? rotationSpeed * 2 : rotationSpeed;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 1.3;

      // Gentle floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  // Scale up when hovered or clicked
  const scale = hovered ? 1.2 : clicked ? 0.9 : 1;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Randomly choose a shape based on position */}
      {position[0] > 0 ? (
        <boxGeometry args={[size, size, size]} />
      ) : position[1] > 0 ? (
        <sphereGeometry args={[size * 0.7, 16, 16]} />
      ) : (
        <torusGeometry args={[size * 0.6, size * 0.2, 16, 32]} />
      )}
      <meshStandardMaterial
        color={hovered ? "#fff" : color}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

// Small particles that float around
const Particles = ({ count = 50, color }) => {
  const points = useRef<THREE.Points>(null);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.x += 0.0003;
      points.current.rotation.y += 0.0005;
    }
  });

  // Create random positions for particles
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.5} />
    </points>
  );
};

// Magnetic cursor effect - follows mouse
const MouseFollower = () => {
  const { camera, mouse, viewport } = useThree();
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (light.current) {
      // Convert mouse position to 3D space
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      // Smoothly move light towards mouse position
      light.current.position.x += (x - light.current.position.x) * 0.1;
      light.current.position.y += (y - light.current.position.y) * 0.1;
    }
  });

  return (
    <pointLight
      ref={light}
      position={[0, 0, 3]}
      intensity={1}
      color="#ffffff"
    />
  );
};

const Shapes = () => {
  const { theme } = useTheme();

  // Theme-aware colors
  const primaryColor = theme === "dark" ? "#7983E5" : "#4959E7";
  const secondaryColor = theme === "dark" ? "#52ACFF" : "#2F85E0";
  const accentColor = theme === "dark" ? "#E879F9" : "#D946EF";
  const particleColor = theme === "dark" ? "#8d8ff4" : "#627CEF";

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <MouseFollower />

      <Shape
        position={[1.5, 0, 0]}
        color={primaryColor}
        size={0.7}
        rotationSpeed={0.01}
      />
      <Shape
        position={[-1, 0.8, -1]}
        color={secondaryColor}
        size={0.6}
        rotationSpeed={0.015}
      />
      <Shape
        position={[0, -1.2, 0.5]}
        color={accentColor}
        size={0.5}
        rotationSpeed={0.02}
      />

      <Particles count={100} color={particleColor} />
    </>
  );
};

const HeroAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <motion.div
      className="h-[300px] w-full md:h-[400px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {mounted && (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Shapes />
        </Canvas>
      )}
    </motion.div>
  );
};

export default HeroAnimation;
