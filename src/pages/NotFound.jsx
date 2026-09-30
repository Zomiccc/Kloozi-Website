// Flazyn — 404 page, with the 3D mascot.
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import Stage3D from '../components/Stage3D.jsx';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="shell">
        <div className="page-hero-grid center">
          <div>
            <div className="hero-stage" style={{ height: 260 }}><Stage3D scene="mascot" /></div>
            <p className="eyebrow" style={{ marginTop: 12 }}>Error 404</p>
            <h1 className="h1">This page wandered off.</h1>
            <p className="lead">The link may be broken or the page may have moved. Let’s get you somewhere useful.</p>
            <div className="actions">
              <Link to="/" className="btn btn-primary btn-lg"><Home size={18} /> Back to home</Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Contact us <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
