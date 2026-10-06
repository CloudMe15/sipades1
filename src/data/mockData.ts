import { CitizenRequest, CurrentUser, ServiceMeta, VillageStats, WhatsAppMessageLog } from '../types';

export const SERVICE_METAS: Record<string, ServiceMeta> = {
  SKU: {
    code: 'SKU',
    name: 'Surat Keterangan Usaha (SKU)',
    fullName: 'Surat Keterangan Keterangan Kegiatan Usaha Mikro & Kecil',
    requiredDocs: ['Foto KTP Asli', 'Foto Kartu Keluarga (KK)', 'Foto Tempat / Kegiatan Usaha'],
    slaHours: 4,
    description: 'Untuk keperluan pengajuan modal usaha, izin legalitas UMKM, atau pinjaman KUR Perbankan.'
  },
  SKCK: {
    code: 'SKCK',
    name: 'Surat Pengantar SKCK',
    fullName: 'Surat Pengantar Kelakuan Baik / SKCK dari Desa ke Polsek',
    requiredDocs: ['Foto KTP Asli', 'Foto Kartu Keluarga (KK)', 'Pas Foto 4x6 Background Merah'],
    slaHours: 3,
    description: 'Untuk melamar pekerjaan di instansi BUMN/Swasta, pendaftaran CPNS/TNI/Polri.'
  },
  SKTM: {
    code: 'SKTM',
    name: 'Surat Keterangan Tidak Mampu (SKTM)',
    fullName: 'Surat Keterangan Kurang Mampu / Desil Ekonomi Warga',
    requiredDocs: ['Foto KTP Asli', 'Foto Kartu Keluarga (KK)', 'Surat Pernyataan / Pengantar RT'],
    slaHours: 4,
    description: 'Untuk beasiswa pendidikan (KIP-Kuliah), keringanan biaya berobat RSUD / BPJS PBI.'
  },
  SKD: {
    code: 'SKD',
    name: 'Surat Keterangan Domisili',
    fullName: 'Surat Keterangan Tempat Tinggal Sementara / Menetap',
    requiredDocs: ['Foto KTP Asli', 'Foto Kartu Keluarga (KK)'],
    slaHours: 2,
    description: 'Untuk pembukaan rekening bank, pendaftaran anak sekolah zonasi, atau domisili kerja.'
  },
  SPN: {
    code: 'SPN',
    name: 'Surat Pengantar Nikah (N1-N4)',
    fullName: 'Surat Pengantar Permohonan Pernikahan ke KUA',
    requiredDocs: ['Foto KTP Calon Pengantin', 'Foto KK', 'Akta Kelahiran', 'Ijazah Terakhir'],
    slaHours: 6,
    description: 'Berkas formulir pengantar resmi pendaftaran akad nikah di Kantor Urusan Agama (KUA).'
  },
  SKP: {
    code: 'SKP',
    name: 'Surat Keterangan Pindah',
    fullName: 'Surat Keterangan Pindah Penduduk Antar Desa/Kabupaten',
    requiredDocs: ['Foto KTP Asli', 'Foto Kartu Keluarga Asli', 'Pas Foto 3x4'],
    slaHours: 5,
    description: 'Untuk penerbitan SKPWNI ke Dinas Kependudukan & Pencatatan Sipil.'
  },
  SKK: {
    code: 'SKK',
    name: 'Surat Keterangan Kelahiran / Kematian',
    fullName: 'Surat Keterangan Pelaporan Peristiwa Kependudukan',
    requiredDocs: ['KTP Saksi / Pelapor', 'Kartu Keluarga', 'Surat Keterangan Bidan / RS'],
    slaHours: 4,
    description: 'Bukti pelaporan resmi peristiwa kependudukan tingkat desa.'
  }
};

