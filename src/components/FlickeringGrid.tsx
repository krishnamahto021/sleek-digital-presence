import React, { useEffect, useRef, useMemo } from "react";
import { Box } from "@mui/material";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  maxOpacity?: number;
  className?: string;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  maxOpacity = 0.3,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // GitHub theme colors (more accurate to 2024 GitHub)
  const githubColors = [
    "#161b22", // Background/empty
    "#0e4429", // Level 1 - lightest green
    "#006d32", // Level 2 - light green
    "#26a641", // Level 3 - medium green
    "#39d353", // Level 4 - bright green
  ];

  // Always use GitHub theme colors
  const gridColor = useMemo(() => {
    return githubColors[Math.floor(Math.random() * githubColors.length)];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set actual canvas size in memory (scaled up for retina displays)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the drawing context back down
      ctx.scale(dpr, dpr);

      // Set display size (CSS pixels)
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
      updateGridSize();
    };

    window.addEventListener("resize", handleResize);

    const totalSize = squareSize + gridGap;
    let columns, rows;

    const updateGridSize = () => {
      const rect = canvas.getBoundingClientRect();
      columns = Math.ceil(rect.width / totalSize);
      rows = Math.ceil(rect.height / totalSize);
    };

    updateGridSize();

    // Create grid state with GitHub-like patterns
    const gridState = Array(rows)
      .fill(null)
      .map((_, row) =>
        Array(columns)
          .fill(null)
          .map((_, col) => {
            // Create GitHub-like clustering patterns
            const baseIntensity = Math.random();
            const clusterEffect = Math.random() > 0.7 ? Math.random() * 0.5 : 0;
            const weekPattern = col % 7 < 5 ? 0.3 : 0.1; // Less activity on weekends

            const initialIntensity = Math.min(
              baseIntensity + clusterEffect + weekPattern,
              1
            );

            return {
              intensity: initialIntensity,
              targetIntensity: initialIntensity,
              lastFlicker: Date.now(),
              flickerDelay: Math.random() * 2000, // Stagger the flickers
            };
          })
      );

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Add subtle GitHub-style background
      ctx.fillStyle = "rgba(13, 17, 23, 0.05)"; // Even more subtle background
      ctx.fillRect(0, 0, rect.width, rect.height);

      const now = Date.now();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const cell = gridState[row][col];

          // GitHub-style activity simulation
          if (
            Math.random() < flickerChance &&
            now - cell.lastFlicker > cell.flickerDelay
          ) {
            // Simulate realistic GitHub contribution patterns
            const isWeekend = col % 7 >= 5;
            const activityChance = isWeekend ? 0.2 : 0.6;

            if (Math.random() < activityChance) {
              // More realistic contribution levels
              const contributionLevel = Math.random();
              if (contributionLevel < 0.6)
                cell.targetIntensity = 0; // No contributions
              else if (contributionLevel < 0.8)
                cell.targetIntensity = 0.25; // Light
              else if (contributionLevel < 0.95)
                cell.targetIntensity = 0.5; // Medium
              else cell.targetIntensity = 1; // Heavy
            }

            cell.lastFlicker = now;
            cell.flickerDelay = 500 + Math.random() * 1500; // Vary delay
          }

          // Smooth transition to target intensity
          const diff = cell.targetIntensity - cell.intensity;
          cell.intensity += diff * 0.05; // Slower, more realistic transitions

          // Render the cell
          const x = col * totalSize;
          const y = row * totalSize;

          // GitHub contribution square styling
          let colorIndex;
          if (cell.intensity < 0.1) colorIndex = 0; // Empty
          else if (cell.intensity < 0.3) colorIndex = 1; // Level 1
          else if (cell.intensity < 0.6) colorIndex = 2; // Level 2
          else if (cell.intensity < 0.8) colorIndex = 3; // Level 3
          else colorIndex = 4; // Level 4

          ctx.fillStyle = githubColors[colorIndex];

          // Draw square with proper spacing
          if (cell.intensity > 0.05) {
            ctx.fillRect(x + 1, y + 1, squareSize - 2, squareSize - 2);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [squareSize, gridGap, flickerChance, maxOpacity, gridColor]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        minHeight: { xs: "300px", sm: "400px", md: "100%" }, // Ensure minimum height on small devices
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
      />
    </Box>
  );
};

export default FlickeringGrid;
