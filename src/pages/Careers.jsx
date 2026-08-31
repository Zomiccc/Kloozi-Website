// Zomic marketing — Careers page (simple but real).
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, Heart, Coffee } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';

const ROLES = [
  { title: 'Senior Product Designer', team: 'Product', location: 'Remote · global', type: 'Full-time' },
  { title: 'Frontend Engineer (React)', team: 'Engineering', location: 'Remote · global', type: 'Full-time' },
  { title: 'Backend Engineer (Node)', team: 'Engineering', location: 'Remote · global', type: 'Full-time' },
  { title: 'Customer Success Manager', team: 'Success', location: 'Remote · EU/US hours', type: 'Full-time' },
  { title: 'Growth Marketing Lead', team: 'Growth', location: 'Remote · global', type: 'Full-time' },
  { title: 'Support Engineer', team: 'Success', location: 'Remote · global', type: 'Part-time' },
];

const PERKS = [
  { icon: Heart, title: 'Real ownership', body: 'Small team, big surface area. You ship things customers actually use, end to end.' },
  { icon: Clock, title: 'Async-first', body: 'We do not do standups. We write things down. You work the hours that suit you.' },
  { icon: Coffee, title: 'Quarterly offsites', body: 'We meet in person once a quarter, somewhere nice. The rest of the time, you are home.' },
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help us build the CRM people actually like using."
        lead="We are a small, remote-first team building a calm, fast CRM. We ship often, write things down, and care about the details that make software feel human."
        mascotMood="wave"
      >
        <a href="#open-roles" className="btn btn-accent btn-lg">See open roles <ArrowRight size={18} /></a>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Why join" title="Small team. Big surface area. Real ownership." />
          <Reveal stagger={0.1} className="card-grid card-grid-3 mt-12">
            {PERKS.map((p) => (
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

      <section id="open-roles" className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Open roles" title="Find your next thing." />
          <Reveal stagger={0.06} className="mt-10 flex flex-col gap-3 max-w-3xl mx-auto">
            {ROLES.map((r) => (
              <RevealItem key={r.title}>
                <Link to="/contact" className="card card-hover row-card" style={{ textDecoration: 'none' }}>
                  <span className="hero-mock-avatar" style={{ background: 'var(--accent)' }}><Briefcase size={18} /></span>
                  <div className="flex-1">
                    <div className="hero-mock-name">{r.title}</div>
                    <div className="hero-mock-meta">{r.team}</div>
                  </div>
                  <span className="badge"><MapPin size={12} /> {r.location}</span>
                  <span className="badge badge-accent">{r.type}</span>
                  <ArrowRight size={18} style={{ color: 'var(--ink-3)' }} />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal variant="fade" className="text-center mt-10">
            <p className="t-body">Do not see your role? <Link to="/contact" className="nav-underline inline-flex">Tell us about yourself</Link> — we are always meeting good people.</p>
          </Reveal>
        </div>
      </section>

      <CTASection title="Want in? Apply via the role, or just say hello." primary={{ label: 'Email us', to: '/contact' }} secondary={null} />
    </>
  );
}
