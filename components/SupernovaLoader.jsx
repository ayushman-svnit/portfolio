'use client';

import { useEffect, useRef, useState } from 'react';
import './SupernovaLoader.css';

export default function SupernovaLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let animationId;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Text reveal - AYUSHMAN SINGH letter by letter (0-2s)
      if (elapsed < 2) {
        const textProgress = elapsed / 2.0;
        
        // Text: AYUSHMAN SINGH (14 characters including space)
        const fullText = 'AYUSHMAN SINGH';
        const charsToShow = Math.floor(textProgress * fullText.length);
        const displayText = fullText.substring(0, charsToShow);
        
        // Draw text - responsive font size
        ctx.fillStyle = '#ffffff';
        const fontSize = Math.min(56, canvas.width / 12); // Responsive font size
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add subtle glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(displayText, centerX, centerY);
        ctx.shadowBlur = 0;
      }
      
      // Hold full text (2-3s)
      else if (elapsed >= 2 && elapsed < 3) {
        // Full text visible
        ctx.fillStyle = '#ffffff';
        const fontSize = Math.min(56, canvas.width / 12);
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('AYUSHMAN SINGH', centerX, centerY);
        ctx.shadowBlur = 0;
      }
      
      // Cinematic curtain wipe (3-3.7s)
      else if (elapsed >= 3 && elapsed < 3.7) {
        const wipeProgress = (elapsed - 3) / 0.7;
        
        // Black background with full text
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Full text visible
        ctx.fillStyle = '#ffffff';
        const fontSize = Math.min(56, canvas.width / 12);
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('AYUSHMAN SINGH', centerX, centerY);
        ctx.shadowBlur = 0;
        
        // Hero section bg curtain sliding up
        const curtainY = canvas.height * (1 - wipeProgress);
        ctx.fillStyle = '#06060f';
        ctx.fillRect(0, curtainY, canvas.width, canvas.height - curtainY);
      }
      
      // Complete
      else if (elapsed >= 3.7) {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div className="supernova-loader">
      <canvas ref={canvasRef} className="supernova-canvas" />
    </div>
  );
}

