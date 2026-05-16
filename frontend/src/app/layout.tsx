import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingActions from "@/components/FloatingActions";
import ScrollReveal from "@/components/ScrollReveal";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asr Holiday | Travholtour Tourism Agency - Antalya Tur ve Tatil Fırsatları",
  description: "Antalya'nın lider turizm acentası Travholtour ile hayalinizdeki tatile çıkın. Kapadokya, günlük turlar, transfer hizmetleri ve unutulmaz anılar için hemen rezervasyon yapın.",
  icons: {
    icon: '/ico.png',
    apple: '/ico.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className} suppressHydrationWarning>
        <ScrollReveal />
        <LanguageProvider>
          {children}
          <FloatingActions />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
