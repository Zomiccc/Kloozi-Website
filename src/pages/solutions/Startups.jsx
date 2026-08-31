// Zomic marketing — solution page: Startups.
import { Rocket, Wallet, Cpu, TimerReset } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';

export default function Startups() {
  return (
    <SolutionPage
      eyebrow="Solutions · Startups"
      title="Enterprise-grade CRM without the enterprise bill — or the enterprise setup."
      lead="You do not have six weeks to implement a CRM. Start free, capture your first lead in two minutes, and grow into paid plans only when the revenue is there."
      mascotMood="celebrate"
      painPoints={{
        title: 'Startups cannot afford a six-week CRM implementation.',
        lead: 'Big-CRM setups need consultants, admins, and a budget you do not have. You need to be capturing leads today, not next quarter.',
        items: [
          { icon: <Wallet size={22} />, title: 'Priced for enterprises', body: 'Per-seat pricing plus implementation fees plus a consultant — your seed round does not cover it.' },
          { icon: <TimerReset size={22} />, title: 'Weeks to set up', body: 'You need leads now. A six-week implementation means six weeks of missed revenue.' },
          { icon: <Cpu size={22} />, title: 'Too many separate tools', body: 'CRM here, email tool there, WhatsApp bot somewhere else. Your stack costs more than your rent.' },
          { icon: <Rocket size={22} />, title: 'No room to grow', body: 'You will outgrow the free tier of most tools in a month — then get hit with a price cliff.' },
        ],
      }}
      featureRows={[
        {
          eyebrow: 'Live in 2 minutes',
          title: 'Sign up. Capture your first lead before your coffee is cold.',
          body: 'No implementation. No consultant. Connect your WhatsApp number, drop a form on your site, and leads start flowing immediately.',
          bullets: ['No implementation project', 'Free forever for your first 500 leads', 'Connect WhatsApp in minutes', 'Drop-in form for your site'],
          flip: false,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 8 }}>Setup checklist</div>
              {['Create account', 'Connect WhatsApp', 'Add lead form', 'Capture first lead'].map((s, i) => (
                <div key={s} className="hero-mock-row" style={{ padding: '8px 0' }}>
                  <span className="hero-mock-avatar" style={{ background: i < 3 ? 'var(--mint)' : 'var(--canvas-alt)', color: i < 3 ? '#1f6b43' : 'var(--ink-3)', width: 24, height: 24, fontSize: 11 }}>✓</span>
                  <div className="flex-1"><div className="hero-mock-name" style={{ fontSize: 13, color: i < 3 ? 'var(--ink)' : 'var(--ink-2)' }}>{s}</div></div>
                </div>
              ))}
            </div>
          ),
        },
        {
          eyebrow: 'Grows with you',
          title: 'Start free. Pay only when the revenue is there.',
          body: 'Free for your first 500 leads. Move to Growth when you have a team. Scale when you are running multiple pipelines. No price cliffs, no surprise enterprise upsell.',
          bullets: ['Free tier — no credit card', 'Add seats only when you hire', 'Upgrade or downgrade anytime', 'No annual contract required'],
          flip: true,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              {[
                { n: 'Starter', p: 'Free', bg: 'var(--canvas-alt)' },
                { n: 'Growth', p: '$29 / user', bg: 'var(--accent)' },
                { n: 'Scale', p: '$79 / user', bg: 'var(--mint)' },
              ].map((p) => (
                <div key={p.n} className="hero-mock-row">
                  <span className="hero-mock-avatar" style={{ background: p.bg }}>{p.n[0]}</span>
                  <div className="flex-1"><div className="hero-mock-name">{p.n}</div></div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)' }}>{p.p}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      outcomes={{ title: 'Capture leads today. Pay for the CRM when they start buying.' }}
      stat={[
        { value: '2 min', label: 'signup to first lead' },
        { value: '$0', label: 'until your first 500 leads' },
      ]}
      testimonial={{ quote: 'We went live in an afternoon and captured our first lead the same day. We only started paying once we had real revenue.', name: 'Tom Becker', role: 'Founder, Coral & Co.', initial: 'T', bg: '#FFD6A8' }}
    />
  );
}
