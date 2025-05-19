import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

interface ChromaticAberrationPanelProps {
  width?: number;
  height?: number;
  depth?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  intensity?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
}

const ChromaticAberrationPanel: React.FC<ChromaticAberrationPanelProps> = ({
  width = 2,
  height = 3,
  depth = 0.05,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  intensity = 0.03,
  color1,
  color2,
  color3,
  speed = 1,
}) => {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Group>(null);

  // Set default colors based on theme
  const defaultColor1 = theme === "dark" ? "#ff0055" : "#ff3366";
  const defaultColor2 = theme === "dark" ? "#00ff99" : "#33cc99";
  const defaultColor3 = theme === "dark" ? "#0055ff" : "#3366ff";

  const c1 = color1 || defaultColor1;
  const c2 = color2 || defaultColor2;
  const c3 = color3 || defaultColor3;

  // Create offset for chromatic aberration effect
  const offset = useMemo(() => {
    return [
      new THREE.Vector3(intensity, 0, 0.001),
      new THREE.Vector3(-intensity, 0, 0.002),
      new THREE.Vector3(0, intensity, 0.003),
    ];
  }, [intensity]);

  // Animation frame
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;

    // Subtle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;

    // Subtle rotation
    meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.02;
    meshRef.current.rotation.y = rotation[1] + Math.cos(time * 0.2) * 0.02;

    // Update chromatic aberration effect
    const children = meshRef.current.children;
    if (children.length >= 3) {
      for (let i = 0; i < 3; i++) {
        const mesh = children[i] as THREE.Mesh;
        const initialOffset = offset[i];

        // Dynamic offset based on time
        const dynamicOffset = new THREE.Vector3(
          initialOffset.x * (1 + Math.sin(time * 0.7) * 0.3),
          initialOffset.y * (1 + Math.cos(time * 0.5) * 0.3),
          initialOffset.z
        );

        mesh.position.copy(dynamicOffset);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* Red layer */}
      <mesh position={offset[0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={c1}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
          emissive={c1}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Green layer */}
      <mesh position={offset[1]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={c2}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
          emissive={c2}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Blue layer */}
      <mesh position={offset[2]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={c3}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
          emissive={c3}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default ChromaticAberrationPanel;
