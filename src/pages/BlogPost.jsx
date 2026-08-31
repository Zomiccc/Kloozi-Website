// Zomic marketing — sample blog post template.
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { CTASection } from '../components/sections.jsx';
import { POSTS } from '../lib/posts.js';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="page-hero">
        <div className="shell relative">
          <div className="page-hero-grid page-hero-center">
            <Reveal stagger={0.1} className="page-hero-copy">
              <RevealItem><Link to="/blog" className="nav-underline inline-flex items-center gap-1"><ArrowLeft size={15} /> Back to blog</Link></RevealItem>
              <RevealItem><p className="eyebrow mt-4">{post.tag}</p></RevealItem>
              <RevealItem><h1 className="t-hero-lg mt-3">{post.title}</h1></RevealItem>
              <RevealItem>
                <div className="flex items-center justify-center gap-4 mt-6 flex-wrap" style={{ fontSize: 14, color: 'var(--ink-2)' }}>
                  <span className="flex items-center gap-1.5"><span className="testi-avatar" style={{ width: 28, height: 28, fontSize: 11, background: 'var(--accent)' }}>{post.author[0]}</span> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="shell">
          <Reveal variant="image" className="max-w-3xl mx-auto" style={{ marginBottom: 40 }}>
            <div style={{ background: post.color, height: 280, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 56, fontWeight: 800, color: 'var(--ink)', opacity: 0.85 }}>{post.tag}</span>
            </div>
          </Reveal>

          <Reveal stagger={0.06} className="blog-post blog-post-body">
            {post.body.map((b, i) => {
              if (b.type === 'h2') return <RevealItem key={i} as="h2"><h2>{b.text}</h2></RevealItem>;
              if (b.type === 'ul') return (
                <RevealItem key={i} as="ul"><ul>
                  {b.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul></RevealItem>
              );
              return <RevealItem key={i} as="p"><p>{b.text}</p></RevealItem>;
            })}
          </Reveal>

          <Reveal variant="fade" className="max-w-3xl mx-auto mt-12 p-6 card" style={{ background: 'var(--canvas-alt)' }}>
            <p className="t-body" style={{ fontSize: 15 }}>Written by <b style={{ color: 'var(--ink)' }}>{post.author}</b>, part of the Zomic crew. We write about the playbooks our customers use to close more conversations.</p>
          </Reveal>
        </div>
      </section>

      {/* more posts */}
      <section className="section" style={{ background: 'var(--canvas-alt)' }}>
        <div className="shell">
          <h2 className="t-section mb-8">Keep reading</h2>
          <Reveal stagger={0.08} className="blog-grid">
            {more.map((p) => (
              <RevealItem key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="card card-hover blog-card" style={{ textDecoration: 'none' }}>
                  <div className="blog-card-art" style={{ background: p.color }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', opacity: 0.85 }}>{p.tag}</span>
                  </div>
                  <span className="blog-card-tag">{p.tag}</span>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <span className="nav-underline inline-flex items-center gap-1 mt-auto">Read article <ArrowRight size={14} /></span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
