
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Icosahedron } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

// Enhanced 3D scene with multiple shapes
const AnimatedShapes = () => {
  const { theme } = useTheme();
  
  // Expanded color palette for light/dark themes
  const colors = {
    primary: theme === 'light' ? '#1976d2' : '#4dd0e1',
    secondary: theme === 'light' ? '#2196f3' : '#00bcd4',
    accent1: theme === 'light' ? '#9c27b0' : '#7e57c2',
    accent2: theme === 'light' ? '#f44336' : '#ff5252',
    accent3: theme === 'light' ? '#4caf50' : '#69f0ae',
  };
  
  return (
    <>
      {/* Main sphere in the center */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={colors.primary} 
          roughness={0.3} 
          metalness={0.4} 
          emissive={colors.primary}
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Orbiting torus */}
      <Torus args={[1.8, 0.2, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial 
          color={colors.secondary} 
          roughness={0.5} 
          metalness={0.6}
          wireframe={true} 
        />
      </Torus>
      
      {/* Small decorative spheres */}
      <Sphere args={[0.3, 24, 24]} position={[1.5, 0.5, 1]}>
        <meshStandardMaterial 
          color={colors.accent1} 
          roughness={0.2} 
          metalness={0.8}
          emissive={colors.accent1}
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      <Sphere args={[0.2, 24, 24]} position={[-1.2, 1.2, 0.5]}>
        <meshStandardMaterial 
          color={colors.accent2} 
          roughness={0.2} 
          metalness={0.5}
          emissive={colors.accent2}
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Low-poly geometric shape */}
      <Icosahedron args={[0.65]} position={[-1.5, -0.5, -1]}>
        <meshStandardMaterial 
          color={colors.accent3} 
          roughness={0.6} 
          metalness={0.3}
          flatShading={true}
        />
      </Icosahedron>
    </>
  );
};

// Fallback component for when Canvas fails to render
const CanvasFallback = () => {
  const { theme } = useTheme();
  const color = theme === 'light' ? 'bg-primary/20' : 'bg-secondary/20';
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`w-40 h-40 rounded-full ${color} animate-pulse filter blur-xl`}></div>
    </div>
  );
};

// Define the prop and state types for ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Simple error boundary component to catch Three.js errors
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return null; // Return nothing, the fallback will be shown
    }
    return this.props.children;
  }
}

// Main Three.js component
const ThreeDHero = () => {
  // State to track if rendering fails
  const [renderFailed, setRenderFailed] = useState(false);
  
  // Handle errors that might occur during Three.js rendering
  const handleError = () => {
    console.error("Three.js rendering failed");
    setRenderFailed(true);
  };

  return (
    <div className="canvas-container relative w-full h-full absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-90"></div>
      <div className="absolute inset-0">
        {!renderFailed ? (
          <Suspense fallback={<CanvasFallback />}>
            <ErrorBoundary onError={handleError}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#5f9df7" />
                <AnimatedShapes />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.6}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </ErrorBoundary>
          </Suspense>
        ) : (
          <CanvasFallback />
        )}
      </div>
    </div>
  );
};

export default ThreeDHero;
