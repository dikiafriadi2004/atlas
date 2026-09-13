"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  X,
  KeyRound,
  Lock,
  User,
  AlertTriangle,
  CheckCircle2,
  Smartphone
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"petugas" | "wajib-pajak">("petugas");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!identifier || !password) {
      setErrorMessage("Mohon isi identitas login dan kata sandi Anda.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      setTimeout(() => {
        setLoginSuccess(false);
        onClose();
      }, 1600);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020b14]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-3xl glass-panel-glow border-2 border-cyan-500/40 bg-[#081528]/95 shadow-[0_0_60px_rgba(0,180,255,0.35)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Accent Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-cyan-400/50 p-1 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              <Image
                src="/logo-bpkk-emblem.png"
                alt="BPKK Logo"
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                MASUK KE GEO-ATLAS SSO
              </h2>
              <p className="text-xs text-cyan-400 font-medium">
                Sistem Otentikasi Terpadu BPKK Aceh Tengah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* User Category Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/90 border border-cyan-500/20">
            <button
              onClick={() => setActiveTab("petugas")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "petugas"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Petugas BPKK
            </button>
            <button
              onClick={() => setActiveTab("wajib-pajak")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "wajib-pajak"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Wajib Pajak / Badan Usaha
            </button>
          </div>

          {/* Feedback Messages */}
          {loginSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Autentikasi SSO Berhasil! Membuka gerbang GEO-ATLAS...</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {activeTab === "petugas"
                  ? "NIP (Nomor Induk Pegawai)"
                  : "NPWPD / NIK Penanggung Jawab Usaha"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    activeTab === "petugas"
                      ? "Masukkan 18 digit NIP..."
                      : "Masukkan 16 digit NIK / NPWPD..."
                  }
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Kata Sandi Portal
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Fitur Reset Sandi akan mengirim tautan konfirmasi ke email resmi yang terdaftar.");
                  }}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Kode Verifikasi MFA (Opsional untuk Uji Coba)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Google Auth / SMS</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="6 digit kode OTP (Contoh: 482910)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono tracking-widest"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(0,180,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mengotentikasi ke Server BPKK...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Masuk ke Akun Terpadu</span>
                </>
              )}
            </button>
          </form>

          {/* Quick links & support */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => alert("Permohonan Reset MFA akan diverifikasi oleh Admin BPKK Aceh Tengah.")}
              className="hover:text-cyan-300 transition-colors"
            >
              Reset MFA
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Layanan Bantuan BPKK: Hubungi Helpdesk Pajak Daerah di 0643-XXXXXX.")}
              className="hover:text-cyan-300 transition-colors"
            >
              Bantuan Helpdesk
            </button>
            <span>•</span>
            <span className="text-[11px] font-mono text-emerald-400">SSO v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
