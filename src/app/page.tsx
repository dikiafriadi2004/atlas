"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import RadialNetwork from "@/components/RadialNetwork";
import AuthModal from "@/components/AuthModal";
import MapLegend from "@/components/MapLegend";
import GeospatialBackground from "@/components/GeospatialBackground";
import { Lock } from "lucide-react";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "patuh" | "belum-patuh" | "potensi">("all");

  return (
    <main className="relative h-dvh overflow-hidden flex flex-col">
      {/* Background */}
      <GeospatialBackground />

      {/* Header */}
      <Header
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content - flex-1, no page scroll */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-3 pb-1 px-3 sm:px-4 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Title Block - compact agar muat 1 layar */}
        <div className="text-center flex flex-col items-center shrink-0">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-white via-cyan-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(0,210,255,0.6)] leading-none">
            GEO-ATLAS
          </h1>

          <p className="text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.22em] uppercase text-cyan-100 mt-1 font-mono drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            GEOSPATIAL ACEH TENGAH ALL TAX INTEGRATED SYSTEM
          </p>

          <p className="hidden sm:block text-[11px] sm:text-xs font-semibold tracking-wide text-amber-300 mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            Satu Data, Satu Peta, Satu Sistem, Satu Tujuan
          </p>

          {/* SSO Pill */}
          <div className="mt-1.5 sm:mt-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#0d2a4d]/85 backdrop-blur-md border border-cyan-400/50 hover:border-cyan-300 transition-all duration-300 shadow-[0_0_16px_rgba(0,180,255,0.25)] hover:shadow-[0_0_24px_rgba(0,220,255,0.5)] cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-[10px] sm:text-[11px] font-bold font-mono tracking-wider text-cyan-200 uppercase">
                SINGLE SIGN-ON (SSO)
              </span>
            </button>
          </div>
        </div>

        {/* Radial Network Graph - klik langsung membuka link, tanpa modal */}
        <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
          <RadialNetwork />
        </div>
      </div>

      {/* Map Legend */}
      <MapLegend
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Auth Modal (Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </main>
  );
}
