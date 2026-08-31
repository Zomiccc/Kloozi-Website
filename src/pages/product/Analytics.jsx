// Zomic marketing — product page: Analytics & Reporting + Conversion Signal + AI Insights.
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Flame, Sparkles, TrendingUp, Download, Filter, Check } from 'lucide-react';
import { PageHero, SectionHeading, FeatureRow, CTASection } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

const CAPABILITIES = [
  { icon: BarChart3, title: 'Live dashboards', body: 'Pipeline value, win rate, cycle time, and source attribution — updated in real time, not nightly.' },
  { icon: Filter, title: 'Custom reports', body: 'Slice by rep, source, stage, or any custom field. Save and schedule them to land in your inbox.' },
  { icon: Download, title: 'One-click exports', body: 'CSV and PDF exports for finance, board decks, or your data warehouse. No more screenshotting dashboards.' },
  { icon: TrendingUp, title: 'Revenue forecasts', body: 'Pipeline-weighted forecasts that adjust as deals move — so your number is never a guess.' },
];

export default function Analytics() {
  return (
    <>
      <PageHero
        eyebrow="Product · Intelligence"
        title="Know which leads are heating up — before your competitors do."
        lead="Dashboards that show what is actually closing, engagement scoring that surfaces your hottest leads, and AI that tells your team the next best move in plain English."
        mascotMood="wave"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Analytics & Reporting" title="Dashboards built for decisions, not decoration." />
          <Reveal stagger={0.08} className="card-grid card-grid-2 mt-12">
            {CAPABILITIES.map((c) => (
              <RevealItem key={c.title}>
                <div className="feature-card card-hover">
                  <span className="feature-card-ico"><c.icon size={22} /></span>
                  <div className="feature-card-title">{c.title}</div>
                  <div className="feature-card-body">{c.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="signal" className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <FeatureRow
            eyebrow="Conversion Signal"
            title="Engagement scoring that flags your hottest leads automatically."
            body="Conversion Signal scores every lead by real behaviour — email opens, WhatsApp replies, page visits, recency. Your team stops guessing and starts calling the people most likely to buy, right now."
            bullets={['Scores 0–100, updated live', 'Weighted by your winning patterns', 'Surfaces hot leads in your inbox', 'Triggers automations on score thresholds']}
            flip
            accent="var(--butter)"
            art={
              <div className="mini-mock" style={{ maxWidth: 320 }}>
                {[
                  { n: 'Aisha K.', s: 92, bg: 'var(--mint)' },
                  { n: 'Marco D.', s: 74, bg: 'var(--butter)' },
                  { n: 'Priya S.', s: 41, bg: 'var(--sky)' },
                  { n: 'Tom B.', s: 18, bg: 'var(--canvas-alt)' },
                ].map((r) => (
                  <div key={r.n} className="mb-3 last:mb-0">
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{r.n}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)' }}>{r.s}</span>
                    </div>
                    <div className="mini-mock-bar"><div className="mini-mock-bar-fill" style={{ width: `${r.s}%`, background: r.bg }} /></div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section id="ai" className="section">
        <div className="shell">
          <FeatureRow
            eyebrow="AI-Powered Insights"
            title="Next-best-action suggestions, written in plain English."
            body="Zomic reads your pipeline and tells your reps what to do next: “Aisha opened your email three times today — call her now.” No dashboards to interpret. No data science required."
            bullets={['Plain-English recommendations', 'Risk alerts on stalling deals', 'Suggested follow-up messages', 'Weekly team coaching summaries']}
            flip={false}
            accent="var(--accent)"
            art={
              <div className="mini-mock" style={{ maxWidth: 320 }}>
                <div style={{ background: 'var(--canvas)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
                  <div className="flex items-center gap-2 mb-2"><Sparkles size={16} style={{ color: 'var(--accent-deep)' }} /><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-deep)' }}>SUGGESTED · NOW</span></div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Call Aisha — she opened your pricing email 3× today.</div>
                </div>
                <div style={{ background: 'var(--canvas)', borderRadius: 14, padding: 14 }}>
                  <div className="flex items-center gap-2 mb-2"><Flame size={16} style={{ color: 'var(--coral-deep)' }} /><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--coral-deep)' }}>AT RISK</span></div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Marco has not replied in 6 days. Send a nudge?</div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
