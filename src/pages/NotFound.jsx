// Zomic marketing — 404 page (with the mascot, per Part 3.4).
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Reveal, RevealItem, SquashBounce } from '../lib/motion.jsx';
import { BlobField } from '../components/sections.jsx';
import Mascot from '../components/Mascot.jsx';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="shell relative">
        <BlobField variant="b" />
        <div className="page-hero-grid page-hero-center relative">
          <Reveal stagger={0.12} className="page-hero-copy">
            <RevealItem>
              <SquashBounce className="inline-block">
                <Mascot size={150} mood="think" seed={11} />
              </SquashBounce>
            </RevealItem>
            <RevealItem><p className="eyebrow mt-4">404</p></RevealItem>
            <RevealItem><h1 className="t-hero-lg mt-3">This page wandered off.</h1></RevealItem>
            <RevealItem><p className="t-lead mt-5 max-w-md mx-auto">The link may be broken, or the page may have moved. Let’s get you back to somewhere useful.</p></RevealItem>
            <RevealItem>
              <div className="flex gap-3 justify-center mt-8 flex-wrap">
                <Link to="/" className="btn btn-accent btn-lg"><Home size={18} /> Back to home</Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">Contact us <ArrowRight size={16} /></Link>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
