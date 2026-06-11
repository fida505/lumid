import React from 'react';

const VIEWS = [
  { section: '🧠 Clinical Monitoring', items: [
    { key: 'patients', label: 'Patient Overview', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
    { key: 'timeline', label: 'Cognitive Timeline', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { key: 'chat', label: 'Chat Analyzer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, pill: '3' },
  ]},
  { section: '📈 Cognitive Intelligence', items: [
    { key: 'narrative', label: 'Narrative Map', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg> },
    { key: 'insights', label: 'Insights & Plans', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg> },
  ]},
  { section: '📦 Intervention Library', items: [
    { key: null, label: 'Protocol Library', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
  ]},
  { section: '🔔 Escalation Center', items: [
    { key: 'alerts', label: 'Alerts', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>, pill: '5' },
    { key: null, label: 'Latency Report', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ]},
];

export default function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-brand">
          <div className="sb-gem">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div className="sb-wordmark">Lumid</div>
            <div className="sb-tagline">Emotional OS</div>
          </div>
        </div>
      </div>

      {VIEWS.map((sec, si) => (
        <div className="sb-section" key={si}>
          <div className="sb-section-label">{sec.section}</div>
          {sec.items.map((item, ii) => (
            <div
              key={ii}
              className={`sb-item${activeView === item.key ? ' active' : ''}`}
              onClick={() => item.key && onViewChange(item.key)}
            >
              {item.icon}
              {item.label}
              {item.pill && <span className="sb-pill red">{item.pill}</span>}
            </div>
          ))}
        </div>
      ))}

      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">DR</div>
          <div>
            <div className="sb-user-name">Dr. Reyes</div>
            <div className="sb-user-role">Licensed Psychologist</div>
          </div>
          <div className="sb-status"></div>
        </div>
      </div>
    </aside>
  );
}
