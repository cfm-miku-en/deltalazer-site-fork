"use client";

import { useEffect, useRef, useCallback } from "react";

interface TriangleParticle {
  xNorm: number;
  yNorm: number;
  size: number;
  speedMultiplier: number;
  opacity: number;
}

interface OsuLogoTrianglesProps {
  className?: string;
  triangleCount?: number;
  spawnRatio?: number;
  baseColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number; // Equivalent to lazer's Velocity multiplier
  thickness?: number; // Equivalent to lazer's Thickness
}

const BASE_VELOCITY = 50; // Matches osu!lazer TrianglesV2 base_velocity
const EQUILATERAL_RATIO = 0.866; // sqrt(3)/2

export function OsuLogoTriangles({
  className = "",
  triangleCount,
  spawnRatio = 1,
  baseColor = "#2ac965",
  minSize = 70,
  maxSize = 130,
  speed = 1,
  thickness = 0.02,
}: OsuLogoTrianglesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<TriangleParticle[]>([]);
  const animationRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const previousTimestampRef = useRef<number | null>(null);

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

  const nextGaussianSpeedMultiplier = () => {
    const stdDev = 0.16;
    const mean = 0.5;

    // Box-Muller transform (same distribution approach used in lazer TrianglesV2)
    const u1 = 1 - Math.random();
    const u2 = 1 - Math.random();
    const randStdNormal = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

    return Math.max(mean + stdDev * randStdNormal, 0.1);
  };

  const createTriangle = useCallback(
    (width: number, height: number, randomY: boolean): TriangleParticle => {
      const size = minSize + Math.random() * (maxSize - minSize);
      const maxOffsetNorm = height > 0 ? (size * EQUILATERAL_RATIO) / height : 0;
      const yNorm = randomY ? -maxOffsetNorm + Math.random() * (1 + maxOffsetNorm) : 1;

      return {
        xNorm: Math.random(),
        yNorm,
        size,
        speedMultiplier: nextGaussianSpeedMultiplier(),
        opacity: 0.15 + Math.random() * 0.2,
      };
    },
    [minSize, maxSize]
  );

  const drawTriangle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      triangle: TriangleParticle,
      width: number,
      height: number,
      rgb: { r: number; g: number; b: number }
    ) => {
      const x = triangle.xNorm * width;
      const y = triangle.yNorm * height;
      const h = triangle.size * EQUILATERAL_RATIO;

      const gradientFactor = Math.max(0.65, Math.min(1, 0.7 + triangle.yNorm * 0.35));
      const r = Math.floor(rgb.r * gradientFactor);
      const g = Math.floor(rgb.g * gradientFactor);
      const b = Math.floor(rgb.b * gradientFactor);

      // Fill the triangle for better visibility
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${triangle.opacity})`;

      // Upward-pointing equilateral triangle (matching osu!lazer TrianglesV2 orientation)
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - triangle.size / 2, y + h);
      ctx.lineTo(x + triangle.size / 2, y + h);
      ctx.closePath();
      ctx.fill();
    },
    [thickness]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = hexToRgb(baseColor);

    const computeAimCount = (width: number) =>
      triangleCount ?? Math.max(1, Math.round(width * 0.02 * spawnRatio));

    const refillTriangles = (width: number, height: number, randomY: boolean) => {
      const count = computeAimCount(width);
      trianglesRef.current = Array.from({ length: count }, () => createTriangle(width, height, randomY));
    };

    const handleResize = (fillRandomY: boolean) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Reset transform before applying DPR scaling to avoid cumulative scaling.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      dimensionsRef.current = { width: rect.width, height: rect.height };

      refillTriangles(rect.width, rect.height, fillRandomY);
    };

    handleResize(true);

    const onResize = () => handleResize(true);
    window.addEventListener("resize", onResize);

    const animate = (timestamp: number) => {
      const { width, height } = dimensionsRef.current;

      if (width <= 0 || height <= 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const deltaMs = previousTimestampRef.current == null ? 16 : timestamp - previousTimestampRef.current;
      previousTimestampRef.current = timestamp;

      const elapsedSeconds = deltaMs / 1000;
      const movedDistanceNorm = -(elapsedSeconds * speed * BASE_VELOCITY) / height;

      const targetCount = computeAimCount(width);

      if (trianglesRef.current.length < targetCount) {
        const missing = targetCount - trianglesRef.current.length;
        for (let i = 0; i < missing; i++) {
          trianglesRef.current.push(createTriangle(width, height, false));
        }
      } else if (trianglesRef.current.length > targetCount) {
        trianglesRef.current.length = targetCount;
      }

      for (let i = trianglesRef.current.length - 1; i >= 0; i--) {
        const triangle = trianglesRef.current[i];
        triangle.yNorm += Math.max(0.5, triangle.speedMultiplier) * movedDistanceNorm;

        const bottomY = triangle.yNorm * height + triangle.size * EQUILATERAL_RATIO;

        if (bottomY < 0) {
          trianglesRef.current[i] = createTriangle(width, height, false);
          continue;
        }

        drawTriangle(ctx, triangle, width, height, rgb);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      previousTimestampRef.current = null;
    };
  }, [triangleCount, spawnRatio, baseColor, createTriangle, drawTriangle, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
