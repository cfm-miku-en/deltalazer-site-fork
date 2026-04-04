"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Documentation" },
  { href: "/faq", label: "FAQ" },
  { href: "/changelog", label: "Changelog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-white/80 backdrop-blur-md dark:border-[#2a2a2a] dark:bg-[#0d0d0d]/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/osudelta.png" 
            alt="delta logo" 
            width={40} 
            height={40}
            className="object-contain"
            priority
            unoptimized
          />
          <span className="text-xl font-black tracking-tight text-[#b92e35]">
            delta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== "/" && pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive
                    ? "text-[#b92e35]"
                    : "text-[#666] hover:text-[#0d0d0d] dark:text-[#a1a1a1] dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-[#b92e35]/10 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/deltalazer/delta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#666] hover:text-[#0d0d0d] dark:text-[#a1a1a1] dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://discord.gg/dfPwhRtGVZ"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#666] hover:text-[#0d0d0d] dark:text-[#a1a1a1] dark:hover:text-white transition-colors"
            aria-label="Discord"
          >
            <DiscordLogoIcon className="w-5 h-5" />
          </a>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#b92e35] text-white font-medium text-sm rounded-lg hover:bg-[#9f282f] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#666]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#0d0d0d]"
        >
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-[#b92e35]/10 text-[#b92e35]"
                      : "text-[#666] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 pt-4 border-t border-[#e5e5e5] dark:border-[#2a2a2a]">
              <ThemeToggle />
              <a
                href="https://github.com/deltalazer/delta"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#666]"
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/dfPwhRtGVZ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#666]"
              >
                <DiscordLogoIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
