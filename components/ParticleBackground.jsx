"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // Cursed energy particles — purple, blue, rare red
    const particles = Array.from({ length: 100 }, () => {
      const rand = Math.random();
      const color = rand > 0.7 ? "124,58,237" : rand > 0.4 ? "37,99,235" : rand > 0.05 ? "147,51,234" : "220,38,38";
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color,
      };
    });

    const ripples = [];
    window.addEventListener("click", (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.7 });
    });

    const trail = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > 18) trail.shift();
      trail.forEach((t, i) => {
        const a = (i / trail.length) * 0.2;
        const s = (i / trail.length) * 5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${a})`;
        ctx.fill();
      });

      // Cursor glow — hollow purple
      if (mouse.x > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        g.addColorStop(0, "rgba(124,58,237,0.1)");
        g.addColorStop(0.5, "rgba(37,99,235,0.04)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // Click ripples — cursed energy burst
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 5;
        rp.alpha -= 0.02;
        if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124,58,237,${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220,38,38,${rp.alpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particles
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const f = (90 - dist) / 90;
          p.x += (dx / dist) * f * 2.5;
          p.y += (dy / dist) * f * 2.5;
        } else {
          p.x += p.dx;
          p.y += p.dy;
        }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        // Cursor connections
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(147,51,234,${0.22 * (1 - d / 140)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
