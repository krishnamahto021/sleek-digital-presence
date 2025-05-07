
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

// Main Three.js component
const ThreeDHero = () => {
  const { theme } = useTheme();
  
  // Colors for light/dark themes
  const color = theme === 'light' ? '#1976d2' : '#4dd0e1';
  
  return (
    <div className="canvas-container relative w-full h-full absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-90"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-primary/20 animate-pulse filter blur-xl"></div>
      </div>
    </div>
  );
};

export default ThreeDHero;
