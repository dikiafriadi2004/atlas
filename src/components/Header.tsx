"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  User,
  ShieldCheck,
  ChevronDown,
  KeyRound,
} from "lucide-react";

interface HeaderProps {
  onOpenAuthModal: () => void;
}

export default function Header({
  onOpenAuthModal
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    }));
  }, []);

  // Close dropdown when clicking/tapping outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-full">
      {/* Garis aksen gradasi atas */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />

      <div className="relative w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-gradient-to-r from-[#06182f]/98 via-[#0b2c52]/98 to-[#06182f]/98 border-b border-cyan-400/25 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        {/* Glow dekoratif — pointer-events-none, tidak memblok apapun */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-16 left-1/4 w-72 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 right-1/4 w-72 h-32 bg-blue-600/10 blur-3xl rounded-full" />
        </div>

        {/* Kiri: Logo + Identitas */}
        <div className="relative flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="group relative flex items-center cursor-pointer">
            {/* Glow di belakang logo */}
            <div className="absolute -inset-2 bg-cyan-400/15 blur-xl rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-11 sm:h-14 lg:h-16 w-auto min-w-[170px] sm:min-w-[230px] lg:min-w-[290px] flex items-center">
              <Image
                src="/logo-bpkk-white.png"
                alt="Badan Pengelolaan Keuangan Kabupaten Aceh Tengah"
                width={360}
                height={90}
                priority
                className="relative h-11 sm:h-14 lg:h-16 w-auto max-w-full object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.75)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Divider vertikal gradasi */}
          <div className="hidden md:block w-px h-10 lg:h-12 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />

          {/* Teks identitas */}
          <div className="hidden md:flex flex-col justify-center min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[9px] lg:text-[9.5px] tracking-[0.18em] text-cyan-300 font-mono uppercase font-bold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
              Portal Geospasial Resmi
            </span>
            <span className="text-xs lg:text-sm text-white font-bold tracking-wide whitespace-nowrap leading-tight mt-0.5">
              BPKK Kabupaten Aceh Tengah
            </span>
            {currentDate && (
              <span suppressHydrationWarning className="text-[10px] text-cyan-200/70 font-mono whitespace-nowrap">
                {currentDate}
              </span>
            )}
          </div>
        </div>

        {/* Kanan: Menu pengguna */}
        <div ref={dropdownRef} className="relative flex items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            className={`flex items-center gap-2 sm:gap-2.5 pl-1.5 pr-2 sm:pr-3 py-1.5 rounded-full border transition-all duration-200 touch-manipulation ${
              isDropdownOpen
                ? "bg-[#0e3560]/95 border-cyan-300 shadow-[0_0_24px_rgba(56,189,248,0.45)]"
                : "bg-gradient-to-b from-[#0d2a4d]/90 to-[#081f38]/90 border-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(56,189,248,0.4)]"
            }`}
          >
            <span className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-[0_0_14px_rgba(0,240,255,0.55)] ring-2 ring-cyan-300/40">
              <User className="w-4 h-4 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#081f38]" />
            </span>
            <span className="text-left hidden sm:block leading-tight">
              <span className="block text-[9px] text-cyan-200/75">Selamat Datang,</span>
              <span className="block text-xs font-bold text-white">Pengguna</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-cyan-300 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180 text-cyan-100" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-72 rounded-2xl overflow-hidden bg-[#0b2444]/98 shadow-2xl border border-cyan-400/40 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]"
            >
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_14px_rgba(0,240,255,0.5)] shrink-0">
                  <User className="w-5 h-5 text-white" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Sistem SSO BPKK</p>
                  <p className="text-[11px] text-cyan-300/90 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Status: Tamu / Belum Login
                  </p>
                </div>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 shadow-[0_0_18px_rgba(0,180,255,0.4)] hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Login dengan NIP / NIK</span>
                </button>

                <div className="mt-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[10px] text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Enkripsi End-to-End Aktif</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
