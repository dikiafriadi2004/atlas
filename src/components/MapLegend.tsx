"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MapLegendProps {
  activeFilter: "all" | "patuh" | "belum-patuh" | "potensi";
  setActiveFilter: (
    filter: "all" | "patuh" | "belum-patuh" | "potensi"
  ) => void;
}

export default function MapLegend({ activeFilter, setActiveFilter }: MapLegendProps) {
  // Default collapsed — tidak menghalangi konten, terutama di mobile
  const [isCollapsed, setIsCollapsed] = useState(true);

  const legendItems = [
    {
      id: "patuh",
      label: "Wajib Pajak Patuh",
      color: "bg-emerald-500",
      glow: "shadow-[0_0_10px_#10b981]",
      border: "border-emerald-400",
    },
    {
      id: "belum-patuh",
      label: "Wajib Pajak Belum Patuh",
      color: "bg-red-500",
      glow: "shadow-[0_0_10px_#ef4444]",
      border: "border-red-400",
    },
    {
      id: "potensi",
      label: "Potensi Objek Pajak Belum Didata",
      color: "bg-slate-700/60",
      glow: "shadow-[0_0_6px_#94a3b8]",
      border: "border-dashed border-slate-300",
    },
  ];

  return (
    /* fixed di pojok kiri bawah — tidak stretch full-width di mobile */
    <div className="fixed bottom-4 left-3 z-40 w-auto max-w-[260px] sm:max-w-[310px] select-none pointer-events-auto">
      <div className="rounded-2xl bg-[#0b2645]/90 border border-cyan-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)] overflow-hidden">

        {/* Header — selalu terlihat, klik untuk toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-3 py-2 touch-manipulation"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping shrink-0" />
            <span className="text-[11px] font-extrabold font-mono tracking-wider text-cyan-200 uppercase whitespace-nowrap">
              KETERANGAN PETA
            </span>
          </div>
          {isCollapsed
            ? <ChevronUp className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            : <ChevronDown className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          }
        </button>

        {/* Body — muncul saat expand */}
        {!isCollapsed && (
          <div className="px-2.5 pb-2.5 space-y-1.5 border-t border-cyan-400/20 pt-2">
            {legendItems.map((item) => {
              const selected = activeFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveFilter(
                      selected
                        ? "all"
                        : (item.id as "patuh" | "belum-patuh" | "potensi")
                    )
                  }
                  className={`w-full flex items-center gap-2.5 p-1.5 rounded-lg border text-left transition-all touch-manipulation ${
                    selected
                      ? "bg-cyan-900/80 border-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                      : "bg-[#0d2a4d]/60 border-cyan-500/20 hover:border-cyan-400/50"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-sm shrink-0 ${item.color} ${item.border} ${item.glow}`}
                  />
                  <span className="text-[11px] font-semibold text-white leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {activeFilter !== "all" && (
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="w-full mt-1 py-1 text-[10px] font-bold text-cyan-200 bg-cyan-900/60 rounded border border-cyan-400/40 text-center touch-manipulation"
              >
                Tampilkan Semua Lapisan
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
