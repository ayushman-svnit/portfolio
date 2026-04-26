"use client";
import { useEffect, useRef } from "react";

export default function HollowCollision() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation state
    let t = 0; // 0 → 1 travel, 1 → 1.6 collision, 1.6 → 2 fade, then reset
    const SPEED = 0.004;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      t += SPEED;
      if (t > 2.2) t = 0;

      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.min(W, H) * 0.38;

      // Travel phase 0→1: balls move from edges toward center
      const travel = Math.min(t, 1);
      const eased = 1 - Math.pow(1 - travel, 2); // ease in

      // Red ball — starts from left edge
      const redX = eased * cx + (1 - eased) * (-maxR * 0.3);
      // Blue/purple ball — starts from right edge
      const blueX = (1 - eased) * (W + maxR * 0.3) + eased * cx;
      const ballY = cy;
      const ballR = maxR;

      // Draw red orb
      if (t < 1.8) {
        const redAlpha = t > 1.4 ? Math.max(0, (1.8 - t) / 0.4) : 1;
        const gRed = ctx.createRadialGradient(redX, ballY, 0, redX, ballY, ballR);
        gRed.addColorStop(0, `rgba(220,38,38,${0.55 * redAlpha})`);
        gRed.addColorStop(0.3, `rgba(185,28,28,${0.35 * redAlpha})`);
        gRed.addColorStop(0.7, `rgba(127,29,29,${0.15 * redAlpha})`);
        gRed.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(redX, ballY, ballR, 0, Math.PI * 2);
        ctx.fillStyle = gRed;
        ctx.fill();
      }

      // Draw blue/purple orb
      if (t < 1.8) {
        const blueAlpha = t > 1.4 ? Math.max(0, (1.8 - t) / 0.4) : 1;
        const gBlue = ctx.createRadialGradient(blueX, ballY, 0, blueX, ballY, ballR);
        gBlue.addColorStop(0, `rgba(37,99,235,${0.55 * blueAlpha})`);
        gBlue.addColorStop(0.3, `rgba(124,58,237,${0.35 * blueAlpha})`);
        gBlue.addColorStop(0.7, `rgba(67,20,180,${0.15 * blueAlpha})`);
        gBlue.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(blueX, ballY, ballR, 0, Math.PI * 2);
        ctx.fillStyle = gBlue;
        ctx.fill();
      }

      // Collision flash — peaks at t=1, fades by t=1.6
      if (t >= 0.85 && t < 1.7) {
        const flashProgress = (t - 0.85) / 0.85;
        const flashAlpha = flashProgress < 0.3
          ? flashProgress / 0.3
          : Math.max(0, 1 - (flashProgress - 0.3) / 0.7);

        const flashR = maxR * 0.5 * (0.5 + flashProgress * 0.8);

        // Hollow purple core
        const gFlash = ctx.createRadialGradient(cx, cy, 0, cx, cy, flashR);
        gFlash.addColorStop(0, `rgba(255,255,255,${0.7 * flashAlpha})`);
        gFlash.addColorStop(0.15, `rgba(216,180,254,${0.8 * flashAlpha})`);
        gFlash.addColorStop(0.4, `rgba(147,51,234,${0.6 * flashAlpha})`);
        gFlash.addColorStop(0.7, `rgba(124,58,237,${0.3 * flashAlpha})`);
        gFlash.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, flashR, 0, Math.PI * 2);
        ctx.fillStyle = gFlash;
        ctx.fill();

        // Shockwave ring
        if (flashProgress > 0.1) {
          const ringR = flashR * 1.4 * flashProgress;
          const ringAlpha = Math.max(0, 0.5 - flashProgress * 0.5);
          ctx.beginPath();
          ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(216,180,254,${ringAlpha})`;
          ctx.lineWidth = 2;
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
