/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { RTDashboard } from './components/rt/RTDashboard';
import { OperatorDashboard } from './components/operator/OperatorDashboard';
import { KecamatanDashboard } from './components/kecamatan/KecamatanDashboard';
import { RequestDetailModal } from './components/modals/RequestDetailModal';
import { LetterPreviewModal } from './components/modals/LetterPreviewModal';
import { PublicVerificationModal } from './components/modals/PublicVerificationModal';
import { WhatsAppGatewayModal } from './components/modals/WhatsAppGatewayModal';
import {
  Users,
  Building2,
  Landmark,
  ShieldCheck,
  Send,
  HelpCircle
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, setWaModalOpen, switchUserById } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header with Role Switcher & Live Clock */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentUser.role === 'rt' && <RTDashboard />}
        {currentUser.role === 'operator' && <OperatorDashboard />}
        {currentUser.role === 'kecamatan' && <KecamatanDashboard />}
      </main>

      {/* Quick Role Switcher Floating Footer Helper */}
      <div className="bg-white border-t border-slate-200 py-3 px-4 shadow-xs sticky bottom-0 z-20 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-semibold text-slate-700">Simulasi Alur Kerja RBAC:</span>
            <span className="hidden md:inline">Klik peran untuk berpindah tampilan seketika:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => switchUserById('user-rt-01')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentUser.id === 'user-rt-01'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1. RT 01 (Pak Bambang)</span>
            </button>

            <button
              onClick={() => switchUserById('user-rt-02')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentUser.id === 'user-rt-02'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>RT 02 (Bu Siti)</span>
            </button>

            <button
              onClick={() => switchUserById('user-operator')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentUser.id === 'user-operator'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>2. Operator Desa (Kang Asep)</span>
            </button>

            <button
              onClick={() => switchUserById('user-kecamatan')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentUser.id === 'user-kecamatan'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>3. Kecamatan (Pak Camat Suryana)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Modals */}
      <RequestDetailModal />
      <LetterPreviewModal />
      <PublicVerificationModal />
      <WhatsAppGatewayModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
