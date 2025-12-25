'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const ShootingStarsBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative w-full min-h-screen bg-slate-950 overflow-hidden", className)}>
      <div className="absolute inset-0 z-0">
        <StarField />
        <ShootingStars />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random(),
          speed: Math.random() * 0.05,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      
      stars.forEach((star) => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 1) star.opacity = 1;
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
};

const ShootingStars = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; angle: number; speed: number; length: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // Chance to spawn a star
        const id = Date.now();
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight / 2);
        const angle = 45; // Degrees
        const speed = 10 + Math.random() * 10;
        const length = 100 + Math.random() * 50;

        setStars(prev => [...prev, { id, x, y, angle, speed, length }]);

        // Remove star after animation
        setTimeout(() => {
          setStars(prev => prev.filter(s => s.id !== id));
        }, 1000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{
            left: star.x,
            top: star.y,
            width: star.length,
            transform: `rotate(${star.angle}deg) translateX(-100%)`,
            animation: `shoot 1s linear forwards`,
            boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.5)'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes shoot {
          0% { transform: rotate(45deg) translateX(0); opacity: 1; }
          100% { transform: rotate(45deg) translateX(1000px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};