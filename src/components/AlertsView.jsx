import React, { useEffect, useRef } from 'react';
import { ALERTS } from '../data';

export default function AlertsView() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === 'undefined') return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Critical', 'Warning', 'Info'],
        datasets: [{ data: [2, 2, 1], backgroundColor: ['#FA6E6E', '#F6BE00', '#A5BDA8'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 10 } } }, cutout: '65%' }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="view active" id="view-alerts">
      <div className="alerts-layout">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div className="tabs">
              <button className="tab active">All · 5</button>
              <button className="tab">Critical · 2</button>
              <button className="tab">Warning · 2</button>
              <button className="tab">Info · 1</button>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '12.5px', color: 'var(--muted)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--slate)' }} /> Quiet Mode
              </label>
              <button className="aib">Select All</button>
            </div>
          </div>
          <div id="alerts-list">
            {ALERTS.map((a, i) => (
              <div key={i} className={`alert-item ${a.sev}`}>
                <div className={`ai-sev ${a.sev}`}></div>
                <div className="ai-body">
                  <div className="ai-patient">{a.name}</div>
                  <div className="ai-title">{a.title}</div>
                  <div className="ai-desc">{a.desc}</div>
                  <span className="ai-cluster">{a.cluster}</span>
                  <div className="ai-actions">
                    {a.sev === 'critical' && <button className="aib red">Escalate</button>}
                    <button className="aib">Mark Safe</button>
                    <button className="aib">Snooze 24h</button>
                    <button className="aib">View Patient</button>
                  </div>
                </div>
                <div className="ai-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="chart-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Alert Summary</div>
            <div style={{ height: 120 }}><canvas ref={canvasRef} id="alertChart"></canvas></div>
          </div>
          <div className="chart-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Avg Response Time</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: 'var(--slate)' }}>2.4<span style={{ fontSize: 16, color: 'var(--muted)' }}> hrs</span></div>
            <div style={{ fontSize: '11.5px', color: 'var(--stable-text)' }}>↑ Within target (&lt;4h)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
