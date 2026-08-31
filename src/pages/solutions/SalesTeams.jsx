// Zomic marketing — solution page: Sales Teams.
import { TrendingUp, Users, GitCommitVertical, EyeOff } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';

export default function SalesTeams() {
  return (
    <SolutionPage
      eyebrow="Solutions · Sales Teams"
      title="Pipeline velocity, coaching, and forecasting — without the spreadsheet sprawl."
      lead="Your reps already have too many tabs open. Zomic gives them one workspace to work leads, one dashboard to coach from, and one number you can actually trust."
      mascotMood="wave"
      painPoints={{
        title: 'Sales teams drown in tools and starve for insight.',
        lead: 'Reps spend more time logging than selling. Managers spend more time chasing numbers than coaching. Forecasts are guesses.',
        items: [
          { icon: <Users size={22} />, title: 'Reps hate the CRM', body: 'Logging is manual and slow, so it does not happen. Pipeline data is half-empty and unreliable.' },
          { icon: <EyeOff size={22} />, title: 'No visibility into activity', body: 'You cannot see who is actually working their pipeline — until the quarter ends and the number misses.' },
          { icon: <GitCommitVertical size={22} />, title: 'Stalling deals', body: 'Deals sit in one stage for weeks with no next step. No one notices until it is too late.' },
          { icon: <TrendingUp size={22} />, title: 'Forecasts are guesses', body: 'Pipeline-weighted forecasts that nobody trusts, because the underlying data is incomplete.' },
        ],
      }}
      featureRows={[
        {
          eyebrow: 'Auto-logged activity',
          title: 'Reps sell. Zomic logs.',
          body: 'Every WhatsApp, email, and call is logged automatically on the lead record. Reps never open a separate logging tool, and your pipeline data is finally complete.',
          bullets: ['Auto-log WhatsApp & email', 'Click-to-call with auto-notes', 'Activity timeline per lead', 'No manual data entry'],
          flip: false,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              {[
                { n: 'WhatsApp reply · Aisha', t: '2m ago', bg: '#A8E6C1' },
                { n: 'Email opened · Marco (3×)', t: '14m ago', bg: '#BFE3F5' },
                { n: 'Call · 4m 12s · Priya', t: '1h ago', bg: '#C9BBFF' },
              ].map((r) => (
                <div key={r.n} className="hero-mock-row">
                  <span className="hero-mock-avatar" style={{ background: r.bg, width: 28, height: 28, fontSize: 11 }}>·</span>
                  <div className="flex-1"><div className="hero-mock-name" style={{ fontSize: 13 }}>{r.n}</div></div>
                  <span className="hero-mock-meta">{r.t}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          eyebrow: 'Coaching & forecasting',
          title: 'See who is working, who is stalling, and what the quarter will be.',
          body: 'Conversion Signal surfaces the deals worth coaching. AI flags stalling deals before they die. And because the data is complete, your forecast is finally a number you can take to the board.',
          bullets: ['Per-rep activity & win rates', 'Stalling-deal alerts', 'Pipeline-weighted forecasts', 'Weekly AI coaching summaries'],
          flip: true,
          art: (
            <div className="mini-mock" style={{ maxWidth: 320 }}>
              {[
                { n: 'Aisha', w: 72, bg: 'var(--mint)' },
                { n: 'Marco', w: 58, bg: 'var(--butter)' },
                { n: 'Priya', w: 41, bg: 'var(--sky)' },
              ].map((r) => (
                <div key={r.n} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1.5"><span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{r.n}</span><span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)' }}>{r.w}%</span></div>
                  <div className="mini-mock-bar"><div className="mini-mock-bar-fill" style={{ width: `${r.w}%`, background: r.bg }} /></div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      outcomes={{ title: 'A pipeline your reps actually use. A forecast you can trust.' }}
      stat={[
        { value: '+38%', label: 'avg reply rate' },
        { value: '2×', label: 'forecast accuracy' },
      ]}
      testimonial={{ quote: 'Conversion Signal is uncanny. It surfaces the leads I should call before I even realise they are hot.', name: 'Priya Sharma', role: 'Head of Growth, Lumen Labs', initial: 'P', bg: '#A8E6C1' }}
    />
  );
}
