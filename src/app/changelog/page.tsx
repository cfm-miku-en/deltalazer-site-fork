"use client";

import { motion } from "framer-motion";
import {
    Tag,
    Calendar,
    Download,
    Plus,
    Wrench,
    Zap,
    Shield,
    CheckCircle2,
    ExternalLink,
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

// Changelog data from GitHub releases
const releases = [
    {
        version: "v2.2.1",
        date: "March 31, 2026",
        latest: true,
        changes: [
            { type: "feature", text: "Added force traceable mod in fun mods" },
        ],
        downloads: {
            windows:
                "https://github.com/deltalazer/delta/releases/download/v2.2.1/windows-release-v2.zip",
            linux: "https://github.com/deltalazer/delta/releases/download/v2.2.1/linux-release-v2.zip",
        },
    },
    {
        version: "v2.2",
        date: "March 30, 2026",
        changes: [
            { type: "fix", text: "Fixed slider SV shift-drag" },
            {
                type: "fix",
                text: "Fixed high SV maps getting capped at around 10x in behavior",
            },
            {
                type: "fix",
                text: "Fixed gimmick settings not being removed when deleting objects",
            },
            {
                type: "fix",
                text: "Fixed duplicate gimmick lines being added for the same object",
            },
            {
                type: "fix",
                text: "Fixed gimmick settings breaking after reopening maps",
            },
            {
                type: "improvement",
                text: "Gimmick settings now stay linked to the correct object more reliably",
            },
        ],
        downloads: {
            windows:
                "https://github.com/deltalazer/delta/releases/download/v2.2/windows-release-v2.zip",
            linux: "https://github.com/deltalazer/delta/releases/download/v2.2/linux-release-v2.zip",
        },
    },
    {
        version: "v2.1",
        date: "March 28, 2026",
        changes: [
            {
                type: "fix",
                text: "Difficulty override unsafe mode now works properly",
            },
            {
                type: "feature",
                text: "Added stack leniency override (section + hitobject gimmicks)",
            },
            {
                type: "feature",
                text: "Added tick rate override (section + hitobject gimmicks)",
            },
            {
                type: "improvement",
                text: "Extended 10x SV cap to 1000x in editor (hardcapped to avoid crashes)",
            },
            {
                type: "improvement",
                text: "All values now auto-fill from map defaults if unset",
            },
            {
                type: "improvement",
                text: "Section and hitobject difficulty override controls now use sliders for cleaner UI",
            },
            {
                type: "improvement",
                text: "Hitobject gimmicks now follow the object itself, not the time it was set at",
            },
            {
                type: "fix",
                text: "Fixed a crash related to slider/text commit while controls were disabled",
            },
            {
                type: "improvement",
                text: "Raised internal SV limits so higher SV values are kept",
            },
        ],
        downloads: {
            windows:
                "https://github.com/deltalazer/delta/releases/download/v2.1/windows-release-v2.zip",
            linux: "https://github.com/deltalazer/delta/releases/download/v2.1/linux-release-v2.zip",
        },
    },
    {
        version: "v2.0.1",
        date: "March 27, 2026",
        changes: [{ type: "fix", text: "Bug fix on textbox checks" }],
        downloads: {
            windows:
                "https://github.com/deltalazer/delta/releases/download/v2.0.1/windows-release-v2.zip",
            linux: "https://github.com/deltalazer/delta/releases/download/v2.0.1/linux-release-v2.zip",
        },
    },
    {
        version: "v2.0",
        date: "March 26, 2026",
        major: true,
        changes: [
            // Additions
            {
                type: "feature",
                text: "Force fun mods (includes barrel roll, etc)",
            },
            {
                type: "feature",
                text: "PER-OBJECT ATTRIBUTES - apply gimmicks to individual hitobjects!",
            },
            { type: "feature", text: "Set HP cap and HP starting point" },
            {
                type: "feature",
                text: "Gradual force FL (gradual FL fade in, gradual FL shrink to radius, and gradual FL end time)",
            },
            {
                type: "feature",
                text: "Independent difficulty override gradual start and end point (AR, CS, OD can start/end at different points in one section)",
            },
            // Fixes
            {
                type: "fix",
                text: "Fixed whole mapset apply not working (now copies section gimmicks to other difficulties correctly)",
            },
            {
                type: "fix",
                text: "Fixed some crash-prone cases with bad/huge values",
            },
            { type: "improvement", text: "Improved parser safety" },
            // Performance
            {
                type: "performance",
                text: "Reduced editor lag (due to frequent gimmick section container updates)",
            },
            {
                type: "improvement",
                text: "Improved section insertion logic (less broken overlaps/timing weirdness)",
            },
            {
                type: "improvement",
                text: "Improved health/count gimmick edge-case handling (especially slider-related behavior)",
            },
            // Safety
            {
                type: "safety",
                text: "Added automatic min/maxing values for customizable gimmick values",
            },
            {
                type: "safety",
                text: "Values out of range now get pulled back to safe limits instead of blowing up",
            },
            // Unsafe option
            {
                type: "feature",
                text: 'Added "allow values past limits (unsafe)" checkbox',
            },
            {
                type: "safety",
                text: "Shows warning toast when unsafe mode is enabled",
            },
            // Flashlight
            { type: "feature", text: "Added customizable FL radius" },
            {
                type: "feature",
                text: "Added section-based gradual FL controls",
            },
            {
                type: "feature",
                text: "Added gradual shrink to radius and gradual fade-in to FL",
            },
            // Editor
            {
                type: "improvement",
                text: "Better textbox handling for value entry/confirmation",
            },
            {
                type: "feature",
                text: 'Discord Rich Presence shows "delta" now',
            },
        ],
        downloads: {
            windows:
                "https://github.com/deltalazer/delta/releases/download/v2.0/windows-release-v2.zip",
            linux: "https://github.com/deltalazer/delta/releases/download/v2.0/linux-release-v2.zip",
        },
    },
];

const changeTypeConfig = {
    feature: {
        icon: Plus,
        label: "New",
        color: "text-[#b92e35] bg-[#b92e35]/10",
    },
    fix: {
        icon: Wrench,
        label: "Fix",
        color: "text-orange-500 bg-orange-500/10",
    },
    improvement: {
        icon: Zap,
        label: "Improved",
        color: "text-blue-500 bg-blue-500/10",
    },
    performance: {
        icon: Zap,
        label: "Performance",
        color: "text-purple-500 bg-purple-500/10",
    },
    safety: {
        icon: Shield,
        label: "Safety",
        color: "text-yellow-500 bg-yellow-500/10",
    },
};

export default function ChangelogPage() {
    return (
        <main className="flex-1 py-16 md:py-24 px-6 bg-white dark:bg-[#0a0a0a]">
            <motion.div className="border-amber-300 bg-amber-300/20 max-w-4xl mx-auto border box-content p-6 mb-8 rounded-xl">
                <span>
                    <span className="font-bold">hiya~!</span> this page doesn't
                    contain the latest changelog for deltalazer anymore, please
                    consider reading our{" "}
                    <a
                        className="text-[#b92e35] underline font-bold"
                        href="https://github.com/deltalazer/delta/releases"
                    >
                        release notes
                    </a>{" "}
                    on github instead!
                </span>
            </motion.div>

            <motion.div
                className="max-w-4xl mx-auto opacity-50"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                {/* Header */}
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-[#b92e35]">Changelog</span>
                    </h1>
                    <p className="text-[#666] dark:text-[#a1a1a1] max-w-2xl mx-auto">
                        Track all updates, new features, and bug fixes for
                        delta.
                    </p>
                    <a
                        href="https://github.com/deltalazer/delta/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-[#888] hover:text-[#b92e35] transition-colors"
                    >
                        <GitHubLogoIcon className="w-4 h-4" />
                        View all releases on GitHub
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#e5e5e5] dark:bg-[#2a2a2a] hidden md:block" />

                    {/* Releases */}
                    <div className="space-y-12">
                        {releases.map((release, index) => (
                            <motion.div
                                key={release.version}
                                variants={fadeInUp}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-0 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-[#e5e5e5] dark:border-[#2a2a2a]">
                                    {release.latest ? (
                                        <CheckCircle2 className="w-4 h-4 text-[#b92e35]" />
                                    ) : (
                                        <Tag className="w-4 h-4 text-[#888]" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="md:ml-16">
                                    <div
                                        className={`rounded-xl border ${
                                            release.latest
                                                ? "border-[#b92e35]/30 bg-[#b92e35]/5"
                                                : release.major
                                                  ? "border-purple-500/30 bg-purple-500/5"
                                                  : "border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#f8f9fa] dark:bg-[#161616]"
                                        } p-6`}
                                    >
                                        {/* Header */}
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <h2 className="text-xl font-bold text-[#0d0d0d] dark:text-white">
                                                {release.version}
                                            </h2>
                                            {release.latest && (
                                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#b92e35] text-white">
                                                    Latest
                                                </span>
                                            )}
                                            {release.major && (
                                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-500 text-white">
                                                    Major Update
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 text-sm text-[#888]">
                                                <Calendar className="w-3 h-3" />
                                                {release.date}
                                            </span>
                                        </div>

                                        {/* Changes */}
                                        <ul className="space-y-2 mb-6">
                                            {release.changes.map(
                                                (change, changeIndex) => {
                                                    const config =
                                                        changeTypeConfig[
                                                            change.type as keyof typeof changeTypeConfig
                                                        ];
                                                    const Icon = config.icon;
                                                    return (
                                                        <li
                                                            key={changeIndex}
                                                            className="flex items-start gap-3"
                                                        >
                                                            <span
                                                                className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.color}`}
                                                            >
                                                                <Icon className="w-3 h-3" />
                                                                {config.label}
                                                            </span>
                                                            <span className="text-[#666] dark:text-[#a1a1a1] text-sm flex-1">
                                                                {change.text}
                                                            </span>
                                                        </li>
                                                    );
                                                },
                                            )}
                                        </ul>

                                        {/* Download buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href={release.downloads.windows}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#0d0d0d] dark:bg-white text-white dark:text-[#0d0d0d] hover:opacity-80 transition-opacity"
                                            >
                                                <Download className="w-4 h-4" />
                                                Windows
                                            </a>
                                            <a
                                                href={release.downloads.linux}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[#e5e5e5] dark:border-[#2a2a2a] hover:border-[#b92e35] transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Linux
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <motion.div variants={fadeInUp} className="mt-16 text-center">
                    <p className="text-[#888] text-sm">
                        Want to contribute or report issues?{" "}
                        <a
                            href="https://github.com/deltalazer/delta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#b92e35] hover:underline"
                        >
                            Visit the GitHub repository
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://discord.gg/dfPwhRtGVZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#b92e35] hover:underline"
                        >
                            join our Discord
                        </a>
                        .
                    </p>
                </motion.div>
            </motion.div>
        </main>
    );
}
