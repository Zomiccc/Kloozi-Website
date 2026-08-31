// Zomic marketing — About page.
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Target, Sparkles } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import Mascot from '../components/Mascot.jsx';

const VALUES = [
  { icon: Heart, title: 'Calm over chaos', body: 'Software should reduce your stress, not add to it. Every screen in Zomic is designed to feel calm, even when your pipeline is loud.' },
  { icon: Target, title: 'Conversations over contacts', body: 'A contact is a row in a database. A conversation is a future customer. We build for the latter.' },
  { icon: Sparkles, title: 'Delight in the details', body: 'The little animations, the thoughtful empty states, the fast first response — delight compounds into trust.' },
];

const TEAM = [
  { n: 'The product crew', r: 'Design & engineering', bg: '#C9BBFF', initial: 'P' },
  { n: 'The growth crew', r: 'Marketing & sales', bg: '#BFE3F5', initial: 'G' },
  { n: 'The success crew', r: 'Support & onboarding', bg: '#A8E6C1', initial: 'S' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Zomic"
        title="We are building the CRM we wished existed."
        lead="Every CRM we tried was either a spreadsheet with extra steps or an enterprise project that needed a consultant. We wanted something calm, fast, and actually useful — so we built it."
        mascotMood="wave"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Our story" title="Started by people who hated their CRM." />
          <Reveal stagger={0.1} className="read-col mx-auto mt-10">
            <RevealItem><p className="t-body" style={{ fontSize: 17, lineHeight: 1.75 }}>Zomic started the way a lot of good software does — with a frustrated founder, a leaky sales pipeline, and a WhatsApp inbox that had become a CRM by accident.</p></RevealItem>
            <RevealItem><p className="t-body mt-5" style={{ fontSize: 17, lineHeight: 1.75 }}>The leads were there. The conversations were happening. But they were spread across WhatsApp, email, a spreadsheet, and three different tools that did not talk to each other. Deals slipped not because the product was bad, but because the first reply was slow and the follow-up was forgotten.</p></RevealItem>
            <RevealItem><p className="t-body mt-5" style={{ fontSize: 17, lineHeight: 1.75 }}>So we built the thing we wanted: one workspace that captures every lead, replies instantly on WhatsApp, sends real email campaigns, and tells you which conversations are heating up — without making you log into five tabs to find out.</p></RevealItem>
            <RevealItem><p className="t-body mt-5" style={{ fontSize: 17, lineHeight: 1.75 }}>Today thousands of teams run their revenue on Zomic. We are still small, still opinionated, and still building the CRM we wished existed when we started.</p></RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="What we value" title="Three things we will not compromise on." />
          <Reveal stagger={0.1} className="card-grid card-grid-3 mt-12">
            {VALUES.map((v) => (
              <RevealItem key={v.title}>
                <div className="feature-card card-hover">
                  <span className="feature-card-ico"><v.icon size={22} /></span>
                  <div className="feature-card-title">{v.title}</div>
                  <div className="feature-card-body">{v.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="The crew" title="Small, opinionated, and hiring." />
          <Reveal stagger={0.1} className="card-grid card-grid-3 mt-12">
            {TEAM.map((t) => (
              <RevealItem key={t.n}>
                <div className="feature-card text-center items-center">
                  <span className="testi-avatar mx-auto" style={{ background: t.bg, width: 64, height: 64, fontSize: 22 }}>{t.initial}</span>
                  <div className="feature-card-title mt-4">{t.n}</div>
                  <div className="feature-card-body">{t.r}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal variant="fade" className="text-center mt-10">
            <Link to="/careers" className="btn btn-secondary btn-lg">See open roles <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
      </section>

      <CTASection title="Want to work with us, or sell with us?" lead="We are hiring, and we are signing up new teams every day. Pick one." primary={{ label: 'Start free trial', to: '/signup' }} secondary={{ label: 'See careers', to: '/careers' }} />
    </>
  );
}
