"use client";

import { useEffect, useRef, useCallback } from "react";

interface Triangle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shade: number; // 0-1, controls how dark/light the mint shade is
}

interface TrianglesBackgroundProps {
  className?: string;
  triangleCount?: number;
  baseColor?: string;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function TrianglesBackground({
  className = "",
  triangleCount = 40,
  baseColor = "#b92e35",
  minSize = 20,
  maxSize = 80,
  minSpeed = 0.3,
  maxSpeed = 1.2,
  direction = "up",
}: TrianglesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<Triangle[]>([]);
  const animationRef = useRef<number | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 42, g: 201, b: 101 };
  };

  const createTriangle = useCallback(
    (canvas: HTMLCanvasElement, startFromEdge: boolean = false): Triangle => {
      const size = minSize + Math.random() * (maxSize - minSize);
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);

      let x: number, y: number;

      if (startFromEdge) {
        switch (direction) {
          case "up":
            x = Math.random() * canvas.width;
            y = canvas.height + size;
            break;
          case "down":
            x = Math.random() * canvas.width;
            y = -size;
            break;
          case "left":
            x = canvas.width + size;
            y = Math.random() * canvas.height;
            break;
          case "right":
            x = -size;
            y = Math.random() * canvas.height;
            break;
          default:
            x = Math.random() * canvas.width;
            y = canvas.height + size;
        }
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }

      return {
        x,
        y,
        size,
        speed,
        opacity: 0.03 + Math.random() * 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        shade: 0.4 + Math.random() * 0.6,
      };
    },
    [minSize, maxSize, minSpeed, maxSpeed, direction]
  );

  const drawTriangle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      triangle: Triangle,
      rgb: { r: number; g: number; b: number }
    ) => {
      ctx.save();
      ctx.translate(triangle.x, triangle.y);
      ctx.rotate(triangle.rotation);

      // Apply shade variation
      const shadedR = Math.floor(rgb.r * triangle.shade);
      const shadedG = Math.floor(rgb.g * triangle.shade);
      const shadedB = Math.floor(rgb.b * triangle.shade);

      ctx.fillStyle = `rgba(${shadedR}, ${shadedG}, ${shadedB}, ${triangle.opacity})`;
      ctx.beginPath();

      // Draw equilateral triangle pointing up
      const h = (triangle.size * Math.sqrt(3)) / 2;
      ctx.moveTo(0, -h / 1.5);
      ctx.lineTo(-triangle.size / 2, h / 2.5);
      ctx.lineTo(triangle.size / 2, h / 2.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    },
    []
  );

  const updateTriangle = useCallback(
    (triangle: Triangle, canvas: HTMLCanvasElement): boolean => {
      triangle.rotation += triangle.rotationSpeed;

      switch (direction) {
        case "up":
          triangle.y -= triangle.speed;
          return triangle.y + triangle.size < 0;
        case "down":
          triangle.y += triangle.speed;
          return triangle.y - triangle.size > canvas.height;
        case "left":
          triangle.x -= triangle.speed;
          return triangle.x + triangle.size < 0;
        case "right":
          triangle.x += triangle.speed;
          return triangle.x - triangle.size > canvas.width;
        default:
          triangle.y -= triangle.speed;
          return triangle.y + triangle.size < 0;
      }
    },
    [direction]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = hexToRgb(baseColor);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize triangles
    trianglesRef.current = Array.from({ length: triangleCount }, () =>
      createTriangle(canvas, false)
    );

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw triangles
      trianglesRef.current = trianglesRef.current.map((triangle) => {
        const isOffScreen = updateTriangle(triangle, {
          width: rect.width,
          height: rect.height,
        } as HTMLCanvasElement);

        if (isOffScreen) {
          return createTriangle(
            { width: rect.width, height: rect.height } as HTMLCanvasElement,
            true
          );
        }

        drawTriangle(ctx, triangle, rgb);
        return triangle;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    triangleCount,
    baseColor,
    createTriangle,
    updateTriangle,
    drawTriangle,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
