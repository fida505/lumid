import React from 'react';
import { WORD_DATA } from '../data';

export default function NarrativeView() {
  return (
    <div className="view active" id="view-narrative">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 18 }}>
        <div>
          <div className="chart-card" style={{ marginBottom: 14 }}>
            <div className="sec-hd"><h2>Narrative Map</h2><p>Sofia Larson · Oct 7–14</p></div>
            <div id="word-cloud" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: '8px 0 16px' }}>
              {WORD_DATA.map((w, i) => (
                <div
                  key={i}
                  style={{
                    background: w.bg,
                    color: w.col,
                    fontSize: `${w.sz * 0.52}px`,
                    padding: '4px 12px',
                    borderRadius: 20,
                    border: `1px solid ${w.col}22`,
                    cursor: 'pointer',
                    transition: 'transform 130ms',
                    fontWeight: w.sz > 20 ? 600 : 400
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {w.word}
                </div>
              ))}
            </div>
            <hr />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 12 }}>Sentence Structure Drift</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={{ background: 'var(--bone)', borderRadius: 'var(--r-sm)', padding: 13, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '9.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Passive</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--critical-text)', lineHeight: 1 }}>68%</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>"things happen to me"</div>
                <div className="drift-track" style={{ marginTop: 8 }}><div className="drift-fill-el" style={{ width: '68%', background: 'var(--coral)' }}></div></div>
              </div>
              <div style={{ background: 'var(--bone)', borderRadius: 'var(--r-sm)', padding: 13, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '9.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Active</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--slate)', lineHeight: 1 }}>22%</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>"I decided / I tried"</div>
                <div className="drift-track" style={{ marginTop: 8 }}><div className="drift-fill-el" style={{ width: '22%', background: 'var(--slate)' }}></div></div>
              </div>
              <div style={{ background: 'var(--bone)', borderRadius: 'var(--r-sm)', padding: 13, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '9.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Blaming</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--watch-text)', lineHeight: 1 }}>10%</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>"they always / never"</div>
                <div className="drift-track" style={{ marginTop: 8 }}><div className="drift-fill-el" style={{ width: '10%', background: 'var(--amber)' }}></div></div>
              </div>
            </div>
          </div>
          <div className="chart-card">
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 12 }}>Weekly Themes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)' }}>
                <div style={{ width: 3, height: 48, borderRadius: 2, background: 'var(--coral)', flexShrink: 0 }}></div>
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>Overcontrol & Perfectionism</div><div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>In 6/7 journal entries. Tied to work performance anxiety and fear of authority judgment.</div></div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)' }}>
                <div style={{ width: 3, height: 48, borderRadius: 2, background: 'var(--amber)', flexShrink: 0 }}></div>
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>Catastrophizing Future Events</div><div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>3 instances of catastrophic "what if" scenario-building around relationships and career.</div></div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)' }}>
                <div style={{ width: 3, height: 48, borderRadius: 2, background: 'var(--sage)', flexShrink: 0 }}></div>
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>Emerging Self-Compassion</div><div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>Increased self-kindness language in morning entries. Strong anchor point for intervention.</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 80 }}>
          <div className="chart-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>Baseline Drift Score</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 54, color: 'var(--coral)', lineHeight: 1, letterSpacing: '-.02em' }}>0.78</div>
            <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: 6 }}>Distance from baseline self-narrative</div>
            <div style={{ fontSize: 12, color: 'var(--critical-text)', fontWeight: 500, marginTop: 4 }}>High Drift — Intervene</div>
            <div className="drift-track" style={{ marginTop: 14, height: 8 }}><div className="drift-fill-el" style={{ width: '78%', background: 'linear-gradient(90deg,var(--amber),var(--coral))' }}></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}><span>Stable</span><span>Drifted</span></div>
          </div>
          <div className="chart-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Journal Highlight</div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate-mid)', fontStyle: 'italic', lineHeight: 1.7, borderLeft: '2.5px solid var(--sage)', paddingLeft: 11 }}>"I keep waiting for something to change but I don't know what I'm waiting for. It's like I'm disappearing from my own life."</div>
            <div style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: 8 }}>Oct 13 · 10:47 PM · Evening journal</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
              <button className="aib">Flag</button>
              <button className="aib">Add to plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
