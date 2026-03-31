import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1D3A",
};

export const metadata: Metadata = {
  title: {
    default: "Taormina Vibe | Senti il Ritmo di Taormina",
    template: "%s | Taormina Vibe",
  },
  description:
    "La guida digitale premium di Taormina. Scopri ristoranti, locali, spiagge nascoste e eventi esclusivi tramite QR code.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Taormina Vibe",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Taormina Vibe",
    description: "Senti il ritmo di Taormina. La guida premium per vivere l'essenza della Sicilia.",
    siteName: "Taormina Vibe",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="bg-sea-deep text-ceramic-white font-sans min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
