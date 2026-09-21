import React from 'react';
import { Globe, Building2, Users, ShieldAlert, Wifi } from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../utils/languages';

export default function Header({ currentLang, setCurrentLang, activeTab, setActiveTab }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(7, 13, 26, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0 24px'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 60, gap: 16 }}>

        {/* Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #EF4444, #F97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(249,115,22,0.35)'
          }}>
            <ShieldAlert size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#F0F4FF', lineHeight: 1.2 }}>
              ThermalGuard AI
            </div>
            <div style={{ fontSize: 11, color: '#4D6080', fontFamily: 'JetBrains Mono, monospace' }}>
              SIH26083 · Extreme Weather Early Warning
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 100,
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          marginLeft: 8
        }}>
          <span className="live-dot"></span>
          <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            Azure Stream Live
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }}></div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: 3
        }}>
          <button
            onClick={() => setActiveTab('citizen')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 8, border: 'none',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
              background: activeTab === 'citizen'
                ? 'linear-gradient(135deg, #F97316, #FBBF24)'
                : 'transparent',
              color: activeTab === 'citizen' ? '#fff' : '#8A9BC0',
              boxShadow: activeTab === 'citizen' ? '0 2px 8px rgba(249,115,22,0.35)' : 'none'
            }}
          >
            <Users size={13} />
            Citizen View
          </button>
          <button
            onClick={() => setActiveTab('govt')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 8, border: 'none',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
              background: activeTab === 'govt'
                ? 'linear-gradient(135deg, #0078D4, #00B4D8)'
                : 'transparent',
              color: activeTab === 'govt' ? '#fff' : '#8A9BC0',
              boxShadow: activeTab === 'govt' ? '0 2px 8px rgba(0,120,212,0.35)' : 'none'
            }}
          >
            <Building2 size={13} />
            Govt Dashboard
          </button>
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={14} color="#8A9BC0" />
          <select
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F0F4FF',
              padding: '5px 10px',
              borderRadius: 7,
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} style={{ background: '#0E1626' }}>
                {l.native}
              </option>
            ))}
          </select>
        </div>

      </div>
    </header>
  );
}
