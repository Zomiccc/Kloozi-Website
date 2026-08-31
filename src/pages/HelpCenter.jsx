// Zomic marketing — Help Center (real, simple).
import { Link } from 'react-router-dom';
import { Search, BookOpen, MessageCircle, Mail, Plug, BarChart3, ArrowRight, LifeBuoy } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';

const CATEGORIES = [
  { icon: BookOpen, title: 'Getting started', desc: 'Sign up, connect WhatsApp, capture your first lead.', count: 12 },
  { icon: MessageCircle, title: 'WhatsApp automation', desc: 'Templates, sequences, broadcasts, the 24-hour rule.', count: 18 },
  { icon: Mail, title: 'Email marketing', desc: 'Campaigns, segments, A/B testing, deliverability.', count: 14 },
  { icon: Plug, title: 'Integrations', desc: 'Facebook & IG ads, WordPress, Zapier, webhooks.', count: 9 },
  { icon: BarChart3, title: 'Analytics & AI', desc: 'Dashboards, Conversion Signal, AI insights.', count: 11 },
  { icon: LifeBuoy, title: 'Account & billing', desc: 'Plans, invoices, seats, security.', count: 8 },
];

const POPULAR = [
  { q: 'How do I connect my WhatsApp Business number?', to: '/contact' },
  { q: 'What counts as a "lead" on the Starter plan?', to: '/contact' },
  { q: 'How do I set up an instant auto-reply?', to: '/contact' },
  { q: 'Can I import leads from a spreadsheet?', to: '/contact' },
  { q: 'How does Conversion Signal score leads?', to: '/contact' },
  { q: 'How do I cancel or downgrade my plan?', to: '/contact' },
];

export default function HelpCenter() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        lead="Guides, walkthroughs, and answers. If you cannot find what you need, our success crew replies within one business day."
        align="center"
        mascotMood="wave"
      >
        <div className="max-w-xl mx-auto w-full">
          <div className="flex items-center gap-2 card p-2">
            <Search size={20} style={{ color: 'var(--ink-3)' }} />
            <input className="input" style={{ border: 'none', boxShadow: 'none', height: 44 }} placeholder="Search the help center…" />
          </div>
        </div>
      </PageHero>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <SectionHeading eyebrow="Browse by topic" title="Pick a category" />
          <Reveal stagger={0.08} className="card-grid card-grid-3 mt-12">
            {CATEGORIES.map((c) => (
              <RevealItem key={c.title}>
                <Link to="/contact" className="feature-card card-hover" style={{ textDecoration: 'none' }}>
                  <span className="feature-card-ico"><c.icon size={22} /></span>
                  <div className="feature-card-title">{c.title}</div>
                  <div className="feature-card-body">{c.desc}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="badge">{c.count} articles</span>
                    <ArrowRight size={16} style={{ color: 'var(--ink-3)' }} />
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Popular questions" title="What people ask most" />
          <Reveal stagger={0.06} className="mt-10 max-w-2xl mx-auto flex flex-col gap-3">
            {POPULAR.map((p) => (
              <RevealItem key={p.q}>
                <Link to={p.to} className="card card-hover row-card" style={{ textDecoration: 'none' }}>
                  <span className="hero-mock-avatar" style={{ background: 'var(--accent)' }}><BookOpen size={18} /></span>
                  <div className="flex-1"><div className="hero-mock-name">{p.q}</div></div>
                  <ArrowRight size={18} style={{ color: 'var(--ink-3)' }} />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection title="Could not find your answer?" primary={{ label: 'Contact support', to: '/contact' }} secondary={null} />
    </>
  );
}
