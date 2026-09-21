import React, { useState } from 'react';
import Header from './components/Header';
import CitizenView from './components/CitizenView';
import GovernmentView from './components/GovernmentView';
import AlertModal from './components/AlertModal';
import { ShieldAlert, Cpu, Cloud, Database, Radio, Server, Zap } from 'lucide-react';

const AZURE_SERVICES = [
  { icon: Cloud,    name: 'Azure Maps & Weather',    color: '#00B4D8' },
  { icon: Cpu,      name: 'Azure Machine Learning',  color: '#60A5FA' },
  { icon: Radio,    name: 'Azure Event Hubs',        color: '#FBBF24' },
  { icon: Zap,      name: 'Azure AI Foundry',        color: '#A78BFA' },
  { icon: Database, name: 'Azure Cosmos DB',         color: '#C084FC' },
  { icon: Server,   name: 'Azure Communication Svc', color: '#F97316' }
];

export default function App() {
  const [currentLang,    setCurrentLang]    = useState('en');
  const [activeTab,      setActiveTab]      = useState('citizen');
  const [alertModalData, setAlertModalData] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Header
        currentLang={currentLang} setCurrentLang={setCurrentLang}
        activeTab={activeTab} setActiveTab={setActiveTab}
      />

      <main style={{ flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '24px 24px 48px' }}>
        {activeTab === 'citizen'
          ? <CitizenView    currentLang={currentLang} onTriggerAlertModal={setAlertModalData} />
          : <GovernmentView currentLang={currentLang} onTriggerAlertModal={setAlertModalData} />
        }
      </main>

      <AlertModal
        isOpen={!!alertModalData}
        onClose={() => setAlertModalData(null)}
        modalData={alertModalData}
        currentLang={currentLang}
      />

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)',
        padding: '20px 24px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldAlert size={16} color="#F97316" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#F0F4FF' }}>ThermalGuard AI · SIH26083</div>
                <div style={{ fontSize: 11, color: '#4D6080', marginTop: 1 }}>Extreme Weather Early Warning & Human Thermal Stress Index · Precision Public Health Platform</div>
              </div>
            </div>
            <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#4D6080' }}>
              Powered by Azure Cloud · SIH 2026 Solution Track
            </span>
          </div>

          {/* Azure Services Strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AZURE_SERVICES.map(({ icon: Icon, name, color }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 7,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: 11, color: '#8A9BC0'
              }}>
                <Icon size={12} color={color} />
                {name}
              </div>
            ))}
          </div>

        </div>
      </footer>

    </div>
  );
}
