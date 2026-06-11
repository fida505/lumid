import React, { useEffect, useRef } from 'react';
import { PTS } from '../data';

export default function Flyout({ patientId, onClose, onViewChange }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const p = PTS.find(item => item.id === patientId);

  useEffect(() => {
    if (!p || !canvasRef.current || typeof Chart === 'undefined') return;
    if (chartRef.current) chartRef.current.destroy();

    const col = p.status === 'critical' ? '#FA6E6E' : p.status === 'watch' ? '#F6BE00' : '#7A9E7E';

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14'],
        datasets: [{
          data: p.mood,
          borderColor: col,
          backgroundColor: col + '18',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: col,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: 'rgba(0,0,0,.03)' }, min: 0, max: 10, ticks: { font: { size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [p]);

  if (!p) return null;

  return (
    <div className="flyout-overlay open" id="flyout-overlay" onClick={onClose}>
      <div className="flyout-bg"></div>
      <div className="flyout" id="flyout" onClick={(e) => e.stopPropagation()}>
        <div className="flyout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="tl-av" style={{ background: p.bg, color: p.fg, width: 34, height: 34, fontSize: 13 }}>{p.initials}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{p.arc}</div>
            </div>
          </div>
          <button className="icon-btn" style={{ marginLeft: 'auto' }} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="flyout-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>7-Day Emotional Trajectory</span>
            <span className={`risk-pill ${p.status}`}><span className="rp-dot"></span>{p.status}</span>
          </div>

          <div className="flyout-chart-wrap" style={{ height: 110, marginBottom: 16 }}><canvas ref={canvasRef}></canvas></div>

          <div className="flyout-section">
            <div className="fs-label">Primary Emotions Detected</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.emotions.map((e, i) => (
                <span key={i} className="emo-tag" style={{ background: e.bg, color: '#333', border: `1px solid ${e.color}33` }}>
                  {e.name}
                  <span className="emo-int">{Array(e.int).fill(0).map((_, j) => <span key={j} className="emo-int-dot" style={{ background: e.color }}></span>)}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flyout-section">
            <div className="fs-label">Clinical Reasoning (AI Trace)</div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate-mid)', lineHeight: 1.6 }}>{p.reasoning}</div>
          </div>

          <div className="flyout-section" style={{ borderBottom: 'none' }}>
            <div className="fs-label">Actionable Insights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {p.insights.map((ins, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: '12.5px', color: 'var(--slate-mid)', lineHeight: 1.5 }}>
                  <span style={{ color: p.status === 'critical' ? 'var(--coral)' : 'var(--sage-dark)' }}>•</span>
                  <span>{ins}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flyout-footer" style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Close</button>
          <button
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => { onViewChange('timeline'); onClose(); }}
          >
            Open Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}
