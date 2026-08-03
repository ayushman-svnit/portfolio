'use client';

import { useEffect, useRef, useState } from 'react';
import './SupernovaLoader.css';

export default function SupernovaLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('active');
  
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
    
    // Particle system
    const particles = [];
    const orbitParticles = [];
    const vortexParticles = [];
    const explosionParticles = [];
    
    // Energy cores
    const blueCore = { x: centerX - 150, y: centerY, angle: 0, radius: 150 };
    const redCore = { x: centerX + 150, y: centerY, angle: Math.PI, radius: 150 };
    
    // Nebula stars
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
        
        // Blue core
        drawCore(blueCore.x, blueCore.y, 'rgba(59, 130, 246, ', appearProgress * pulse);
        
        // Red core
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
      
      // PHASE 4-5: Vortex and maximum energy (5-7s)
      else if (elapsed >= 5 && elapsed < 7) {
        const vortexProgress = (elapsed - 5) / 2;
        
        // Create vortex particles
        if (vortexParticles.length < 1000) {
          for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 300;
            vortexParticles.push({
              angle,
              distance,
              speed: 0.05 + Math.random() * 0.1,
              color: Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(239, 68, 68, ',
              size: 1 + Math.random() * 2,
              life: 1
            });
          }
        }
        
        // Draw vortex
        vortexParticles.forEach((p, i) => {
          p.angle += p.speed * (1 + vortexProgress * 2);
          p.distance -= 2 + vortexProgress * 4;
          p.life -= 0.008;
          
          if (p.distance < 10 || p.life <= 0) {
            vortexParticles.splice(i, 1);
            return;
          }
          
          const x = centerX + Math.cos(p.angle) * p.distance;
          const y = centerY + Math.sin(p.angle) * p.distance;
          
          ctx.fillStyle = p.color + (p.life * 0.8) + ')';
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color + '0.6)';
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        
        // Central energy buildup
        const energySize = 20 + vortexProgress * 60;
        const energyGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, energySize
        );
        energyGradient.addColorStop(0, `rgba(255, 255, 255, ${vortexProgress})`);
        energyGradient.addColorStop(0.3, `rgba(200, 180, 255, ${vortexProgress * 0.6})`);
        energyGradient.addColorStop(0.6, `rgba(100, 130, 200, ${vortexProgress * 0.3})`);
        energyGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = energyGradient;
        ctx.fillRect(centerX - energySize, centerY - energySize, energySize * 2, energySize * 2);
      }
      
      // PHASE 6: SUPERNOVA (7-7.5s)
      else if (elapsed >= 7 && elapsed < 7.5) {
        const explosionProgress = (elapsed - 7) / 0.5;
        
        // Create explosion particles
        if (explosionParticles.length < 2000) {
          for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 10;
            explosionParticles.push({
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1,
              color: Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(239, 68, 68, ',
              size: 2 + Math.random() * 4
            });
          }
        }
        
        // Draw explosion
        explosionParticles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          p.vx *= 0.98;
          p.vy *= 0.98;
          
          if (p.life <= 0) {
            explosionParticles.splice(i, 1);
            return;
          }
          
          ctx.fillStyle = p.color + p.life + ')';
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color + (p.life * 0.8) + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        
        // Expanding shockwave
        const shockwaveSize = explosionProgress * canvas.width * 0.8;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - explosionProgress) * 0.8})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockwaveSize, 0, Math.PI * 2);
        ctx.stroke();
        
        // White flash
        const flashOpacity = Math.min(explosionProgress * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // White screen hold (7.5-7.7s)
      else if (elapsed >= 7.5 && elapsed < 7.7) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Transition (7.7-8.5s)
      else if (elapsed >= 7.7 && elapsed < 8.5) {
        const fadeProgress = (elapsed - 7.7) / 0.8;
        setPhase('transitioning');
        
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - fadeProgress})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Complete
      else if (elapsed >= 8.5) {
        setPhase('complete');
        if (onComplete) onComplete();
        return;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Helper functions
    function drawCore(x, y, color, intensity) {
      // Outer glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
      glowGradient.addColorStop(0, color + (intensity * 0.8) + ')');
      glowGradient.addColorStop(0.5, color + (intensity * 0.3) + ')');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 40, y - 40, 80, 80);
      
      // Core
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
  
  if (phase === 'complete') return null;
  
  return (
    <div className={`supernova-loader ${phase}`}>
      <canvas ref={canvasRef} className="supernova-canvas" />
      {phase === 'transitioning' && (
        <div className="particle-text-transition">
          <h1 className="hero-name">Ayushman Singh</h1>
        </div>
      )}
    </div>
  );
}
