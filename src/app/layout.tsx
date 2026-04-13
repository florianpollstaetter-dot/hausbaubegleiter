import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hausbaubegleiter – Dein KI-Bauberater",
    template: "%s | Hausbaubegleiter",
  },
  description:
    "Materialmengen, Kosten, Anleitungen – der KI-Bauberater für Hausbauer und Heimwerker. Foto hochladen, Frage stellen, loslegen.",
  keywords: [
    "Hausbau",
    "Heimwerker",
    "Bauberater",
    "Materialrechner",
    "Renovierung",
    "Kosten",
    "KI",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://hausbaubegleiter.de"
  ),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hausbaubegleiter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <CookieBanner />
      </body>
    </html>
  );
}
