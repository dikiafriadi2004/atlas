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
  const [activeFilter, setActiveFilter] = useState<
    "all" | "patuh" | "belum-patuh" | "potensi"
  >("all");

  return (
    <>
      {/* Background: fixed z-0, semua layer pointer-events-none */}
      <GeospatialBackground />

      {/*
        Satu wrapper utama, tidak ada z-index kecuali yang perlu.
        Desktop: tinggi layar penuh, tidak scroll.
        Mobile: natural height, page scroll.
      */}
      <div className="relative flex flex-col lg:h-dvh lg:overflow-hidden">

        {/* Header */}
        <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

        {/* Judul + SSO */}
        <div className="flex flex-col items-center text-center px-4 pt-2 sm:pt-3 shrink-0">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-white via-cyan-200 to-sky-300 bg-clip-text text-transparent leading-none">
            GEO-ATLAS
          </h1>
          <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-[0.18em] uppercase text-cyan-100 mt-1 font-mono">
            GEOSPATIAL ACEH TENGAH ALL TAX INTEGRATED SYSTEM
          </p>
          <p className="hidden sm:block text-[10px] font-semibold text-amber-300 mt-0.5">
            Satu Data, Satu Peta, Satu Sistem, Satu Tujuan
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#0d2a4d] border border-cyan-400/50 cursor-pointer touch-manipulation"
            >
              <Lock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-300" />
              <span className="text-[10px] sm:text-[11px] font-bold font-mono text-cyan-200 uppercase tracking-wider">
                SINGLE SIGN-ON (SSO)
              </span>
            </button>
          </div>
        </div>

        {/* RadialNetwork: flex-1 di desktop, natural height di mobile */}
        <div className="lg:flex-1 lg:min-h-0 w-full">
          <RadialNetwork />
        </div>

        {/* Legenda peta */}
        <MapLegend activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Modal login */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}

      </div>
    </>
  );
}