export const MOCK_USERS: CurrentUser[] = [
  {
    id: 'user-rt-01',
    name: 'Bambang Sutrisno',
    role: 'rt',
    identifier: 'Ketua RT 01 / RW 03',
    village: 'Desa Sukamaju',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '081298765431'
  },
  {
    id: 'user-rt-02',
    name: 'Siti Rohmah',
    role: 'rt',
    identifier: 'Ketua RT 02 / RW 03',
    village: 'Desa Sukamaju',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '081345678912'
  },
  {
    id: 'user-operator',
    name: 'Asep Ridwan, S.Kom',
    role: 'operator',
    identifier: 'Operator Pelayanan Paten',
    village: 'Desa Sukamaju',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '085712345678'
  },
  {
    id: 'user-kecamatan',
    name: 'Drs. H. Suryana, M.Si',
    role: 'kecamatan',
    identifier: 'Kasi Tata Pemerintahan & Pelayanan',
    village: 'Kecamatan Sukamaju',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '081122334455'
  }
];

export const INITIAL_REQUESTS: CitizenRequest[] = [
  {
    id: 'req-001',
    ticketNumber: 'REQ-20261006-001',
    nomorSuratDesa: '510/082/DS-SKM/X/2026',
    nik: '3201141205930002',
    namaLengkap: 'Budi Santoso',
    nomorWhatsapp: '081287654321',
    nomorKk: '3201142508110005',
    tempatLahir: 'Bogor',
    tanggalLahir: '1993-05-12',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Wiraswasta / Pedagang',
    alamat: 'Kp. Babakan RT 01 / RW 03',
    rt: '01',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SKU',
    keperluan: 'Syarat pengajuan modal usaha Kredit Usaha Rakyat (KUR) di Bank BRI Unit Sukamaju.',
    rincianTambahan: {
      'Nama Usaha': 'Warung Sembako & Kelontong Berkah Barokah',
      'Bidang Usaha': 'Perdagangan Eceran Sembako',
      'Tahun Berdiri': '2021',
      'Lokasi Usaha': 'Jl. Raya Desa No. 14, RT 01/RW 03'
    },
    attachments: [
      {
        id: 'att-1',
        type: 'ktp',
        name: 'KTP_Budi_Santoso.jpg',
        fileUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=SCAN+KTP+ASLI+BUDI+SANTOSO',
        uploadedAt: '2026-10-06 08:30 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'valid'
      },
      {
        id: 'att-2',
        type: 'kk',
        name: 'KK_Budi_Santoso_Buram.jpg',
        fileUrl: 'https://placehold.co/600x400/991b1b/ffffff?text=FOTO+KK+BURAM+(PERLU+REVISI)',
        uploadedAt: '2026-10-06 08:30 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'invalid',
        revisionNote: 'Foto Kartu Keluarga buram, nomor NIK kepala keluarga tidak terbaca. Mohon difoto ulang secara tegak lurus dan pencahayaan terang.'
      }
    ],
    status: 'butuh_perbaikan',
    rejectionReason: 'Foto Kartu Keluarga (KK) buram dan nomor NIK kepala keluarga tidak terbaca. Mohon lampirkan scan KK yang jelas dan lurus tanpa pantulan flash.',
    createdAt: '2026-10-06 08:30 WIB',
    updatedAt: '2026-10-06 09:15 WIB',
    estimatedCompletion: '2026-10-06 14:00 WIB',
    timeline: [
      {
        id: 't-1',
        status: 'menunggu_verifikasi',
        timestamp: '06 Okt 2026, 08:30 WIB',
        actor: 'Bambang Sutrisno (RT 01)',
        role: 'rt',
        note: 'Pengajuan dibuat oleh RT atas nama warga Budi Santoso'
      },
      {
        id: 't-2',
        status: 'butuh_perbaikan',
        timestamp: '06 Okt 2026, 09:15 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Dokumen dikembalikan ke RT. Alasan: Foto Kartu Keluarga (KK) buram dan nomor NIK tidak terbaca.'
      }
    ]
  },
  {
    id: 'req-002',
    ticketNumber: 'REQ-20261006-002',
    nik: '3201145508980004',
    namaLengkap: 'Dewi Lestari',
    nomorWhatsapp: '085890123456',
    nomorKk: '3201141203150009',
    tempatLahir: 'Bandung',
    tanggalLahir: '1998-08-15',
    jenisKelamin: 'Perempuan',
    agama: 'Islam',
    pekerjaan: 'Pelajar / Mahasiswa',
    alamat: 'Gang Mawar No. 8, RT 01 / RW 03',
    rt: '01',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SKTM',
    keperluan: 'Persyaratan pengajuan beasiswa KIP Kuliah Jalur SNBP Tahun Akademik 2026/2027.',
    attachments: [
      {
        id: 'att-3',
        type: 'ktp',
        name: 'KTP_Dewi_Lestari.jpg',
        fileUrl: 'https://placehold.co/600x400/0f766e/ffffff?text=KTP+DEWI+LESTARI',
        uploadedAt: '2026-10-06 09:40 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'pending'
      },
      {
        id: 'att-4',
        type: 'kk',
        name: 'KK_Keluarga_Dewi.jpg',
        fileUrl: 'https://placehold.co/600x400/0f766e/ffffff?text=KARTU+KELUARGA+DEWI',
        uploadedAt: '2026-10-06 09:40 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'pending'
      },
      {
        id: 'att-5',
        type: 'surat_pengantar_rt',
        name: 'Surat_Pengantar_RT01.jpg',
        fileUrl: 'https://placehold.co/600x400/0f766e/ffffff?text=SURAT+PENGANTAR+RT+01',
        uploadedAt: '2026-10-06 09:40 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'pending'
      }
    ],
    status: 'menunggu_verifikasi',
    createdAt: '2026-10-06 09:40 WIB',
    updatedAt: '2026-10-06 09:40 WIB',
    estimatedCompletion: '2026-10-06 15:00 WIB',
    timeline: [
      {
        id: 't-3',
        status: 'menunggu_verifikasi',
        timestamp: '06 Okt 2026, 09:40 WIB',
        actor: 'Bambang Sutrisno (RT 01)',
        role: 'rt',
        note: 'Dokumen pengajuan telah diunggah lengkap oleh RT 01. Menunggu verifikasi operator desa.'
      }
    ]
  },
  {
    id: 'req-003',
    ticketNumber: 'REQ-20261006-003',
    nomorSuratDesa: '331/095/DS-SKM/X/2026',
    nik: '3201140301010001',
    namaLengkap: 'Rahmat Hidayat',
    nomorWhatsapp: '081399887766',
    nomorKk: '3201140909090003',
    tempatLahir: 'Bogor',
    tanggalLahir: '2001-01-03',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Belum / Tidak Bekerja',
    alamat: 'Jl. Pemuda No. 25, RT 02 / RW 03',
    rt: '02',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SKCK',
    keperluan: 'Persyaratan melamar pekerjaan sebagai Teknisi Lapangan di PT. Astra Honda Motor.',
    attachments: [
      {
        id: 'att-6',
        type: 'ktp',
        name: 'KTP_Rahmat.jpg',
        fileUrl: 'https://placehold.co/600x400/1e3a8a/ffffff?text=SCAN+KTP+RAHMAT+HIDAYAT',
        uploadedAt: '2026-10-06 07:15 WIB',
        uploadedBy: 'Siti Rohmah (RT 02)',
        status: 'valid'
      },
      {
        id: 'att-7',
        type: 'kk',
        name: 'KK_Rahmat.jpg',
        fileUrl: 'https://placehold.co/600x400/1e3a8a/ffffff?text=SCAN+KK+KELUARGA+HIDAYAT',
        uploadedAt: '2026-10-06 07:15 WIB',
        uploadedBy: 'Siti Rohmah (RT 02)',
        status: 'valid'
      }
    ],
    status: 'diproses',
    createdAt: '2026-10-06 07:15 WIB',
    updatedAt: '2026-10-06 08:20 WIB',
    estimatedCompletion: '2026-10-06 12:30 WIB',
    timeline: [
      {
        id: 't-4',
        status: 'menunggu_verifikasi',
        timestamp: '06 Okt 2026, 07:15 WIB',
        actor: 'Siti Rohmah (RT 02)',
        role: 'rt',
        note: 'Diajukan oleh RT 02'
      },
      {
        id: 't-5',
        status: 'diproses',
        timestamp: '06 Okt 2026, 08:20 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Berkas KTP & KK lengkap dan valid. Surat sedang dicetak dan dimasukkan ke map tanda tangan Kades.'
      }
    ]
  },
  {
    id: 'req-004',
    ticketNumber: 'REQ-20261005-014',
    nomorSuratDesa: '470/118/DS-SKM/X/2026',
    nik: '3201146207890007',
    namaLengkap: 'Siti Aminah',
    nomorWhatsapp: '087711223344',
    nomorKk: '3201140102120008',
    tempatLahir: 'Cianjur',
    tanggalLahir: '1989-07-22',
    jenisKelamin: 'Perempuan',
    agama: 'Islam',
    pekerjaan: 'Ibu Rumah Tangga',
    alamat: 'Kp. Sukasari RT 01 / RW 03',
    rt: '01',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SKD',
    keperluan: 'Persyaratan pendaftaran rekening bank tabungan anak dan domisili tinggal.',
    attachments: [
      {
        id: 'att-8',
        type: 'ktp',
        name: 'KTP_Siti_Aminah.jpg',
        fileUrl: 'https://placehold.co/600x400/4c1d95/ffffff?text=KTP+SITI+AMINAH',
        uploadedAt: '2026-10-05 13:00 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'valid'
      },
      {
        id: 'att-9',
        type: 'kk',
        name: 'KK_Siti_Aminah.jpg',
        fileUrl: 'https://placehold.co/600x400/4c1d95/ffffff?text=KK+SITI+AMINAH',
        uploadedAt: '2026-10-05 13:00 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'valid'
      }
    ],
    status: 'menunggu_ttd_kades',
    createdAt: '2026-10-05 13:00 WIB',
    updatedAt: '2026-10-06 08:45 WIB',
    estimatedCompletion: '2026-10-06 11:30 WIB',
    timeline: [
      {
        id: 't-6',
        status: 'menunggu_verifikasi',
        timestamp: '05 Okt 2026, 13:00 WIB',
        actor: 'Bambang Sutrisno (RT 01)',
        role: 'rt',
        note: 'Diajukan oleh RT 01'
      },
      {
        id: 't-7',
        status: 'diproses',
        timestamp: '05 Okt 2026, 14:10 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Berkas diverifikasi, draft surat fisik dicetak.'
      },
      {
        id: 't-8',
        status: 'menunggu_ttd_kades',
        timestamp: '06 Okt 2026, 08:45 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Fisik surat diajukan ke meja Kepala Desa (Kades) untuk penandatanganan basah dan stempel dinas.'
      }
    ]
  },
  {
    id: 'req-005',
    ticketNumber: 'REQ-20261005-010',
    nomorSuratDesa: '510/115/DS-SKM/X/2026',
    nik: '3201142104880003',
    namaLengkap: 'Hendra Pratama',
    nomorWhatsapp: '081234567890',
    nomorKk: '3201141112100002',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1988-04-21',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Wiraswasta / Pemilik Usaha',
    alamat: 'Jl. Melati Raya No. 12, RT 02 / RW 03',
    rt: '02',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SKU',
    keperluan: 'Persyaratan legalitas Nomor Induk Berusaha (NIB) dan kemitraan distributor pangan.',
    rincianTambahan: {
      'Nama Usaha': 'CV Pratama Berkah Abadi',
      'Bidang Usaha': 'Distribusi Hasil Bumi & Pangan',
      'Tahun Berdiri': '2019',
      'Lokasi Usaha': 'Ruko Sukamaju Indah No. 3'
    },
    attachments: [
      {
        id: 'att-10',
        type: 'ktp',
        name: 'KTP_Hendra.jpg',
        fileUrl: 'https://placehold.co/600x400/14532d/ffffff?text=KTP+HENDRA+PRATAMA',
        uploadedAt: '2026-10-05 10:00 WIB',
        uploadedBy: 'Siti Rohmah (RT 02)',
        status: 'valid'
      },
      {
        id: 'att-11',
        type: 'kk',
        name: 'KK_Hendra.jpg',
        fileUrl: 'https://placehold.co/600x400/14532d/ffffff?text=KK+HENDRA+PRATAMA',
        uploadedAt: '2026-10-05 10:00 WIB',
        uploadedBy: 'Siti Rohmah (RT 02)',
        status: 'valid'
      },
      {
        id: 'att-12',
        type: 'surat_selesai_scan',
        name: 'Scan_SKU_Hendra_Pratama_Signed_Cap.pdf',
        fileUrl: 'https://placehold.co/600x800/065f46/ffffff?text=SURAT+RESMI+TERTANDATANGANI+KADES+%2B+CAP+DESA',
        uploadedAt: '2026-10-05 16:30 WIB',
        uploadedBy: 'Asep Ridwan (Operator)',
        status: 'valid'
      }
    ],
    status: 'selesai_siap_ambil',
    createdAt: '2026-10-05 10:00 WIB',
    updatedAt: '2026-10-05 16:35 WIB',
    completedAt: '2026-10-05 16:35 WIB',
    slaActualHours: 6.5,
    estimatedCompletion: '2026-10-05 17:00 WIB',
    timeline: [
      {
        id: 't-9',
        status: 'menunggu_verifikasi',
        timestamp: '05 Okt 2026, 10:00 WIB',
        actor: 'Siti Rohmah (RT 02)',
        role: 'rt',
        note: 'Diajukan oleh RT 02'
      },
      {
        id: 't-10',
        status: 'diproses',
        timestamp: '05 Okt 2026, 11:15 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Verifikasi berkas lolos, dicetak'
      },
      {
        id: 't-11',
        status: 'menunggu_ttd_kades',
        timestamp: '05 Okt 2026, 14:00 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Telah diajukan ke Kades'
      },
      {
        id: 't-12',
        status: 'selesai_siap_ambil',
        timestamp: '05 Okt 2026, 16:35 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Surat telah ditandatangani basah oleh Kades Sukamaju & distempel. Scan dokumen resmi berhasil diupload. Notifikasi WhatsApp otomatis terkirim ke warga.'
      }
    ]
  },
  {
    id: 'req-006',
    ticketNumber: 'REQ-20261004-008',
    nomorSuratDesa: '474/109/DS-SKM/X/2026',
    nik: '3201145102990001',
    namaLengkap: 'Anisa Rahmawati',
    nomorWhatsapp: '082155667788',
    nomorKk: '3201140901130004',
    tempatLahir: 'Bogor',
    tanggalLahir: '1999-02-11',
    jenisKelamin: 'Perempuan',
    agama: 'Islam',
    pekerjaan: 'Karyawan Swasta',
    alamat: 'Kp. Sindangreret RT 01 / RW 03',
    rt: '01',
    rw: '03',
    desa: 'Desa Sukamaju',
    serviceType: 'SPN',
    keperluan: 'Pengantar Pernikahan Model N1-N4 ke Kantor Urusan Agama (KUA) Kec. Sukamaju.',
    attachments: [
      {
        id: 'att-13',
        type: 'ktp',
        name: 'KTP_Anisa.jpg',
        fileUrl: 'https://placehold.co/600x400/334155/ffffff?text=KTP+ANISA',
        uploadedAt: '2026-10-04 09:00 WIB',
        uploadedBy: 'Bambang Sutrisno (RT 01)',
        status: 'valid'
      },
      {
        id: 'att-14',
        type: 'surat_selesai_scan',
        name: 'Surat_Pengantar_Nikah_Anisa_Signed.pdf',
        fileUrl: 'https://placehold.co/600x800/1e293b/ffffff?text=SURAT+NIKAH+SIGNED',
        uploadedAt: '2026-10-04 15:30 WIB',
        uploadedBy: 'Asep Ridwan (Operator)',
        status: 'valid'
      }
    ],
    status: 'sudah_diambil',
    createdAt: '2026-10-04 09:00 WIB',
    updatedAt: '2026-10-05 09:30 WIB',
    completedAt: '2026-10-04 15:30 WIB',
    slaActualHours: 6.5,
    estimatedCompletion: '2026-10-04 16:00 WIB',
    timeline: [
      {
        id: 't-13',
        status: 'menunggu_verifikasi',
        timestamp: '04 Okt 2026, 09:00 WIB',
        actor: 'Bambang Sutrisno (RT 01)',
        role: 'rt',
        note: 'Pengajuan dibuat'
      },
      {
        id: 't-14',
        status: 'selesai_siap_ambil',
        timestamp: '04 Okt 2026, 15:30 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Dokumen selesai & scan terunggah'
      },
      {
        id: 't-15',
        status: 'sudah_diambil',
        timestamp: '05 Okt 2026, 09:30 WIB',
        actor: 'Asep Ridwan (Operator)',
        role: 'operator',
        note: 'Dokumen asli fisik telah diambil langsung di loket pelayanan kantor desa. NIK & KTP telah diverifikasi.'
      }
    ],
    handover: {
      pickedUpAt: '05 Okt 2026, 09:30 WIB',
      pickedUpBy: 'Anisa Rahmawati',
      relationToCitizen: 'Pemohon Sendiri',
      operatorName: 'Asep Ridwan, S.Kom',
      notes: 'Diserahkan langsung dengan mencocokkan KTP Asli. Kondisi fisik surat utuh berstempel.',
      idCardVerified: true
    }
  }
];

