import React, { useEffect, useRef, useState } from 'react';
import { MESSAGES } from '../data';

export default function ChatView() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [explainOpen, setExplainOpen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === 'undefined') return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: ['M1', 'M2', 'M3', 'M4', 'M5'],
        datasets: [{
          data: [0, 1, 3, 8, 9],
          backgroundColor: ['rgba(28,46,62,.2)', 'rgba(28,46,62,.3)', 'rgba(246,190,0,.5)', 'rgba(250,110,110,.65)', 'rgba(250,110,110,.8)'],
          borderRadius: 3,
          borderSkipped: false
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.raw} min gap` } } }, scales: { x: { display: false }, y: { display: false } } }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="view active" id="view-chat">
      <div className="chat-layout">
        <div>
          <div className="chat-card">
            <div className="chat-head">
              <div className="tl-av" style={{ background: '#FFE5E0', color: '#8B3500', width: 32, height: 32, fontSize: 13 }}>SL</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13.5px' }}>Sofia Larson — Oct 14, 11:38–11:52 PM</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Flagged thread · Late-night session · Sentiment avg −0.74</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 7, alignItems: 'center' }}>
                <span className="risk-pill critical"><span className="rp-dot"></span>Critical</span>
                <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 11px' }}>Export</button>
              </div>
            </div>
            <div className="chat-stream">
              {MESSAGES.map((m, i) => {
                const isPt = m.type === 'pt';
                let txt = m.text;
                if (m.kw) {
                  txt = (
                    <span>
                      {m.text.split(m.kw)[0]}
                      <span className="kw-highlight">{m.kw}</span>
                      {m.text.split(m.kw)[1]}
                    </span>
                  );
                }
                return (
                  <div key={i} className="msg-row" style={{ flexDirection: !isPt ? 'row-reverse' : 'row' }}>
                    <div className="msg-av" style={{ background: isPt ? '#E8F0F7' : '#E0F2F1', color: isPt ? '#1C2E3E' : '#00695C' }}>{isPt ? 'SL' : 'AI'}</div>
                    <div className="msg-wrap" style={!isPt ? { alignItems: 'flex-end', display: 'flex', flexDirection: 'column' } : {}}>
                      <div className={`msg-bubble${m.flagged ? ' flagged' : ''}`}>
                        <div className="msg-text">{txt}</div>
                        {m.flagged && <div className="kw-flag">⚑ Flagged · {m.sent}</div>}
                        <div className="sent-bar" style={{ background: `${m.sent < 0 ? 'var(--coral)' : 'var(--sage)'}33` }}>
                          <div style={{ height: '100%', width: `${Math.abs(m.sent) * 100}%`, background: m.sent < 0 ? 'var(--coral)' : 'var(--sage)', borderRadius: 2 }}></div>
                        </div>
                      </div>
                      <div className="msg-time">{m.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ai-trace-card">
            <div className="atc-head">
              <div className="atc-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="atc-title">AI Reasoning Trace — Why this thread was flagged</div>
            </div>
            <div className="atc-body">Thread flagged due to: <strong>(1)</strong> hopelessness language cluster ("can't keep doing this"), <strong>(2)</strong> third consecutive midnight session — temporal risk elevated, <strong>(3)</strong> negative sentiment peak −0.85, highest in 30-day window, <strong>(4)</strong> absence of future-oriented language, and <strong>(5)</strong> message gap inflation (+40%) consistent with dissociation pattern.</div>
            <button className="explain-toggle" onClick={() => setExplainOpen(!explainOpen)}>
              <svg viewBox="0 0 24 24" style={{ transform: explainOpen ? 'rotate(90deg)' : 'none', transition: 'transform 150ms' }}><path d="M9 18l6-6-6-6"/></svg>
              Model confidence breakdown
            </button>
            <div className={`explain-box${explainOpen ? ' open' : ''}`}>
              <div className="eb-item"><strong>Hopelessness</strong>0.84 · High</div>
              <div className="eb-item"><strong>Flat affect</strong>0.71 · Moderate</div>
              <div className="eb-item"><strong>Temporal risk</strong>0.68 · Moderate</div>
              <div className="eb-item"><strong>Overall risk</strong>0.79 · High</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="chart-card" style={{ padding: 14 }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Message Timing Gaps</div>
            <div style={{ height: 70 }}><canvas ref={canvasRef} id="timingChart"></canvas></div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>Gap inflation +40% — dissociation pattern</div>
          </div>
          <div className="chart-card" style={{ padding: 14 }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Detected Signals</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', borderRadius: 'var(--r-sm)', background: 'var(--critical-bg)', border: '1px solid var(--critical-border)' }}><span style={{ fontSize: 12 }}>Hopelessness language</span><span style={{ fontSize: '11.5px', color: 'var(--critical-text)', fontWeight: 600 }}>High</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', borderRadius: 'var(--r-sm)', background: 'var(--watch-bg)', border: '1px solid var(--watch-border)' }}><span style={{ fontSize: 12 }}>Flat affect</span><span style={{ fontSize: '11.5px', color: 'var(--watch-text)', fontWeight: 600 }}>Mod.</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', borderRadius: 'var(--r-sm)', background: 'var(--critical-bg)', border: '1px solid var(--critical-border)' }}><span style={{ fontSize: 12 }}>Late-night messaging</span><span style={{ fontSize: '11.5px', color: 'var(--critical-text)', fontWeight: 600 }}>High</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', borderRadius: 'var(--r-sm)', background: 'var(--stable-bg)', border: '1px solid var(--stable-border)' }}><span style={{ fontSize: 12 }}>Sarcasm detected</span><span style={{ fontSize: '11.5px', color: 'var(--stable-text)', fontWeight: 600 }}>Low</span></div>
            </div>
          </div>
          <div className="chart-card" style={{ padding: 14 }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Quick Triage</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '12.5px' }}>
                <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                Escalate to Supervisor
              </button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '12.5px' }}>Mark Safe — No Action</button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '12.5px' }}>Send Reflective Prompt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
