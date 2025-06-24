import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  PresentationControls,
  Environment,
  ContactShadows,
  RoundedBox,
  Stars,
} from "@react-three/drei";
import { useTheme } from "../contexts/ThemeContext";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import * as THREE from "three";

// The skills data with colors and positions
const SKILLS = [
  {
    name: "React",
    position: [0, 0, 1.5],
    rotation: [0, 0, 0],
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    position: [0, 0, -1.5],
    rotation: [0, Math.PI, 0],
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    position: [1.5, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#F7DF1E",
  },
  {
    name: "MongoDB",
    position: [-1.5, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    color: "#4DB33D",
  },
  {
    name: "Redux",
    position: [0, 1.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    color: "#764ABC",
  },
  {
    name: "Tailwind",
    position: [0, -1.5, 0],
    rotation: [Math.PI / 2, 0, 0],
    color: "#06B6D4",
  },
];

// Individual face component
const CubeFace = ({ position, rotation, name, color, isHovered }) => {
  const { theme } = useTheme();

  // Text properties
  const textProps = {
    fontSize: 0.45,
    color: theme === "dark" ? "#ffffff" : "#000000",
    anchorX: "center",
    anchorY: "middle",
    outlineWidth: isHovered ? 0.05 : 0.02,
    outlineColor: isHovered ? color : theme === "dark" ? "#000000" : "#ffffff",
    outlineOpacity: 1,
    maxWidth: 1.5,
    textAlign: "center",
    lineHeight: 1,
  };

  // Scale animation for hover effect
  const [scale, setScale] = useState(1);
  useEffect(() => {
    setScale(isHovered ? 1.05 : 1);
  }, [isHovered]);

  return (
    <group position={position} rotation={rotation}>
      {/* Face background */}
      <mesh scale={scale}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial
          color={isHovered ? color : theme === "dark" ? "#1a1a2e" : "#f0f0f0"}
          roughness={0.4}
          metalness={0.5}
          emissive={isHovered ? color : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill name */}
      <Text
        {...textProps}
        position={[0, 0, 0.01]} // Slightly above the face surface
      >
        {name}
      </Text>

      {/* Highlight edge when hovered */}
      {isHovered && (
        <mesh>
          <ringGeometry args={[1.35, 1.4, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

// Simple persistent storage for cube rotation
const useCubeRotation = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Load saved rotation on mount
    try {
      const savedRotation = localStorage.getItem("cubeRotation");
      if (savedRotation) {
        setRotation(JSON.parse(savedRotation));
      }
    } catch (error) {
      console.error("Failed to load cube rotation:", error);
    }
  }, []);

  const saveRotation = (newRotation) => {
    setRotation(newRotation);
    try {
      localStorage.setItem("cubeRotation", JSON.stringify(newRotation));
    } catch (error) {
      console.error("Failed to save cube rotation:", error);
    }
  };

  return [rotation, saveRotation];
};

// The main cube component
const SkillsCubeModel = () => {
  const cubeRef = useRef();
  const [hoveredFace, setHoveredFace] = useState(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [initialRotation, saveRotation] = useCubeRotation();
  const { theme } = useTheme();

  // Initialize the cube with saved rotation
  useEffect(() => {
    if (cubeRef.current && initialRotation) {
      cubeRef.current.rotation.x = initialRotation.x;
      cubeRef.current.rotation.y = initialRotation.y;
      cubeRef.current.rotation.z = initialRotation.z || 0;
    }
  }, [initialRotation]);

  // Save rotation periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (cubeRef.current) {
        saveRotation({
          x: cubeRef.current.rotation.x,
          y: cubeRef.current.rotation.y,
          z: cubeRef.current.rotation.z,
        });
      }
    }, 2000); // Save every 2 seconds

    return () => clearInterval(saveInterval);
  }, [saveRotation]);

  // Continuous rotation when not interacting
  useFrame(() => {
    if (!cubeRef.current || isUserInteracting) return;

    // Smooth continuous rotation
    cubeRef.current.rotation.y += 0.005;
    cubeRef.current.rotation.x += 0.002;
  });

  const handlePointerOver = (faceIndex) => {
    setHoveredFace(faceIndex);
  };

  const handlePointerOut = () => {
    setHoveredFace(null);
  };

  const handlePresentationStart = () => {
    setIsUserInteracting(true);
  };

  const handlePresentationEnd = () => {
    setIsUserInteracting(false);
    if (cubeRef.current) {
      saveRotation({
        x: cubeRef.current.rotation.x,
        y: cubeRef.current.rotation.y,
        z: cubeRef.current.rotation.z,
      });
    }
  };

  return (
    <group>
      <group ref={cubeRef} onPointerMissed={() => setHoveredFace(null)}>
        <RoundedBox args={[3, 3, 3]} radius={0.2} smoothness={5}>
          <meshStandardMaterial
            color={theme === "dark" ? "#0f0f1a" : "#ffffff"}
            metalness={0.3}
            roughness={0.7}
            opacity={0.9}
            transparent
          />
        </RoundedBox>

        {SKILLS.map((skill, index) => (
          <group
            key={skill.name}
            onPointerOver={() => handlePointerOver(index)}
            onPointerOut={handlePointerOut}
          >
            <CubeFace {...skill} isHovered={hoveredFace === index} />
          </group>
        ))}
      </group>
    </group>
  );
};

const SkillsCube = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteractionStart = () => {
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setTimeout(() => setIsInteracting(false), 1000);
  };

  return (
    <Box
      sx={{
        height: { xs: "400px", sm: "500px" },
        width: "100%",
        position: "relative",
        borderRadius: muiTheme.custom.borderRadius.large,
        overflow: "hidden",
        backgroundColor: muiTheme.palette.background.paper + "4D", // 30% opacity
        backdropFilter: "blur(10px)",
        border: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color
          attach="background"
          args={[theme === "dark" ? "#0a0a1a" : "#f5f5f7"]}
        />

        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
        />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={0.4}
        />

        <PresentationControls
          global
          rotation={[0.2, 0.2, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 300 }}
          cursor={true}
          speed={2}
          onDragStart={handleInteractionStart}
          onDragEnd={handleInteractionEnd}
        >
          <SkillsCubeModel />
        </PresentationControls>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={10}
          blur={2.5}
          far={10}
        />

        {theme === "dark" && (
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={1}
          />
        )}

        <Environment preset="studio" />
      </Canvas>

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: muiTheme.palette.background.default + "CC", // 80% opacity
          backdropFilter: "blur(12px)",
          borderRadius: muiTheme.custom.borderRadius.medium,
          border: `1px solid ${muiTheme.palette.primary.main}1A`, // 10% opacity
          p: 1.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          Click and drag to rotate the cube
        </Typography>
      </Box>
    </Box>
  );
};

export default SkillsCube;
