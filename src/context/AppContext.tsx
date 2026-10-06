import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CitizenRequest,
  CurrentUser,
  DocumentAttachment,
  RequestStatus,
  ServiceType,
  VillageStats,
  WhatsAppMessageLog
} from '../types';
import {
  INITIAL_REQUESTS,
  INITIAL_WA_LOGS,
  MOCK_USERS,
  MOCK_VILLAGE_STATS,
  SERVICE_METAS
} from '../data/mockData';

interface WaGatewayConfig {
  provider: 'Simulasi Terpadu' | 'Fonnte WA Gateway' | 'Wablas API' | 'Twilio API';
  apiKey: string;
  senderPhone: string;
  autoSendOnReady: boolean;
  autoSendOnRevision: boolean;
  autoSendOnSubmission: boolean;
}

interface AppContextType {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  switchUserById: (id: string) => void;
  users: CurrentUser[];

  requests: CitizenRequest[];
  createRequest: (newReqData: {
    nik: string;
    namaLengkap: string;
    nomorWhatsapp: string;
    nomorKk: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    agama: string;
    pekerjaan: string;
    alamat: string;
    rt: string;
    rw: string;
    desa: string;
    serviceType: ServiceType;
    keperluan: string;
    rincianTambahan?: Record<string, string>;
    attachments: DocumentAttachment[];
  }) => CitizenRequest;

  operatorAcceptRequest: (requestId: string) => void;
  operatorRequestRevision: (requestId: string, reason: string) => void;
  operatorSendToKades: (requestId: string) => void;
  operatorCompleteRequest: (requestId: string, scanDocUrl?: string, scanDocName?: string) => void;
  rtSubmitRevision: (requestId: string, updatedAttachments: DocumentAttachment[], note?: string) => void;
  recordHandover: (requestId: string, handoverData: NonNullable<CitizenRequest['handover']>) => void;
  deleteRequest: (requestId: string) => void;
  resetToSampleData: () => void;

  // WA Gateway
  waLogs: WhatsAppMessageLog[];
  waGatewayConfig: WaGatewayConfig;
  updateWaGatewayConfig: (config: Partial<WaGatewayConfig>) => void;
  sendManualWhatsApp: (phone: string, text: string) => void;

  // Stats
  villageStats: VillageStats[];

  // Active view modals
  selectedRequest: CitizenRequest | null;
  setSelectedRequest: (req: CitizenRequest | null) => void;
  letterModalRequest: CitizenRequest | null;
  setLetterModalRequest: (req: CitizenRequest | null) => void;
  verificationModalRequest: CitizenRequest | null;
  setVerificationModalRequest: (req: CitizenRequest | null) => void;
  waModalOpen: boolean;
  setWaModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REQUESTS: 'sipades_requests_v1',
  WA_LOGS: 'sipades_wa_logs_v1',
  ACTIVE_USER: 'sipades_active_user_v1',
  GATEWAY_CONFIG: 'sipades_gateway_config_v1'
};

