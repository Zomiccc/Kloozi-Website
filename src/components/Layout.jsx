// Flazyn — shared layout. The prerenderer writes each route's <head>;
// this keeps <title>/description/canonical correct during client-side
// navigation too.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import UniverseHost from './UniverseHost.jsx';
import TiltLayer from './TiltLayer.jsx';
import { PageTransition, ScrollProgress } from '../lib/motion.jsx';
import { metaFor, canonical } from '../lib/seo.js';
import { useContent } from '../lib/content.jsx';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Layout({ children }) {
  const loc = useLocation();
  const { content } = useContent();

  useEffect(() => {
    const m = metaFor(loc.pathname, content);
    document.title = m.title;
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('link[rel="canonical"]', 'href', canonical(m.path));
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[property="og:url"]', 'content', canonical(m.path));
  }, [loc.pathname, content]);

  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <UniverseHost />
      <TiltLayer />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <PageTransition key={loc.pathname}>{children}</PageTransition>
      </main>
      <Footer />
    </MotionConfig>
  );
}
