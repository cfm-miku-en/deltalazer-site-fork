"use client";

import { motion } from "framer-motion";
import { TrianglesBackground } from "./TrianglesBackground";
import { ReactNode } from "react";

interface TrianglesSectionProps {
  children: ReactNode;
  className?: string;
  triangleCount?: number;
  variant?: "default" | "dense" | "sparse";
  direction?: "up" | "down" | "left" | "right";
}

const variants = {
  default: { count: 35, minSize: 25, maxSize: 70 },
  dense: { count: 60, minSize: 15, maxSize: 50 },
  sparse: { count: 20, minSize: 40, maxSize: 100 },
};

export function TrianglesSection({
  children,
  className = "",
  triangleCount,
  variant = "default",
  direction = "up",
}: TrianglesSectionProps) {
  const config = variants[variant];
  const count = triangleCount ?? config.count;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <TrianglesBackground
        triangleCount={count}
        minSize={config.minSize}
        maxSize={config.maxSize}
        direction={direction}
        minSpeed={0.2}
        maxSpeed={0.8}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface TrianglesButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
}

export function TrianglesButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: TrianglesButtonProps) {
  const baseStyles =
    "relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300";
  const variantStyles =
    variant === "primary"
      ? "bg-[#1a1a1a] text-white hover:scale-105 border border-[#2a2a2a]"
      : "bg-transparent text-white hover:bg-[#1a1a1a] border border-[#2a2a2a]";

  const content = (
    <>
      <TrianglesBackground
        triangleCount={15}
        minSize={10}
        maxSize={25}
        minSpeed={0.3}
        maxSpeed={0.6}
        baseColor="#b92e35"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles} ${className} inline-flex items-center justify-center`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
