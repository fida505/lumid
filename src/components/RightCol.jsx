import React, { useEffect, useRef } from 'react';
import { TIPPING, PATTERNS, LATENCY } from '../data';

export default function RightCol() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const cx = 70, cy = 72, r = 52;
    ctx.clearRect(0, 0, 140, 80);
    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#E5E2DC';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Fill 32%
    const ang = Math.PI + (0.32 * Math.PI);
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, ang);
    ctx.strokeStyle = '#7A9E7E';
    ctx.lineWidth = 10;
    ctx.stroke();
  }, []);

  return (
    <aside className="right-col">
      <div className="rc-head">
        <div className="rc-title">Practice Intelligence</div>
        <div className="rc-sub">Live clinical signals · Updated 2m ago</div>
      </div>

      <div className="rc-section">
        <div className="rc-sec-label">Clients at Tipping Point</div>
        <div id="tipping-list">
          {TIPPING.map((t, i) => (
            <div className="tiipping-item tipping-item" key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 0', borderBottom: i < TIPPING.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="ti-av" style={{ background: t.bg, color: t.fg }}>{t.initials}</div>
              <div>
                <div className="ti-name">{t.name}</div>
                <div className="ti-signal">{t.signal}</div>
              </div>
              <div className="ti-badge" style={{ background: t.riskBg, color: t.riskColor, marginLeft: 'auto' }}>{t.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rc-section">
        <div className="rc-sec-label">Top Patterns Across Practice</div>
        <div id="pattern-list">
          {PATTERNS.map((p, i) => (
            <div className="pattern-row" key={i}>
              <div className="pattern-label">{p.label}</div>
              <div className="pattern-bar-wrap"><div className="pattern-bar-fill" style={{ width: `${p.pct}%`, background: p.color }}></div></div>
              <div className="pattern-count">{p.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rc-section">
        <div className="rc-sec-label">Escalation Latency</div>
        <div className="escalation-latency" id="latency-list">
          {LATENCY.map((l, i) => (
            <div className="el-item" key={i}>
              <div className="el-name">{l.name}</div>
              <div className="el-time" style={{ color: l.color }}>{l.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rc-section">
        <div className="rc-sec-label">Therapist Wellbeing</div>
        <div className="burnout-gauge">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={canvasRef} id="burnoutGauge" width="140" height="80"></canvas>
          </div>
          <div className="burnout-label">
            <div className="burnout-score">32<span style={{ fontSize: 14, color: 'var(--muted)' }}>/100</span></div>
            <div className="burnout-desc">Burnout Risk — <span style={{ color: 'var(--stable-text)', fontWeight: 500 }}>Low</span></div>
          </div>
        </div>
      </div>

      <div className="rc-section" style={{ borderBottom: 'none' }}>
        <div className="rc-sec-label">Recent Activity Log</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: '11.5px', color: 'var(--muted)', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>11:52 PM · Viewed Marcus Webb alert</div>
          <div style={{ fontSize: '11.5px', color: 'var(--muted)', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>10:14 PM · Sofia Larson note saved</div>
          <div style={{ fontSize: '11.5px', color: 'var(--muted)', padding: '5px 0' }}>9:30 PM · Care plan assigned to Priya Nair</div>
        </div>
      </div>
    </aside>
  );
}
