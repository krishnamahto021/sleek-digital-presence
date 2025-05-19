import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useTheme } from "../contexts/ThemeContext";
import MorphingParticleCloud from "./MorphingParticleCloud";
import ChromaticAberrationPanel from "./ChromaticAberrationPanel";

interface Enhanced3DEffectsProps {
  height?: string | number;
  interactive?: boolean;
  className?: string;
  showParticles?: boolean;
  showPanels?: boolean;
}

const Enhanced3DEffects: React.FC<Enhanced3DEffectsProps> = ({
  height = 300,
  interactive = true,
  className = "",
  showParticles = true,
  showPanels = true,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        {/* Background color based on theme */}
        <color
          attach="background"
          args={[theme === "dark" ? "#0a0a1a" : "#f0f0fa"]}
        />

        {/* Lighting */}
        <ambientLight intensity={theme === "dark" ? 0.4 : 0.6} />
        <pointLight
          position={[10, 10, 10]}
          intensity={theme === "dark" ? 0.6 : 0.8}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={theme === "dark" ? 0.4 : 0.6}
        />

        {/* Particle cloud effects */}
        {showParticles && (
          <>
            <MorphingParticleCloud
              count={1000}
              size={theme === "dark" ? 0.02 : 0.03}
              color={theme === "dark" ? "#4d88ff" : "#0000ff"}
              positionX={-1.5}
              positionY={0.5}
              radius={0.8}
              speed={0.2}
            />

            <MorphingParticleCloud
              count={600}
              size={theme === "dark" ? 0.01 : 0.025}
              color={theme === "dark" ? "#ff4d88" : "#ff0000"}
              positionX={1.5}
              positionY={-0.5}
              radius={0.4}
              speed={0.3}
            />
          </>
        )}

        {/* Chromatic aberration panels */}
        {showPanels && (
          <>
            <ChromaticAberrationPanel
              width={1.2}
              height={1.8}
              position={[-2, 0, -1]}
              rotation={[0.1, 0.5, 0.05]}
              intensity={0.02}
              speed={0.7}
            />

            <ChromaticAberrationPanel
              width={0.8}
              height={1.2}
              position={[2, 0, -1.5]}
              rotation={[-0.1, -0.3, -0.05]}
              intensity={0.025}
              color1="#ff8800"
              color2="#00cc66"
              color3="#0088ff"
              speed={0.9}
            />
          </>
        )}

        {/* Controls if interactive */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}

        {/* Environment lighting */}
        <Environment preset="studio" />
      </Canvas>

      {/* Optional interaction hint */}
      {interactive && (
        <div className="absolute bottom-2 right-2 text-xs bg-background/80 text-foreground/70 backdrop-blur-sm px-2 py-1 rounded-md">
          Drag to explore
        </div>
      )}
    </div>
  );
};

export default Enhanced3DEffects;
