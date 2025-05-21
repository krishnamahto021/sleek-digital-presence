import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
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

// 3D Shape component with mouse tracking effect
const Shape3D = ({ position, color, delay, shape }: Shape3DProps) => {
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

  // Generate CSS class based on color prop
  const colorClass =
    color === "primary"
      ? "bg-primary/70"
      : color === "secondary"
      ? "bg-secondary/70"
      : "bg-accent/70";

  // Additional CSS class for hover effect
  const hoverColorClass =
    color === "primary"
      ? "group-hover:bg-primary/90"
      : color === "secondary"
      ? "group-hover:bg-secondary/90"
      : "group-hover:bg-accent/90";

  // Get hover animation based on shape type
  const getHoverAnimation = () => {
    const baseHover = {
      scale: 1.2,
      filter: "brightness(1.5)",
      boxShadow: "0 0 20px rgba(255,255,255,0.3)",
    };

    switch (shape) {
      case "cube":
        return {
          ...baseHover,
          rotateX: 20,
          rotateY: 20,
          z: 30,
        };
      case "pyramid":
        return {
          ...baseHover,
          rotateZ: 180,
          y: -10,
        };
      case "sphere":
        return {
          ...baseHover,
          scale: [1.1, 1.2, 1.15, 1.25, 1.2],
          filter: "brightness(1.5) contrast(1.1)",
          transition: { duration: 1, repeat: Infinity },
        };
      case "cylinder":
        return {
          ...baseHover,
          scaleY: 1.3,
          scaleX: 0.9,
        };
      case "donut":
        return {
          ...baseHover,
          rotate: 90,
          scale: 1.3,
        };
      case "triangle":
        return {
          ...baseHover,
          rotate: -180,
          y: 10,
        };
      default:
        return baseHover;
    }
  };

  // Render different shapes based on the shape prop
  const renderShape = () => {
    switch (shape) {
      case "cube":
        return (
          <motion.div
            className="relative w-16 h-16 md:w-24 md:h-24 preserve-3d"
            style={{ rotateX: springX, rotateY: springY }}
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
            <div
              className={`absolute inset-0 ${colorClass} ${hoverColorClass} rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
              style={{ transform: "rotateY(15deg) rotateX(15deg)" }}
            />
          </motion.div>
        );
      case "pyramid":
        return (
          <motion.div
            className={`w-0 h-0 border-l-[20px] md:border-l-[30px] border-r-[20px] md:border-r-[30px] border-b-[40px] md:border-b-[60px] border-transparent ${
              color === "primary"
                ? "border-b-primary/70 group-hover:border-b-primary/90"
                : "border-b-secondary/70 group-hover:border-b-secondary/90"
            } shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
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
          />
        );
      case "sphere":
        return (
          <motion.div
            className={`w-12 h-12 md:w-20 md:h-20 rounded-full ${colorClass} ${hoverColorClass} shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
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
          />
        );
      case "cylinder":
        return (
          <motion.div
            className={`w-10 h-16 md:w-16 md:h-24 rounded-full ${colorClass} ${hoverColorClass} shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
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
          />
        );
      case "donut":
        return (
          <motion.div
            className="relative w-16 h-16 md:w-24 md:h-24"
            style={{ rotateX: springX, rotateY: springY }}
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
            <div
              className={`absolute inset-0 rounded-full ${colorClass} ${hoverColorClass} shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
            ></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
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
              <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-background group-hover:bg-primary/20 transition-colors duration-300"></div>
            </motion.div>
          </motion.div>
        );
      case "triangle":
        return (
          <motion.div
            className={`w-0 h-0 border-l-[30px] md:border-l-[40px] border-r-[30px] md:border-r-[40px] border-t-[50px] md:border-t-[70px] border-transparent ${
              color === "primary"
                ? "border-t-primary/70 group-hover:border-t-primary/90"
                : "border-t-secondary/70 group-hover:border-t-secondary/90"
            } shadow-xl rotate-180 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotateZ: [180, 190, 170, 180],
              x: [0, 8, -8, 0],
              transition: {
                duration: 7,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotateZ: [180, 0, 180],
              y: [0, 15, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
          />
        );
      default:
        return (
          <motion.div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${colorClass} ${hoverColorClass} shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20`}
            style={{ rotateX: springX, rotateY: springY }}
            animate={{
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, 15, -15, 0],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: delay + 1.5,
              },
            }}
            whileHover={{
              rotate: [0, 45, -45, 0],
              scale: [1, 1.2, 1.1, 1.3, 1.2],
              transition: { duration: 2, repeat: Infinity },
            }}
          />
        );
    }
  };

  // Simplified animation approach to avoid TypeScript issues
  return (
    <motion.div
      className={`absolute ${position} z-10 cursor-pointer group`}
      initial={{ y: 0, scale: 0.95 }}
      animate={{
        y: [0, -15, 0],
        scale: [0.95, 1, 0.95],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      whileHover={getHoverAnimation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      {renderShape()}
    </motion.div>
  );
};

export default Shape3D;
