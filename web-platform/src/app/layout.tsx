import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterErnc from "./FooterErnc";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radiologean - Radyoloji Destek Sistemi",
  description: "Adrenal bez hesaplamaları, PI-RADS ve BI-RADS kategorizasyonları için pratik destek araçları",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FooterErnc />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Montserrat:wght@700&display=swap" rel="stylesheet" />
      </body>
    </html>
  );
}
