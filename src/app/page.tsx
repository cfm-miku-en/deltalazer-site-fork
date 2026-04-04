"use client";

import { motion } from "framer-motion";
import {
  Download,
  BookOpen,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
import { OsuLogoTriangles } from "@/components/triangles";
import Link from "next/link";
import Image from "next/image";

// Feature data
const features = [
  {
    id: "section-gimmicks",
    title: "Section Gimmicks",
    description:
      "Set custom gameplay rules for each section of your map. Control HP behavior, judgment limits, forced mods, and more. Each section can have completely different rules.",
    color: "#b92e35",
    media: "/features/section-gimmicks.gif",
  },
  {
    id: "hp-gimmicks",
    title: "HP Gimmicks",
    description:
      "Take control of health mechanics. Set custom HP values for each judgment, or use Reverse HP mode where inaccurate hits can heal and perfects drain.",
    color: "#ef4444",
    media: "/features/hp-gimmicks.gif",
  },
  {
    id: "count-limits",
    title: "Count Limits",
    description:
      "Limit how many 100s, 50s, or even 300s a player can get per section. Challenge and push players to their limits.",
    color: "#f59e0b",
    media: "/features/count-limits.gif",
  },
  {
    id: "forced-mods",
    title: "Forced Mods",
    description:
      "Force specific mods for individual sections. Create maps where HD activates during choruses, or HR for the drop.",
    color: "#8b5cf6",
    media: "/features/forced-mods.gif",
  },
  {
    id: "difficulty-overrides",
    title: "Difficulty Overrides",
    description:
      "Override approach rate, overall difficulty, and circle size on a per-section or per-hitobject basis.",
    color: "#06b6d4",
    media: "/features/difficulty-overrides.gif",
  },
  {
    id: "offset-penalty",
    title: "Great Offset Penalty",
    description:
      "Punish imprecise 300s, hitting within the 300 window but outside your custom threshold costs HP.",
    color: "#ec4899",
    media: "/features/offset-penalty.gif",
  },
  {
    id: "uncapped-sv",
    title: "Uncapped SV",
    description:
      "10x legacy SV cap is removed, allowing far more extreme SV control for advanced mapping.",
    color: "#f97316",
    media: "/features/uncapped-sv.gif",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 bg-[#f8f9fa] dark:bg-[#0d0d0d] overflow-hidden">
        <Image
          src="/hero/coolvid.gif"
          alt="delta hero background"
          fill
          priority
          unoptimized
          className="object-cover opacity-55 dark:opacity-45"
        />
        <div className="absolute inset-0 bg-white/50 dark:bg-black/45" />

        <OsuLogoTriangles
          triangleCount={50}
          minSize={20}
          maxSize={80}
          speed={0.3}
        />

        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Logo */}
          <motion.div 
            variants={fadeInUp}
            className="mb-8 flex justify-center"
          >
            <Image 
              src="/osudelta.png" 
              alt="delta logo" 
              width={120} 
              height={120}
              className="object-contain drop-shadow-lg"
              priority
            />
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-[#b92e35]"
          >
            deltalazer
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-[#666] dark:text-[#a1a1a1] mb-4 font-light"
          >
            osu!lazer fork with{" "}
            <span className="text-[#b92e35] font-medium">section gimmicks</span> and{" "}
            <span className="text-[#b92e35] font-medium">hitobject control</span>
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-[#888] dark:text-[#666] mb-10 max-w-2xl mx-auto"
          >
            Create maps with per-section rules, custom HP mechanics, forced
            mods, difficulty overrides, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#b92e35] text-white font-semibold text-lg rounded-xl hover:bg-[#9f282f] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1a1a1a] text-[#0d0d0d] dark:text-white font-semibold text-lg rounded-xl border border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-[#b92e35] transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Get Started
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-6 justify-center mt-8"
          >
            <a
              href="https://github.com/deltalazer/delta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#888] hover:text-[#b92e35] transition-colors"
            >
              <GitHubLogoIcon className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://discord.gg/dfPwhRtGVZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#888] hover:text-[#b92e35] transition-colors"
            >
              <DiscordLogoIcon className="w-5 h-5" />
              <span className="text-sm">Discord</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-[#b92e35]/50" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 md:py-32 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Powerful <span className="text-[#b92e35]">Features</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#666] dark:text-[#a1a1a1] text-lg max-w-2xl mx-auto"
            >
              Everything you need to create unique, engaging maps with gameplay
              mechanics that were never possible before.
            </motion.p>
          </motion.div>

          {/* Feature cards */}
          <div className="space-y-24 md:space-y-32">
            {features.map((feature, index) => (
              <FeatureSection
                key={feature.id}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-20 md:py-24 px-6 bg-[#f8f9fa] dark:bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the <span className="text-[#b92e35]">Community</span>
          </h2>

          <p className="text-[#666] dark:text-[#a1a1a1] mb-8 max-w-xl mx-auto">
            Share your creations, get help, and connect with other mappers
            pushing the boundaries of osu! mapping.
          </p>

          <a
            href="https://discord.gg/dfPwhRtGVZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-semibold transition-colors"
          >
            <DiscordLogoIcon className="w-5 h-5" />
            Join Discord Server
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] py-12 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/osudelta.png" 
              alt="delta logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold text-[#b92e35]">delta</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/deltalazer/delta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#0d0d0d] dark:hover:text-white transition-colors"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/dfPwhRtGVZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#0d0d0d] dark:hover:text-white transition-colors"
            >
              <DiscordLogoIcon className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-[#888]">
            Same license as upstream osu!lazer
          </p>
        </div>
      </footer>
    </main>
  );
}

// Feature Section Component
function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={feature.id}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={stagger}
    >
      {/* Content */}
      <div className="flex-1 space-y-5">
        <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0d0d0d] dark:text-white">
          {feature.title}
        </motion.h3>

        <motion.p
          variants={fadeInUp}
          className="text-[#666] dark:text-[#a1a1a1] text-lg leading-relaxed"
        >
          {feature.description}
        </motion.p>
      </div>

      {/* Feature GIF */}
      <motion.div variants={fadeInUp} className="flex-1 w-full">
        <div
          className="relative aspect-video rounded-2xl overflow-hidden border border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#f5f5f5] dark:bg-[#161616]"
        >
          <Image
            src={feature.media}
            alt={`${feature.title} showcase`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
