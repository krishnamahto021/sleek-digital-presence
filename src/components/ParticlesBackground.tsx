import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  hue: number;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const hueRef = useRef(0);

  // Define theme-aware colors
  const getParticleColor = (hue: number, opacity = 1) => {
    if (isDark) {
      // Dark theme - cooler colors with blues and purples
      return `hsla(${hue}, 80%, 75%, ${opacity})`;
    } else {
      // Light theme - warmer colors with teals and blues
      return `hsla(${hue}, 70%, 60%, ${opacity})`;
    }
  };

  const getLineColor = (opacity = 0.2) => {
    if (isDark) {
      return `hsla(230, 80%, 70%, ${opacity})`;
    } else {
      return `hsla(200, 80%, 40%, ${opacity})`;
    }
  };

  // Create particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 9000), 100);
    const baseHue = isDark ? 230 : 190; // Blue for dark, teal for light

    for (let i = 0; i < particleCount; i++) {
      const hue = (baseHue + Math.random() * 60 - 30) % 360; // Vary hue by ±30
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        color: getParticleColor(hue),
        hue,
      });
    }

    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slightly shift the base hue over time for subtle color changes
      hueRef.current = (hueRef.current + 0.1) % 360;

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const force =
            (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          particle.speedX -= directionX * force * 0.2;
          particle.speedY -= directionY * force * 0.2;

          // Change particle color slightly when interacted with
          particle.hue = (particle.hue + 1) % 360;
          particle.color = getParticleColor(particle.hue);
        }

        // Draw particle with its specific color
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const lineOpacity = ((100 - distance) / 500) * particle.opacity;
              ctx.beginPath();
              ctx.globalAlpha = lineOpacity;
              ctx.strokeStyle = getLineColor(lineOpacity);
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isDark]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ParticlesBackground;
