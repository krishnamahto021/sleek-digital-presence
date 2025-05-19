import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ParticleTextureProps {
  radius?: number;
  color?: string;
  transparent?: boolean;
}

const ParticleTexture: React.FC<ParticleTextureProps> = ({
  radius = 32,
  color = '#ffffff',
  transparent = true,
}) => {
  // Create a texture using canvas
  const texture = useMemo(() => {
    // Create canvas
    const canvas = document.createElement('canvas');
    const size = radius * 2;
    canvas.width = size;
    canvas.height = size;
    
    // Get context and draw circle
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    // Clear canvas
    context.clearRect(0, 0, size, size);
    
    // Create gradient
    const gradient = context.createRadialGradient(
      radius, radius, 0,
      radius, radius, radius
    );
    
    // Set gradient colors
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(1, transparent ? 'rgba(0,0,0,0)' : color);
    
    // Draw circle
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(radius, radius, radius, 0, Math.PI * 2);
    context.fill();
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }, [radius, color, transparent]);
  
  return texture ? <canvasTexture attach="map" args={[texture.source.data]} /> : null;
};

export default ParticleTexture; 