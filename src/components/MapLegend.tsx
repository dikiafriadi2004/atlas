"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MapLegendProps {
  activeFilter: "all" | "patuh" | "belum-patuh" | "potensi";
  setActiveFilter: (filter: "all" | "patuh" | "belum-patuh" | "potensi") => void;
}

export default function MapLegend({
  activeFilter,
  setActiveFilter
}: MapLegendProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const legendItems = [
    {
      id: "patuh",
      label: "Wajib Pajak Patuh",
      color: "bg-emerald-500",
      glowColor: "shadow-[0_0_10px_#10b981]",
      border: "border-emerald-400",
    },
    {
      id: "belum-patuh",
      label: "Wajib Pajak Belum Patuh",
      color: "bg-red-500",
      glowColor: "shadow-[0_0_10px_#ef4444]",
      border: "border-red-400",
    },
    {
      id: "potensi",
      label: "Potensi Objek Pajak Belum Didata",
      color: "bg-slate-700/60",
      glowColor: "shadow-[0_0_6px_#94a3b8]",
      border: "border-dashed border-slate-300",
    }
  ];

  return (
    <div className="fixed bottom-14 sm:bottom-16 left-2 right-2 sm:left-6 sm:right-auto z-20 sm:max-w-[310px] select-none">
      <div className="glass-panel-glow rounded-2xl bg-[#0b2645]/90 border border-cyan-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)] p-2.5 sm:p-3.5 transition-all">
        {/* Header */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between cursor-pointer pb-1.5 border-b border-cyan-400/30"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <span className="text-[11px] font-extrabold font-mono tracking-wider text-cyan-200 uppercase">
              KETERANGAN PETA
            </span>
          </div>
          <button className="text-cyan-300 hover:text-white">
            {isCollapsed ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div className="pt-2 space-y-2 text-xs">
            <div className="space-y-1.5">
              {legendItems.map((item) => {
                const isSelected = activeFilter === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFilter(isSelected ? "all" : (item.id as "patuh" | "belum-patuh" | "potensi"))}
                    className={`w-full flex items-center p-1.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "bg-cyan-900/80 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                        : "bg-[#0d2a4d]/60 border-cyan-500/25 hover:border-cyan-400/60 hover:bg-[#11355e]/70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-sm ${item.color} ${item.border} ${item.glowColor} flex-shrink-0`}
                      />
                      <span className="text-[11px] font-semibold text-white">
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reset Filter Button */}
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="w-full mt-1 py-1 text-[10px] font-bold text-cyan-200 hover:text-white bg-cyan-900/60 rounded border border-cyan-400/40 text-center transition-colors shadow-[0_0_10px_rgba(0,200,255,0.2)]"
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
