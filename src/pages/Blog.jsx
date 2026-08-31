// Zomic marketing — Blog index.
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHero, SectionHeading, CTASection } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { POSTS } from '../lib/posts.js';

export default function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Playbooks on leads, automation, and growth."
        lead="What we are learning building Zomic, and the tactics our customers use to close more conversations."
        align="center"
        mascotMood="wave"
      />

      {/* featured post */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <Reveal stagger={0.1} className="card card-hover overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0 }}>
            <RevealItem>
              <div style={{ background: featured.color, minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: 'var(--ink)', opacity: 0.85 }}>{featured.tag}</span>
              </div>
            </RevealItem>
            <RevealItem className="p-10 flex flex-col justify-center">
              <span className="blog-card-tag">{featured.tag} · Featured</span>
              <h2 className="blog-card-title mt-2" style={{ fontSize: 28 }}>{featured.title}</h2>
              <p className="blog-card-excerpt mt-3">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mt-5" style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span className="flex items-center gap-1"><Clock size={13} /> {featured.readTime}</span>
              </div>
              <Link to={`/blog/${featured.slug}`} className="btn btn-secondary mt-6" style={{ alignSelf: 'flex-start' }}>Read article <ArrowRight size={16} /></Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* rest of posts */}
      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <SectionHeading eyebrow="Latest" title="More from the blog" />
          <Reveal stagger={0.08} className="blog-grid">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="card card-hover blog-card" style={{ textDecoration: 'none' }}>
                  <div className="blog-card-art" style={{ background: p.color }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', opacity: 0.85 }}>{p.tag}</span>
                  </div>
                  <span className="blog-card-tag">{p.tag}</span>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <div className="flex items-center gap-2 mt-auto" style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                    <span>{p.author}</span><span>·</span><span className="flex items-center gap-1"><Clock size={12} /> {p.readTime}</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection title="Want these playbooks in your inbox?" lead="No spam, one useful email a week. Unsubscribe in one click." primary={{ label: 'Start free trial', to: '/signup' }} secondary={null} />
    </>
  );
}
