"use client";

import React, { useState, useRef, useEffect } from "react";
import { DASHBOARD_NODES, DashboardNode } from "@/data/dashboards";
import CentralHub from "./CentralHub";
import {
  MonitorCheck,
  CloudLightning,
  UserCheck,
  FileCheck2,
  ShieldAlert,
  MapPinned,
  BarChart3,
  ExternalLink,
} from "lucide-react";

const renderIcon = (
  iconName: string,
  className = "w-9 h-9 text-cyan-200 drop-shadow-[0_0_8px_rgba(0,230,255,0.7)]"
) => {
  switch (iconName) {
    case "MonitorCheck":   return <MonitorCheck className={className} />;
    case "CloudLightning": return <CloudLightning className={className} />;
    case "UserCheck":      return <UserCheck className={className} />;
    case "FileCheck2":     return <FileCheck2 className={className} />;
    case "ShieldAlert":    return <ShieldAlert className={className} />;
    case "MapPinned":      return <MapPinned className={className} />;
    case "BarChart3":      return <BarChart3 className={className} />;
    default:               return <MonitorCheck className={className} />;
  }
};

// Lebar & tinggi "kanvas" desain asli node (dalam px, sebelum skala)
// Node paling jauh: x=±360, y=-175..+265, ditambah radius node ~120px + label ~60px
const CANVAS_W = 960;  // 360*2 + 240 (node width + label)
const CANVAS_H = 700;  // 265 + 175 + 260 (node height + label)

// Posisi relatif dari PUSAT kanvas
const NODE_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: -285, y: -175 },
  2: { x: -360, y: 30   },
  3: { x: -245, y: 230  },
  4: { x: 285,  y: -175 },
  5: { x: 360,  y: 30   },
  6: { x: 245,  y: 230  },
  7: { x: 0,    y: 265  },
};

