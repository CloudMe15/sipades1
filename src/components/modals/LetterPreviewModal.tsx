import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_METAS } from '../../data/mockData';
import {
  X,
  Printer,
  Send,
  ShieldCheck,
  Download,
  Building,
  CheckCircle2,
  QrCode
} from 'lucide-react';

export const LetterPreviewModal: React.FC = () => {
  const {
    letterModalRequest,
    setLetterModalRequest,
    setVerificationModalRequest,
    sendManualWhatsApp
  } = useApp();

  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!letterModalRequest) return null;

  const req = letterModalRequest;
  const meta = SERVICE_METAS[req.serviceType];
  const nomorSurat = req.nomorSuratDesa || `470/120/DS-SKM/X/2026`;

  const handlePrint = () => {
    window.print();
  };

  const handleForwardWhatsApp = () => {
    const waText = `Yth. Bpk/Ibu ${req.namaLengkap}, soft-copy ${meta?.name || req.serviceType} (Nomor Surat: ${nomorSurat}) telah SELESAI ditandatangani Kepala Desa Sukamaju. Anda dapat mengambil fisik surat asli di Kantor Desa Sukamaju pada jam kerja dengan membawa KTP Asli. Terima kasih. (Pelayanan Kantor Desa Sukamaju)`;
    sendManualWhatsApp(req.nomorWhatsapp, waText);
  };

  // Specific letter body text based on service type
  const renderLetterBody = () => {
    switch (req.serviceType) {
      case 'SKU':
        return (
          <div className="space-y-3 leading-relaxed text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa orang tersebut di atas adalah benar-benar penduduk yang bertempat tinggal di wilayah Desa Sukamaju, Kecamatan Sukamaju, Kabupaten Bogor, dan berdasarkan data yang ada pada kami serta survei lapangan, yang bersangkutan benar memiliki kegiatan usaha sebagai berikut:
            </p>
            <div className="bg-slate-50/70 p-3 rounded border border-slate-200 text-xs space-y-1.5 ml-4 mr-4 font-mono">
              <div className="flex">
                <span className="w-36 font-sans font-semibold">Nama Usaha:</span>
                <span className="font-bold">{req.rincianTambahan?.['Nama Usaha'] || 'Warung Serba Ada Berkah'}</span>
              </div>
              <div className="flex">
                <span className="w-36 font-sans font-semibold">Bidang Usaha:</span>
                <span>{req.rincianTambahan?.['Bidang Usaha'] || 'Perdagangan & Usaha Mikro'}</span>
              </div>
              <div className="flex">
                <span className="w-36 font-sans font-semibold">Lokasi Usaha:</span>
                <span>{req.rincianTambahan?.['Lokasi Usaha'] || req.alamat}</span>
              </div>
            </div>
            <p>
              Surat Keterangan Usaha ini diberikan kepada yang bersangkutan untuk keperluan:{' '}
              <strong className="underline underline-offset-2">{req.keperluan}</strong>.
            </p>
          </div>
        );

      case 'SKCK':
        return (
          <div className="space-y-3 leading-relaxed text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa orang tersebut di atas adalah benar-benar penduduk Desa Sukamaju dan berdasarkan catatan administrasi desa kami:
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Berkelakuan baik serta tidak pernah terlibat dalam tindakan kriminalitas / kejahatan apapun;</li>
              <li>Tidak sedang dalam proses perkara hukum atau menjadi buronan kepolisian;</li>
              <li>Bukan anggota dari organisasi terlarang menurut ketentuan perundang-undangan yang berlaku.</li>
            </ol>
            <p>
              Surat Pengantar ini diterbitkan sebagai kelengkapan permohonan penerbitan <strong>Surat Keterangan Catatan Kepolisian (SKCK)</strong> di Kepolisian Sektor (Polsek) setempat untuk keperluan:{' '}
              <strong className="underline underline-offset-2">{req.keperluan}</strong>.
            </p>
          </div>
        );

      case 'SKTM':
        return (
          <div className="space-y-3 leading-relaxed text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa orang tersebut di atas adalah benar-benar penduduk Desa Sukamaju, dan berdasarkan verifikasi lapangan serta basis data terpadu kesejahteraan sosial, keluarga bersangkutan tergolong dalam keluarga:
            </p>
            <div className="p-2.5 bg-slate-100 rounded text-center font-bold text-slate-800">
              BERPENGHASILAN RENDAH / KURANG MAMPU (DESIL SOSIAL EKONOMI RENDAH)
            </div>
            <p>
              Surat Keterangan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagai persyaratan:{' '}
              <strong className="underline underline-offset-2">{req.keperluan}</strong>.
            </p>
          </div>
        );

      case 'SKD':
        return (
          <div className="space-y-3 leading-relaxed text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa orang tersebut di atas adalah benar-benar berdomisili dan menetap di wilayah Desa Sukamaju pada alamat tersebut di atas sejak tahun 2021 hingga saat surat keterangan ini diterbitkan.
            </p>
            <p>
              Surat Keterangan Domisili ini dibuat untuk dipergunakan sebagai:{' '}
              <strong className="underline underline-offset-2">{req.keperluan}</strong>.
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-3 leading-relaxed text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa orang tersebut di atas adalah benar-benar warga penduduk Desa Sukamaju, Kecamatan Sukamaju, Kabupaten Bogor.
            </p>
            <p>
              Surat keterangan ini diberikan kepada yang bersangkutan untuk kelengkapan administrasi permohonan:{' '}
              <strong className="underline underline-offset-2">{req.keperluan}</strong>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[96vh] flex flex-col border border-slate-200 overflow-hidden my-4 animate-in zoom-in-95 duration-150">
        {/* Top Control Bar (Hidden on actual print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm text-white">
                Pratinjau Draf Cetak Surat Resmi Desa
              </h3>
              <p className="text-[11px] text-slate-400">
                Format Kop Surat Standar Pemerintah Desa Sukamaju • Terintegrasi QR Verifikasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVerificationModalRequest(req);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cek E-Verifikasi QR</span>
            </button>

            <button
              onClick={handleForwardWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim ke WA Warga</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={() => setLetterModalRequest(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/60 flex justify-center">
          <div
            ref={printAreaRef}
            className="bg-white text-slate-900 shadow-xl border border-slate-300 max-w-[210mm] w-full p-8 sm:p-12 text-[12.5px] leading-normal font-serif relative"
            style={{ minHeight: '297mm' }}
          >
            {/* Kop Surat Resmi */}
            <div className="flex items-center justify-between border-b-[3px] border-black pb-3 mb-1">
              <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1">
                {/* Indonesian Garuda / Lambang Desa Icon Representation */}
                <div className="w-16 h-16 rounded-full border-2 border-slate-900 flex flex-col items-center justify-center text-center p-1 bg-amber-50/40">
                  <span className="text-[8px] font-sans font-bold tracking-tighter uppercase">KABUPATEN</span>
                  <span className="text-xs font-serif font-black">BOGOR</span>
                  <span className="text-[7px] font-sans text-slate-600">★ ★ ★</span>
                </div>
              </div>

              <div className="flex-1 text-center font-serif px-2">
                <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-700">
                  PEMERINTAH KABUPATEN BOGOR
                </h4>
                <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-800">
                  KECAMATAN SUKAMAJU
                </h3>
                <h2 className="text-lg font-sans font-black tracking-wider text-black">
                  KANTOR KEPALA DESA SUKAMAJU
                </h2>
                <p className="text-[10px] font-sans text-slate-600 mt-0.5">
                  Jl. Raya Sukamaju KM. 07 No. 45, Desa Sukamaju, Kode Pos 16720
                  <br />
                  Laman: sukamaju.desa.id • Pos-el: pelayanan@sukamaju.desa.id • Telp: (0251) 832-1980
                </p>
              </div>

              <div className="w-20 shrink-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border border-slate-300 rounded bg-slate-50 flex flex-col items-center justify-center p-1 text-[8px] font-sans text-slate-500 text-center">
                  <QrCode className="w-8 h-8 text-slate-800" />
                  <span className="mt-0.5 font-mono text-[7px]">VERIFIKASI</span>
                </div>
              </div>
            </div>
            {/* Garis batas tipis kedua untuk kop resmi */}
            <div className="border-b border-black mb-6" />

            {/* Document Title & Number */}
            <div className="text-center mb-6">
              <h3 className="font-sans font-bold text-sm tracking-wider underline uppercase">
                {meta?.fullName || `SURAT KETERANGAN ${req.serviceType}`}
              </h3>
              <p className="font-sans text-xs font-medium text-slate-700 mt-1">
                Nomor: <span className="font-mono font-bold">{nomorSurat}</span>
              </p>
            </div>

            {/* Opening Paragraph */}
            <p className="text-justify mb-4 indent-8 leading-relaxed">
              Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan Sukamaju, Kabupaten Bogor, Provinsi Jawa Barat, dengan ini menerangkan bahwa:
            </p>

            {/* Citizen Data Table */}
            <div className="mb-4 pl-6 pr-4 space-y-1.5 font-sans text-xs">
              <div className="flex">
                <span className="w-48 text-slate-600">1. Nama Lengkap</span>
                <span className="w-3">:</span>
                <span className="font-bold text-slate-900 uppercase">{req.namaLengkap}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">2. NIK (No. KTP)</span>
                <span className="w-3">:</span>
                <span className="font-mono font-bold text-slate-900">{req.nik}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">3. No. Kartu Keluarga</span>
                <span className="w-3">:</span>
                <span className="font-mono text-slate-800">{req.nomorKk || '-'}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">4. Tempat / Tanggal Lahir</span>
                <span className="w-3">:</span>
                <span className="text-slate-900">{req.tempatLahir}, {req.tanggalLahir}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">5. Jenis Kelamin</span>
                <span className="w-3">:</span>
                <span className="text-slate-900">{req.jenisKelamin}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">6. Agama</span>
                <span className="w-3">:</span>
                <span className="text-slate-900">{req.agama}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">7. Pekerjaan</span>
                <span className="w-3">:</span>
                <span className="text-slate-900">{req.pekerjaan}</span>
              </div>
              <div className="flex">
                <span className="w-48 text-slate-600">8. Alamat Sesuai KTP</span>
                <span className="w-3">:</span>
                <span className="text-slate-900 leading-tight">
                  {req.alamat}, RT {req.rt} / RW {req.rw}, Desa Sukamaju, Kec. Sukamaju, Kab. Bogor
                </span>
              </div>
            </div>

            {/* Letter Body by Type */}
            <div className="mb-5">{renderLetterBody()}</div>

            {/* Closing Formula */}
            <p className="text-justify mb-8 indent-8 leading-relaxed">
              Demikian Surat Keterangan ini kami buat dan berikan kepada yang bersangkutan dengan sebenarnya, agar dapat dipergunakan sebagaimana mestinya dan sesuai dengan ketentuan peraturan yang berlaku.
            </p>

            {/* Signature & Seal Area */}
            <div className="flex justify-between items-end pt-4">
              {/* Left Side: Citizen Signature or QR */}
              <div className="w-56 text-center font-sans text-xs">
                <p className="text-[11px] text-slate-500 mb-1">Tanda Tangan Pemohon,</p>
                <div className="h-20" />
                <p className="font-bold border-b border-black pb-0.5 inline-block min-w-[140px] uppercase">
                  {req.namaLengkap}
                </p>
              </div>

              {/* Right Side: Village Head Signature & Wet Seal */}
              <div className="w-72 text-center font-sans text-xs relative">
                <p className="text-[11px] text-slate-700">
                  Ditetapkan di: Sukamaju<br />
                  Pada tanggal: {req.createdAt.split(',')[0] || '06 Oktober 2026'}
                </p>
                <p className="font-bold text-slate-900 mt-1 uppercase tracking-wider">
                  KEPALA DESA SUKAMAJU
                </p>

                {/* Wet Stamp & Signature Representation */}
                <div className="relative h-24 flex items-center justify-center my-1">
                  {/* Violet Official Village Stamp */}
                  <div
                    className="absolute -left-2 top-0 w-24 h-24 rounded-full border-2 border-violet-700/80 text-violet-700 flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase rotate-[-8deg] pointer-events-none opacity-90 shadow-2xs"
                    style={{
                      backgroundImage: 'radial-gradient(circle, transparent 60%, rgba(109,40,217,0.1) 62%)'
                    }}
                  >
                    <div className="w-20 h-20 rounded-full border border-dashed border-violet-700 flex flex-col items-center justify-center text-center p-0.5 leading-tight">
                      <span className="text-[6.5px]">PEMERINTAH KABUPATEN</span>
                      <span className="text-[7.5px] font-black">★ DESA SUKAMAJU ★</span>
                      <span className="text-[6px] text-violet-600">KEC. SUKAMAJU</span>
                    </div>
                  </div>

                  {/* Calligraphic Signature Simulation */}
                  <div className="relative z-10 text-blue-900 font-serif italic text-2xl font-bold tracking-widest rotate-[-4deg] select-none">
                    Dadang Kurniawan
                  </div>
                </div>

                <div className="text-slate-900 font-sans">
                  <p className="font-bold uppercase underline underline-offset-2">
                    H. DADANG KURNIAWAN, S.IP
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    NIP. 19740815 199903 1 004
                  </p>
                </div>
              </div>
            </div>

            {/* Official Footer Security Note */}
            <div className="mt-12 pt-3 border-t border-slate-200 flex items-center justify-between font-sans text-[9px] text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Dokumen Elektronik Sah SIPADES • Kode Hash:{' '}
                  <span className="font-mono font-bold text-slate-700">
                    DS-SKM-{req.id.toUpperCase()}
                  </span>
                </span>
              </div>
              <span>Dicetak melalui Sistem Pelayanan Administrasi Desa Sukamaju</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