export const MOCK_VILLAGE_STATS: VillageStats[] = [
  {
    villageId: 'v-01',
    villageName: 'Desa Sukamaju',
    totalRequests: 148,
    completed: 139,
    inProgress: 6,
    revision: 3,
    averageSlaHours: 4.8,
    slaPerformancePercent: 96.2,
    topService: 'Surat Keterangan Usaha (SKU)'
  },
  {
    villageId: 'v-02',
    villageName: 'Desa Bojonggede',
    totalRequests: 112,
    completed: 98,
    inProgress: 9,
    revision: 5,
    averageSlaHours: 7.2,
    slaPerformancePercent: 88.5,
    topService: 'Surat Keterangan Tidak Mampu (SKTM)'
  },
  {
    villageId: 'v-03',
    villageName: 'Desa Karangmekar',
    totalRequests: 86,
    completed: 75,
    inProgress: 7,
    revision: 4,
    averageSlaHours: 9.1,
    slaPerformancePercent: 82.0,
    topService: 'Surat Pengantar SKCK'
  },
  {
    villageId: 'v-04',
    villageName: 'Desa Sindanglaya',
    totalRequests: 74,
    completed: 68,
    inProgress: 4,
    revision: 2,
    averageSlaHours: 5.4,
    slaPerformancePercent: 93.8,
    topService: 'Surat Keterangan Domisili'
  },
  {
    villageId: 'v-05',
    villageName: 'Desa Sukaresmi',
    totalRequests: 62,
    completed: 55,
    inProgress: 5,
    revision: 2,
    averageSlaHours: 6.0,
    slaPerformancePercent: 90.1,
    topService: 'Surat Pengantar Nikah (N1-N4)'
  }
];