export default function RadialNetwork() {
  const [isHovering,    setIsHovering]    = useState(false);
  const [isLocked,      setIsLocked]      = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  // Skala dihitung otomatis dari ukuran container
  const [autoScale, setAutoScale] = useState(0); // 0 = belum dihitung, sembunyikan canvas dulu

  const hoverTimeoutRef  = useRef<NodeJS.Timeout | null>(null);
  const desktopWrapRef   = useRef<HTMLDivElement>(null);

  const isExpanded = isHovering || isLocked;

  // ── Auto-scale: ukur container, sesuaikan skala agar kanvas muat ──
  useEffect(() => {
    const el = desktopWrapRef.current;
    if (!el) return;

    const calc = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      // Sisakan sedikit padding (0.92) agar tidak mentok tepian
      const scaleW = (width  / CANVAS_W) * 0.92;
      const scaleH = (height / CANVAS_H) * 0.92;
      setAutoScale(Math.min(scaleW, scaleH, 1)); // tidak boleh lebih dari 1×
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Hover handlers ──
  const clearHover = () => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
  };
  const handleCenterEnter = () => { clearHover(); setIsHovering(true); };
  const handleCenterLeave = () => { clearHover(); hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 300); };
  const handleNodeEnter   = (id: number) => { clearHover(); setIsHovering(true); setHoveredNodeId(id); };
  const handleNodeLeave   = () => { setHoveredNodeId(null); clearHover(); hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 300); };

  const handleHubClick = () => {
    clearHover();
    // Jangan panggil setter di dalam updater setter lain (impure, bermasalah di StrictMode)
    if (isLocked) setIsHovering(false);
    setIsLocked(!isLocked);
  };

  const handleNodeClick = (node: DashboardNode) => {
    if (!node.url) return;
    window.open(node.url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }, []);

  return (
    <div className="w-full h-full flex flex-col">

      {/* ════════════════════════════════════════
          DESKTOP (lg+)
          Container mengisi flex-1, overflow hidden.
          Kanvas di-scale agar selalu muat di dalam container.
      ════════════════════════════════════════ */}
      <div
        ref={desktopWrapRef}
        className="hidden lg:flex flex-1 items-center justify-center overflow-hidden"
      >
        {/*
          Kotak kanvas berukuran CANVAS_W × CANVAS_H (px desain).
          Di-scale dengan autoScale agar selalu muat.
          Semua node diposisikan absolute relatif ke tengah kotak ini.
        */}
        <div
          className="relative flex-shrink-0"
          style={{
            width:  CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${autoScale})`,
            transformOrigin: "center center",
            visibility: autoScale === 0 ? "hidden" : "visible",
          }}
        >
          {/* Hub di tengah kanvas */}
          <div
            className="absolute"
            style={{
              left: CANVAS_W / 2,
              top:  CANVAS_H / 2,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CentralHub
              isExpanded={isExpanded}
              isLocked={isLocked}
              size="lg"
              onHubClick={handleHubClick}
              onHubEnter={handleCenterEnter}
              onHubLeave={handleCenterLeave}
            />
          </div>

          {/* 7 Satellite Nodes */}
          {DASHBOARD_NODES.map((node, index) => {
            const pos     = NODE_POSITIONS[node.id];
            const isHov   = hoveredNodeId === node.id;
            const hasLink = Boolean(node.url);

            return (
              <div
                key={node.id}
                className="absolute transition-all ease-out"
                style={{
                  left: CANVAS_W / 2 + pos.x,
                  top:  CANVAS_H / 2 + pos.y,
                  transform: isExpanded
                    ? "translate(-50%, -50%)"
                    : "translate(-50%, -50%) scale(0.15)",
                  opacity:            isExpanded ? 1 : 0,
                  zIndex:             isHov ? 8 : 5,
                  transitionDuration: isExpanded ? "450ms" : "280ms",
                  // pointerEvents aktif HANYA setelah animasi expand selesai (delay terpanjang ~280ms + 450ms)
                  pointerEvents:      isExpanded ? "auto" : "none",
                  transitionDelay:    isExpanded ? `${index * 40}ms` : "0ms",
                }}
                onMouseEnter={() => handleNodeEnter(node.id)}
                onMouseLeave={handleNodeLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNodeClick(node)}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHov
                      ? "scale-110 bg-gradient-to-b from-[#1862aa] to-[#0e3c6b] border-2 border-cyan-100 shadow-[0_0_36px_rgba(0,240,255,0.7)]"
                      : "bg-gradient-to-b from-[#104273]/92 via-[#0c335a]/95 to-[#092542]/98 border-2 border-cyan-300/80 shadow-[0_0_24px_rgba(0,210,255,0.4)] group-hover:border-cyan-200 group-hover:shadow-[0_0_30px_rgba(0,230,255,0.6)]"
                  }`}>
                    {renderIcon(node.iconName, isHov
                      ? "w-10 h-10 text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.9)]"
                      : "w-9 h-9 text-cyan-200 drop-shadow-[0_0_8px_rgba(0,230,255,0.7)]"
                    )}
                    {hasLink && (
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-cyan-500 border-2 border-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.7)]">
                        <ExternalLink className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                  <div className="mt-2 w-[190px] text-center pointer-events-none">
                    <p className="text-[13px] font-extrabold uppercase text-white group-hover:text-cyan-100 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {node.title}
                    </p>
                    <p className="text-[11px] text-cyan-200 font-semibold mt-0.5 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {node.subtitle}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE / TABLET (< lg)
      ════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col items-center w-full pb-32">

        {/* Hub mobile — size="sm", tidak ada scale/overflow wrapper */}
        <div className="pt-3 pb-1">
          <CentralHub
            isExpanded={isLocked}
            isLocked={isLocked}
            size="sm"
            onHubClick={handleHubClick}
            onHubEnter={() => {}}
            onHubLeave={() => {}}
          />
        </div>

        {/* Hint sebelum tap */}
        {!isLocked && (
          <p className="mt-3 text-[11px] text-cyan-300/70 font-mono animate-pulse select-none">
            Tap logo untuk membuka dashboard
          </p>
        )}

        {/* Daftar node */}
        {isLocked && (
          <div className="w-full mt-3 px-3 space-y-2.5">
            {DASHBOARD_NODES.map((node) => {
              const hasLink = Boolean(node.url);
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleNodeClick(node)}
                  className="w-full flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border bg-[#0c2847]/85 border-cyan-400/40 active:bg-[#123866]/90 active:border-cyan-300 transition-colors touch-manipulation text-left"
                >
                  <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-[#104273] to-[#092542] border-2 border-cyan-300/70 shadow-[0_0_14px_rgba(0,220,255,0.3)]">
                    {renderIcon(node.iconName, "w-5 h-5 sm:w-6 sm:h-6 text-cyan-200")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-white truncate leading-tight">
                      {node.title}
                    </p>
                    <p className="text-[10.5px] sm:text-[11px] text-cyan-300 mt-0.5 line-clamp-2 leading-snug">
                      {node.subtitle}
                    </p>
                  </div>
                  {hasLink ? (
                    <ExternalLink className="w-4 h-4 text-cyan-400/60 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
