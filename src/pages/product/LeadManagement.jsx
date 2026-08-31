// Zomic marketing — product page: Lead Management.
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Inbox, GitBranch, Filter, Bell, Check } from 'lucide-react';
import { PageHero, SectionHeading, FeatureRow, CTASection, CheckList } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

const CAPABILITIES = [
  { icon: Inbox, title: 'Shared team inbox', body: 'Every message — WhatsApp, email, form — lands in one inbox. No more switching tabs or losing context.' },
  { icon: GitBranch, title: 'Custom pipeline stages', body: 'Drag-and-drop stages that match how your team actually sells. Rename, reorder, colour-code.' },
  { icon: Filter, title: 'Smart views & filters', body: 'Save views per rep, per source, per stage. Find the right leads in two clicks, not twenty.' },
  { icon: Bell, title: 'Automatic assignment', body: 'Round-robin or rules-based. New leads reach the right rep instantly and fairly.' },
  { icon: Users, title: 'Duplicate detection', body: 'Zomic spots the same lead coming in twice and merges them — quietly, in the background.' },
  { icon: Check, title: 'Activity timeline', body: 'Every touchpoint — call, email, note, WhatsApp — logged automatically on the lead record.' },
];

export default function LeadManagement() {
  return (
    <>
      <PageHero
        eyebrow="Product · Core"
        title="Lead management that actually keeps up with your conversations."
        lead="A single pipeline, a shared inbox, and automatic capture — so no lead ever falls through the cracks between tools or teammates."
        mascotMood="wave"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Capabilities" title="Everything you need to never drop a lead again." />
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
            eyebrow="Team Management"
            title="Built for teams who close together."
            body="Roles and permissions that match your org, shared visibility into every pipeline, and assignment rules that keep workloads fair — without a single spreadsheet."
            bullets={['Roles: admin, rep, viewer', 'Per-pipeline permissions', 'Round-robin & rules-based assignment', 'Shared views and saved filters']}
            flip
            id="team"
            art={
              <div className="mini-mock" style={{ maxWidth: 320 }}>
                {[
                  { n: 'Aisha', r: 'Admin', c: 24, bg: '#C9BBFF' },
                  { n: 'Marco', r: 'Rep', c: 18, bg: '#BFE3F5' },
                  { n: 'Priya', r: 'Rep', c: 21, bg: '#A8E6C1' },
                ].map((t) => (
                  <div key={t.n} className="hero-mock-row">
                    <span className="hero-mock-avatar" style={{ background: t.bg }}>{t.n[0]}</span>
                    <div className="flex-1"><div className="hero-mock-name">{t.n}</div><div className="hero-mock-meta">{t.r}</div></div>
                    <span className="badge">{t.c} leads</span>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
