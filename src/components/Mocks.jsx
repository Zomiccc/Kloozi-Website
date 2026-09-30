// Flazyn — small illustrative product mock-ups for page heroes and
// feature rows. All data is sample data.
import { Check, CheckCheck, MessageCircle, Mail, Globe, UsersRound, Clock, Zap, Send, Megaphone } from 'lucide-react';

const av = (bg) => ({ background: bg, width: 30, height: 30 });
const GRAD = 'linear-gradient(135deg,#7a5cff,#ff6b4a)';

export function PipelineMock() {
  const rows = [
    ['Aisha Khan', 'Website form', 'New', 'badge-sky', '#3b9bff'],
    ['Marco Diaz', 'WhatsApp', 'Contacted', '', '#b04bff'],
    ['Priya Shah', 'Lead Ads', 'Qualified', 'badge-sun', '#ffb62e'],
    ['Tom Becker', 'Referral', 'Won', 'badge-mint', '#16c79a'],
  ];
  return (
    <div className="page-art-card">
      <div className="demo-col-head" style={{ fontSize: 14, marginBottom: 14 }}><span>All leads</span><b>Sample data</b></div>
      {rows.map(([n, src, st, b, bg]) => (
        <div key={n} className="mini-row" style={{ padding: 12 }}>
          <span className="avatar" style={av(bg)}>{n.split(' ').map((p) => p[0]).join('')}</span>
          <span><strong style={{ display: 'block', fontSize: 14 }}>{n}</strong><small style={{ color: 'var(--ink-3)' }}>{src}</small></span>
          <span className={`badge ${b}`}>{st}</span>
        </div>
      ))}
    </div>
  );
}

export function ChatMock({ lines }) {
  const msgs = lines || [
    { in: true, t: 'Hi! Is the 2-bed on Park Avenue still available?' },
    { in: false, t: 'Hi Sara! Yes it is. I can show it tomorrow at 11am or 4pm — which suits you?' },
    { in: true, t: '4pm works 🙌' },
  ];
  return (
    <div className="page-art-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="demo-chat-head">
        <span className="avatar" style={av(GRAD)}>SR</span>
        <span><strong>Sara Reyes</strong><small><MessageCircle size={12} color="#16c79a" /> WhatsApp · window open</small></span>
      </div>
      <div className="demo-msgs" style={{ background: 'var(--bg)' }}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.in ? 'msg-in' : 'msg-out'}`}>{m.t}<small>{m.in ? 'Sara' : 'You'}{!m.in && <CheckCheck size={12} color="#3b9bff" />}</small></div>
        ))}
      </div>
    </div>
  );
}

export function EmailMock() {
  return (
    <div className="page-art-card">
      <div className="demo-col-head" style={{ fontSize: 14 }}><span><Mail size={15} /> New campaign</span><span className="badge badge-coral">Draft</span></div>
      <div className="mini-row" style={{ marginTop: 12 }}><strong style={{ fontSize: 13 }}>To</strong><span className="badge">Qualified · no reply in 7 days</span></div>
      <div className="mini-row"><strong style={{ fontSize: 13 }}>Subject</strong><span style={{ fontSize: 13, color: 'var(--ink-2)' }}>A quick idea for your team</span></div>
      <div style={{ marginTop: 12, padding: 16, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)' }}>
        <div style={{ height: 10, width: '70%', borderRadius: 6, background: 'var(--bg-3)' }} />
        <div style={{ height: 10, width: '90%', borderRadius: 6, background: 'var(--bg-3)', marginTop: 10 }} />
        <div style={{ height: 10, width: '55%', borderRadius: 6, background: 'var(--bg-3)', marginTop: 10 }} />
        <div className="btn btn-primary btn-sm" style={{ marginTop: 16, pointerEvents: 'none' }}>Book a call</div>
      </div>
      <div className="mini-row" style={{ marginTop: 12 }}><Send size={15} color="#6246ff" /> Send now or schedule<span className="badge badge-mint"><Check size={12} /> Ready</span></div>
    </div>
  );
}

export function FlowMock() {
  const steps = [
    [Megaphone, 'orchid', 'When a Lead Ad form is submitted'],
    [UsersRound, 'sun', 'Assign to the next available rep'],
    [MessageCircle, 'mint', 'Send the “Welcome” WhatsApp template'],
    [Clock, 'sky', 'If no reply in 1 day → create a follow-up task'],
  ];
  return (
    <div className="page-art-card mini-flow">
      <div className="demo-col-head" style={{ fontSize: 14 }}><span><Zap size={15} /> New lead welcome</span><span className="badge badge-mint">Active</span></div>
      {steps.map(([Icon, hue, label], i) => (
        <div key={label}>
          {i > 0 && <div className="mini-flow-line" />}
          <div className="mini-flow-step" style={{ padding: 12 }}><span className={`chip3d sm ${hue}`} style={{ width: 32, height: 32, borderRadius: 10 }}><Icon size={15} /></span>{label}</div>
        </div>
      ))}
    </div>
  );
}

export function ChartMock() {
  const src = [['WhatsApp', 46, '#16c79a'], ['Website', 28, '#3b9bff'], ['Lead Ads', 18, '#b04bff'], ['Referral', 8, '#ffb62e']];
  return (
    <div className="page-art-card">
      <div className="demo-col-head" style={{ fontSize: 14 }}><span>Leads by source</span><b>Sample · last 30 days</b></div>
      <div className="mini-bars" style={{ height: 140, marginTop: 10 }}>{[30, 44, 38, 56, 50, 64, 60, 78, 72, 90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        {src.map(([n, v, c]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ width: 70, color: 'var(--ink-2)' }}>{n}</span>
            <span style={{ flex: 1, height: 8, borderRadius: 8, background: 'var(--bg-3)' }}><span style={{ display: 'block', height: '100%', width: `${v * 2}%`, borderRadius: 8, background: c }} /></span>
            <strong style={{ width: 36, textAlign: 'right' }}>{v}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SourcesMock() {
  const items = [[Globe, 'sky', 'Website form', 'Contact page'], [Megaphone, 'orchid', 'Instagram Lead Ad', 'Spring campaign'], [MessageCircle, 'mint', 'WhatsApp', 'Direct message']];
  return (
    <div className="page-art-card">
      <div className="demo-col-head" style={{ fontSize: 14, marginBottom: 14 }}><span>Incoming leads</span><b>Sample data</b></div>
      {items.map(([Icon, hue, t, s]) => (
        <div key={t} className="mini-row" style={{ padding: 12 }}>
          <span className={`chip3d sm ${hue}`} style={{ width: 32, height: 32, borderRadius: 10 }}><Icon size={15} /></span>
          <span><strong style={{ display: 'block', fontSize: 14 }}>{t}</strong><small style={{ color: 'var(--ink-3)' }}>{s}</small></span>
          <span className="badge badge-mint"><Check size={12} /> Captured</span>
        </div>
      ))}
    </div>
  );
}
