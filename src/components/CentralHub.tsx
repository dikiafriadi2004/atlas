"use client";

import React from "react";
import Image from "next/image";
import { Lock, Unlock } from "lucide-react";

interface CentralHubProps {
  onHubClick?: () => void;
  onHubEnter?: () => void;
  onHubLeave?: () => void;
  isExpanded: boolean;
  isLocked: boolean;
}

export default function CentralHub({
  onHubClick,
  onHubEnter,
  onHubLeave,
  isExpanded,
  isLocked,
}: CentralHubProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer decorative ring - responsif */}
      <div className="absolute w-[210px] h-[210px] sm:w-[300px] sm:h-[300px] lg:w-[330px] lg:h-[330px] rounded-full border border-cyan-400/30 animate-spin-slow pointer-events-none" />

      {/* Middle dashed ring - responsif */}
      <div className="absolute w-[185px] h-[185px] sm:w-[265px] sm:h-[265px] lg:w-[290px] lg:h-[290px] rounded-full border border-dashed border-cyan-300/40 animate-spin-reverse pointer-events-none" />

      {/* Radiant radial halo glow */}
      <div
        className={`absolute w-[165px] h-[165px] sm:w-[230px] sm:h-[230px] lg:w-[260px] lg:h-[260px] rounded-full transition-all duration-500 pointer-events-none ${
          isExpanded
            ? "bg-cyan-400/25 blur-2xl scale-110"
            : "bg-cyan-500/15 blur-xl"
        }`}
      />

      {/* Core circle button - responsif */}
      <button
        type="button"
        onClick={onHubClick}
        onMouseEnter={onHubEnter}
        onMouseLeave={onHubLeave}
        className={`group relative z-40 w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full flex flex-col items-center justify-center p-2 sm:p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden focus:outline-none bg-gradient-to-b from-[#0f3b6c]/90 via-[#0a2c52]/92 to-[#08203c]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
          isLocked
            ? "border-2 border-cyan-300 shadow-[0_0_40px_rgba(0,230,255,0.6)] ring-2 ring-cyan-300/50"
            : "border-2 border-cyan-400/70 hover:border-cyan-300 shadow-[0_0_25px_rgba(0,210,255,0.35)] hover:shadow-[0_0_35px_rgba(0,230,255,0.6)]"
        }`}
      >
        {/* Child container has pointer-events-none to prevent boundary glitch */}
        <div className="pointer-events-none flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-[88px] lg:h-[88px] mb-1 sm:mb-1.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-bpkk-emblem.png"
              alt="BPKK Logo"
              fill
              sizes="(max-width: 640px) 56px, 88px"
              priority
              className="object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            />
          </div>

          <div className="relative z-10 px-2">
            <p className="text-[9.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight group-hover:text-cyan-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              BADAN PENGELOLAAN KEUANGAN
            </p>
            <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-widest text-cyan-300 leading-tight mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              KABUPATEN ACEH TENGAH
            </p>
          </div>

          {/* Status badge: locked or hover prompt */}
          {isLocked ? (
            <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-cyan-900/90 border border-cyan-300/80 flex items-center gap-1 shadow-[0_0_12px_rgba(0,240,255,0.5)]">
              <Lock className="w-3 h-3 text-cyan-200" />
              <span className="text-[8.5px] font-mono font-bold text-cyan-100 uppercase tracking-wider">
                Terkunci
              </span>
            </div>
          ) : (
            <div className="mt-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              <Unlock className="w-2.5 h-2.5 text-cyan-300" />
              <span className="text-[8px] font-mono font-semibold text-cyan-200 uppercase tracking-tight">
                Klik kunci
              </span>
            </div>
          )}
        </div>

        {/* Locked pin indicator on top-right */}
        {isLocked && (
          <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.9)] pointer-events-none animate-pulse" />
        )}
      </button>
    </div>
  );
}
