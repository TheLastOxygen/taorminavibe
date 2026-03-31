import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taormina Vibe | The Gold Guide to Taormina",
    template: "%s | Taormina Vibe",
  },
  description: "Experience the ultimate luxury guide to Taormina. Discover exclusive dining, hidden gems, and premium local activities.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Taormina Vibe",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html
      lang={params.lang}
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="bg-black text-white font-sans min-h-full">
        {children}
      </body>
    </html>
  );
}
