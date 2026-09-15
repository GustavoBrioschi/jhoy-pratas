import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundMusic from "@/components/brand/BackgroundMusic";

// Substituto editorial para "The Seasons" (não disponível nos assets
// enviados). Cormorant Garamond itálico tem a leveza serifada e o caráter
// editorial pedidos para "Joias com propósito". Self-hosted (next/font/local)
// para não depender de fetch a fonts.googleapis.com em runtime.
const cormorant = localFont({
  src: [
    {
      path: "./fonts/CormorantGaramond-Variable.ttf",
      style: "normal",
      weight: "300 700",
    },
    {
      path: "./fonts/CormorantGaramond-Italic-Variable.ttf",
      style: "italic",
      weight: "300 700",
    },
  ],
  variable: "--font-tagline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jhoy Prata — Joias com propósito",
  description: "Uma experiência narrativa de marca da Jhoy Prata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cormorant.variable}>
      <body>{children}<BackgroundMusic /></body>
    </html>
  );
}
