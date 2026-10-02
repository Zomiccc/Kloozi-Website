// Flazyn — Blog post template.
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { CTA } from '../components/sections.jsx';
import { postBlocks } from '../lib/posts.js';
import { usePosts } from '../lib/content.jsx';
import { PostCard, formatDate } from './Blog.jsx';
import NotFound from './NotFound.jsx';
import { Photo } from '../components/Photo.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const posts = usePosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="page-hero" style={{ paddingBottom: 48 }}>
          <div className="hero-bg" aria-hidden="true" />
          <div className="shell shell-narrow" style={{ textAlign: 'center' }}>
            <Link to="/blog" className="link-arrow"><ArrowLeft size={15} /> All articles</Link>
            <p style={{ marginTop: 24 }}><span className="badge">{post.tag}</span></p>
            <h1 className="h1" style={{ marginTop: 16 }}>{post.title}</h1>
            <p className="lead" style={{ marginTop: 18 }}>{post.description}</p>
            <div className="post-meta" style={{ justifyContent: 'center', marginTop: 22 }}>
              <span>{post.author}</span>
              <span><Calendar size={13} /> <time dateTime={post.date}>{formatDate(post.date)}</time></span>
              <span><Clock size={13} /> {post.readTime}</span>
            </div>
          </div>
        </header>
        <div className="shell">
          {post.image && <Photo eager src={post.image} alt={post.imageAlt} style={{ aspectRatio: '16 / 7', maxWidth: 960, margin: '0 auto 48px' }} />}
          <div className="prose">
            {postBlocks(post.body).map((b, i) => {
              if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>;
              if (b.type === 'ul') return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </div>
      </article>

      <section className="section">
        <div className="shell">
          <h2 className="h2" style={{ fontSize: 30, marginBottom: 28 }}>Keep reading</h2>
          <div className="post-grid">{more.map((p) => <PostCard key={p.slug} post={p} headingLevel="h3" />)}</div>
        </div>
      </section>
      <CTA />
    </>
  );
}
