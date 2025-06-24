import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Box, useTheme } from "@mui/material";

// Define props interface for Shape3D component
interface Shape3DProps {
  position: string;
  color: "primary" | "secondary" | "accent";
  delay: number;
  shape:
    | "cube"
    | "pyramid"
    | "sphere"
    | "cylinder"
    | "box"
    | "donut"
    | "triangle";
}

// Helper function to parse position string and convert to CSS positioning
const parsePosition = (position: string) => {
  const styles: any = {};

  // Parse left/right positioning
  if (position.includes("left-")) {
    const leftMatch = position.match(/left-\[(\d+)%\]/);
    if (leftMatch) {
      styles.left = leftMatch[1] + "%";
    }
  }
  if (position.includes("right-")) {
    const rightMatch = position.match(/right-\[(\d+)%\]/);
    if (rightMatch) {
      styles.right = rightMatch[1] + "%";
    }
  }

  // Parse top/bottom positioning
  if (position.includes("top-")) {
    const topMatch = position.match(/top-\[(\d+)%\]/);
    if (topMatch) {
      styles.top = topMatch[1] + "%";
    }
  }
  if (position.includes("bottom-")) {
    const bottomMatch = position.match(/bottom-\[(\d+)%\]/);
    if (bottomMatch) {
      styles.bottom = bottomMatch[1] + "%";
    }
  }

  return styles;
};

// 3D Shape component with mouse tracking effect
const Shape3D = ({ position, color, delay, shape }: Shape3DProps) => {
  const theme = useTheme();
  // Motion values for mouse tracking effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse position into rotation
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  // Add spring physics for smoother motion
  const springX = useSpring(rotateX, { stiffness: 60, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 60, damping: 15 });

  // Track hover state
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // More dramatic movements when hovered
    const sensitivity = isHovered ? 1.5 : 1;
    x.set((e.clientX - centerX) * sensitivity);
    y.set((e.clientY - centerY) * sensitivity);
  };

  // Parse position string to get CSS positioning
  const positionStyles = parsePosition(position);

  // Get theme colors
  const getShapeColor = () => {
    switch (color) {
      case "primary":
        return {
          base: theme.palette.primary.main + "B3", // 70% opacity
          hover: theme.palette.primary.main + "E6", // 90% opacity
        };
      case "secondary":
        return {
          base: theme.palette.secondary.main + "B3",
          hover: theme.palette.secondary.main + "E6",
        };
      default:
        return {
          base: theme.palette.primary.main + "B3",
          hover: theme.palette.primary.main + "E6",
        };
    }
  };

  const shapeColors = getShapeColor();

  // Render different shapes based on the shape prop
  const renderShape = () => {
    switch (shape) {
      case "cube":
        return (
          <motion.div
            style={{
              position: "relative",
              width: "64px",
              height: "64px",
              transformStyle: "preserve-3d",
              rotateX: springX,
              rotateY: springY,
            }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotateX: [0, 30, -20, 10, 0],
              rotateY: [0, 20, -30, 15, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: shapeColors.base,
                borderRadius: theme.custom.borderRadius.medium,
                boxShadow: theme.custom.shadows.card,
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                transform: "rotateY(15deg) rotateX(15deg)",
                width: { xs: "64px", md: "96px" },
                height: { xs: "64px", md: "96px" },
                "&:hover": {
                  backgroundColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
          </motion.div>
        );

      case "pyramid":
        return (
          <motion.div
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, 0, 10, -10, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotate: [0, 60, 120, 180, 240, 300, 360],
              transition: { duration: 3, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: {
                  xs: "20px solid transparent",
                  md: "30px solid transparent",
                },
                borderRight: {
                  xs: "20px solid transparent",
                  md: "30px solid transparent",
                },
                borderBottom: {
                  xs: `40px solid ${shapeColors.base}`,
                  md: `60px solid ${shapeColors.base}`,
                },
                boxShadow: theme.custom.shadows.card,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderBottomColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
          </motion.div>
        );

      case "sphere":
        return (
          <motion.div
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.1, 0.95, 1.05, 1],
              x: [0, 5, -5, 0],
              y: [0, -5, 5, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              scale: [1.1, 1.2, 1.15, 1.25, 1.2],
              filter: "brightness(1.5) contrast(1.1)",
              transition: { duration: 1, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                width: { xs: "48px", md: "80px" },
                height: { xs: "48px", md: "80px" },
                borderRadius: "50%",
                backgroundColor: shapeColors.base,
                boxShadow: theme.custom.shadows.card,
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
          </motion.div>
        );

      case "cylinder":
        return (
          <motion.div
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotateZ: [0, 10, -10, 0],
              height: ["100%", "110%", "100%", "105%", "100%"],
              transition: {
                duration: 7,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              scaleY: [1, 1.3, 1.1, 1.2, 1.3],
              scaleX: [1, 0.8, 0.9, 0.85, 0.8],
              transition: { duration: 1.5, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                width: { xs: "40px", md: "64px" },
                height: { xs: "64px", md: "96px" },
                borderRadius: "50%",
                backgroundColor: shapeColors.base,
                boxShadow: theme.custom.shadows.card,
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
          </motion.div>
        );

      case "donut":
        return (
          <motion.div
            style={{
              position: "relative",
              width: "64px",
              height: "64px",
              rotateX: springX,
              rotateY: springY,
            }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, 20, -20, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotate: [0, 90, 180, 270, 360],
              transition: { duration: 3, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: shapeColors.base,
                boxShadow: theme.custom.shadows.card,
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                width: { xs: "64px", md: "96px" },
                height: { xs: "64px", md: "96px" },
                "&:hover": {
                  backgroundColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{
                rotate: [0, -30, 30, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: delay + 2,
                },
              }}
              whileHover={{
                rotate: [0, -90, -180, -270, -360],
                transition: { duration: 3, repeat: Infinity },
              }}
            >
              <Box
                sx={{
                  width: { xs: "24px", md: "40px" },
                  height: { xs: "24px", md: "40px" },
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background.default,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main + "33", // 20% opacity
                  },
                }}
              />
            </motion.div>
          </motion.div>
        );

      case "triangle":
        return (
          <motion.div
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, 15, -15, 0],
              transition: {
                duration: 5.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotate: [0, -180, -360],
              y: [0, 10, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: {
                  xs: "25px solid transparent",
                  md: "35px solid transparent",
                },
                borderRight: {
                  xs: "25px solid transparent",
                  md: "35px solid transparent",
                },
                borderBottom: {
                  xs: `50px solid ${shapeColors.base}`,
                  md: `70px solid ${shapeColors.base}`,
                },
                boxShadow: theme.custom.shadows.card,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderBottomColor: shapeColors.hover,
                  boxShadow: theme.custom.shadows.cardHover,
                },
              }}
            />
          </motion.div>
        );

      default:
        return (
          <Box
            sx={{
              width: { xs: "48px", md: "80px" },
              height: { xs: "48px", md: "80px" },
              borderRadius: "50%",
              backgroundColor: shapeColors.base,
              boxShadow: theme.custom.shadows.card,
            }}
          />
        );
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 5,
        cursor: "pointer",
        ...positionStyles, // Apply parsed position styles
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delay: delay * 0.2,
          duration: 0.8,
          ease: "easeOut",
        },
      }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.1 }}
    >
      {renderShape()}
    </motion.div>
  );
};

export default Shape3D;
