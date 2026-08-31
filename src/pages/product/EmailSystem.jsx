// Zomic marketing — product page: Email Marketing System (Zomic Mail).
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, LayoutTemplate, Split, Gauge, ListChecks, Check } from 'lucide-react';
import { PageHero, SectionHeading, FeatureRow, CTASection } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

const CAPABILITIES = [
  { icon: LayoutTemplate, title: 'Drag-and-drop builder', body: 'Design on-brand emails without a developer. Reusable blocks, brand kits, and responsive layouts out of the box.' },
  { icon: ListChecks, title: 'Pipeline-aware segments', body: 'Target leads by stage, source, score, or any custom field — pulled live from your CRM, no list exports.' },
  { icon: Split, title: 'A/B testing', body: 'Test subject lines, content, and send times. Zomic picks the winner and sends the rest automatically.' },
  { icon: Gauge, title: 'Deliverability dashboard', body: 'See opens, clicks, replies, and bounces in real time, with reputation signals so you land in the inbox.' },
  { icon: Mail, title: 'Drip campaigns', body: 'Multi-step sequences that react to what each lead does — opens, clicks, replies — not just what they do not do.' },
  { icon: Check, title: 'One bill, one tool', body: 'No separate email platform. No copy-pasting contacts. Your CRM and your campaigns finally live together.' },
];

export default function EmailSystem() {
  return (
    <>
      <PageHero
        eyebrow="New · Zomic Mail"
        title="Send email campaigns from the same place you close deals."
        lead="A drag-and-drop builder, smart segments pulled straight from your pipeline, and deliverability tools — no separate email platform, no separate bill."
        mascotMood="celebrate"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/pricing" className="btn btn-secondary btn-lg">See pricing</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Capabilities" title="An email platform that already knows your leads." />
          <Reveal stagger={0.08} className="card-grid card-grid-3 mt-12">
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

      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <FeatureRow
            eyebrow="Segments"
            title="Send to the right leads, without ever exporting a list."
            body="Segments are live. Filter by pipeline stage, lead score, source, last activity, or any custom field — and Zomic keeps the audience updated as leads move, automatically."
            bullets={['Live CRM segments', 'Custom field filters', 'Exclude already-customers', 'Send now or schedule']}
            flip
            art={
              <div className="mini-mock" style={{ maxWidth: 340 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 8 }}>Segment · Interested, not contacted in 7d</div>
                <div style={{ height: 90, background: 'linear-gradient(135deg, #BFE3F5, #C9BBFF)', borderRadius: 12, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', fontWeight: 800 }}>Your spring offer</div>
                <div className="flex justify-between text-xs font-bold" style={{ color: 'var(--ink-2)' }}>
                  <span>Sent <b style={{ color: 'var(--accent-deep)' }}>1,240</b></span>
                  <span>Opens <b style={{ color: 'var(--accent-deep)' }}>62%</b></span>
                  <span>Clicks <b style={{ color: 'var(--accent-deep)' }}>18%</b></span>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <CTASection title="Your CRM and your campaigns, finally in one place." />
    </>
  );
}
