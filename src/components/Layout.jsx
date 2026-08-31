// Zomic marketing — shared layout: scroll progress + navbar + page + footer.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { PageTransition, ScrollProgress } from '../lib/motion.jsx';

export default function Layout({ children }) {
  const loc = useLocation();

  // Scroll to top on route change (unless there's a hash anchor to reach).
  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={loc.pathname}>
          <main className="main">{children}</main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}
