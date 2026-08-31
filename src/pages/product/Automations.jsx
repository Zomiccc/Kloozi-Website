// Zomic marketing — product page: Automations (FB/IG ads, WordPress, Zapier, Rules).
import { Link } from 'react-router-dom';
import {
  ArrowRight, Megaphone, Globe, Plug, Workflow, Check, Facebook, Instagram,
} from 'lucide-react';
import { PageHero, SectionHeading, FeatureRow, CTASection } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

const INTEGRATIONS = [
  { icon: Megaphone, title: 'Facebook & Instagram Lead Ads', body: 'A lead fills out a lead form on your ad — Zomic pulls it in, scores it, and replies on WhatsApp within seconds. No CSV downloads, no manual import.', id: 'facebook' },
  { icon: Globe, title: 'WordPress Integration', body: 'Connect your WordPress forms (or any form on your site) and every submission becomes a qualified lead in your pipeline, automatically.', id: 'wordpress' },
  { icon: Plug, title: 'Zapier & Webhooks', body: 'Connect Zomic to 6,000+ tools through Zapier, or push and receive data via webhooks. Build the stack you already use, around Zomic.', id: 'zapier' },
  { icon: Workflow, title: 'Automation Rules', body: 'Trigger-based workflows without a single line of code: when a lead does X, do Y. Branch, delay, and chain as many steps as you need.', id: 'rules' },
];

export default function Automations() {
  return (
    <>
      <PageHero
        eyebrow="Product · Automations"
        title="Capture leads from everywhere. Do the busywork once."
        lead="Facebook and Instagram lead ads, your WordPress forms, Zapier, webhooks, and trigger-based rules — all flowing into one pipeline, automatically."
        mascotMood="wave"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Integrations" title="Connect the tools you already use. Capture every lead." />
          <Reveal stagger={0.08} className="card-grid card-grid-2 mt-12">
            {INTEGRATIONS.map((c) => (
              <RevealItem key={c.title}>
                <div id={c.id} className="feature-card card-hover" style={{ scrollMarginTop: 90 }}>
                  <span className="feature-card-ico"><c.icon size={22} /></span>
                  <div className="feature-card-title">{c.title}</div>
                  <div className="feature-card-body">{c.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <FeatureRow
            eyebrow="Facebook & Instagram Lead Ads"
            title="From ad click to WhatsApp reply in under a minute."
            body="The old way: download a CSV of ad leads every morning, import it, lose the hottest ones to competitors who replied first. The Zomic way: the lead hits your form, lands in your pipeline, gets scored, and receives an instant WhatsApp reply — all before you have poured your coffee."
            bullets={['Instant lead sync, no CSVs', 'Auto-reply on WhatsApp & email', 'Ad source attribution', 'Works with both FB & IG lead forms']}
            flip
            art={
              <div className="mini-mock" style={{ maxWidth: 320 }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: '#BFE3F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Facebook size={16} style={{ color: 'var(--sky-deep)' }} /></span>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: '#FFC2C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Instagram size={16} style={{ color: 'var(--coral-deep)' }} /></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)' }}>Lead ad · Spring campaign</span>
                </div>
                {[
                  { n: 'New lead · Priya S.', t: 'just now', bg: '#A8E6C1' },
                  { n: 'Auto-replied on WhatsApp', t: '4s later', bg: '#C9BBFF' },
                  { n: 'Scored 71 · assigned to Aisha', t: '6s later', bg: '#FFE9A8' },
                ].map((r) => (
                  <div key={r.n} className="hero-mock-row">
                    <span className="hero-mock-avatar" style={{ background: r.bg, width: 28, height: 28, fontSize: 11 }}><Check size={13} strokeWidth={3} /></span>
                    <div className="flex-1"><div className="hero-mock-name" style={{ fontSize: 13 }}>{r.n}</div></div>
                    <span className="hero-mock-meta">{r.t}</span>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <CTASection title="Wire up your whole lead funnel in an afternoon." />
    </>
  );
}
