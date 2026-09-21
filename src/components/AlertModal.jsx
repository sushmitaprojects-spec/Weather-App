import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, PhoneCall, Smartphone } from 'lucide-react';
import { api } from '../services/api';

export default function AlertModal({ isOpen, onClose, modalData, currentLang }) {
  const [channel, setChannel] = useState('sms');
  const [phone,   setPhone]   = useState('+91 98765 43210');
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !modalData) return null;

  const channels = [
    { id: 'sms',       label: 'SMS Alert',      Icon: MessageSquare },
    { id: 'whatsapp',  label: 'WhatsApp',        Icon: Smartphone },
    { id: 'ivr',       label: 'IVR Voice Call',  Icon: PhoneCall }
  ];

  const handleSend = async () => {
    setSending(true);
    setError('');
    try {
      await api.sendAlert({ wardId: modalData.ward.id, channel, phone, message: modalData.adviceText });
      setSent(true);
      setTimeout(() => { setSent(false); onClose(); }, 2500);
    } catch (sendError) {
      setError(sendError.message);
    } finally {
      setSending(false);
    }
  };

  const riskColors = {
    safe:     '#10B981', moderate: '#F59E0B',
    high:     '#F97316', critical:  '#EF4444'
  };
  const rc = riskColors[modalData.riskResult?.category] || '#00B4D8';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
    }}>
      <div style={{
        width: '100%', maxWidth: 440,
        background: '#0E1626',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        padding: '24px'
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#4D6080', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Azure Communication Services
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#F0F4FF' }}>Dispatch Early Warning Alert</h3>
            <p style={{ fontSize: 12, color: '#8A9BC0', marginTop: 2 }}>Send precision safety alert in native language</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8A9BC0' }}>
            <X size={16} />
          </button>
        </div>

        {/* Channel Selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            Delivery Channel
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {channels.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setChannel(id)} style={{
                padding: '9px 6px', borderRadius: 9, cursor: 'pointer', border: '1px solid',
                borderColor: channel === id ? '#00B4D8' : 'rgba(255,255,255,0.1)',
                background: channel === id ? 'rgba(0,180,216,0.12)' : 'rgba(0,0,0,0.2)',
                color: channel === id ? '#00B4D8' : '#8A9BC0',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s'
              }}>
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
            Recipient Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="form-input"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>

        {/* Preview */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
            Message Preview ({channel.toUpperCase()})
          </label>
          <div style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'rgba(0,0,0,0.35)',
            border: `1px solid ${rc}30`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: rc }}>
                ⚠️ {modalData.riskResult?.levelCode || 'Risk Alert'} — Heat Warning
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#C0CDE0', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{modalData.adviceText}"
            </p>
            <div style={{ fontSize: 10, color: '#4D6080', marginTop: 8, fontFamily: 'JetBrains Mono, monospace', textAlign: 'right' }}>
              Azure Communication Services · {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Send Button */}
        {sent ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px', borderRadius: 9,
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.4)',
            color: '#10B981', fontWeight: 700, fontSize: 13
          }}>
            <CheckCircle2 size={16} />
            Alert dispatched to {phone}!
          </div>
        ) : (
          <button onClick={handleSend} disabled={sending} className="btn btn-primary btn-wide">
            <Send size={14} />
            {sending ? 'Dispatching…' : 'Dispatch Now'}
          </button>
        )}
        {error && <div style={{ marginTop: 10, color: '#FCA5A5', fontSize: 12 }}>{error}</div>}

      </div>
    </div>
  );
}