const DEFAULT_WA_CONFIG: WaGatewayConfig = {
  provider: 'Simulasi Terpadu',
  apiKey: 'FONNTE_DEMO_KEY_DS_SKM_2026',
  senderPhone: '0857-1234-5678 (KANTOR DESA SUKAMAJU)',
  autoSendOnReady: true,
  autoSendOnRevision: true,
  autoSendOnSubmission: true
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (saved) {
      try {
        const found = MOCK_USERS.find(u => u.id === saved);
        if (found) return found;
      } catch (e) {
        console.error(e);
      }
    }
    return MOCK_USERS[0]; // Default: RT 01 Bambang Sutrisno
  });

  const [requests, setRequests] = useState<CitizenRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REQUESTS;
  });

  const [waLogs, setWaLogs] = useState<WhatsAppMessageLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WA_LOGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_WA_LOGS;
  });

  const [waGatewayConfig, setWaGatewayConfig] = useState<WaGatewayConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GATEWAY_CONFIG);
    if (saved) {
      try {
        return { ...DEFAULT_WA_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_WA_CONFIG;
  });

  const [villageStats] = useState<VillageStats[]>(MOCK_VILLAGE_STATS);

  // Modals state
  const [selectedRequest, setSelectedRequest] = useState<CitizenRequest | null>(null);
  const [letterModalRequest, setLetterModalRequest] = useState<CitizenRequest | null>(null);
  const [verificationModalRequest, setVerificationModalRequest] = useState<CitizenRequest | null>(null);
  const [waModalOpen, setWaModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WA_LOGS, JSON.stringify(waLogs));
  }, [waLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_CONFIG, JSON.stringify(waGatewayConfig));
  }, [waGatewayConfig]);

  const switchUserById = (id: string) => {
    const target = MOCK_USERS.find(u => u.id === id);
    if (target) {
      setCurrentUser(target);
    }
  };

  const updateWaGatewayConfig = (config: Partial<WaGatewayConfig>) => {
    setWaGatewayConfig(prev => ({ ...prev, ...config }));
  };

  // Helper to format date in Indonesian standard
  const getFormattedNow = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  };

  const dispatchWaNotification = (
    phone: string,
    citizenName: string,
    ticketNumber: string,
    messageType: 'PENGAJUAN_DITERIMA' | 'PERMINTAAN_REVISI' | 'SIAP_DIAMBIL',
    content: string
  ) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const directWaLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(content)}`;

    const newLog: WhatsAppMessageLog = {
      id: `wa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientPhone: phone,
      recipientName: citizenName,
      ticketNumber,
      messageType,
      content,
      timestamp: getFormattedNow(),
      status: 'Terkirim',
      directWaLink
    };

    setWaLogs(prev => [newLog, ...prev]);
  };

  const createRequest = (newReqData: {
    nik: string;
    namaLengkap: string;
    nomorWhatsapp: string;
    nomorKk: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    agama: string;
    pekerjaan: string;
    alamat: string;
    rt: string;
    rw: string;
    desa: string;
    serviceType: ServiceType;
    keperluan: string;
    rincianTambahan?: Record<string, string>;
    attachments: DocumentAttachment[];
  }): CitizenRequest => {
    const countToday = requests.length + 1;
    const todayNum = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ticketNumber = `REQ-${todayNum}-${String(countToday).padStart(3, '0')}`;
    const timestamp = getFormattedNow();
    const serviceMeta = SERVICE_METAS[newReqData.serviceType];

    const newRequest: CitizenRequest = {
      id: `req-${Date.now()}`,
      ticketNumber,
      nomorSuratDesa: undefined,
      ...newReqData,
      status: 'menunggu_verifikasi',
      createdAt: timestamp,
      updatedAt: timestamp,
      estimatedCompletion: 'Dalam 24 Jam Kerja',
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: 'menunggu_verifikasi',
          timestamp,
          actor: `${currentUser.name} (${currentUser.identifier})`,
          role: currentUser.role,
          note: `Permohonan baru ${serviceMeta?.name || newReqData.serviceType} berhasil didaftarkan ke sistem oleh RT.`
        }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);

    // Send WhatsApp notification if enabled
    if (waGatewayConfig.autoSendOnSubmission && newReqData.nomorWhatsapp) {
      const waMsg = `Halo Bpk/Ibu ${newReqData.namaLengkap}, permohonan ${serviceMeta?.name || newReqData.serviceType} Anda telah didaftarkan oleh ${currentUser.name} (${currentUser.identifier}) dengan No. Tiket: ${ticketNumber}. Berkas Anda sedang menunggu verifikasi petugas Kantor Pelayanan Desa Sukamaju. Anda dapat memantau status melalui RT setempat. Terima kasih.`;
      dispatchWaNotification(newReqData.nomorWhatsapp, newReqData.namaLengkap, ticketNumber, 'PENGAJUAN_DITERIMA', waMsg);
    }

    return newRequest;
  };

  const operatorAcceptRequest = (requestId: string) => {
    const timestamp = getFormattedNow();
    const currentYear = new Date().getFullYear();
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const currentRomanMonth = romanMonths[new Date().getMonth()];
    const randomSeq = String(Math.floor(Math.random() * 80) + 120).padStart(3, '0');

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        // Code prefix by type
        let codePrefix = '470';
        if (r.serviceType === 'SKU') codePrefix = '510';
        if (r.serviceType === 'SKCK') codePrefix = '331';
        if (r.serviceType === 'SPN') codePrefix = '474';

        const nomorSurat = r.nomorSuratDesa || `${codePrefix}/${randomSeq}/DS-SKM/${currentRomanMonth}/${currentYear}`;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'diproses' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (Operator)`,
          role: 'operator' as const,
          note: `Berkas lengkap dan valid. Nomor surat resmi dialokasikan (${nomorSurat}). Operator sedang mencetak draf dokumen fisik.`
        };

        return {
          ...r,
          status: 'diproses',
          nomorSuratDesa: nomorSurat,
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const operatorRequestRevision = (requestId: string, reason: string) => {
    const timestamp = getFormattedNow();

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'butuh_perbaikan' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (Operator)`,
          role: 'operator' as const,
          note: `Dokumen dikembalikan ke RT. Catatan perbaikan: "${reason}"`
        };

        // Trigger WhatsApp Notification to Citizen & RT
        if (waGatewayConfig.autoSendOnRevision && r.nomorWhatsapp) {
          const waMsg = `Pemberitahuan Pelayanan Desa Sukamaju: Permohonan dokumen ${r.serviceType} No. ${r.ticketNumber} atas nama ${r.namaLengkap} memerlukan PERBAIKAN BERKAS. Catatan Petugas: "${reason}". Mohon segera hubungi Ketua RT setempat (${r.rt}/RW ${r.rw}) untuk memperbarui foto/scan berkas. Terima kasih.`;
          dispatchWaNotification(r.nomorWhatsapp, r.namaLengkap, r.ticketNumber, 'PERMINTAAN_REVISI', waMsg);
        }

        return {
          ...r,
          status: 'butuh_perbaikan',
          rejectionReason: reason,
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const operatorSendToKades = (requestId: string) => {
    const timestamp = getFormattedNow();

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'menunggu_ttd_kades' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (Operator)`,
          role: 'operator' as const,
          note: 'Draf surat telah dicetak dan diajukan ke meja Kepala Desa untuk tanda tangan basah serta stempel dinas.'
        };

        return {
          ...r,
          status: 'menunggu_ttd_kades',
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const operatorCompleteRequest = (requestId: string, scanDocUrl?: string, scanDocName?: string) => {
    const timestamp = getFormattedNow();

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'selesai_siap_ambil' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (Operator)`,
          role: 'operator' as const,
          note: 'Surat fisik telah ditandatangani basah Kepala Desa & stempel dinas. Scan dokumen resmi diunggah ke sistem. Notifikasi WhatsApp otomatis dikirimkan ke warga & RT.'
        };

        // Attach scanned completed doc
        const defaultDocUrl = 'https://placehold.co/600x800/065f46/ffffff?text=SURAT+RESMI+TERTANDATANGANI+KADES+%2B+CAP+DESA';
        const updatedAttachments: DocumentAttachment[] = [
          ...r.attachments,
          {
            id: `att-scan-${Date.now()}`,
            type: 'surat_selesai_scan',
            name: scanDocName || `Scan_Surat_${r.serviceType}_${r.namaLengkap.replace(/\s+/g, '_')}_Signed.pdf`,
            fileUrl: scanDocUrl || defaultDocUrl,
            uploadedAt: timestamp,
            uploadedBy: `${currentUser.name} (Operator)`,
            status: 'valid'
          }
        ];

        // Trigger WhatsApp
        if (waGatewayConfig.autoSendOnReady && r.nomorWhatsapp) {
          const serviceName = SERVICE_METAS[r.serviceType]?.name || r.serviceType;
          const waMsg = `Yth. Bpk/Ibu ${r.namaLengkap}, permohonan ${serviceName} (No. Surat: ${r.nomorSuratDesa || r.ticketNumber}) telah SELESAI ditandatangani oleh Kepala Desa Sukamaju dan distempel basah. Fisik surat asli dapat diambil di Kantor Pelayanan Desa Sukamaju pada hari kerja (Senin-Jumat, 08.00 - 15.00 WIB) dengan membawa KTP Asli. Bukti soft-copy telah dikirimkan ke Ketua RT Anda. Terima kasih. (Kantor Pelayanan Desa Sukamaju)`;
          dispatchWaNotification(r.nomorWhatsapp, r.namaLengkap, r.ticketNumber, 'SIAP_DIAMBIL', waMsg);
        }

        return {
          ...r,
          status: 'selesai_siap_ambil',
          attachments: updatedAttachments,
          completedAt: timestamp,
          slaActualHours: 4.5,
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const rtSubmitRevision = (requestId: string, updatedAttachments: DocumentAttachment[], note?: string) => {
    const timestamp = getFormattedNow();

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'menunggu_verifikasi' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (${currentUser.identifier})`,
          role: 'rt' as const,
          note: note ? `RT memperbarui dokumen persyaratan: ${note}` : 'RT telah memperbarui dan mengunggah ulang dokumen yang diminta.'
        };

        return {
          ...r,
          status: 'menunggu_verifikasi',
          rejectionReason: undefined,
          attachments: updatedAttachments,
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const recordHandover = (requestId: string, handoverData: NonNullable<CitizenRequest['handover']>) => {
    const timestamp = getFormattedNow();

    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;

        const newTimelineEvent = {
          id: `t-${Date.now()}`,
          status: 'sudah_diambil' as RequestStatus,
          timestamp,
          actor: `${currentUser.name} (Operator)`,
          role: 'operator' as const,
          note: `Surat fisik asli telah diserahkan di loket desa kepada ${handoverData.pickedUpBy} (${handoverData.relationToCitizen}). KTP telah diverifikasi.`
        };

        return {
          ...r,
          status: 'sudah_diambil',
          handover: handoverData,
          updatedAt: timestamp,
          timeline: [...r.timeline, newTimelineEvent]
        };
      })
    );
  };

  const deleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const resetToSampleData = () => {
    setRequests(INITIAL_REQUESTS);
    setWaLogs(INITIAL_WA_LOGS);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.WA_LOGS);
  };

  const sendManualWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const url = `https://wa.me/${intlPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserById,
        users: MOCK_USERS,
        requests,
        createRequest,
        operatorAcceptRequest,
        operatorRequestRevision,
        operatorSendToKades,
        operatorCompleteRequest,
        rtSubmitRevision,
        recordHandover,
        deleteRequest,
        resetToSampleData,
        waLogs,
        waGatewayConfig,
        updateWaGatewayConfig,
        sendManualWhatsApp,
        villageStats,
        selectedRequest,
        setSelectedRequest,
        letterModalRequest,
        setLetterModalRequest,
        verificationModalRequest,
        setVerificationModalRequest,
        waModalOpen,
        setWaModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
