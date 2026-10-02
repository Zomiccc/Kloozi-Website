// Flazyn — Blog index.
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHero } from '../components/sections.jsx';
import { Reveal, RevealItem } from '../lib/motion.jsx';
import { usePosts, Blocks } from '../lib/content.jsx';

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function PostCard({ post, headingLevel = 'h2' }) {
  const H = headingLevel;
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      <div className="post-art">{post.image && <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" />}</div>
      <div className="post-card-body">
        <span className="badge">{post.tag}</span>
        <H>{post.title}</H>
        <p>{post.description}</p>
        <div className="post-meta" style={{ marginTop: 'auto', paddingTop: 8 }}>
          <span>{formatDate(post.date)}</span><span><Clock size={13} /> {post.readTime}</span>
          <span className="link-arrow" style={{ marginLeft: 'auto', fontSize: 14 }}>Read <ArrowRight size={14} /></span>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const posts = usePosts();
  return (
    <>
      <PageHero k="blog.hero" center eyebrow="Blog" title="Playbooks for conversational selling." lead="Practical guides on lead response, WhatsApp Business, pipelines and CRM habits that stick." />
      <Blocks k="blog.top" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal stagger={0.08} className="post-grid">
            {posts.map((p) => <RevealItem key={p.slug} variant="pop"><PostCard post={p} /></RevealItem>)}
          </Reveal>
        </div>
      </section>
    </>
  );
}
