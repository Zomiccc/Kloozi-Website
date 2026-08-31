// ═══════════════════════════════════════════════════════════════════
// ZOMIC MARKETING — SECTION PRIMITIVES
// Shared building blocks. All motion comes from lib/motion.jsx, which
// uses whileInView + viewport={{ once: true }} throughout.
// ═══════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import {
  Reveal, RevealItem, Blob, Float, Spotlight, Magnetic, WordReveal,
  V, staggerContainer, VIEWPORT_ONCE, EASE_BOUNCY, EASE_SOFT,
} from '../lib/motion.jsx';
import Mascot from './Mascot.jsx';

/* ─── SectionHeading — eyebrow + title + lead, staggered on scroll ─── */
export function SectionHeading({ eyebrow, title, lead, align = 'center', className = '', light = false }) {
  return (
    <Reveal
      stagger={0.08}
      className={`section-heading ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}
    >
      {eyebrow && <RevealItem as="p" className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</RevealItem>}
      <RevealItem as="h2" variant="blurUp" className={`t-section-lg mt-3 ${light ? 'text-white' : ''}`}>{title}</RevealItem>
      {lead && <RevealItem as="p" className={`t-lead mt-4 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-lead-light' : ''}`}>{lead}</RevealItem>}
    </Reveal>
  );
}

/* ─── BlobField — ambient background shapes, each drifting on its own ─── */
export function BlobField({ variant = 'a' }) {
  const sets = {
    a: [
      { color: 'var(--accent)', size: 380, top: '-90px', left: '-140px', duration: 19 },
      { color: 'var(--accent-soft)', size: 280, bottom: '-110px', right: '-90px', duration: 23, delay: 2 },
    ],
    b: [
      { color: 'var(--accent-soft)', size: 320, top: '-70px', right: '-110px', duration: 21 },
      { color: 'var(--accent)', size: 240, bottom: '-90px', left: '-70px', duration: 25, delay: 1.4 },
    ],
    c: [
      { color: 'var(--accent)', size: 300, top: '-50px', left: '38%', duration: 20 },
      { color: 'var(--accent-soft)', size: 340, bottom: '-130px', right: '-70px', duration: 27, delay: 3 },
    ],
  };
  const blobs = sets[variant] || sets.a;
  return (
    <div className="blob-field" aria-hidden="true">
      {blobs.map((b, i) => (
        <Blob key={i} color={b.color} size={b.size} duration={b.duration} delay={b.delay || 0}
          style={{ top: b.top, bottom: b.bottom, left: b.left, right: b.right }} />
      ))}
    </div>
  );
}

/* ─── CTASection — full-width closing CTA ─── */
export function CTASection({
  title = 'Turn your next conversation into your next customer.',
  lead = 'Start free in under two minutes. No credit card, no sales call — unless you want one.',
  primary = { label: 'Start free trial', to: '/signup' },
  secondary = { label: 'Book a demo', to: '/contact' },
  mood = 'celebrate',
}) {
  return (
    <section className="cta-section">
      <div className="shell relative">
        <BlobField variant="c" />
        <Reveal stagger={0.09} className="cta-card relative">
          <RevealItem variant="image" className="cta-mascot">
            <Float range={7} duration={5.4}>
              <Mascot size={124} mood={mood} seed={3} />
            </Float>
          </RevealItem>
          <RevealItem as="h2" variant="blurUp" className="t-hero-lg cta-title">{title}</RevealItem>
          <RevealItem as="p" className="t-lead cta-lead">{lead}</RevealItem>
          <RevealItem className="cta-actions">
            <Magnetic strength={0.18}>
              <Link to={primary.to} className="btn btn-accent btn-lg">{primary.label} <ArrowRight size={18} /></Link>
            </Magnetic>
            {secondary && (
              <Magnetic strength={0.18}>
                <Link to={secondary.to} className="btn btn-secondary btn-lg">{secondary.label}</Link>
              </Magnetic>
            )}
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CheckList — staggered ticks, 60ms apart ─── */
export function CheckList({ items, className = '' }) {
  return (
    <Reveal as="ul" stagger={0.06} className={`check-list ${className}`}>
      {items.map((it, i) => (
        <RevealItem as="li" key={i} className="check-item">
          <span className="check-ico"><Check size={14} strokeWidth={3.2} /></span>
          <span>{it}</span>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/* ─── PageHero — hero for inner pages. Animates on load, not scroll. ─── */
export function PageHero({
  eyebrow, title, lead, mascotMood = 'wave', children,
  align = 'left', art = null, seed = 1,
}) {
  const reduce = useReducedMotion();
  return (
    <section className="page-hero">
      <div className="shell relative">
        <BlobField variant="a" />
        <div className={`page-hero-grid ${align === 'center' ? 'page-hero-center' : ''} relative`}>
          <motion.div
            className="page-hero-copy"
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.09)}
          >
            {eyebrow && <motion.p className="eyebrow" variants={V.text}>{eyebrow}</motion.p>}
            <WordReveal as="h1" text={title} className="t-hero-lg mt-3" onLoad delay={0.1} />
            {lead && <motion.p className="t-lead mt-5 max-w-xl" variants={V.text}>{lead}</motion.p>}
            {children && <motion.div className="mt-8" variants={V.text}>{children}</motion.div>}
          </motion.div>

          {align !== 'center' && (
            <motion.div
              className="page-hero-art"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={reduce ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_BOUNCY, delay: 0.2 }}
            >
              <Float range={7} duration={5.2}>
                {art || <Mascot size={230} mood={mascotMood} seed={seed} />}
              </Float>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── FeatureRow — alternating editorial row. Art slides in from the
     side the row sits on; copy staggers in from below. ─── */
export function FeatureRow({ eyebrow, title, body, bullets, flip = false, art, cta }) {
  return (
    <div className={`feature-row ${flip ? 'feature-row-flip' : ''}`}>
      <Reveal
        variant={flip ? 'fromRight' : 'fromLeft'}
        className="feature-row-art"
      >
        {art}
      </Reveal>
      <Reveal stagger={0.09} className="feature-row-copy">
        <RevealItem as="p" className="eyebrow">{eyebrow}</RevealItem>
        <RevealItem as="h3" variant="blurUp" className="t-section mt-3">{title}</RevealItem>
        <RevealItem as="p" className="t-body mt-4">{body}</RevealItem>
        {bullets && <RevealItem className="mt-6"><CheckList items={bullets} /></RevealItem>}
        {cta && (
          <RevealItem className="mt-7">
            <Link to={cta.to} className="link-arrow">{cta.label} <ArrowRight size={16} /></Link>
          </RevealItem>
        )}
      </Reveal>
    </div>
  );
}

/* ─── FeatureCard — spotlight card with its own icon hover animation.
     Entrance: staggered scale-in. Hover: lift + cursor-following glow,
     and the icon independently rotates/scales. ─── */
export function FeatureCard({ icon: Icon, title, body, badge, to }) {
  const reduce = useReducedMotion();

  const inner = (
    <>
      <motion.span
        className="feature-card-ico"
        /* icon's OWN secondary hover animation — rotate + pop */
        whileHover={reduce ? {} : { rotate: -10, scale: 1.16 }}
        transition={{ duration: 0.28, ease: EASE_BOUNCY }}
      >
        {Icon && <Icon size={21} />}
      </motion.span>
      <div className="feature-card-title">
        {title}
        {badge && <span className="badge badge-accent ml-2">{badge}</span>}
      </div>
      <div className="feature-card-body">{body}</div>
      {to && <span className="link-arrow mt-auto">Learn more <ArrowRight size={15} /></span>}
    </>
  );

  const card = (
    <RevealItem variant="scaleIn">
      <Spotlight className="feature-card">{inner}</Spotlight>
    </RevealItem>
  );

  return to ? <Link to={to} className="contents">{card}</Link> : card;
}

/* ─── CardGrid — wraps FeatureCards in a staggered container ─── */
export function CardGrid({ children, cols = 3, className = '', stagger = 0.07 }) {
  return (
    <Reveal stagger={stagger} className={`card-grid card-grid-${cols} ${className}`}>
      {children}
    </Reveal>
  );
}

/* ─── StatBand — dark band of counted-up numbers ─── */
export function StatBand({ stats, title }) {
  return (
    <section className="stat-band">
      <div className="shell">
        {title && (
          <Reveal className="text-center mb-14">
            <h2 className="t-section-lg text-white max-w-3xl mx-auto">{title}</h2>
          </Reveal>
        )}
        <Reveal stagger={0.1} className="stat-band-grid">
          {stats.map((s) => (
            <RevealItem variant="scaleIn" key={s.label} className="stat-band-item">
              <div className="stat-band-num">{s.value}</div>
              <div className="stat-band-label">{s.label}</div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQAccordion — expandable questions ─── */
export function FAQAccordion({ items }) {
  return (
    <Reveal stagger={0.06} className="faq-list">
      {items.map((f, i) => (
        <RevealItem key={i}>
          <details className="faq-item">
            <summary className="faq-q">
              <span>{f.q}</span>
              <span className="faq-chev"><ArrowRight size={16} /></span>
            </summary>
            <div className="faq-a">{f.a}</div>
          </details>
        </RevealItem>
      ))}
    </Reveal>
  );
}
