// Flazyn — shared section building blocks used by every page.
// Every component takes an optional `k` (content key prefix). With a key,
// its text becomes editable from the admin panel; without one it renders
// the given copy as-is.
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { T, useContent } from '../lib/content.jsx';
import Stage3D from './Stage3D.jsx';

/* Editable when there's a key and the value is plain text. */
export const E = (k, v) => (k && typeof v === 'string' ? <T k={k}>{v}</T> : v);

/* Hero for inner pages. Not scroll-animated — it's above the fold and
   must be visible in the prerendered HTML immediately. */
export function PageHero({ k, eyebrow, title, lead, children, art, center = false }) {
  return (
    <section className="page-hero" data-scene={!center && !art ? 'hero' : undefined}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="shell">
        <div className={`page-hero-grid ${center ? 'center' : ''}`}>
          <div>
            {eyebrow && <p className="eyebrow">{E(k && `${k}.eyebrow`, eyebrow)}</p>}
            <h1 className="h1">{E(k && `${k}.title`, title)}</h1>
            {lead && <p className="lead">{E(k && `${k}.lead`, lead)}</p>}
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
      <Link to="/early-access" className="btn btn-primary btn-lg"><T k="cta.button.primary">Get early access</T> <ArrowRight size={18} /></Link>
      {secondary && <Link to={secondary.to} className="btn btn-secondary btn-lg"><T k="cta.button.secondary">{secondary.label}</T></Link>}
    </>
  );
}

export function SectionHead({ k, eyebrow, title, lead, left = false }) {
  return (
    <Reveal stagger={0.08} className={`section-head ${left ? 'left' : ''}`}>
      {eyebrow && <RevealItem as="p" className="eyebrow">{E(k && `${k}.eyebrow`, eyebrow)}</RevealItem>}
      <RevealItem as="h2" className="h2">{E(k && `${k}.title`, title)}</RevealItem>
      {lead && <RevealItem as="p" className="lead">{E(k && `${k}.lead`, lead)}</RevealItem>}
    </Reveal>
  );
}

/* Grid of 3D-chip feature cards. items: { icon, hue, title, body, to? } */
export function FeatureGrid({ k, items, cols = 3 }) {
  return (
    <Reveal stagger={0.07} className={`grid-${cols}`}>
      {items.map(({ icon: Icon, hue = '', title, body, to }, i) => {
        const inner = (
          <div className="feature-card">
            <span className={`chip3d ${hue}`}><Icon size={22} /></span>
            <h3>{E(k && `${k}.${i}.title`, title)}</h3>
            <p>{E(k && `${k}.${i}.body`, body)}</p>
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

export function CheckList({ k, items }) {
  return (
    <ul className="check-list">
      {items.map((it, i) => (
        <li key={it}><span className="check"><Check size={14} strokeWidth={3} /></span><span>{E(k && `${k}.${i}`, it)}</span></li>
      ))}
    </ul>
  );
}

/* Alternating copy + visual row. */
export function Split({ k, id, eyebrow, title, body, bullets, art, flip = false, cta }) {
  return (
    <div id={id} className={`split ${flip ? 'flip' : ''}`}>
      <Reveal variant={flip ? 'right' : 'left'}>
        {art?.props?.src ? art : <div className="split-art">{art}</div>}
      </Reveal>
      <Reveal stagger={0.08} className="split-copy">
        {eyebrow && <RevealItem as="p" className="eyebrow">{E(k && `${k}.eyebrow`, eyebrow)}</RevealItem>}
        <RevealItem as="h2" className="h2">{E(k && `${k}.title`, title)}</RevealItem>
        <RevealItem as="p" className="body">{E(k && `${k}.body`, body)}</RevealItem>
        {bullets && <RevealItem><CheckList k={k && `${k}.bullets`} items={bullets} /></RevealItem>}
        {cta && <RevealItem style={{ marginTop: 26 }}><Link to={cta.to} className="link-arrow">{E(k && `${k}.cta`, cta.label)} <ArrowRight size={16} /></Link></RevealItem>}
      </Reveal>
    </div>
  );
}

export function FAQ({ k, items }) {
  const { editing } = useContent();
  return (
    <Reveal stagger={0.05} className="faq">
      {items.map((f, i) => (
        <RevealItem key={f.q}>
          {/* Open while editing so the answers can be edited too. */}
          <details className="faq-item" open={editing || undefined}>
            <summary>{E(k && `${k}.${i}.q`, f.q)}<span className="faq-icon" aria-hidden="true"><Plus size={16} /></span></summary>
            <p>{E(k && `${k}.${i}.a`, f.a)}</p>
          </details>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/* Closing call to action with the 3D mascot. Shared by most pages under
   the "cta" key, so editing it once updates it everywhere. */
export function CTA({
  k = 'cta',
  title = 'Be one of the first teams on Flazyn.',
  lead = 'Join early access and help shape a CRM built around real conversations. No card, no commitment.',
}) {
  return (
    <section className="section-tight">
      <div className="shell">
        <Reveal variant="pop" className="cta">
          <div>
            <h2 className="h2">{E(`${k}.title`, title)}</h2>
            <p className="lead">{E(`${k}.lead`, lead)}</p>
            <div className="actions">
              <Link to="/early-access" className="btn btn-primary btn-lg"><T k="cta.button.primary">Get early access</T> <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-secondary btn-lg"><T k="cta.button.talk">Talk to us</T></Link>
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
