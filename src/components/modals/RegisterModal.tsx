import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RAKIT_KULIM_VILLAGES } from '../../data/mockData';
import { UserRole } from '../../types';
import {
  X,
  UserPlus,
  Users,
  Building2,
  Lock,
  Phone,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { registerUser, users } = useApp();

  if (!isOpen) return null;

  const [role, setRole] = useState<UserRole>('rt');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Desa Kelayang');
  const [rtVal, setRtVal] = useState('01');
  const [rwVal, setRwVal] = useState('01');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Nama lengkap wajib diisi.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Nomor WhatsApp wajib diisi.');
      return;
    }

    if (!username.trim()) {
      setErrorMsg('Username wajib diisi.');
      return;
    }

    if (users.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
      setErrorMsg('Username ini sudah digunakan oleh akun lain. Silakan pilih username lain.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    const identifier = role === 'rt'
      ? `Ketua RT ${rtVal.padStart(2, '0')} / RW ${rwVal.padStart(2, '0')}`
      : 'Operator Pelayanan Desa';

    const defaultAvatar = role === 'rt'
      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80';

    const res = await registerUser({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      password,
      role,
      identifier,
      village,
      phone: phone.trim(),
      avatar: defaultAvatar,
      email: `${username.trim().toLowerCase()}@rakitkulim.desa.id`
    });

    if (res.success) {
      setSuccessMsg('Akun Anda berhasil didaftarkan! Mengalihkan ke dashboard...');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res.message || 'Gagal mendaftarkan akun. Silakan coba kembali.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm text-white">
                Pendaftaran Akun Mandiri Aparatur Desa / RT
              </h3>
              <p className="text-[11px] text-emerald-100">
                Kecamatan Rakit Kulim, Kabupaten Indragiri Hulu, Riau
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-emerald-900/60 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRegister} className="p-6 space-y-4 text-xs">
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role selector */}
          <div>
            <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Pilih Jenis Peran Akun:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('rt')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                  role === 'rt'
                    ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Ketua / Pengurus RT</div>
                  <div className="text-[10px] text-slate-500">Input surat & dampingi warga</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('operator')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                  role === 'operator'
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Operator Desa</div>
                  <div className="text-[10px] text-slate-500">Verifikasi, cetak & buku tamu</div>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Lengkap & Gelar *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Bambang Irawan, S.Pd"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor WhatsApp Aktif *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Contoh: 0812-7654-3201"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Pilih Desa (19 Desa Rakit Kulim) *
              </label>
              <select
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
              >
                {RAKIT_KULIM_VILLAGES.map(v => (
                  <option key={v.id} value={v.name}>
                    {v.name} ({v.kades ? `Kades: ${v.kades}` : ''})
                  </option>
                ))}
              </select>
            </div>

            {role === 'rt' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Wilayah (RT / RW)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={rtVal}
                    onChange={e => setRtVal(e.target.value)}
                    placeholder="RT"
                    className="w-1/2 px-2 py-2 border border-slate-300 rounded-xl text-center"
                    required
                  />
                  <span>/</span>
                  <input
                    type="text"
                    value={rwVal}
                    onChange={e => setRwVal(e.target.value)}
                    placeholder="RW"
                    className="w-1/2 px-2 py-2 border border-slate-300 rounded-xl text-center"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
              Kredensial Masuk Akun:
            </span>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Username Pilihan *
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                placeholder="Contoh: rt03-kelayang atau operator-kotabaru"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                required
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Hanya huruf kecil, angka, dan tanda hubung (-)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kata Sandi (Password) *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Ulangi Kata Sandi *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow cursor-pointer transition flex items-center gap-2"
            >
              <span>Daftar & Masuk Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
