// Flazyn — shared section building blocks used by every page.
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import Stage3D from './Stage3D.jsx';

/* Hero for inner pages. Not scroll-animated — it's above the fold and
   must be visible in the prerendered HTML immediately. */
export function PageHero({ eyebrow, title, lead, children, art, center = false }) {
  return (
    <section className="page-hero" data-scene={!center && !art ? 'hero' : undefined}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="shell">
        <div className={`page-hero-grid ${center ? 'center' : ''}`}>
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="h1">{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {children && <div className="actions">{children}</div>}
          </div>
          {!center && (
            <div className="page-hero-art">
              {art || <div className="scene-slot" style={{ height: 440 }} aria-hidden="true" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HeroActions({ secondary = { to: '/contact', label: 'Talk to us' } }) {
  return (
    <>
      <Link to="/early-access" className="btn btn-primary btn-lg">Get early access <ArrowRight size={18} /></Link>
      {secondary && <Link to={secondary.to} className="btn btn-secondary btn-lg">{secondary.label}</Link>}
    </>
  );
}

export function SectionHead({ eyebrow, title, lead, left = false }) {
  return (
    <Reveal stagger={0.08} className={`section-head ${left ? 'left' : ''}`}>
      {eyebrow && <RevealItem as="p" className="eyebrow">{eyebrow}</RevealItem>}
      <RevealItem as="h2" className="h2">{title}</RevealItem>
      {lead && <RevealItem as="p" className="lead">{lead}</RevealItem>}
    </Reveal>
  );
}

/* Grid of 3D-chip feature cards. items: { icon, hue, title, body, to? } */
export function FeatureGrid({ items, cols = 3 }) {
  return (
    <Reveal stagger={0.07} className={`grid-${cols}`}>
      {items.map(({ icon: Icon, hue = '', title, body, to }) => {
        const inner = (
          <div className="feature-card">
            <span className={`chip3d ${hue}`}><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{body}</p>
            {to && <span className="link-arrow">Learn more <ArrowRight size={15} /></span>}
          </div>
        );
        return (
          <RevealItem key={title} variant="pop">
            {to ? <Link to={to} style={{ display: 'block', height: '100%' }}>{inner}</Link> : inner}
          </RevealItem>
        );
      })}
    </Reveal>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((it) => (
        <li key={it}><span className="check"><Check size={14} strokeWidth={3} /></span><span>{it}</span></li>
      ))}
    </ul>
  );
}

/* Alternating copy + visual row. */
export function Split({ id, eyebrow, title, body, bullets, art, flip = false, cta }) {
  return (
    <div id={id} className={`split ${flip ? 'flip' : ''}`}>
      <Reveal variant={flip ? 'right' : 'left'}>
        {art?.props?.src ? art : <div className="split-art">{art}</div>}
      </Reveal>
      <Reveal stagger={0.08} className="split-copy">
        {eyebrow && <RevealItem as="p" className="eyebrow">{eyebrow}</RevealItem>}
        <RevealItem as="h2" className="h2">{title}</RevealItem>
        <RevealItem as="p" className="body">{body}</RevealItem>
        {bullets && <RevealItem><CheckList items={bullets} /></RevealItem>}
        {cta && <RevealItem style={{ marginTop: 26 }}><Link to={cta.to} className="link-arrow">{cta.label} <ArrowRight size={16} /></Link></RevealItem>}
      </Reveal>
    </div>
  );
}

export function FAQ({ items }) {
  return (
    <Reveal stagger={0.05} className="faq">
      {items.map((f) => (
        <RevealItem key={f.q}>
          <details className="faq-item">
            <summary>{f.q}<span className="faq-icon" aria-hidden="true"><Plus size={16} /></span></summary>
            <p>{f.a}</p>
          </details>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/* Closing call to action with the 3D mascot. */
export function CTA({
  title = 'Be one of the first teams on Flazyn.',
  lead = 'Join early access and help shape a CRM built around real conversations. No card, no commitment.',
}) {
  return (
    <section className="section-tight">
      <div className="shell">
        <Reveal variant="pop" className="cta">
          <div>
            <h2 className="h2">{title}</h2>
            <p className="lead">{lead}</p>
            <div className="actions">
              <Link to="/early-access" className="btn btn-primary btn-lg">Get early access <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Talk to us</Link>
            </div>
          </div>
          <div className="cta-stage">
            <Stage3D scene="mascot" hint="Click me!" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
