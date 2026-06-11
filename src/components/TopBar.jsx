import React from 'react';

const VIEW_META = {
  patients: { title: 'Patient Overview', bc: 'Patients' },
  timeline: { title: 'Cognitive Timeline', bc: 'Timeline' },
  chat: { title: 'Chat Analyzer', bc: 'Chat' },
  narrative: { title: 'Narrative Map', bc: 'Narrative' },
  insights: { title: 'Insights & Plans', bc: 'Insights' },
  alerts: { title: 'Alert Center', bc: 'Alerts' },
};

export default function TopBar({ activeView }) {
  const m = VIEW_META[activeView] || { title: activeView, bc: activeView };
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{m.title}</div>
        <div className="breadcrumb"><span>Hopemo Ai</span><span className="breadcrumb-sep">›</span><span>{m.bc}</span></div>
      </div>
      <div className="search">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input placeholder="Search patients, patterns, signals…" autoComplete="off" />
        <kbd>⌘K</kbd>
      </div>
      <div className="tb-right">
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </button>
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="notif-dot"></span>
        </button>
        <div style={{width:1,height:20,background:'var(--border)',margin:'0 4px'}}></div>
        <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,var(--sage),#6BAED6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'var(--slate)',cursor:'pointer'}}>DR</div>
      </div>
    </header>
  );
}
