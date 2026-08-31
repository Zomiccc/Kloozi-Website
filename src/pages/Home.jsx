// ═══════════════════════════════════════════════════════════════════
// ZOMIC — HOMEPAGE (flagship page)
//
// Motion breakdown:
//   Hero copy      → WordReveal, onLoad, words 40ms apart, blur+rise
//   Hero mockup    → scale 0.92→1 (700ms bouncy, +200ms delay), then
//                    Float: y [6,-6] 5s repeat Infinity repeatType mirror
//   Hero mascot    → perched beside the mockup, own Float at 4.6s
//   Logo strip     → Marquee, infinite x 0→-50%, 32s linear
//   Stats          → CountUp 0→value on inView, staggered scale-in
//   Bento grid     → Spotlight cards, staggered, cursor-follow glow
//   Feature rows   → art slides fromLeft/fromRight, copy staggers up
//   How it works   → staggered icon variant (y+rotate), mascot squash
//   Comparison     → cards converge fromLeft + fromRight
//   Testimonials   → staggered scale-in + hover lift
//   Pricing        → staggered scale-in + hover lift
// ═══════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Play, MessageCircle, Mail, BarChart3, Workflow,
  Users, Check, X, Star, Sparkles, Flame, Zap, Globe, ShieldCheck,
} from 'lucide-react';
import {
  Reveal, RevealItem, CountUp, Float, Marquee, Magnetic, Spotlight,
  WordReveal, Parallax, SquashBounce, V, staggerContainer, VIEWPORT_ONCE,
  EASE_BOUNCY, EASE_SOFT,
} from '../lib/motion.jsx';
import {
  SectionHeading, BlobField, CTASection, CheckList, FeatureRow, StatBand,
} from '../components/sections.jsx';
import Mascot from '../components/Mascot.jsx';
import { PRICING } from '../lib/content.js';

/* ═══ HERO MOCKUP ═══
   Two nested motion layers: outer does the one-time entrance, inner
   runs the perpetual float. Separating them means the float never
   fights the entrance transform. */
function HeroMock() {
  const reduce = useReducedMotion();
  const rows = [
    { n: 'Aisha K.', m: 'Replied on WhatsApp · 2m', c: 'A', bg: '#E2DAFB', stage: 'Interested' },
    { n: 'Marco D.', m: 'Opened email · 3× today', c: 'M', bg: '#CFC4F5', stage: 'Negotiating' },
    { n: 'Priya S.', m: 'New lead · Instagram ad', c: 'P', bg: '#E8E3F8', stage: 'New' },
    { n: 'Tom B.', m: 'Booked a call · Fri 2pm', c: 'T', bg: '#B9AAEC', stage: 'Won' },
  ];

  return (
    <div className="hero-mock">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE_BOUNCY, delay: 0.2 }}
      >
        <Float range={6} duration={5}>
          <div className="hero-mock-card">
            <div className="hero-mock-head">
              <span className="hero-mock-dot" style={{ background: '#E2DAFB' }} />
              <span className="hero-mock-dot" style={{ background: '#CFC4F5' }} />
              <span className="hero-mock-dot" style={{ background: '#B9AAEC' }} />
              <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: 'var(--ink-3)' }}>
                zomic · pipeline
              </span>
            </div>
            {rows.map((r, i) => (
              /* each row slides in 90ms after the previous */
              <motion.div
                className="hero-mock-row"
                key={i}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={reduce ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.55 + i * 0.09 }}
              >
                <span className="hero-mock-avatar" style={{ background: r.bg }}>{r.c}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="hero-mock-name">{r.n}</div>
                  <div className="hero-mock-meta">{r.m}</div>
                </div>
                <span className="badge badge-accent">{r.stage}</span>
              </motion.div>
            ))}
          </div>
        </Float>
      </motion.div>

      {/* Floating chips — each on its own float speed so nothing syncs */}
      <motion.div
        className="hero-mock-float hero-mock-float-1"
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={reduce ? {} : { opacity: 1, scale: 1, y: [8, -8] }}
        transition={reduce ? {} : {
          opacity: { duration: 0.5, delay: 0.95 },
          scale: { duration: 0.55, ease: EASE_BOUNCY, delay: 0.95 },
          y: { duration: 4.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 0.6 },
        }}
      >
        <span className="check-ico"><Check size={12} strokeWidth={3.2} /></span>
        Auto-assigned
      </motion.div>

      <motion.div
        className="hero-mock-float hero-mock-float-2"
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={reduce ? {} : { opacity: 1, scale: 1, y: [7, -7] }}
        transition={reduce ? {} : {
          opacity: { duration: 0.5, delay: 1.1 },
          scale: { duration: 0.55, ease: EASE_BOUNCY, delay: 1.1 },
          y: { duration: 5.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 1.1 },
        }}
      >
        <Flame size={15} style={{ color: 'var(--accent-deep)' }} />
        <span style={{ color: 'var(--accent-deep)', fontWeight: 800 }}>+38%</span>
        <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>replies</span>
      </motion.div>

      {/* Mascot perched next to the mockup — enters late, floats slowly */}
      <motion.div
        className="hero-mascot-perch"
        initial={reduce ? false : { opacity: 0, y: 26, scale: 0.7 }}
        animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_BOUNCY, delay: 1.25 }}
      >
        <Float range={5} duration={4.6} delay={0.3}>
          <Mascot size={124} mood="wave" seed={0} />
        </Float>
      </motion.div>
    </div>
  );
}

