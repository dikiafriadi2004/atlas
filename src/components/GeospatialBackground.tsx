"use client";

import React from "react";

export default function GeospatialBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Image Layer - Bright, vivid & colorful */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{
          backgroundImage: "url('/bg-lut-tawar.jpg')",
          filter: "brightness(0.92) contrast(1.08) saturate(1.25)",
        }}
      />

      {/* Soft atmospheric gradient overlay for crisp text readability without darkening the vibrant scene */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,28,58,0.25)_0%,rgba(6,22,46,0.55)_70%,rgba(4,16,34,0.75)_100%)]" />

      {/* Top soft gradient fade */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#05172e]/80 via-[#05172e]/40 to-transparent" />

      {/* Bottom soft gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#05172e]/85 via-[#05172e]/45 to-transparent" />
    </div>
  );
}