export const INITIAL_WA_LOGS: WhatsAppMessageLog[] = [
  {
    id: 'wa-001',
    recipientPhone: '081234567890',
    recipientName: 'Hendra Pratama',
    ticketNumber: 'REQ-20261005-010',
    messageType: 'SIAP_DIAMBIL',
    content: 'Yth. Bpk/Ibu Hendra Pratama, permohonan Surat Keterangan Usaha (SKU) No: 510/115/DS-SKM/X/2026 telah SELESAI ditandatangani Kepala Desa Sukamaju. Silakan ambil fisik surat di Kantor Pelayanan Desa Sukamaju pada jam kerja (08.00-15.00 WIB) dengan membawa KTP Asli. Lampiran soft-copy juga telah dikirimkan ke Ketua RT Anda. Terima kasih.',
    timestamp: '2026-10-05 16:35 WIB',
    status: 'Terkirim',
    directWaLink: 'https://wa.me/6281234567890?text=Halo%20Bpk%2FIbu%20Hendra%20Pratama%2C%20Surat%20Keterangan%20Usaha%20Anda%20telah%20selesai'
  },
  {
    id: 'wa-002',
    recipientPhone: '081287654321',
    recipientName: 'Budi Santoso',
    ticketNumber: 'REQ-20261006-001',
    messageType: 'PERMINTAAN_REVISI',
    content: 'Pemberitahuan Desa Sukamaju: Permohonan SKU Anda membutuhkan perbaikan dokumen: Foto Kartu Keluarga (KK) buram dan nomor NIK kepala keluarga tidak terbaca. Mohon segera hubungi Ketua RT 01 Anda untuk update dokumen.',
    timestamp: '2026-10-06 09:15 WIB',
    status: 'Terkirim',
    directWaLink: 'https://wa.me/6281287654321?text=Halo%20Bpk%20Budi%2C%20mohon%20kirimkan%20ulang%20foto%20KK%20yang%20jelas'
  }
];
