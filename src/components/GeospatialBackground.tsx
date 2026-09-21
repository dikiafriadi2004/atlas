"use client";

import React from "react";

export default function GeospatialBackground() {
  return (
    // pointer-events-none di SEMUA level — tidak boleh ada yang memblok touch
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02] pointer-events-none"
        style={{
          backgroundImage: "url('/bg-lut-tawar.jpg')",
          filter: "brightness(0.92) contrast(1.08) saturate(1.25)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(8,28,58,0.25)_0%,rgba(6,22,46,0.55)_70%,rgba(4,16,34,0.75)_100%)]" />
      <div className="absolute top-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-b from-[#05172e]/80 via-[#05172e]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-t from-[#05172e]/85 via-[#05172e]/45 to-transparent" />
    </div>
  );
}
