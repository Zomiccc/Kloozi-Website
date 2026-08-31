// Zomic marketing — Security / trust page.
import { ShieldCheck, Lock, Server, KeyRound, FileCheck, Eye, RefreshCw, Mail } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';

const PILLARS = [
  { icon: Lock, title: 'Encryption in transit & at rest', body: 'All data is encrypted with TLS 1.2+ in transit and AES-256 at rest. Your leads’ conversations are never readable in plain text on our servers.' },
  { icon: KeyRound, title: 'Least-privilege access', body: 'Every employee access grant is role-scoped, time-boxed, and audited. No standing access to customer data.' },
  { icon: Server, title: 'Hosted on hardened cloud', body: 'Zomic runs on isolated cloud infrastructure with network segmentation, regular patching, and continuous vulnerability scanning.' },
  { icon: FileCheck, title: 'Backups & disaster recovery', body: 'Encrypted daily backups with point-in-time recovery, tested restore drills, and a documented incident response plan.' },
  { icon: Eye, title: 'Audit logs', body: 'Every action on a lead, pipeline, or setting is logged. Enterprise customers get exportable audit trails.' },
  { icon: RefreshCw, title: 'Continuous compliance', body: 'We run ongoing security reviews, third-party penetration tests, and keep our SOC 2 controls continuously enforced.' },
];

const COMPLIANCE = [
  { label: 'SOC 2 Type II', status: 'In progress' },
  { label: 'GDPR', status: 'Compliant' },
  { label: 'CCPA', status: 'Compliant' },
  { label: 'WhatsApp Business Policy', status: 'Compliant' },
  { label: 'Data residency (EU)', status: 'Available on Scale' },
];

export default function Security() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Your leads’ conversations are sacred. We treat them that way."
        lead="Trust is the whole product. Here is exactly how we keep your data — and your customers’ data — safe."
        mascotMood="wave"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="How we protect your data" title="Six pillars, no hand-waving." />
          <Reveal stagger={0.08} className="card-grid card-grid-3 mt-12">
            {PILLARS.map((p) => (
              <RevealItem key={p.title}>
                <div className="feature-card card-hover">
                  <span className="feature-card-ico"><p.icon size={22} /></span>
                  <div className="feature-card-title">{p.title}</div>
                  <div className="feature-card-body">{p.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Compliance" title="Where we stand." />
          <Reveal stagger={0.06} className="mt-10 max-w-2xl mx-auto flex flex-col gap-3">
            {COMPLIANCE.map((c) => (
              <RevealItem key={c.label}>
                <div className="card row-card">
                  <span className="hero-mock-avatar" style={{ background: 'var(--mint)', color: '#1f6b43' }}><ShieldCheck size={18} /></span>
                  <div className="flex-1"><div className="hero-mock-name">{c.label}</div></div>
                  <span className="badge badge-accent">{c.status}</span>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Found a vulnerability?" title="We want to know." lead="Responsible disclosures are welcome and rewarded. Email security@zomic.com with details and we will respond within 48 hours." />
          <Reveal variant="fade" className="text-center mt-8">
            <a href="mailto:security@zomic.com" className="btn btn-accent btn-lg"><Mail size={18} /> security@zomic.com</a>
          </Reveal>
        </div>
      </section>

      <CTASection title="Security questions before you sign up?" primary={{ label: 'Talk to us', to: '/contact' }} secondary={null} />
    </>
  );
}
