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
    default: "delta - Community-driven osu!lazer fork",
    template: "%s | delta",
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
  authors: [{ name: "delta Community" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/osudelta.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/osudelta.png",
  },
  openGraph: {
    title: "delta - Community-driven osu!lazer fork",
    description:
      "Create maps with per-section rules, custom HP mechanics, forced mods, and more.",
    type: "website",
    images: [
      {
        url: "/osudelta.png",
        width: 512,
        height: 512,
        alt: "delta logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "delta",
    description:
      "Community-driven osu!lazer fork with section gimmicks and hitobject control.",
    images: ["/osudelta.png"],
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