const EASE_OUT_LOCAL = [0.16, 1, 0.3, 1];

const LOGOS = ['Northwind', 'Brightpath', 'Lumen Labs', 'Coral & Co.', 'Vantage', 'Meridian', 'Kestrel'];

const STATS = [
  { to: 2000, suffix: '+', label: 'businesses running on Zomic' },
  { to: 50000, suffix: '+', label: 'leads managed every day' },
  { to: 38, suffix: '%', label: 'average uplift in reply rate' },
  { to: 2, suffix: ' min', label: 'from signup to first lead' },
];

/* Bento grid — mixed sizes so it reads editorial, not like a card wall */
const BENTO = [
  {
    span: 'bento-lg', tone: 'bento-dark', icon: MessageCircle,
    title: 'WhatsApp automation that replies in seconds',
    body: 'The moment a lead lands, Zomic answers on WhatsApp — with templates, sequences, and a hand-off to a human the instant they reply.',
    art: 'chat',
  },
  {
    span: 'bento-sm', tone: 'bento-accent', icon: Flame,
    title: 'Conversion Signal',
    body: 'Live engagement scoring surfaces the leads most likely to buy today.',
  },
  {
    span: 'bento-sm', tone: '', icon: Mail,
    title: 'Zomic Mail',
    body: 'Full email campaigns with a drag-and-drop builder — no second tool.',
    badge: 'New',
  },
  {
    span: 'bento-sm', tone: '', icon: Workflow,
    title: 'Automation rules',
    body: 'Trigger-based workflows without writing a line of code.',
  },
  {
    span: 'bento-sm', tone: '', icon: BarChart3,
    title: 'Analytics',
    body: 'Dashboards that show what is actually closing, not vanity metrics.',
  },
];

