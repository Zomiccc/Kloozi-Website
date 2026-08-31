// Zomic marketing — Pricing page.
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { PRICING } from '../lib/content.js';

const FAQ = [
  { q: 'Is there really a free plan?', a: 'Yes. Starter is free forever for up to 500 leads, 1 user, and 1 WhatsApp number. No credit card required, no time limit.' },
  { q: 'Can I switch plans later?', a: 'Anytime. Upgrade when your team grows, downgrade if you need to. Changes apply immediately and are prorated.' },
  { q: 'Do I pay per WhatsApp message?', a: 'WhatsApp conversation pricing is set by Meta and passed through at cost. Zomic does not add a markup on top.' },
  { q: 'Is there an annual discount?', a: 'Yes — pay annually and get two months free on Growth and Scale. Toggle it on the signup page.' },
  { q: 'What happens when I hit the lead limit on Starter?', a: 'We email you before you reach it. You can upgrade to Growth in one click, or delete old leads to stay on free.' },
  { q: 'Do you offer non-profit or education pricing?', a: 'Yes — 50% off Growth and Scale for registered non-profits and accredited educational institutions. Contact us.' },
];

const COMPARE = [
  { feature: 'Leads', starter: '500', growth: 'Unlimited', scale: 'Unlimited' },
  { feature: 'Users', starter: '1', growth: 'Up to 10', scale: 'Unlimited' },
  { feature: 'WhatsApp automation', starter: '1 number', growth: 'Unlimited', scale: 'Unlimited' },
  { feature: 'Email marketing', starter: 'Basic', growth: 'Full', scale: 'Full + A/B' },
  { feature: 'Facebook & IG lead ads', starter: '—', growth: '✓', scale: '✓' },
  { feature: 'Conversion Signal scoring', starter: '—', growth: '✓', scale: '✓' },
  { feature: 'Automation rules + Zapier', starter: '—', growth: '✓', scale: '✓' },
  { feature: 'AI-powered insights', starter: '—', growth: '—', scale: '✓' },
  { feature: 'WordPress + webhooks', starter: '—', growth: '—', scale: '✓' },
  { feature: 'Support', starter: 'Email', growth: 'Priority', scale: 'Priority + SLA' },
];

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Start free. Grow when you are ready."
        lead="Every plan includes lead management, WhatsApp, and email. Upgrade only when your team grows — no price cliffs, no surprise enterprise upsell."
        align="center"
        mascotMood="celebrate"
      />

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <Reveal stagger={0.1} className="pricing-grid">
            {PRICING.map((p) => (
              <RevealItem key={p.name}>
                <div className={`card price-card ${p.highlight ? 'price-card-highlight' : ''}`}>
                  {p.badge && <span className="badge badge-accent price-badge">{p.badge}</span>}
                  <div className="price-name">{p.name}</div>
                  <div className="price-tagline">{p.tagline}</div>
                  <div className="flex items-end gap-1">
                    <span className="price-amount">{p.price === 0 ? 'Free' : `$${p.price}`}</span>
                    {p.price !== 0 && <span className="price-period mb-2"> {p.period}</span>}
                  </div>
                  <div className="price-features">
                    {p.features.map((f) => (
                      <div className="price-feature" key={f}>
                        <span className="check-ico"><Check size={13} strokeWidth={3} /></span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={p.to} className={`btn mt-6 ${p.highlight ? 'btn-accent' : 'btn-secondary'}`}>{p.cta}</Link>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Compare plans" title="Every feature, side by side." />
          <Reveal variant="fade" className="mt-10 overflow-x-auto">
            <table className="zomic-table" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th>Growth</th>
                  <th>Scale</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.feature}>
                    <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{r.feature}</td>
                    <td>{r.starter}</td>
                    <td>{r.growth}</td>
                    <td>{r.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <Reveal stagger={0.08} className="card-grid card-grid-2 mt-10 max-w-4xl mx-auto">
            {FAQ.map((f) => (
              <RevealItem key={f.q}>
                <div className="feature-card">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={20} style={{ color: 'var(--accent-deep)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div className="feature-card-title" style={{ fontSize: 16 }}>{f.q}</div>
                      <div className="feature-card-body mt-2">{f.a}</div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection title="Still not sure which plan? Start free and find out." />
    </>
  );
}
