import React, { useEffect, useRef } from 'react';
import { PTS } from '../data';

function SparkLine({ data, status, id }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (!ref.current || typeof Chart === 'undefined') return;
    if (chartRef.current) chartRef.current.destroy();
    const col = status === 'critical' ? '#FA6E6E' : status === 'watch' ? '#F6BE00' : '#7A9E7E';
    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: { labels: data.map((_, i) => i), datasets: [{ data, borderColor: col, borderWidth: 2, pointRadius: 0, tension: 0.4, fill: true, backgroundColor: col + '18' }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false, min: 0, max: 10 } }, animation: { duration: 300 } }
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data, status]);
  return <canvas ref={ref} height="40"></canvas>;
}

function PatientCard({ p, onOpenFlyout }) {
  const riskClass = p.status === 'critical' ? 'critical' : p.status === 'watch' ? 'watch' : 'stable';
  const riskLabel = p.status === 'critical' ? '⛔ Critical' : p.status === 'watch' ? '🟡 Watch' : '✅ Stable';
  const polarityW = Math.abs(p.polarity) / 4;
  const polarityLeft = p.polarity < 0 ? (50 - (polarityW * 50)) + '%' : '50%';
  const polarityFillW = (polarityW * 50) + '%';
  const polarityCol = p.polarity < -2 ? 'var(--coral)' : p.polarity < 0 ? 'var(--amber)' : p.polarity < 2 ? 'var(--sage-dark)' : '#52D98E';

  return (
    <div className={`pt-card ${p.flagged ? 'flagged-today' : p.status === 'watch' ? 'watch-card' : ''}`}>
      <div className="pt-head">
        <div className="pt-av" style={{ background: p.bg, color: p.fg, width: 40, height: 40 }}>
          {p.initials}
          {p.status !== 'stable' && <div className={`pt-av-ring ${p.status}`}></div>}
        </div>
        <div className="pt-info">
          <div className="pt-name">{p.name}</div>
          <div className="pt-arc">{p.arc}</div>
        </div>
        <span className={`risk-pill ${riskClass}`}><span className="rp-dot"></span>{riskLabel}</span>
      </div>
      <div className="spark-wrap">
        <SparkLine data={p.mood} status={p.status} id={p.id} />
        <div className="spark-label">7d mood</div>
      </div>
      <div className="emo-row">
        {p.emotions.map((e, i) => (
          <span key={i} className="emo-tag" style={{ background: e.bg, color: e.col || '#333', border: `1px solid ${e.color}33` }} data-tip={`Intensity: ${e.int}/4 — AI traced root available`}>
            {e.name}
            <span className="emo-int">{Array(e.int).fill(0).map((_, j) => <span key={j} className="emo-int-dot" style={{ background: e.color }}></span>)}</span>
          </span>
        ))}
      </div>
      <div className="polarity-row">
        <span className="polarity-label">Polarity</span>
        <div className="polarity-track">
          <div className="polarity-center"></div>
          <div className="polarity-fill" style={{ left: polarityLeft, width: polarityFillW, background: polarityCol }}></div>
        </div>
        <span className="polarity-score" style={{ color: polarityCol }}>{p.polarity > 0 ? '+' : ''}{p.polarity}</span>
      </div>
      {p.behaviors.map((b, i) => (
        <div key={i} className="behavior-tag"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>{b}</div>
      ))}
      <div className="pt-footer">
        <div className="pt-check-time">Last: {p.lastCheck}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="flyout-trigger" onClick={(e) => { e.stopPropagation(); onOpenFlyout(p.id); }}>
            <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Full profile
          </div>
          <div className="micro-actions">
            <button className="micro-btn positive" title="Doing better" onClick={(e) => { e.stopPropagation(); e.currentTarget.textContent = '✅'; }}>👍</button>
            <button className="micro-btn alert" title="Needs focus" onClick={(e) => { e.stopPropagation(); e.currentTarget.textContent = '⚠️'; }}>🔎</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientView({ onOpenFlyout }) {
  const [filter, setFilter] = React.useState('all');
  let list = PTS;
  if (filter === 'critical') list = PTS.filter(p => p.status === 'critical');
  else if (filter === 'watch') list = PTS.filter(p => p.status === 'watch');
  else if (filter === 'stable') list = PTS.filter(p => p.status === 'stable');
  else if (filter === 'silent') list = PTS.filter((p, i) => i === 1 || i === 5);

  const filters = [
    { key: 'all', label: 'All · 24' },
    { key: 'critical', label: '⛔ Critical' },
    { key: 'watch', label: '🟡 Watch' },
    { key: 'stable', label: '✅ Stable' },
    { key: 'silent', label: '🔇 48h Silence' },
  ];

  return (
    <>
      <div className="stats-row">
        <div className="stat-tile">
          <div className="st-eyebrow">Active Caseload</div>
          <div><span className="st-num">24</span><span className="st-unit">pts</span></div>
          <div className="st-bar"><div className="st-bar-fill" style={{ width: '80%', background: 'linear-gradient(90deg,var(--sage-dark),var(--sage))' }}></div></div>
          <div className="st-trend trend-pos">↑ 2 added this week</div>
        </div>
        <div className="stat-tile">
          <div className="st-eyebrow">Under Watch</div>
          <div><span className="st-num">7</span><span className="st-unit">pts</span></div>
          <div className="st-bar"><div className="st-bar-fill" style={{ width: '29%', background: 'linear-gradient(90deg,#D4A017,var(--amber))' }}></div></div>
          <div className="st-trend trend-neu">→ Unchanged from last week</div>
        </div>
        <div className="stat-tile">
          <div className="st-eyebrow">Critical Flags</div>
          <div><span className="st-num" style={{ color: 'var(--coral)' }}>2</span><span className="st-unit">today</span></div>
          <div className="st-bar"><div className="st-bar-fill" style={{ width: '20%', background: 'linear-gradient(90deg,#F09090,var(--coral))' }}></div></div>
          <div className="st-trend trend-neg">↑ 1 since yesterday — act now</div>
        </div>
        <div className="stat-tile">
          <div className="st-eyebrow">Check-in Rate</div>
          <div><span className="st-num">87</span><span className="st-unit">%</span></div>
          <div className="st-bar"><div className="st-bar-fill" style={{ width: '87%', background: 'linear-gradient(90deg,var(--sage-dark),#52D98E)' }}></div></div>
          <div className="st-trend trend-pos">↑ 4% vs last week</div>
        </div>
      </div>

      <div className="filter-row">
        <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Filter:</span>
        {filters.map(f => (
          <button key={f.key} className={`filter-chip${filter === f.key ? ' on' : ''}`} onClick={() => setFilter(f.key)}>{f.label}</button>
        ))}
        <div className="filter-sep"></div>
        <div className="view-toggle">
          <button className="vt-btn on">Grid</button>
          <button className="vt-btn">List</button>
        </div>
      </div>

      <div className="pt-grid">
        {list.map(p => <PatientCard key={p.id} p={p} onOpenFlyout={onOpenFlyout} />)}
      </div>
    </>
  );
}
