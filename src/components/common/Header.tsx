import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  Send,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Clock,
  Landmark,
  Download
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    users,
    switchUserById,
    resetToSampleData,
    waLogs,
    setWaModalOpen
  } = useApp();

  const [timeStr, setTimeStr] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'rt':
        return {
          label: 'Frontline RT',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        };
      case 'operator':
        return {
          label: 'Operator Desa',
          color: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      case 'kecamatan':
        return {
          label: 'Monitoring Kecamatan',
          color: 'bg-purple-100 text-purple-800 border-purple-300'
        };
      default:
        return {
          label: role,
          color: 'bg-gray-100 text-gray-800 border-gray-300'
        };
    }
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  SIPADES
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  Desa Sukamaju
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Sistem Pelayanan Administrasi Desa Terpadu • Kec. Sukamaju, Kab. Bogor
              </p>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live Clock */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeStr || 'WIB'}</span>
            </div>

            {/* Download dist.zip button for direct hosting upload */}
            <a
              href="/dist.zip"
              download="dist.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Unduh file siap upload ke hosting (dist.zip)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh ZIP Hosting</span>
            </a>

            {/* WA Gateway Quick Status & Modal Opener */}
            <button
              onClick={() => setWaModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
              title="Buka Konsol WhatsApp Gateway"
            >
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">WA Gateway</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {waLogs.length}
              </span>
            </button>

            {/* Reset Sample Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset semua data pengajuan ke data contoh awal?')) {
                  resetToSampleData();
                }
              }}
              className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              title="Reset ke Data Contoh Awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Data</span>
            </button>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80 transition-all cursor-pointer text-left shadow-2xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span>{currentUser.identifier}</span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
              </button>

              {/* Dropdown Options */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Pilih Role Pengguna (RBAC)
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Beralih akun untuk menguji alur kerja lengkap:
                      </div>
                    </div>

                    <div className="space-y-1">
                      {users.map(u => {
                        const isCurrent = u.id === currentUser.id;
                        const roleMeta = getRoleBadge(u.role);
                        return (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUserById(u.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                              isCurrent
                                ? 'bg-emerald-50/80 border border-emerald-200/60'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {u.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {u.identifier}
                              </div>
                              <span
                                className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded border font-medium ${roleMeta.color}`}
                              >
                                {roleMeta.label}
                              </span>
                            </div>
                            {isCurrent && (
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role Banner Ribbon */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Mode Akses:</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${badge.color}`}>
              {badge.label}
            </span>
            <span className="text-slate-300 hidden md:inline">
              — Sedang aktif sebagai: <strong className="text-white">{currentUser.name}</strong> ({currentUser.identifier})
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            {currentUser.role === 'rt' && (
              <span className="flex items-center gap-1 text-emerald-300">
                <Users className="w-3.5 h-3.5" /> Pelayanan Warga RT 01 & 02
              </span>
            )}
            {currentUser.role === 'operator' && (
              <span className="flex items-center gap-1 text-blue-300">
                <Building2 className="w-3.5 h-3.5" /> Loket Verifikasi & Cetak Surat Kantor Desa
              </span>
            )}
            {currentUser.role === 'kecamatan' && (
              <span className="flex items-center gap-1 text-purple-300">
                <Landmark className="w-3.5 h-3.5" /> Pengawasan & Analitik SLA Lintas Desa
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
