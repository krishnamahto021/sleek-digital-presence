
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

// Simplified 3D object that should work more reliably
const AnimatedShape = () => {
  const { theme } = useTheme();
  
  // Colors for light/dark themes
  const primaryColor = theme === 'light' ? '#1976d2' : '#4dd0e1';
  const secondaryColor = theme === 'light' ? '#2196f3' : '#00bcd4';
  
  return (
    <group>
      {/* Primary sphere */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color={primaryColor} roughness={0.4} metalness={0.3} />
      </Sphere>
      
      {/* Secondary smaller sphere */}
      <Sphere args={[0.5, 24, 24]} position={[1.5, 0.5, 0]}>
        <meshStandardMaterial color={secondaryColor} roughness={0.6} metalness={0.2} />
      </Sphere>
    </group>
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
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <AnimatedShape />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
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
