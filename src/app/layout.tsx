import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO-ATLAS | BPKK Kabupaten Aceh Tengah",
  description: "Geospatial Aceh Tengah All Tax Integrated System",
  icons: { icon: "/logo-bpkk-emblem.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, background: "#081d38", color: "#f8fafc" }}>
        {children}
      </body>
    </html>
  );
}
