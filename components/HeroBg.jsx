"use client";
import { useEffect, useRef } from "react";

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.008;
      const W = canvas.width;
      const H = canvas.height;

      // Clear with void black
      ctx.fillStyle = "#06060f";
      ctx.fillRect(0, 0, W, H);

      // ── Central vortex swirl (behind avatar area) ──
      const vx = W * 0.68;
      const vy = H * 0.5;
      const vR = Math.min(W, H) * 0.45;

      for (let ring = 0; ring < 6; ring++) {
        const r = vR * (0.2 + ring * 0.16);
        const alpha = 0.06 - ring * 0.008;
        const offset = t * (ring % 2 === 0 ? 1 : -0.7) + ring * 0.5;
        const grad = ctx.createRadialGradient(vx, vy, r * 0.3, vx, vy, r);
        grad.addColorStop(0, `rgba(124,58,237,${alpha * 2})`);
        grad.addColorStop(0.5, `rgba(67,20,180,${alpha})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.translate(vx, vy);
        ctx.rotate(offset);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.85, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // Vortex spiral arms
      for (let arm = 0; arm < 3; arm++) {
        ctx.save();
        ctx.translate(vx, vy);
        ctx.rotate(t * 0.4 + (arm * Math.PI * 2) / 3);
        for (let i = 0; i < 60; i++) {
          const angle = (i / 60) * Math.PI * 4;
          const radius = (i / 60) * vR * 0.9;
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius * 0.8;
          const alpha = (1 - i / 60) * 0.12;
          const size = (1 - i / 60) * 3 + 0.5;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147,51,234,${alpha})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // Dark vortex core
      const coreGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, vR * 0.35);
      coreGrad.addColorStop(0, "rgba(6,6,15,0.95)");
      coreGrad.addColorStop(0.5, "rgba(20,10,40,0.6)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(vx, vy, vR * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // ── Bottom-left cursed rose spiral ──
      drawRose(ctx, W * 0.08, H * 0.82, 90, t, "rgba(180,20,20", "rgba(220,38,38");
      // ── Top-right cursed rose spiral ──
      drawRose(ctx, W * 0.92, H * 0.12, 75, -t * 0.8, "rgba(140,10,10", "rgba(185,28,28");

      // ── Left side dark energy wisps ──
      for (let i = 0; i < 5; i++) {
        const wx = W * 0.05 + Math.sin(t * 0.5 + i) * 30;
        const wy = H * (0.2 + i * 0.15) + Math.cos(t * 0.3 + i) * 20;
        const wGrad = ctx.createRadialGradient(wx, wy, 0, wx, wy, 60);
        wGrad.addColorStop(0, `rgba(124,58,237,0.08)`);
        wGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(wx, wy, 60, 0, Math.PI * 2);
        ctx.fillStyle = wGrad;
        ctx.fill();
      }

      // ── Subtle red mist on left ──
      const redMist = ctx.createRadialGradient(W * 0.05, H * 0.5, 0, W * 0.05, H * 0.5, W * 0.25);
      redMist.addColorStop(0, "rgba(180,20,20,0.08)");
      redMist.addColorStop(0.5, "rgba(120,10,10,0.04)");
      redMist.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = redMist;
      ctx.fillRect(0, 0, W * 0.3, H);

      // ── Purple mist center-right ──
      const purpleMist = ctx.createRadialGradient(W * 0.6, H * 0.4, 0, W * 0.6, H * 0.4, W * 0.35);
      purpleMist.addColorStop(0, "rgba(80,20,160,0.12)");
      purpleMist.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = purpleMist;
      ctx.fillRect(W * 0.3, 0, W * 0.7, H);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function drawRose(ctx, cx, cy, size, t, innerColor, outerColor) {
  // Spiral petals
  for (let petal = 0; petal < 5; petal++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.6 + (petal * Math.PI * 2) / 5);
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 3;
      const r = (i / 40) * size;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r * 0.7;
      const alpha = (1 - i / 40) * 0.18;
      ctx.beginPath();
      ctx.arc(px, py, (1 - i / 40) * 4 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `${outerColor},${alpha})`;
      ctx.fill();
    }
    ctx.restore();
  }
  // Core glow
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
  g.addColorStop(0, `${innerColor},0.25)`);
  g.addColorStop(0.5, `${outerColor},0.1)`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
}
