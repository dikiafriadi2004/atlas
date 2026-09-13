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

const renderIcon = (iconName: string, className = "w-9 h-9 text-cyan-200 drop-shadow-[0_0_8px_rgba(0,230,255,0.7)]") => {
  switch (iconName) {
    case "MonitorCheck":
      return <MonitorCheck className={className} />;
    case "CloudLightning":
      return <CloudLightning className={className} />;
    case "UserCheck":
      return <UserCheck className={className} />;
    case "FileCheck2":
      return <FileCheck2 className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "MapPinned":
      return <MapPinned className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    default:
      return <MonitorCheck className={className} />;
  }
};

// Offset positions from center (px) for 7 enlarged radial nodes around enlarged central hub
const NODE_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: -285, y: -180 },
  2: { x: -365, y: 30 },
  3: { x: -245, y: 235 },
  4: { x: 285, y: -180 },
  5: { x: 365, y: 30 },
  6: { x: 245, y: 235 },
  7: { x: 0, y: 270 },
};

export default function RadialNetwork() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Nodes are visible when hovering OR locked
  const isExpanded = isHovering || isLocked;

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleCenterEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(true);
  };

  const handleCenterLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // 300ms grace period so moving cursor between hub and nodes is seamless
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  const handleNodeEnter = (nodeId: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(true);
    setHoveredNodeId(nodeId);
  };

  const handleNodeLeave = () => {
    setHoveredNodeId(null);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  const handleHubClick = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsLocked((prev) => {
      const nextLocked = !prev;
      if (!nextLocked) {
        // If unlocking, also collapse immediately
        setIsHovering(false);
      }
      return nextLocked;
    });
  };

  const handleNodeClick = (node: DashboardNode) => {
    // Link kosong: tetap bisa diklik, tapi tidak navigasi ke mana-mana
    if (!node.url) return;
    window.open(node.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-0 overflow-hidden">

      {/* DESKTOP VIEW - skala menyesuaikan tinggi layar agar tanpa scroll */}
      <div className="hidden lg:flex relative w-full flex-1 min-h-0 max-w-[1200px] items-center justify-center overflow-visible scale-[0.78] xl:scale-[0.88] 2xl:scale-100 origin-center">

        {/* Central Hub - z-40 so it stays above emerging nodes and never flickers */}
        <div className="relative z-40">
          <CentralHub
            isExpanded={isExpanded}
            isLocked={isLocked}
            onHubClick={handleHubClick}
            onHubEnter={handleCenterEnter}
            onHubLeave={handleCenterLeave}
          />
        </div>

        {/* 7 Satellite Nodes — emerge smoothly from behind center hub (z-20/z-30) */}
        {DASHBOARD_NODES.map((node, index) => {
          const pos = NODE_POSITIONS[node.id];
          const isHovered = hoveredNodeId === node.id;
          const delay = index * 40;
          const hasLink = Boolean(node.url);

          return (
            <div
              key={node.id}
              className={`absolute transition-all ease-out ${
                isHovered ? "z-30" : "z-20"
              }`}
              style={{
                transform: isExpanded
                  ? `translate(${pos.x}px, ${pos.y}px)`
                  : "translate(0px, 0px)",
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? "1" : "0.2",
                transitionDuration: isExpanded ? "450ms" : "300ms",
                transitionDelay: isExpanded ? `${delay}ms` : "0ms",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onMouseEnter={() => handleNodeEnter(node.id)}
              onMouseLeave={handleNodeLeave}
            >
              <button
                type="button"
                onClick={() => handleNodeClick(node)}
                title={hasLink ? `Buka ${node.title}` : node.title}
                className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              >
                {/* Enlarged Node icon circle - NO NUMBERS, Bright vibrant styling */}
                <div
                  className={`relative w-[96px] h-[96px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    isHovered
                      ? "scale-110 bg-gradient-to-b from-[#1862aa] to-[#0e3c6b] border-2 border-cyan-100 shadow-[0_0_36px_rgba(0,240,255,0.7)] ring-2 ring-cyan-300/60"
                      : "bg-gradient-to-b from-[#104273]/92 via-[#0c335a]/95 to-[#092542]/98 backdrop-blur-xl border-2 border-cyan-300/80 shadow-[0_0_24px_rgba(0,210,255,0.4)] group-hover:border-cyan-200 group-hover:shadow-[0_0_30px_rgba(0,230,255,0.6)]"
                  }`}
                >
                  {renderIcon(
                    node.iconName,
                    isHovered
                      ? "w-10 h-10 sm:w-11 sm:h-11 text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.9)]"
                      : "w-9 h-9 sm:w-10 sm:h-10 text-cyan-200 drop-shadow-[0_0_8px_rgba(0,230,255,0.7)]"
                  )}
                  {/* Corner badge hanya untuk yang ada link asli */}
                  {hasLink && (
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 bg-cyan-500 border-cyan-100 shadow-[0_0_10px_rgba(0,240,255,0.7)]">
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                </div>

                {/* Node labels - Crisp, high contrast, readable */}
                <div className="mt-2.5 max-w-[220px] text-center pointer-events-none">
                  <div className="text-xs sm:text-[13px] font-extrabold tracking-tight uppercase text-white group-hover:text-cyan-100 transition-colors leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {node.title}
                  </div>
                  <div className="text-[10.5px] sm:text-[11px] text-cyan-200 font-semibold group-hover:text-cyan-100 transition-colors mt-0.5 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {node.subtitle}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* MOBILE / TABLET VIEW - daftar scroll di dalam, halaman tetap tanpa scroll */}
      <div className="w-full lg:hidden flex-1 min-h-0 flex flex-col items-center gap-2 sm:gap-3 py-1 overflow-hidden">
        <div className="py-1 shrink-0 scale-90 sm:scale-100 origin-top">
          <CentralHub
            isExpanded={isExpanded}
            isLocked={isLocked}
            onHubClick={handleHubClick}
            onHubEnter={handleCenterEnter}
            onHubLeave={handleCenterLeave}
          />
        </div>

        {isExpanded && (
          <div className="w-full flex-1 min-h-0 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 pb-24 px-1 animate-fadeIn overscroll-contain">
            {DASHBOARD_NODES.map((node) => {
              const hasLink = Boolean(node.url);
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleNodeClick(node)}
                  title={hasLink ? `Buka ${node.title}` : node.title}
                  className="w-full text-left p-3 sm:p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 flex items-center gap-3 sm:gap-4 group shadow-[0_0_20px_rgba(0,200,255,0.2)] bg-[#0c2847]/85 border-cyan-400/45 hover:border-cyan-300 hover:bg-[#123866]/90 cursor-pointer shrink-0"
                >
                  {/* Enlarged Circle - NO NUMBERS */}
                  <div className="relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors bg-gradient-to-b from-[#104273] to-[#092542] border-2 border-cyan-300/70 group-hover:border-cyan-200 shadow-[0_0_16px_rgba(0,220,255,0.35)]">
                    {renderIcon(
                      node.iconName,
                      "w-6 h-6 sm:w-8 sm:h-8 text-cyan-200 group-hover:text-white drop-shadow-[0_0_8px_rgba(0,230,255,0.6)]"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold mt-0.5 truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-white group-hover:text-cyan-100">
                      {node.title}
                    </div>
                    <div className="text-[11px] line-clamp-1 text-cyan-200">
                      {node.subtitle}
                    </div>
                  </div>
                  {hasLink ? (
                    <ExternalLink className="w-4 h-4 text-cyan-300/70 group-hover:text-cyan-100 transition-colors flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 flex-shrink-0" />
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
