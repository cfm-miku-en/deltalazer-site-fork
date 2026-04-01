"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 text-[#666] hover:text-[#0d0d0d] dark:text-[#a1a1a1] dark:hover:text-white transition-colors rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-[#666] hover:text-[#0d0d0d] dark:text-[#a1a1a1] dark:hover:text-white transition-colors rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
