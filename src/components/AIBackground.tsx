"use client";

import { useEffect, useRef } from "react";

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "rgba(139, 92, 246, 0.6)" : "rgba(234, 88, 12, 0.55)";
      const lineColor = isDark ? "rgba(6, 182, 212, 0.12)" : "rgba(245, 158, 11, 0.2)";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 1 - dist / 140;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200/60 via-background to-background dark:from-violet-950/40" />
        <div className="absolute left-1/4 top-0 size-[500px] rounded-full bg-orange-400/25 blur-[120px] animate-blob dark:bg-violet-600/10" />
        <div className="absolute bottom-0 right-1/4 size-[400px] rounded-full bg-amber-400/25 blur-[100px] animate-blob animation-delay-2000 dark:bg-cyan-500/10" />
        <div className="absolute right-0 top-1/3 size-[300px] rounded-full bg-orange-300/20 blur-[80px] animate-blob animation-delay-4000 dark:bg-blue-600/10" />
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-20 opacity-60"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)]" />
    </>
  );
}