const FEATURES = [
  {
    eyebrow: 'Lead Management',
    title: 'Every lead in one calm pipeline — never a dropped conversation.',
    body: 'See exactly where each lead stands and what happens next. Drag-and-drop stages, automatic assignment, and a shared inbox so nothing slips between teammates or tools.',
    bullets: ['Custom pipeline stages', 'Automatic lead assignment', 'Shared team inbox', 'Duplicate detection'],
    cta: { label: 'Explore lead management', to: '/product/lead-management' },
    flip: false,
    art: (
      <div className="mini-mock" style={{ maxWidth: 350 }}>
        {[['New', 4, 38], ['Contacted', 7, 68], ['Interested', 3, 30], ['Won', 2, 20]].map(([s, n, w]) => (
          <div key={s}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-2)' }}>{s}</span>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--accent-deep)' }}>{n}</span>
            </div>
            <div className="mini-mock-bar">
              <motion.div
                className="mini-mock-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${w}%` }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.9, ease: EASE_OUT_LOCAL, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: 'WhatsApp Automation',
    title: 'Reach leads on WhatsApp in seconds, not hours.',
    body: 'Speed wins deals. Auto-reply the instant a lead arrives, run sequences, and hold real two-way conversations — all from your business number, templates approved and ready.',
    bullets: ['Instant auto-reply', 'Template sequences', 'Two-way chat inbox', 'Broadcast campaigns'],
    cta: { label: 'Explore WhatsApp automation', to: '/product/whatsapp-automation' },
    flip: true,
    art: (
      <div className="mini-mock" style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div className="chat-bubble-in">Hi! Is the listing still available?</div>
        <div className="chat-bubble-out" style={{ alignSelf: 'flex-end' }}>Yes! Want me to book a viewing?</div>
        <div className="chat-bubble-in">Tomorrow 3pm works</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
          <span className="check-ico" style={{ width: 18, height: 18 }}><Check size={11} strokeWidth={3.4} /></span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)' }}>Viewing booked automatically</span>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Email Marketing System',
    title: 'Send campaigns from the same place you close deals.',
    body: 'A drag-and-drop builder, smart segments pulled live from your pipeline, and deliverability tools. No separate email platform, no separate bill, no copy-pasting lists.',
    bullets: ['Drag-and-drop builder', 'Live pipeline segments', 'A/B testing', 'Deliverability dashboard'],
    cta: { label: 'Explore Zomic Mail', to: '/product/email-system' },
    flip: false,
    art: (
      <div className="mini-mock" style={{ maxWidth: 340 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 10 }}>
          Campaign · Spring Open House
        </div>
        <div style={{
          height: 96, background: 'linear-gradient(135deg, #CFC4F5, #A895F0)', borderRadius: 13,
          marginBottom: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 15,
        }}>
          You are invited
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[['Opens', 62], ['Clicks', 18], ['Replies', 9]].map(([k, val]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--accent-deep)' }}>
                <CountUp to={val} suffix="%" duration={1.2} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)' }}>{k}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Analytics & Conversion Signal',
    title: 'Know which leads are heating up before your competitors do.',
    body: 'Conversion Signal scores every lead on real engagement — opens, replies, page visits. Your team spends time on the people most likely to buy instead of guessing.',
    bullets: ['Engagement-based scoring', 'Revenue forecasts', 'Source attribution', 'AI next-best-action'],
    cta: { label: 'Explore analytics', to: '/product/analytics' },
    flip: true,
    art: (
      <div className="mini-mock" style={{ maxWidth: 320 }}>
        {[['Aisha K.', 92], ['Marco D.', 74], ['Priya S.', 41], ['Tom B.', 18]].map(([n, s]) => (
          <div key={n} style={{ marginBottom: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{n}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)' }}>{s}</span>
            </div>
            <div className="mini-mock-bar">
              <motion.div
                className="mini-mock-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${s}%` }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1, ease: EASE_OUT_LOCAL, delay: 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const HOW_STEPS = [
  { n: '1', title: 'Capture', body: 'Leads flow in from WhatsApp, web forms, Facebook & Instagram ads, and your site — automatically.' },
  { n: '2', title: 'Engage', body: 'Instant auto-reply on WhatsApp and email. Your lead hears back in seconds, not hours.' },
  { n: '3', title: 'Nurture', body: 'Sequences and rules move leads through your pipeline without manual chasing.' },
  { n: '4', title: 'Close', body: 'Conversion Signal flags the hottest leads so your team knows exactly who to call now.' },
];

const COMPARE = [
  { label: 'Built-in email marketing system', typical: false },
  { label: 'Native WhatsApp automation', typical: false },
  { label: 'Engagement-based lead scoring', typical: false },
  { label: 'Modern, calm design your team enjoys', typical: false },
  { label: 'Lead capture from social ads', typical: true },
  { label: 'Pipeline & deal tracking', typical: true },
];

const TESTIMONIALS = [
  { q: 'We went from replying to leads in 4 hours to 4 minutes. Our booking rate doubled in the first month.', n: 'Aisha Khan', r: 'Sales Lead, Northwind Realty', a: 'A', bg: '#E2DAFB' },
  { q: 'Finally a CRM my team actually opens. The WhatsApp automation alone replaced two tools we were paying for.', n: 'Marco Diaz', r: 'Founder, Brightpath Agency', a: 'M', bg: '#CFC4F5' },
  { q: 'Conversion Signal is uncanny. It surfaces the leads I should call before I even realise they are hot.', n: 'Priya Sharma', r: 'Head of Growth, Lumen Labs', a: 'P', bg: '#B9AAEC' },
];

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ══ 1 · HERO ══ */}
      <section className="hero">
        <div className="hero-bg bg-grid bg-grid-fade" aria-hidden="true" />
        <div className="shell relative">
          <BlobField variant="a" />
          <div className="hero-grid">
            <div className="hero-copy">
              {/* pill + lead + CTAs stagger in on load */}
              <motion.div initial="hidden" animate="show" variants={staggerContainer(0.09)}>
                <motion.div variants={V.text}>
                  <span className="hero-pill">
                    <span className="hero-pill-dot"><Sparkles size={12} /></span>
                    New · Zomic Mail — email campaigns, built in
                  </span>
                </motion.div>

                {/* headline animates word-by-word, 40ms apart, blur→sharp */}
                <WordReveal
                  as="h1"
                  text="The CRM that turns conversations into customers."
                  className="t-hero-xl hero-title text-balance"
                  onLoad
                  stagger={0.045}
                  delay={0.15}
                />

                <motion.p className="t-lead hero-lead" variants={V.text}>
                  Lead management, WhatsApp automation, and a full email marketing system
                  in one calm, fast workspace. Stop juggling five tools and start closing
                  the conversations you already have.
                </motion.p>

                <motion.div className="hero-actions" variants={V.text}>
                  <Magnetic strength={0.2}>
                    <Link to="/signup" className="btn btn-accent btn-lg">
                      Start free trial <ArrowRight size={18} />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link to="/contact" className="btn btn-secondary btn-lg">
                      <Play size={16} /> Watch demo
                    </Link>
                  </Magnetic>
                </motion.div>

                <motion.div className="hero-trust" variants={V.text}>
                  <div className="hero-trust-avatars">
                    {[['A', '#E2DAFB'], ['M', '#CFC4F5'], ['P', '#B9AAEC'], ['T', '#A895F0']].map(([c, bg]) => (
                      <span key={c} style={{ background: bg }}>{c}</span>
                    ))}
                  </div>
                  <span>2,000+ teams close faster with Zomic · No credit card needed</span>
                </motion.div>
              </motion.div>
            </div>

            <div className="hero-art"><HeroMock /></div>
          </div>
        </div>
      </section>

      {/* ══ 2 · LOGO MARQUEE ══ */}
      <section className="section-sm">
        <Reveal variant="fade" className="text-center mb-10">
          <p className="eyebrow">Trusted by teams that live in their inbox</p>
        </Reveal>
        <Marquee duration={34}>
          {LOGOS.map((l, i) => (
            <span className="logo-item" key={`${l}-${i}`}>{l}</span>
          ))}
        </Marquee>
      </section>

      {/* ══ 3 · STATS ══ */}
      <section className="stats">
        <div className="shell">
          <Reveal stagger={0.08} className="stats-grid">
            {STATS.map((s) => (
              <RevealItem variant="scaleIn" key={s.label}>
                <div className="stat-card">
                  <div className="stat-num"><CountUp to={s.to} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ 4 · BENTO GRID ══ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Everything in one place"
            title="One workspace replaces your CRM, your WhatsApp tool, and your email platform."
            lead="No more copy-pasting leads between tabs. Zomic brings capture, engagement, and closing into a single calm flow."
          />
          <Reveal stagger={0.08} className="bento mt-14">
            {BENTO.map((b) => (
              <RevealItem variant="scaleIn" key={b.title} className={b.span}>
                <Spotlight className={`bento-item ${b.tone}`}>
                  <motion.span
                    className="bento-ico"
                    whileHover={reduce ? {} : { rotate: -10, scale: 1.14 }}
                    transition={{ duration: 0.3, ease: EASE_BOUNCY }}
                  >
                    <b.icon size={21} />
                  </motion.span>
                  <div className="bento-title">
                    {b.title}
                    {b.badge && <span className="badge badge-solid" style={{ marginLeft: 8 }}>{b.badge}</span>}
                  </div>
                  <div className="bento-body">{b.body}</div>

                  {b.art === 'chat' && (
                    <div className="bento-art" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div className="chat-bubble-in" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}>
                        Is this still available?
                      </div>
                      <div className="chat-bubble-out" style={{ alignSelf: 'flex-end', background: 'var(--accent)', color: 'var(--accent-deepest)' }}>
                        Yes — shall I book you in?
                      </div>
                    </div>
                  )}
                </Spotlight>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ 5 · FEATURE ROWS ══ */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="How Zomic works for you"
            title="Built around the conversations that actually close deals."
          />
          <div className="mt-6">
            {FEATURES.map((f, i) => <FeatureRow key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ══ 6 · HOW IT WORKS ══ */}
      <section className="how">
        <div className="shell">
          <SectionHeading
            eyebrow="How it works"
            title="From first hello to signed deal in four steps."
            lead="Set it up once. Zomic handles the repetitive work so your team can focus on conversations that close."
          />
          <Reveal stagger={0.12} className="how-steps">
            {HOW_STEPS.map((s) => (
              <RevealItem variant="icon" key={s.n}>
                <div className="how-step">
                  <div className="how-step-num">{s.n}</div>
                  <div className="how-step-title">{s.title}</div>
                  <div className="how-step-body">{s.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
          {/* mascot lands with a squash-stretch as it scrolls into view */}
          <div className="text-center mt-16">
            <SquashBounce className="inline-block">
              <Float range={5} duration={5.2}>
                <Mascot size={104} mood="celebrate" seed={2} />
              </Float>
            </SquashBounce>
          </div>
        </div>
      </section>

      {/* ══ 7 · COMPARISON ══ */}
      <section className="compare section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="Why Zomic"
            title="What most CRMs are missing."
            lead="The typical CRM tracks deals. Zomic helps you win them — with the engagement tools most platforms leave you to buy separately."
          />
          <Reveal stagger={0.1} className="compare-grid">
            {/* the two cards converge from opposite sides */}
            <RevealItem variant="fromLeft">
              <div className="compare-card compare-card-zomic">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Mascot size={38} mood="idle" seed={4} />
                  <span className="compare-card-title">Zomic</span>
                </div>
                {COMPARE.map((c) => (
                  <div className="compare-row" key={c.label}>
                    <span className="compare-mark compare-yes"><Check size={14} strokeWidth={3.2} /></span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </RevealItem>
            <RevealItem variant="fromRight">
              <div className="compare-card compare-card-typical">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{
                    width: 38, height: 38, borderRadius: 12, background: 'var(--canvas-alt)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-4)',
                  }}><X size={19} /></span>
                  <span className="compare-card-title">Typical CRM</span>
                </div>
                {COMPARE.map((c) => (
                  <div className="compare-row" key={c.label}>
                    <span className="compare-mark compare-no">
                      {c.typical ? <Check size={14} strokeWidth={3.2} /> : <X size={14} strokeWidth={3.2} />}
                    </span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ══ 8 · DARK STAT BAND ══ */}
      <StatBand
        title="Teams using Zomic reply faster, follow up more, and close more."
        stats={[
          { value: '4 sec', label: 'average first response' },
          { value: '2×', label: 'more meetings booked' },
          { value: '38%', label: 'higher reply rate' },
          { value: '5 hrs', label: 'saved per rep, per week' },
        ]}
      />

      {/* ══ 9 · TESTIMONIALS ══ */}
      <section className="testimonials">
        <div className="shell">
          <SectionHeading eyebrow="Loved by revenue teams" title="Teams close more, with less busywork." />
          <Reveal stagger={0.1} className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <RevealItem variant="scaleIn" key={t.n}>
                <motion.div
                  className="testi-card"
                  whileHover={reduce ? {} : { y: -6, boxShadow: '0 20px 44px rgba(82,64,155,0.15)' }}
                  transition={{ duration: 0.22, ease: EASE_SOFT }}
                >
                  <div className="testi-stars">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} fill="currentColor" />)}
                  </div>
                  <p className="testi-quote">“{t.q}”</p>
                  <div className="testi-author">
                    <span className="testi-avatar" style={{ background: t.bg }}>{t.a}</span>
                    <div>
                      <div className="testi-name">{t.n}</div>
                      <div className="testi-role">{t.r}</div>
                    </div>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ 10 · PRICING PREVIEW ══ */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="Simple pricing"
            title="Start free. Grow when you are ready."
            lead="Every plan includes lead management, WhatsApp, and email. Upgrade only when your team grows."
          />
          <Reveal stagger={0.1} className="pricing-grid">
            {PRICING.map((p) => (
              <RevealItem variant="scaleIn" key={p.name}>
                <motion.div
                  className={`price-card ${p.highlight ? 'price-card-highlight' : ''}`}
                  whileHover={reduce ? {} : { y: -6, boxShadow: '0 20px 44px rgba(82,64,155,0.15)' }}
                  transition={{ duration: 0.22, ease: EASE_SOFT }}
                >
                  {p.badge && <span className="badge badge-solid price-badge">{p.badge}</span>}
                  <div className="price-name">{p.name}</div>
                  <div className="price-tagline">{p.tagline}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
                    <span className="price-amount">{p.price === 0 ? 'Free' : `$${p.price}`}</span>
                    {p.price !== 0 && <span className="price-period" style={{ marginBottom: 7 }}>{p.period}</span>}
                  </div>
                  <div className="price-features">
                    {p.features.map((f) => (
                      <div className="price-feature" key={f}>
                        <span className="check-ico"><Check size={12} strokeWidth={3.4} /></span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={p.to} className={`btn ${p.highlight ? 'btn-accent' : 'btn-secondary'}`} style={{ marginTop: 26 }}>
                    {p.cta}
                  </Link>
                </motion.div>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal variant="fade" delay={0.15} className="text-center mt-12">
            <Link to="/pricing" className="link-arrow">Compare all plans <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 11 · FINAL CTA ══ */}
      <CTASection />
    </>
  );
}
