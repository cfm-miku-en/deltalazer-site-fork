import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "osu!(v2) - Community-driven osu!lazer fork",
    template: "%s | osu!(v2)",
  },
  description:
    "osu!lazer fork with section gimmicks and hitobject control. Create maps with per-section rules, custom HP mechanics, forced mods, and more.",
  keywords: [
    "osu",
    "osu!lazer",
    "mapping",
    "rhythm game",
    "section gimmicks",
    "beatmap",
  ],
  authors: [{ name: "osu!(v2) Community" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/osuv2-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/osuv2-logo.png",
  },
  openGraph: {
    title: "osu!(v2) - Community-driven osu!lazer fork",
    description:
      "Create maps with per-section rules, custom HP mechanics, forced mods, and more.",
    type: "website",
    images: [
      {
        url: "/osuv2-logo.png",
        width: 512,
        height: 512,
        alt: "osu!(v2) logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "osu!(v2)",
    description:
      "Community-driven osu!lazer fork with section gimmicks and hitobject control.",
    images: ["/osuv2-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
