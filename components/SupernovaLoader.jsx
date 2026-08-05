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
    
    const particles = [];
    const orbitParticles = [];
    
    // Energy cores
    const blueCore = { x: centerX - 150, y: centerY, angle: 0, radius: 150 };
    const redCore = { x: centerX + 150, y: centerY, angle: Math.PI, radius: 150 };
    
    // Stars
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2
      });
    }
    
    // Create orbit particles
    const createOrbitParticles = (core, color) => {
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        orbitParticles.push({
          angle,
          distance: 20 + Math.random() * 15,
          speed: 0.02 + Math.random() * 0.01,
          size: 2 + Math.random() * 2,
          color,
          core,
          opacity: 0.8
        });
      }
    };
    
    createOrbitParticles('blue', 'rgba(59, 130, 246, ');
    createOrbitParticles('red', 'rgba(239, 68, 68, ');
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Nebula effect
      const nebulaGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width * 0.6
      );
      nebulaGradient.addColorStop(0, 'rgba(15, 23, 42, 0.2)');
      nebulaGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.1)');
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Stars
      stars.forEach(star => {
        star.twinkle += 0.02;
        const twinkleOpacity = star.opacity * (0.5 + Math.sin(star.twinkle) * 0.5);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // PHASE 1: Cores appear (0-2s)
      if (elapsed < 2) {
        const appearProgress = Math.min(elapsed / 2, 1);
        const pulse = Math.sin(elapsed * 2) * 0.2 + 0.8;
        
        drawCore(blueCore.x, blueCore.y, 'rgba(59, 130, 246, ', appearProgress * pulse);
        drawCore(redCore.x, redCore.y, 'rgba(239, 68, 68, ', appearProgress * pulse);
        
        // Orbit particles
        orbitParticles.forEach(p => {
          p.angle += p.speed;
          const coreX = p.core === 'blue' ? blueCore.x : redCore.x;
          const coreY = p.core === 'blue' ? blueCore.y : redCore.y;
          const x = coreX + Math.cos(p.angle) * p.distance;
          const y = coreY + Math.sin(p.angle) * p.distance;
          
          ctx.fillStyle = p.color + (p.opacity * appearProgress) + ')';
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color + '0.8)';
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }
      
      // PHASE 2-3: Orbiting and spiraling (2-5s)
      else if (elapsed >= 2 && elapsed < 5) {
        const orbitProgress = (elapsed - 2) / 3;
        const orbitSpeed = 0.5 + orbitProgress * 2;
        
        blueCore.angle += orbitSpeed * 0.016;
        redCore.angle += orbitSpeed * 0.016;
        
        blueCore.x = centerX + Math.cos(blueCore.angle) * blueCore.radius;
        blueCore.y = centerY + Math.sin(blueCore.angle) * blueCore.radius;
        redCore.x = centerX + Math.cos(redCore.angle) * redCore.radius;
        redCore.y = centerY + Math.sin(redCore.angle) * redCore.radius;
        
        // Spiral inward
        blueCore.radius = 150 * (1 - orbitProgress * 0.6);
        redCore.radius = 150 * (1 - orbitProgress * 0.6);
        
        // Create trail particles
        if (Math.random() < 0.3) {
          particles.push({
            x: blueCore.x,
            y: blueCore.y,
            vx: 0,
            vy: 0,
            life: 1,
            color: 'rgba(59, 130, 246, ',
            size: 3
          });
          particles.push({
            x: redCore.x,
            y: redCore.y,
            vx: 0,
            vy: 0,
            life: 1,
            color: 'rgba(239, 68, 68, ',
            size: 3
          });
        }
        
        // Draw trails
        particles.forEach((p, i) => {
          p.life -= 0.015;
          if (p.life <= 0) {
            particles.splice(i, 1);
            return;
          }
          ctx.fillStyle = p.color + (p.life * 0.6) + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        const pulse = Math.sin(elapsed * 3) * 0.3 + 0.7;
        drawCore(blueCore.x, blueCore.y, 'rgba(59, 130, 246, ', pulse);
        drawCore(redCore.x, redCore.y, 'rgba(239, 68, 68, ', pulse);
        
        // Electric arcs
        if (orbitProgress > 0.4 && Math.random() < 0.1) {
          drawArc(blueCore.x, blueCore.y, redCore.x, redCore.y);
        }
      }
      
      // PHASE 4: Fade to black (5-5.2s)
      else if (elapsed >= 5 && elapsed < 5.2) {
        const fadeProgress = (elapsed - 5) / 0.2;
        
        particles.forEach((p, i) => {
          p.life -= 0.1;
          if (p.life <= 0) {
            particles.splice(i, 1);
            return;
          }
          ctx.fillStyle = p.color + (p.life * 0.6) + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        const fadeIntensity = 1 - fadeProgress;
        drawCore(blueCore.x, blueCore.y, 'rgba(59, 130, 246, ', fadeIntensity);
        drawCore(redCore.x, redCore.y, 'rgba(239, 68, 68, ', fadeIntensity);
        
        const blackOpacity = Math.min(fadeProgress * 5, 1);
        ctx.fillStyle = `rgba(0, 0, 0, ${blackOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Text reveal - AYUSHMAN SINGH letter by letter (5.2-6.2s)
      else if (elapsed >= 5.2 && elapsed < 6.2) {
        const textProgress = (elapsed - 5.2) / 1.0;
        
        // Black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Text: AYUSHMAN SINGH (14 characters including space)
        const fullText = 'AYUSHMAN SINGH';
        const charsToShow = Math.floor(textProgress * fullText.length);
        const displayText = fullText.substring(0, charsToShow);
        
        // Draw text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '4px';
        
        // Add subtle shadow for depth
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(displayText, centerX, centerY);
        ctx.shadowBlur = 0;
      }
      
      // Cinematic curtain wipe (6.2-6.9s)
      else if (elapsed >= 6.2 && elapsed < 6.9) {
        const wipeProgress = (elapsed - 6.2) / 0.7;
        
        // Black background with full text
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Full text visible
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText('AYUSHMAN SINGH', centerX, centerY);
        ctx.shadowBlur = 0;
        
        // Hero section bg curtain sliding up
        const curtainY = canvas.height * (1 - wipeProgress);
        ctx.fillStyle = '#06060f';
        ctx.fillRect(0, curtainY, canvas.width, canvas.height - curtainY);
      }
      
      // Complete
      else if (elapsed >= 6.9) {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    function drawCore(x, y, color, intensity) {
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
      glowGradient.addColorStop(0, color + (intensity * 0.8) + ')');
      glowGradient.addColorStop(0.5, color + (intensity * 0.3) + ')');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 40, y - 40, 80, 80);
      
      ctx.fillStyle = color + intensity + ')';
      ctx.shadowBlur = 20;
      ctx.shadowColor = color + '0.8)';
      ctx.beginPath();
      ctx.arc(x, y, 8 * intensity, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    function drawArc(x1, y1, x2, y2) {
      const segments = 8;
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 30;
        const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 30;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    }
    
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

