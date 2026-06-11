import React, { useEffect, useRef } from 'react';

export default function TimelineView() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === 'undefined') return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14'],
        datasets: [
          { label: 'Mood', data: [6, 5, 7, 4, 4, 3, 4], borderColor: '#1C2E3E', backgroundColor: 'rgba(28,46,62,.07)', borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#1C2E3E', tension: 0.4, fill: true },
          { label: 'Sentiment', data: [0.3, 0.1, 0.4, -0.2, -0.3, -0.5, -0.4], borderColor: '#F6BE00', borderWidth: 2, pointRadius: 3, tension: 0.4, borderDash: [5, 3], fill: false, yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1C2E3E', titleFont: { size: 11 }, bodyFont: { size: 11 }, padding: 8 } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,.03)' }, ticks: { font: { family: 'DM Sans', size: 11 }, color: '#8A9BAB' } },
          y: { grid: { color: 'rgba(0,0,0,.03)' }, min: 0, max: 10, ticks: { font: { size: 11 }, color: '#8A9BAB' } },
          y1: { position: 'right', grid: { display: false }, min: -1, max: 1, ticks: { font: { size: 11 }, color: '#8A9BAB' } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="view active" id="view-timeline">
      <div className="tl-layout">
        <div>
          <div className="tl-chart-card">
            <div className="tl-header">
              <div className="tl-patient">
                <div className="tl-av" style={{ background: '#E8F0F7', color: '#2C3E4F' }}>SL</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Sofia Larson</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Session 14 · GAD, Trauma History</div>
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="risk-pill watch"><span className="rp-dot"></span>Watch</span>
                <div className="tabs">
                  <button className="tab active">7D</button>
                  <button className="tab">30D</button>
                  <button className="tab">90D</button>
                </div>
              </div>
            </div>
            <div className="chart-wrap"><canvas ref={canvasRef} id="moodChart"></canvas></div>
            <div className="legend-row">
              <div className="leg-item"><div className="leg-line" style={{ background: 'var(--slate)' }}></div>Mood Score</div>
              <div className="leg-item"><div className="leg-line" style={{ background: 'var(--amber)', height: 2, borderTop: '1px dashed var(--amber)' }}></div>Sentiment</div>
              <div className="leg-item"><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)' }}></div>Escalation Flag</div>
            </div>
          </div>

          <div className="pattern-tags-card">
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 10 }}>Cognitive Pattern Tags · This Week</div>
            <div className="ptag-grid">
              <span className="ptag avoidance">⟳ Avoidance Loop · Day 3</span>
              <span className="ptag shame">↓ Shame Spiral · Moderate</span>
              <span className="ptag catastrophe">⚡ Catastrophizing · Intermittent</span>
              <span className="ptag positive">✓ Self-compassion Emerging</span>
              <span className="ptag neutral">Mind Reading</span>
              <span className="ptag neutral">Rumination Cycle</span>
            </div>
            <div className="reasoning-box">
              <div className="rb-label">AI Reasoning Trace</div>
              <div className="rb-text">Pattern identified from 3 consecutive journal entries using passive voice constructions ("things happen to me") alongside catastrophic outcome predictions. Shame spiral reinforced by self-deprecating language clusters appearing in evening check-ins. Avoidance behaviors confirmed by response delay analysis — avg reply latency doubled vs baseline.</div>
            </div>
          </div>
        </div>

        <div className="tl-side">
          <div className="tl-side-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Escalation Markers</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--critical-bg)', border: '1px solid var(--critical-border)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--critical-text)' }}>Oct 14 · 11:42 PM</div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink)', marginTop: 3 }}>"I can't keep doing this anymore"</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Sentiment: −0.78 · Flagged thread</div>
              </div>
              <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--watch-bg)', border: '1px solid var(--watch-border)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--watch-text)' }}>Oct 12 · 2:15 PM</div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink)', marginTop: 3 }}>3 missed check-ins · Flat affect</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Engagement −60%</div>
              </div>
            </div>
          </div>
          <div className="tl-side-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>7-Day Snapshot</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}><span>Avg Mood</span><span style={{ color: 'var(--ink)', fontWeight: 500 }}>4.2 / 10</span></div>
                <div className="drift-track"><div className="drift-fill-el" style={{ width: '42%', background: 'linear-gradient(90deg,var(--amber),#D4A017)' }}></div></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}><span>Engagement</span><span style={{ color: 'var(--ink)', fontWeight: 500 }}>61%</span></div>
                <div className="drift-track"><div className="drift-fill-el" style={{ width: '61%', background: 'linear-gradient(90deg,var(--sage-dark),var(--sage))' }}></div></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}><span>Narrative Drift</span><span style={{ color: 'var(--critical-text)', fontWeight: 500 }}>High · 0.78</span></div>
                <div className="drift-track"><div className="drift-fill-el" style={{ width: '78%', background: 'linear-gradient(90deg,#FF8A80,var(--coral))' }}></div></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}><span>Positive Anchors</span><span style={{ color: '#1E6B30', fontWeight: 500 }}>3 found</span></div>
                <div className="drift-track"><div className="drift-fill-el" style={{ width: '30%', background: 'linear-gradient(90deg,var(--sage-dark),#52D98E)' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
