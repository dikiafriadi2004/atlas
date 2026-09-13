import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEO-ATLAS | BPKK Kabupaten Aceh Tengah",
  description: "Geospatial Aceh Tengah All Tax Integrated System - Single Sign-On (SSO) Portal Terpadu Pajak Daerah dan Pertanahan",
  keywords: ["GEO-ATLAS", "BPKK Aceh Tengah", "Pajak Aceh Tengah", "Takengon", "WebGIS Pajak", "SSO BPKK"],
  icons: {
    icon: "/logo-bpkk-emblem.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
