// Zomic marketing — product page: WhatsApp Automation.
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Send, Clock, Users, Reply, ShieldCheck, Check } from 'lucide-react';
import { PageHero, SectionHeading, FeatureRow, CTASection } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';

const CAPABILITIES = [
  { icon: Reply, title: 'Instant auto-reply', body: 'The moment a lead arrives, Zomic replies on WhatsApp — so you never lose a deal to a slow first response.' },
  { icon: Send, title: 'Template sequences', body: 'Pre-approved message templates with delays and conditions. Nurture leads on autopilot, within WhatsApp policy.' },
  { icon: Clock, title: 'Scheduled broadcasts', body: 'Send campaigns to segments of leads at the right time, with personalisation tokens per recipient.' },
  { icon: MessageCircle, title: 'Two-way chat inbox', body: 'When a lead replies, the sequence pauses and a real conversation begins — all in one shared inbox.' },
  { icon: Users, title: 'Team inboxes', body: 'Multiple reps on one WhatsApp number, with assignment, notes, and internal mentions alongside the chat.' },
  { icon: ShieldCheck, title: 'Template approval', body: 'Submit and manage WhatsApp templates inside Zomic. We track approval status so you always know what is sendable.' },
];

export default function WhatsAppAutomation() {
  return (
    <>
      <PageHero
        eyebrow="Product · Core"
        title="Reach leads on WhatsApp in seconds, not hours."
        lead="Speed wins deals. Auto-reply the moment a lead arrives, run sequences, and hold real two-way conversations — all from your business number."
        mascotMood="wave"
      >
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Capabilities" title="A full WhatsApp engagement engine, not just a sender." />
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
            eyebrow="Sequences"
            title="Nurture on autopilot, then hand off to a human the moment they reply."
            body="Build a sequence once: instant reply, a follow-up the next morning, a nudge after two days. The moment a lead responds, the sequence pauses and the conversation lands in your team inbox."
            bullets={['Visual sequence builder', 'Delays, conditions & branching', 'Auto-pause on reply', 'Personalisation tokens']}
            flip
            art={
              <div className="mini-mock" style={{ maxWidth: 320 }}>
                <div className="flex gap-2 mb-3"><div style={{ background: 'var(--mint)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#1f6b43' }}>Hi! Thanks for your interest 🙌</div></div>
                <div className="flex justify-end mb-3"><div style={{ background: 'var(--accent)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Here is the info you asked for 👇</div></div>
                <div className="flex gap-2"><div style={{ background: 'var(--canvas-alt)', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Can we hop on a call tomorrow?</div></div>
              </div>
            }
          />
        </div>
      </section>

      <CTASection
        title="Reply in seconds. Close more deals."
        lead="Connect your WhatsApp Business number in minutes and let Zomic handle the first response every time."
      />
    </>
  );
}
