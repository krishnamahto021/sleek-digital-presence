import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

interface MorphingParticleCloudProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  radius?: number;
}

const MorphingParticleCloud: React.FC<MorphingParticleCloudProps> = ({
  count = 1000,
  size = 0.02,
  color,
  speed = 0.3,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  radius = 1,
}) => {
  const { theme } = useTheme();
  const pointsRef = useRef<THREE.Points>(null);

  // Create custom particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) return null;

    // Create radial gradient for a glowing particle
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );

    if (theme === "dark") {
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    } else {
      // More intense glow for light mode
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.1, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(160, 160, 255, 0.8)");
      gradient.addColorStop(0.7, "rgba(64, 64, 255, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 128, 0)");
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }, [theme]);

  // Create particles with random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(theta);

      temp.push({
        position: [
          x * radius * (0.8 + Math.random() * 0.4),
          y * radius * (0.8 + Math.random() * 0.4),
          z * radius * (0.8 + Math.random() * 0.4),
        ],
        factor: Math.random() * 20,
        speed: speed * (0.6 + Math.random() * 0.8),
      });
    }
    return temp;
  }, [count, radius, speed]);

  // Animation frame
  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    const positions = points.geometry.attributes.position.array as Float32Array;

    // Update each particle position
    for (let i = 0; i < count; i++) {
      const { position, factor, speed } = particles[i];
      const i3 = i * 3;

      // Calculate new position based on time, creating a morphing effect
      const noiseX = (Math.sin(time * speed + factor) + 1) * 0.5;
      const noiseY = (Math.cos(time * speed + factor) + 1) * 0.5;
      const noiseZ = (Math.sin(time * speed * 2 + factor) + 1) * 0.5;

      positions[i3] = position[0] + (noiseX - 0.5) * 0.3;
      positions[i3 + 1] = position[1] + (noiseY - 0.5) * 0.3;
      positions[i3 + 2] = position[2] + (noiseZ - 0.5) * 0.3;
    }

    points.geometry.attributes.position.needsUpdate = true;

    // Slowly rotate the entire cloud
    points.rotation.x = Math.sin(time * 0.1) * 0.1;
    points.rotation.y = Math.cos(time * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef} position={[positionX, positionY, positionZ]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap((p) => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={theme === "dark" ? size : size * 2.5}
        color={color || (theme === "dark" ? "#4e8cff" : "#0000ff")}
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
        map={particleTexture || undefined}
      />
    </points>
  );
};

export default MorphingParticleCloud;
