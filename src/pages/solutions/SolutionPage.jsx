// Zomic marketing — shared solution-page template.
// Each solution reuses the same core sections but swaps headline,
// imagery copy, and audience-specific bullets (Part 1 requirement).
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero, SectionHeading, CTASection, CheckList } from '../../components/sections.jsx';
import { Reveal, RevealItem } from '../../lib/motion.jsx';
import Mascot from '../../components/Mascot.jsx';

export default function SolutionPage({
  eyebrow,
  title,
  lead,
  mascotMood = 'wave',
  painPoints,
  outcomes,
  featureRows = [],
  stat,
  testimonial,
  cta = {},
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} mascotMood={mascotMood}>
        <div className="flex gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-accent btn-lg">Start free trial <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">Book a demo</Link>
        </div>
      </PageHero>

      {/* Pain points — what this audience struggles with */}
      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="The problem" title={painPoints.title} lead={painPoints.lead} />
          <Reveal stagger={0.08} className="card-grid card-grid-3 mt-12">
            {painPoints.items.map((p) => (
              <RevealItem key={p.title}>
                <div className="feature-card">
                  <span className="feature-card-ico" style={{ background: 'var(--coral)', color: 'var(--coral-deep)' }}>{p.icon}</span>
                  <div className="feature-card-title">{p.title}</div>
                  <div className="feature-card-body">{p.body}</div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How Zomic helps — feature rows */}
      {featureRows.map((f, i) => (
        <section key={i} className="section" style={{ background: i % 2 ? 'var(--canvas-alt)' : 'transparent' }}>
          <div className="shell">
            <div className={`feature-row ${f.flip ? 'feature-row-flip' : ''}`}>
              <Reveal variant="image" className="feature-row-art">{f.art}</Reveal>
              <Reveal stagger={0.09} className="feature-row-copy">
                <RevealItem><p className="eyebrow">{f.eyebrow}</p></RevealItem>
                <RevealItem><h3 className="t-section mt-3">{f.title}</h3></RevealItem>
                <RevealItem><p className="t-body mt-4">{f.body}</p></RevealItem>
                <Reveal className="mt-5" stagger={0.06}><CheckList items={f.bullets} /></Reveal>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Outcomes / stat */}
      <section className="section" style={{ background: 'var(--ink)' }}>
        <div className="shell text-center">
          <Reveal stagger={0.1}>
            <RevealItem><div className="flex justify-center mb-4"><Mascot size={84} mood="celebrate" /></div></RevealItem>
            <RevealItem><p className="eyebrow" style={{ color: 'var(--accent)' }}>The outcome</p></RevealItem>
            <RevealItem><h2 className="t-section-lg mt-3" style={{ color: '#FFFFFF', maxWidth: 760, margin: '12px auto 0' }}>{outcomes.title}</h2></RevealItem>
            {stat && (
              <RevealItem>
                <div className="mt-8" style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
                  {stat.map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{s.value}</div>
                      <div style={{ fontSize: 14, color: '#B3AAD1', marginTop: 6 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </RevealItem>
            )}
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="section">
          <div className="shell">
            <Reveal variant="fade" className="read-col mx-auto text-center">
              <p className="t-section" style={{ fontSize: 24, lineHeight: 1.5, color: 'var(--ink)' }}>“{testimonial.quote}”</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="testi-avatar" style={{ background: testimonial.bg }}>{testimonial.initial}</span>
                <div className="text-left">
                  <div className="testi-name">{testimonial.name}</div>
                  <div className="testi-role">{testimonial.role}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CTASection title={cta.title || 'See if Zomic fits your team.'} lead={cta.lead} />
    </>
  );
}
