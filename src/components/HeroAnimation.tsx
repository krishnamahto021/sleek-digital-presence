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

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 1.3;

      // Gentle floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(Date.now() * 0.001) * 0.1;

      // Subtle scale pulsing
      const pulseFactor = 0.05 * Math.sin(state.clock.elapsedTime * 2);
      const pulseScale = clicked
        ? 0.9
        : hovered
        ? 1.2 + pulseFactor
        : 1 + pulseFactor * 0.5;
      meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
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
        emissiveIntensity={hovered ? 0.7 : 0.3}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

// Small particles that float around
const Particles = ({ count = 50, color }) => {
  const points = useRef<THREE.Points>(null);
  const particlesMaterial = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x += 0.0003;
      points.current.rotation.y += 0.0005;

      // Pulse opacity for subtle twinkling effect
      if (particlesMaterial.current) {
        particlesMaterial.current.opacity =
          0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });

  // Create random positions for particles
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;

    // Random sizes for more natural look
    sizes[i] = Math.random() * 0.1;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={particlesMaterial}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.5}
      />
    </points>
  );
};

// Interactive light that follows mouse
const MouseFollower = () => {
  const { mouse, viewport } = useThree();
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (light.current) {
      // Convert mouse position to 3D space
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      // Smoothly move light towards mouse position
      light.current.position.x += (x - light.current.position.x) * 0.1;
      light.current.position.y += (y - light.current.position.y) * 0.1;

      // Subtle intensity variation
      light.current.intensity = 1.2 + Math.sin(Date.now() * 0.001) * 0.3;
    }
  });

  return (
    <pointLight
      ref={light}
      position={[0, 0, 3]}
      intensity={1.2}
      color="#ffffff"
      distance={6}
    />
  );
};

// Glowing ring background effect
const GlowingRing = ({ color }) => {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring.current) {
      // Rotate slowly
      ring.current.rotation.z += 0.001;

      // Breathe in and out
      const scale = 1.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ring.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
      <torusGeometry args={[2, 0.2, 16, 60]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.15}
      />
    </mesh>
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <MouseFollower />
      <GlowingRing color={primaryColor} />

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
      <Shape
        position={[-1.5, -0.5, -0.2]}
        color={theme === "dark" ? "#64D9FE" : "#38BDF8"}
        size={0.4}
        rotationSpeed={0.025}
      />

      <Particles count={150} color={particleColor} />
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
      className="h-[300px] w-full md:h-[400px] relative cursor-move rounded-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
