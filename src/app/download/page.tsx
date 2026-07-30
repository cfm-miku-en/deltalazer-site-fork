"use client";

import { motion } from "framer-motion";
import { Download, Shield, Monitor, Terminal } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { OsuLogoTriangles } from "@/components/triangles";
import { Suspense, useEffect, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

type ClientRelease = {
    version: string;
    date_str: string;

    // IMPORTANT:
    // note how linux comes before windows;
    // this is because we are a linux first family and we love linux.
    linux_download_url: string;
    windows_download_url: string;
};

export default function DownloadPage() {
    const [release, setRelease] = useState<ClientRelease | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/deltalazer/delta/releases/latest", {
            headers: {
                Accept: "application/vnd.github+json",
            },
        })
            .then((res) => res.json())
            .then(async (data) => {
                // IMPORTANT:
                // notice how linux comes first again, this is because we love linux.
                // --
                // @ts-expect-error: so believe it or not mr type checker i will NOT be typing the entire github api response.
                const linuxDownloadUrl = data.assets.find((asset) =>
                    asset.name.toLowerCase().startsWith("linux"),
                ).browser_download_url;
                // @ts-expect-error: ^
                const windowsDownloadUrl = data.assets.find((asset) =>
                    asset.name.toLowerCase().startsWith("windows"),
                ).browser_download_url;

                setRelease({
                    version: data.tag_name,
                    date_str: Intl.DateTimeFormat(navigator.language, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }).format(),

                    // IMPORTANT:
                    // notice how linux comes first for the third time, notice how much we love linux.
                    linux_download_url: linuxDownloadUrl,
                    windows_download_url: windowsDownloadUrl,
                });
            });
    }, []);

    return (
        <main className="flex-1">
            {/* Hero */}
            <section className="relative py-20 md:py-32 px-6 bg-[#f8f9fa] dark:bg-[#0d0d0d] overflow-hidden">
                <OsuLogoTriangles triangleCount={30} speed={0.25} />

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        Download <span className="text-[#b92e35]">delta</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-[#666] dark:text-[#a1a1a1] mb-4"
                    >
                        Latest version:{" "}
                        <span className="font-semibold text-[#b92e35]">
                            {release?.version ?? "..."}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-[#888]">
                            {release?.date_str ?? "Loading..."}
                        </span>
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex items-center justify-center gap-2 text-sm text-[#888] mb-12"
                    >
                        <Shield className="w-4 h-4" />
                        <span>
                            Debug builds connect to osu!dev server for safety
                        </span>
                    </motion.div>

                    {/* Download buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className={`flex flex-col sm:flex-row gap-4 justify-center transition-[filter] duration-500 ${release !== null ? "" : "pointer-events-none brightness-50"}`}
                    >
                        <DownloadButton
                            platform="Windows"
                            icon={Monitor}
                            href={release?.windows_download_url ?? "#"}
                        />
                        <DownloadButton
                            platform="Linux"
                            icon={Terminal}
                            href={release?.linux_download_url ?? "#"}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Installation Instructions */}
            <section className="py-16 md:py-24 px-6 bg-white dark:bg-[#0a0a0a]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        Installation
                    </h2>

                    <div className="space-y-8">
                        <InstallStep number={1} title="Download">
                            Download the appropriate ZIP file for your operating
                            system above.
                        </InstallStep>

                        <InstallStep number={2} title="Extract">
                            Extract the ZIP file to a folder of your choice. We
                            recommend a dedicated folder like{" "}
                            <code className="px-2 py-0.5 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded text-sm">
                                C:\Games\delta
                            </code>
                        </InstallStep>

                        <InstallStep number={3} title="Run">
                            <div className="space-y-2">
                                <p>
                                    <strong>Windows:</strong> Run{" "}
                                    <code className="px-2 py-0.5 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded text-sm">
                                        osu!.exe
                                    </code>
                                </p>
                                <p>
                                    <strong>Linux:</strong> Run{" "}
                                    <code className="px-2 py-0.5 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded text-sm">
                                        ./osu!
                                    </code>{" "}
                                    (may need to chmod +x first)
                                </p>
                            </div>
                        </InstallStep>

                        <InstallStep number={4} title="Register & Login">
                            Register an osu! dev account if you don't have one.
                            Debug builds connect to the osu!dev server.
                        </InstallStep>
                    </div>
                </div>
            </section>

            {/* Build from source */}
            <section className="py-16 md:py-24 px-6 bg-[#f8f9fa] dark:bg-[#0d0d0d]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                        Build from Source
                    </h2>
                    <p className="text-[#666] dark:text-[#a1a1a1] text-center mb-8">
                        Want to build it yourself? Clone the repository and
                        build with .NET 8.
                    </p>

                    <div className="bg-[#0d0d0d] dark:bg-[#161616] rounded-xl p-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-[#a1a1a1]">
                            <span className="text-[#888]">
                                # Clone the repository
                            </span>
                            {"\n"}
                            <span className="text-[#b92e35]">git</span> clone
                            https://github.com/deltalazer/delta.git{"\n"}
                            <span className="text-[#b92e35]">cd</span> delta
                            {"\n\n"}
                            <span className="text-[#888]">
                                # Build debug version (Windows)
                            </span>
                            {"\n"}
                            <span className="text-[#b92e35]">dotnet</span> build
                            osu.Desktop/osu.Desktop.csproj -c Debug{"\n\n"}
                            <span className="text-[#888]">
                                # Publish for distribution
                            </span>
                            {"\n"}
                            <span className="text-[#b92e35]">dotnet</span>{" "}
                            publish osu.Desktop/osu.Desktop.csproj -c Debug -r
                            win-x64 --self-contained false
                        </pre>
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="https://github.com/deltalazer/delta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#24292f] hover:bg-[#32383f] text-white rounded-lg font-medium transition-colors"
                        >
                            <GitHubLogoIcon className="w-5 h-5" />
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

function DownloadButton({
    platform,
    icon: Icon,
    href,
}: {
    platform: string;
    icon: typeof Monitor;
    href: string;
}) {
    return (
        <motion.a
            href={href}
            className="relative overflow-hidden flex items-center gap-4 px-8 py-5 bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] rounded-xl hover:border-[#b92e35] transition-all group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <OsuLogoTriangles
                triangleCount={10}
                minSize={8}
                maxSize={20}
                speed={0.15}
            />

            <Icon className="w-8 h-8 text-[#b92e35] relative z-10" />
            <div className="relative z-10 text-left">
                <div className="text-sm text-[#888]">Download for</div>
                <div className="font-bold text-lg text-[#0d0d0d] dark:text-white">
                    {platform}
                </div>
            </div>
            <Download className="w-5 h-5 ml-auto text-[#b92e35] relative z-10 group-hover:translate-y-0.5 transition-transform" />
        </motion.a>
    );
}

function InstallStep({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#b92e35]/10 text-[#b92e35] font-bold flex items-center justify-center">
                {number}
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 text-[#0d0d0d] dark:text-white">
                    {title}
                </h3>
                <div className="text-[#666] dark:text-[#a1a1a1]">
                    {children}
                </div>
            </div>
        </div>
    );
}
