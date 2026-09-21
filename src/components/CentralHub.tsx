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
  size?: "sm" | "lg";
}

export default function CentralHub({
  onHubClick,
  onHubEnter,
  onHubLeave,
  isExpanded,
  isLocked,
  size = "lg",
}: CentralHubProps) {
  const isSm = size === "sm";

  // Ukuran button eksplisit — tidak ada scale CSS
  const btnPx = isSm ? 120 : 224;

  return (
    /*
      Wrapper diberi ukuran SAMA PERSIS dengan button.
      Ring dekoratif pakai pointer-events-none + overflow-visible pada parent.
      Ini memastikan hit area = ukuran button, bukan ukuran ring.
    */
    <div
      className="relative flex items-center justify-center"
      style={{ width: btnPx, height: btnPx }}
    >
      {/*
        Ring luar — wrapper luar untuk centering (translate),
        div dalam untuk animasi rotasi. Tidak boleh digabung:
        keyframes spin menganimasikan `transform` sehingga akan
        menimpa translate(-50%,-50%) dan menggeser ring di mobile.
      */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div
          className="animate-spin-slow rounded-full border border-cyan-400/30"
          style={{ width: isSm ? 160 : 330, height: isSm ? 160 : 330 }}
        />
      </div>
      {/* Ring tengah — pointer-events-none */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div
          className="animate-spin-reverse rounded-full border border-dashed border-cyan-300/40"
          style={{ width: isSm ? 140 : 290, height: isSm ? 140 : 290 }}
        />
      </div>
      {/* Halo glow — pointer-events-none */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full transition-all duration-500"
        style={{
          width:  isSm ? 125 : 260,
          height: isSm ? 125 : 260,
          top:  "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: isExpanded ? "rgba(34,211,238,0.2)" : "rgba(6,182,212,0.1)",
          filter: isExpanded ? "blur(18px)" : "blur(12px)",
        }}
      />

      {/* Button — ukuran eksplisit, TANPA backdrop-blur (menyebabkan compositing layer di mobile) */}
      <button
        type="button"
        onClick={onHubClick}
        onMouseEnter={onHubEnter}
        onMouseLeave={onHubLeave}
        style={{
          width:  btnPx,
          height: btnPx,
          WebkitTapHighlightColor: "transparent",
          flexShrink: 0,
        }}
        className={`
          relative z-10 rounded-full flex flex-col items-center justify-center
          cursor-pointer select-none touch-manipulation
          bg-gradient-to-b from-[#0f3b6c]/95 via-[#0a2c52]/95 to-[#08203c]/98
          transition-all duration-300
          focus:outline-none
          ${isLocked
            ? "border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,230,255,0.5)] ring-2 ring-cyan-300/40"
            : "border-2 border-cyan-400/60 hover:border-cyan-300"
          }
        `}
      >
        {/* Logo */}
        <div
          className="relative flex-shrink-0"
          style={{ width: isSm ? 38 : 80, height: isSm ? 38 : 80, pointerEvents: "none" }}
        >
          <Image
            src="/logo-bpkk-emblem.png"
            alt="BPKK Logo"
            fill
            sizes={isSm ? "38px" : "80px"}
            priority
            className="object-contain"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </div>

        {/* Teks — pointer-events none agar tidak intercept tap */}
        <div style={{ pointerEvents: "none" }} className="flex flex-col items-center px-1 mt-1">
          <p
            className="font-extrabold uppercase text-white leading-tight text-center"
            style={{ fontSize: isSm ? 7 : 10, letterSpacing: "0.05em" }}
          >
            BADAN PENGELOLAAN KEUANGAN
          </p>
          <p
            className="font-bold uppercase text-cyan-300 leading-tight text-center mt-0.5"
            style={{ fontSize: isSm ? 6 : 9, letterSpacing: "0.08em" }}
          >
            KABUPATEN ACEH TENGAH
          </p>

          {/* Badge */}
          <div
            className={`mt-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full border ${
              isLocked ? "bg-cyan-900/90 border-cyan-300/70" : "bg-cyan-950/70 border-cyan-400/30"
            }`}
          >
            {isLocked ? (
              <>
                <Lock style={{ width: isSm ? 8 : 11, height: isSm ? 8 : 11 }} className="text-cyan-200 flex-shrink-0" />
                <span className="font-mono font-bold text-cyan-100 uppercase" style={{ fontSize: isSm ? 6 : 8 }}>
                  Terkunci
                </span>
              </>
            ) : (
              <>
                <Unlock style={{ width: isSm ? 8 : 11, height: isSm ? 8 : 11 }} className="text-cyan-300 flex-shrink-0" />
                <span className="font-mono text-cyan-200 uppercase" style={{ fontSize: isSm ? 6 : 8 }}>
                  {isSm ? "Tap" : "Klik buka"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Dot locked */}
        {isLocked && (
          <div
            aria-hidden="true"
            className="absolute top-2 right-2 rounded-full bg-cyan-300 animate-pulse"
            style={{ width: 8, height: 8, pointerEvents: "none" }}
          />
        )}
      </button>
    </div>
  );
}
