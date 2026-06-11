import React, { useState } from 'react';
import { GOALS } from '../data';

export default function InsightsView() {
  const [goalsDone, setGoalsDone] = useState([false, true, false, false, true]);

  const toggleGoal = (index) => {
    const next = [...goalsDone];
    next[index] = !next[index];
    setGoalsDone(next);
  };

  return (
    <div className="view active" id="view-insights">
      <div className="ins-layout">
        <div>
          <div className="ins-card">
            <div className="ins-plan-head">
              <div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: 'var(--slate)' }}>7-Day Care Plan</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Sofia Larson · Generated Oct 14 · AI confidence 82%</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost" style={{ fontSize: '12.5px' }}>Edit</button>
                <button className="btn btn-primary" style={{ fontSize: '12.5px' }}>
                  <svg viewBox="0 0 24 24"><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Assign
                </button>
              </div>
            </div>
            <div className="conf-strip"><div className="conf-fill" style={{ width: '82%' }}></div></div>
            <div className="conf-label" style={{ marginBottom: 16 }}>82% confidence — 14 sessions, 47 entries, 3 flagged threads</div>
            <div id="goals-list">
              {GOALS.map((g, i) => (
                <div className="goal-item" key={i} onClick={() => toggleGoal(i)}>
                  <div className={`goal-check${goalsDone[i] ? ' done' : ''}`}></div>
                  <div className={`goal-text${goalsDone[i] ? ' done' : ''}`}>{g}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ins-card">
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: 'var(--slate)', marginBottom: 12 }}>Journaling Prompts</div>
            <div className="prompt-card">
              <div className="prompt-text">"What would I tell a close friend going through exactly what I'm experiencing right now?"</div>
              <div className="prompt-cat">Self-compassion · Addresses shame spiral</div>
            </div>
            <div className="prompt-card">
              <div className="prompt-text">"Describe one moment this week where I felt like myself, even briefly. What was happening?"</div>
              <div className="prompt-cat">Positive anchoring · Counteracts drift</div>
            </div>
            <div className="prompt-card">
              <div className="prompt-text">"What's the most realistic version of the future I'm afraid of — and then what happens after that?"</div>
              <div className="prompt-cat">Catastrophizing deconstruction</div>
            </div>
          </div>

          <div className="ins-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: 'var(--slate)' }}>Session Note</div>
              <div className="tabs">
                <button className="tab active">SOAP</button>
                <button className="tab">DAP</button>
                <button className="tab">Free</button>
              </div>
            </div>
            <div className="soap-field"><div className="soap-label">S — Subjective</div><textarea className="soap-textarea" rows="2" placeholder="What the patient reported…"></textarea></div>
            <div className="soap-field"><div className="soap-label">O — Objective</div><textarea className="soap-textarea" defaultValue="Mood avg 4.2/10. Passive voice 68%. Flat affect detected. Missed 2/7 check-ins." rows="2"></textarea></div>
            <div className="soap-field"><div className="soap-label">A — Assessment</div><textarea className="soap-textarea" defaultValue="GAD intensifying. Shame-based avoidance. Catastrophic ideation. Narrative drift 0.78 — high risk." rows="2"></textarea></div>
            <div className="soap-field"><div className="soap-label">P — Plan</div><textarea className="soap-textarea" defaultValue="1. 2× daily check-ins. 2. Self-compassion journaling protocol. 3. Mid-week teletherapy. 4. Monitor escalation triggers." rows="2"></textarea></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
              <button className="btn btn-ghost">Save Draft</button>
              <button className="btn btn-primary">Sign & Submit</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 80 }}>
          <div style={{ background: 'linear-gradient(135deg,#FFF3F3,#FFF8F5)', border: '1px solid var(--critical-border)', borderRadius: 'var(--r-lg)', padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--critical-text)', marginBottom: 7 }}>⚡ Escalation Suggestion</div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate-mid)', lineHeight: 1.6 }}>Language patterns + drift score suggest scheduling within 48 hours and notifying supervisor.</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <button className="aib red">Escalate Now</button>
              <button className="aib">Dismiss</button>
            </div>
          </div>
          <div className="chart-card">
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Intervention Library</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ padding: 9, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 150ms' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--slate-light)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--slate)' }}>Behavioral Activation</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Schedule achievable activities</div>
              </div>
              <div style={{ padding: 9, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 150ms' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--slate-light)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--slate)' }}>Cognitive Restructuring</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Challenge catastrophic patterns</div>
              </div>
              <div style={{ padding: 9, borderRadius: 'var(--r-sm)', background: 'var(--bone)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 150ms' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--slate-light)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--slate)' }}>Mindful Self-Compassion</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>MSC protocol · Shame reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
